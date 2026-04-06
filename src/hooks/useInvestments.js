import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useInvestments() {
    const [investments, setInvestments] = useState([]);
    const [type, setType] = useState("");
    const [value, setValue] = useState("");
    const [institution, setInstitution] = useState("");
    const [date, setDate] = useState("");
    const [growthTax, setGrowthTax] = useState("");

    useEffect(() => {
  const fetchInvestments = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    try {
      const res = await fetch(`/api/investment/investmentFind?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        }
      });

      if (!res.ok) {
        throw new Error(`Erro ao buscar investimentos: ${res.statusText}`);
      }

      const data = await res.json();

      // Atualiza o estado com os investimentos retornados da API
      setInvestments(data.investments);

      // Atualiza localStorage para manter sincronizado, se quiser
      localStorage.setItem(`investments_${email}`, JSON.stringify(data.investments));

    } catch (error) {
      console.error(error);
      // Aqui pode setar estado de erro, se quiser
    }
  };

  fetchInvestments();
}, []);

    const handleAddInvestment = async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("userEmail");
  if (!email) {
    alert("Usuário não autenticado.");
    return;
  }

  const newInvestment = {
    type,
    value: parseFloat(value),
    institution,
    date,
    growthTax: parseFloat(growthTax),
    growth: calculateGrowth(parseFloat(value), parseFloat(growthTax)),
  };

  try {
    const response = await fetch("/api/investment/investmentCreate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        dados: newInvestment,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erro ao registrar investimento.");
    }

    // Atualiza o estado local com o novo investimento registrado no banco
    setInvestments((prev) => [...prev, data.investment]);
    clearForm();
    alert("Investimento salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar investimento:", error);
    alert("Erro ao salvar investimento.");
  }
};


    const handleDeleteInvestment = async (id) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
        console.error("Usuário não autenticado.");
        return;
    }

    try {
        const response = await fetch('/api/investment/investmentDelete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Erro ao deletar investimento.");
        }

        // Atualiza a lista local (estado) após remoção no banco
        const updatedInvestments = investments.filter(investment => investment.id !== id);
        setInvestments(updatedInvestments);

    } catch (error) {
        console.error("Erro ao deletar investimento:", error.message);
    }
};

    const clearForm = () => {
        setType("");
        setValue("");
        setDate("");
        setInstitution("");
        setGrowthTax("");
    };

    const calculateGrowth = (initialValue, growthTax) => {
        return initialValue * (growthTax / 100);
    };

    const investmentFields = [
        {
            label: "Tipo de Investimento",
            type: "text",
            style: "select",
            options: [
                { value: "cdb", label: "CDB" },
                { value: "tesouro_direto", label: "Tesouro Direto" },
                { value: "lci_lca", label: "LCI/LCA" },
                { value: "acoes", label: "Ações" },
                { value: "fundos_investimento", label: "Fundos de Investimento" },
                { value: "fixa", label: "Renda Fixa" },
                { value: "variavel", label: "Renda Variável" },
                { value: "criptomoedas", label: "Criptomoedas" },
                { value: "outro", label: "Outro" },
            ],
            value: type,
            onChange: setType,
            required: true,
        },
        {
            label: "Valor",
            type: "number",
            value: value,
            onChange: setValue,
            placeholder: "Valor",
            required: true,
        },
        {
            label: "Instituição",
            type: "text",
            value: institution,
            onChange: setInstitution,
            placeholder: "Nome da instituição",
            required: true,
        },
        {
            label: "Data",
            type: "date",
            value: date,
            onChange: setDate,
            required: true,
        },
        {
            label: "Taxa",
            type: "number",
            value: growthTax,
            onChange: setGrowthTax,
            placeholder: "Taxa de crescimento ao ano",
            required: true,
        },
    ];

    return {
        investments,
        handleAddInvestment,
        handleDeleteInvestment,
        investmentFields,
    };
}
