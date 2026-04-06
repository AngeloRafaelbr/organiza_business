import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useBudgets() {
    const [budgets, setBudgets] = useState([]);
    const [category, setCategory] = useState('');
    const [plannedAmount, setPlannedAmount] = useState('');
    const [atualizaGrid, setAtualizaGrid] = useState(false);
    const router = useRouter();

     useEffect(() => {
     const fetchBudgets = async () => {
            const email = localStorage.getItem("userEmail");

            if (!email) {
                console.warn("Email do usuário não encontrado no localStorage.");
                return;
            }

            try {
                const res = await fetch(`/api/budget/budgetFind?email=${encodeURIComponent(email)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache",
                    }
                });

                const data = await res.json();
                setBudgets(data.budgets || []);

                //para debug (console navegador)
                //console.log("Orçamentos carregados:", data.budgets);

            } catch (error) {
                console.error("Erro ao buscar orçamentos:", error);
            }
        };

        fetchBudgets();
    }, [atualizaGrid]);

    async function handleSaveBudget(event) {
    event.preventDefault();

    if (!category || !plannedAmount) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Usuário não autenticado. Email não encontrado.");
        return;
    }

    const dadosBudget = {
        plannedAmount,
        category
    };

    try {
        const response = await fetch("/api/budget/budgetCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dados: dadosBudget,
                email: email,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Erro no response:", result);
            alert(result.error || "Erro apresentado na resposta da requisição");
            return;
        }

        alert("Orçamento salvo com sucesso!");

        // Atualiza a lista após salvar
        setAtualizaGrid(prev => !prev);

        // Limpa os campos
        setCategory('');
        setPlannedAmount('');
        router.refresh();

    } catch (error) {
        console.error("Erro ao salvar orçamento:", error);
        alert("Erro ao salvar orçamento. Verifique o console para mais detalhes.");
    }
}



    const handleDeleteBudget = async (budgetId) => {
  try {
    const response = await fetch('/api/budget/budgetDelete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: budgetId }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Erro ao deletar orçamento:', result);
      alert(result.error || 'Erro ao deletar orçamento.');
      return;
    }

    alert('Orçamento deletado com sucesso!');

    // Atualiza o estado local, se necessário
    setBudgets((prev) => prev.filter((budget) => budget.id !== budgetId));
    router.refresh();
    
  } catch (error) {
    console.error('Erro ao deletar orçamento:', error);
    alert('Erro interno ao tentar deletar o orçamento.');
  }
};


    return {
        budgets,
        category,
        plannedAmount,
        setCategory,
        setPlannedAmount,
        handleSaveBudget,
        handleDeleteBudget,
    };
}
