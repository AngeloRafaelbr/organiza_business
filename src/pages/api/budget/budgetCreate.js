// src/pages/api/budget/budgetCreate.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {

    //para debug (console aplicação node)
    //console.log("REQ.BODY:");
    //console.log(req.body);

    const dadosBudget = req.body.dados;
    const email = req.body.email;

    // Verificação básica
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório.' });
    }

    if (!dadosBudget.category || !dadosBudget.plannedAmount) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }

    // Verifica se o usuário existe
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Criação do orçamento no banco com vínculo ao usuário
    const newBudget = await prisma.budget.create({
      data: {
        categoria: dadosBudget.category,
        valorPlanejado: parseFloat(dadosBudget.plannedAmount),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Orçamento registrado com sucesso.',
      budget: newBudget,
    });

  } catch (error) {
    console.error("Erro ao criar orçamento:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
