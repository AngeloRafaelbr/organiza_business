import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function useIncomeHome() {
    const [dadosFin, setDadosFin] = useState([]);
    const [saldo, setSaldo] = useState(0);
    const [entrada, setEntrada] = useState(0);
    const [saida, setSaida] = useState(0);
    const [atualizaGrid, setAtualizaGrid] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
  const fetchData = async () => {
      
    const email = localStorage.getItem("userEmail");
        if (email) {
            const dadosSalvos = JSON.parse(localStorage.getItem(`Financeiro_${email}`)) ?? [];
        }
        

    try {
      const res= await fetch(`/api/transaction/transactionFind?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        }
      });

      const data = await res.json();
      setDadosFin(data.transactions); // agora você está atualizando os dados

      //para debug (console navegador)
      //console.log(data.transactions)
      //console.log(dadosFin)

    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      // Se quiser usar um estado de erro, defina setError aqui
    }
  };

  fetchData();
}, [atualizaGrid]); // Removido dadosFin do array de dependências para evitar loop

useEffect(() => {
        const totalSaida = dadosFin.filter((item) => item.tipo === 1).map((transaction) => Number(transaction.valor));
        const totalEntrada = dadosFin.filter((item) => item.tipo === 0).map((transaction) => Number(transaction.valor));

        const Entradas = totalEntrada.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const Saidas = totalSaida.reduce((acc, cur) => acc + cur, 0).toFixed(2);

        const saldoTotal = Entradas - Saidas;

        setSaldo(saldoTotal);
        setEntrada(Entradas);
        setSaida(Saidas);
    }, [dadosFin, atualizaGrid]);

console.log("Estado dadosFin atualizado:", dadosFin);
          const dadosCombinados = [
        ...dadosFin.filter(item => item.tipo === 1), // Despesas
        ...dadosFin.filter(item => item.tipo === 0), // Receitas
        ]


    function handleSaveSpent(dados) {
        const data = [...dadosFin, dados];
        setDadosFin(data);
        setAtualizaGrid(!atualizaGrid);
        const email = localStorage.getItem("userEmail");
        if (email) {
            localStorage.setItem(`Financeiro_${email}`, JSON.stringify(data));
        }
    }

    async function onDelete(index) {
        const data = [...dadosFin];
        const id = data[index].id
        data.splice(index, 1);
        setDadosFin(data);
        setAtualizaGrid(!atualizaGrid);
        const email = localStorage.getItem("userEmail");

        await fetch('/api/transaction/transactionDelete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            email: email
}),
});
    router.refresh();
    }

    return {
        dadosFin,
        saldo,
        entrada,
        saida,
        handleSaveSpent,
        onDelete,
        dadosCombinados
    };
}
