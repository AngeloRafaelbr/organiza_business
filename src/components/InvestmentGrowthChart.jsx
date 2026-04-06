// components/InvestmentGrowthChart.js
import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar os tipos de gráfico do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement, // Registrar o PointElement para o gráfico de linhas
    Title,
    Tooltip,
    Legend
);

export default function InvestmentGrowthChart({ data }) {
    const chartRef = useRef(null);
    const [widthWindow, setWidthWindow] = useState(0);

    // Preparar os dados para o gráfico
    const chartData = {
        labels: data.map((investment) => investment.type), // Tipos de investimento (CDB, Tesouro Direto, etc.)
        datasets: [
            {
                label: "Taxa de Crescimento (%)",
                data: data.map((investment) => investment.growthRate), // Taxas de crescimento
                fill: false, // Não preenche a área sob a linha
                borderColor: "rgba(75, 192, 192, 1)", // Cor da linha
                tension: 0.1, // Suaviza a linha
                borderWidth: 2, // Largura da linha
            },
        ],
    };

    useEffect(() => {
        setWidthWindow(window.innerWidth);
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Taxas de Crescimento dos Investimentos",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.raw}% de crescimento`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 5, // Limita o número de ticks no eixo Y
                },
            },
        },
    };

    const widthGraph = widthWindow <= 600 ? 300 : 500;

    return (
        <section style={{ flex: 1, minWidth: '300px' }}>
            <Line
                ref={chartRef}
                data={chartData}
                options={chartOptions}
                height={200}
                width={widthGraph}
            />
        </section>
    );
}