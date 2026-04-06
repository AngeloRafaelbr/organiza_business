import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useIncomeForm() {
    const [descricaoIncome, setDescricaoIncome] = useState('');
    const [dataIncome, setDataIncome] = useState('');
    const [income, setIncome] = useState();
    const [tipo, setTipo] = useState(0);
    const [categoriaSelecionadaIncome, setCategoriaSelecionadaIncome] = useState('');
    const [atualizaGrid, setAtualizaGrid] = useState(false);
    const router = useRouter();
    
    const inputIncomeFields = [
        {
            label: "Data",
            type: "date",
            value: dataIncome,
            onChange: setDataIncome,
            placeholder: "Data",
            required: true,
        },
        {
            label: "Descrição",
            type: "text",
            value: descricaoIncome,
            onChange: setDescricaoIncome,
            placeholder: "Descrição",
            required: true,
        },
        {
            label: "Categoria",
            type: "text",
            style: "select",
            options: [
                { value: "Alimentação", label: "Alimentação" },
                { value: "Animais de estimação", label: "Animais de estimação" },
                { value: "Compras", label: "Compras" },
                { value: "Construção", label: "Construção" },
                { value: "Contas", label: "Contas" },
                { value: "Doações e caridade", label: "Doações e caridade" },
                { value: "Educação", label: "Educação" },
                { value: "Extra", label: "Extra" },
                { value: "Fatura Cartão", label: "Fatura Cartão" },
                { value: "Gift card", label: "Gift card" },
                { value: "Imposto, juros e multa", label: "Imposto, juros e multa" },
                { value: "Investimento", label: "Investimento" },
                { value: "Lazer", label: "Lazer" },
                { value: "Mercado", label: "Mercado" },
                { value: "Moradia", label: "Moradia" },
                { value: "Recarga", label: "Recarga" },
                { value: "Saúde", label: "Saúde" },
                { value: "Seguros", label: "Seguros" },
                { value: "Serviços", label: "Serviços" },
                { value: "Transporte", label: "Transporte" },
                { value: "Vestuário", label: "Vestuário" },
                { value: "Viagem", label: "Viagem" },
                { value: "Outra", label: "Outra" }
            ],
            value: categoriaSelecionadaIncome,
            onChange: setCategoriaSelecionadaIncome,
            placeholder: "Selecione a categoria",
            required: true,
        },
        {
            label: "Valor (Entrada)",
            type: "number",
            value: income,
            onChange: setIncome,
            placeholder: "Insira o valor da entrada",
            required: true,
        },
    ];

    async function SaveIncome(event) {
        event.preventDefault();

        if (!descricaoIncome || !dataIncome || income <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const dadosFinanceiro = {
            dataIncome,
            categoriaSelecionadaIncome,
            descricaoIncome,
            income,
            tipo,
        };

         const email = localStorage.getItem("userEmail");
    
        //para debug (console navegador)
        //console.log(email)

        try {
                const res = await fetch("/api/transaction/transactionCreate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    dados: {...dadosFinanceiro},
                    email: email
}),
                });
                router.refresh();
            } catch (error) {
                setError("Um erro ocorreu. Por favor tente de novo.");
            }


    // Resetando os campos do formulário
    
    setDescricaoIncome('');
    setCategoriaSelecionadaIncome('');
    setDataIncome('');
    setIncome(0);
    setTipo(0);
}

    return {
        inputIncomeFields,
        SaveIncome,
    };
}
