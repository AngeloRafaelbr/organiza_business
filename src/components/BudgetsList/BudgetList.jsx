import useBudgets from "@/hooks/useBudgets";
import styles from "./BudgetList.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import useIncomeHome from "@/hooks/useIncomeHome";

export default function BudgetList() {
    const {
        budgets,
        handleDeleteBudget,
    } = useBudgets();

    const { dadosFin } = useIncomeHome(); // Dados de transações ou gastos

    return (
        <div className={styles.budgetsListDiv}>
            <section className={styles.budgetsListSection}>
                <h3 className={styles.budgetListTitle}>Orçamento Definidos</h3>
                <table className={styles.budgetTable}>
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Planejado (R$)</th>
                            <th>Gastos (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets.map((budget) => {
                            // Calcular os gastos totais para a categoria do orçamento
                            const spentList = dadosFin.filter(item => item.tipo === 1);
                            const matchingItems = spentList.filter(item => item.categoria === budget.categoria);

                            const totalSpentAmount = matchingItems.reduce((acc, item) => acc + Number(item.valor), 0);

                            return (
                                <tr key={budget.id}>
                                    <td>
                                        <div className={styles.categoryCell}>
                                            {budget.categoria}
                                            <DeleteButton onClick={() => handleDeleteBudget(budget.id)} />
                                        </div>
                                    </td>
                                    <td>{budget.valorPlanejado}</td>
                                    <td>{totalSpentAmount}</td> {/* Exibindo o total calculado */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </div >
    );
};
