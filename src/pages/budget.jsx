//import BudgetAlert from "@/components/BudgetAlert/BudgetAlert";
import BudgetForm from "@/components/BudgetForm/BudgetForm";
import BudgetList from "@/components/BudgetsList/BudgetList";
import BudgetAlert from "@/components/BudgetAlert/BudgetAlert";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import styles from "@/styles/budget.module.css"
import PrivateRoute from "@/components/PrivateRoute"

export default function Budget() {
    
    return (
        <PrivateRoute>
            <div className="cont">
                <Navbar />
                <div className="main">
                    <h1 className={styles.budgetTitle}>Gestão de Orçamento</h1>
                    <BudgetAlert />
                    <BudgetForm />
                    <BudgetList />
                </div>
                <Footer />
            </div>
        </PrivateRoute>
    )
}