import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Cores para os setores
const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#E74C3C'];

function IncomeChart({ dadosFin }) {
    const [widthWindow, setWidthWindow] = useState(0);

    useEffect(() => {
        setWidthWindow(window.innerWidth);
    }, []);

    const agruparPorCategoria = () => {
        return dadosFin
            .filter(item => item.tipo === 0) // Apenas receitas
            .reduce((acc, cur) => {
                const categoria = cur.categoria;
                const valor = Number(cur.valor) || 0;

                if (acc[categoria]) {
                    acc[categoria] += valor;
                } else {
                    acc[categoria] = valor;
                }
                return acc;
            }, {});
    };

    const dadosAgrupados = Object.entries(agruparPorCategoria()).map(([categoria, valor]) => ({
        name: categoria,
        value: valor,
    }));

    if (dadosAgrupados.length === 0) {
        dadosAgrupados.push({ name: 'Sem Dados', value: 0 });
    }

    const widthGraph = (width) => (width <= 600 ? 250 : 500);

    return (
        <PieChart width={widthGraph(widthWindow)} height={332}>
            <Pie
                data={dadosAgrupados}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                label={({ value }) => `R$${value.toFixed(2)}`}
                labelLine={false}
            >
                {dadosAgrupados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
}

export default IncomeChart;
