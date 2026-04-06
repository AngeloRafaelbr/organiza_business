// pages/api/investment-rates.js

//está sendo chamado pela pagina de Investimentos (investments.jsx) através de um fetch dentro de getStaticProps
//isso implica que o caminho da api deve ser passado com o "localhost" e não com o caminho relativo (diretomente /api/investment-rates)

export default function handler(req, res) {
    // Simulando uma mudança de dados a cada requisição
    const data = [
        { type: 'CDB', growthRate: Math.random() * 10 }, // Taxas aleatórias para cada requisição
        { type: 'Tesouro Direto', growthRate: Math.random() * 10 },
        { type: 'LCI/LCA', growthRate: Math.random() * 10 },
        { type: 'Ações', growthRate: Math.random() * 10 },
        { type: 'Fundos de Investimento', growthRate: Math.random() * 10 },
    ];

    res.status(200).json(data);
}