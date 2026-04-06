import { useState, useEffect } from 'react';
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import style from "./BudgetForm.module.css";
import useBudgets from '@/hooks/useBudgets';

export default function BudgetForm() {

    const {
        category,
        plannedAmount,
        setCategory,
        setPlannedAmount,
        handleSaveBudget,
    } = useBudgets();

    const budgetFields = [
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
                { value: "Outra", label: "Outra" },
            ],
            value: category,
            onChange: setCategory,
            required: true,
        },
        {
            label: "Valor planejado",
            type: "number",
            value: plannedAmount,
            onChange: setPlannedAmount,
            placeholder: "Valor planejado",
            required: true,
        },
    ];



    return (
        <div className={style.budgetFormDiv}>
            <section className={style.budgetFormSection}>
                <DynamicForm
                    title="Definir Orçamento"
                    fields={budgetFields}
                    buttonLabel="Salvar Orçamento"
                    onSubmit={handleSaveBudget}
                />
            </section>
        </div>
    );
};