import useIncomeHome from '@/hooks/useIncomeHome';
import { useEffect, useState, useRef } from 'react';

export default function BudgetAlert() {
    const [budgets, setBudgets] = useState([]);
    const { dadosFin } = useIncomeHome();

    // Usando useRef para manter o controle dos orçamentos alertados
    const alertedBudgetsRef = useRef([]);

   /*useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            const savedBudgets = JSON.parse(localStorage.getItem(`budgets_${email}`)) || [];
            setBudgets(savedBudgets);
        }
    }, []);*/

    useEffect(() => {
        async function fetchBudgets() {
          try {
            const response = await fetch("/api/budget/budgetFind", {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache"
                }
            });
    
            const data = await response.json();
    
            if (!response.ok) {
              console.error('Erro na resposta:', data);
              return;
            }
    
            setBudgets(data.budgets);
    
            //para debug (console navegador)
            //console.log(data)

          } catch (error) {
            console.error("Erro ao buscar transações:", error);
          }
        }
    
        fetchBudgets();
        
      }, []);

    useEffect(() => {
        // Verificar orçamentos e alertar
        budgets.forEach((budget) => {
            // Verifica se o orçamento já foi alertado, usando o useRef
            if (alertedBudgetsRef.current.includes(budget.id)) {
                return; // Se já foi alertado, pula para o próximo
            }

            const spentList = dadosFin.filter(item => item.tipo === 1); // Filtrando os gastos
            const matchingItems = spentList.filter(item => item.categoria === budget.categoria);

            const totalSpentAmount = matchingItems.reduce((acc, item) => acc + Number(item.valor), 0);
            const percentageSpent = (totalSpentAmount / budget.valorPlanejado) * 100;

            // Verifica as condições de alerta
            if (percentageSpent >= 80 && percentageSpent < 100) {
                alert(`Atenção: Você gastou ${percentageSpent.toFixed(2)}% do orçamento de ${budget.categoria}`);
                alertedBudgetsRef.current.push(budget.id); // Marca como alertado
            } else if (percentageSpent >= 100) {
                alert(`Orçamento Excedido: Você ultrapassou o orçamento de ${budget.category}`);
                alertedBudgetsRef.current.push(budget.id); // Marca como alertado
            }
        });
    }, [budgets, dadosFin]); // Monitorando alterações em budgets e dadosFin

    return null;
}