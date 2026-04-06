import React from 'react';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import BudgetChart from "@/components/BudgetChart/BudgetChart";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import styles from "@/styles/dashboard.module.css";
import Resumo from "@/components/resume/Resumo";
import useIncomeHome from "@/hooks/useIncomeHome";
import SpentChart from "@/components/SpentChart/spentChart";
import IncomeChart from "@/components/incomeChart/IncomeChart";
import Grid from "@/components/resume/Grid";
import { MdInsertDriveFile } from 'react-icons/md';
import PrivateRoute from "@/components/PrivateRoute"

export default function Dashboard() {
    const {
        saldo,
        saida,
        entrada,
        dadosFin,
        onDelete,
        dadosCombinados
    } = useIncomeHome();

    const captureRef = useRef();

    const gerarRelatorio = () => {
        html2canvas(captureRef.current).then((canvas) => {
            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'relatorio.png'; // Nome do arquivo de imagem gerado
            link.click();
        });
    };

    return (
        <PrivateRoute>
            <div className="cont">
                <Navbar />
                <div className="main">
                    <div className={styles.dashboardDiv} ref={captureRef}>

                        <button className={styles.reportButton} onClick={gerarRelatorio}> <MdInsertDriveFile /> Gerar Relatório</button>

                        <section>
                            <Resumo saldo={saldo} entrada={entrada} saida={saida} />
                        </section>

                        <section className={styles.chartSection}>
                            <div className={styles.spent_income_Section}>
                                <h1>Receitas</h1>
                                <IncomeChart dadosFin={dadosFin} />
                            </div>

                            <div className={styles.budgetSection}>
                                <h1>Orçamentos e gastos</h1>
                                <BudgetChart />
                            </div>

                            <div className={styles.spent_income_Section}>
                                <h1>Despesas</h1>
                                <SpentChart dadosFin={dadosFin} />
                            </div>
                        </section>

                        <section className={styles.gridSection}>
                            <Grid dadosFin={dadosCombinados} onDelete={onDelete} />
                        </section>

                    </div>
                </div>
                <Footer />
            </div>
        </PrivateRoute>


        

    );
}
