// src/pages/api/budget/budgetFind.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const getBudgets = await prisma.budget.findMany({
      where: {
        userId: existingUser.id,
      },
    });

    return res.status(200).json({
      message: 'Orçamentos resgatados com sucesso.',
      budgets: getBudgets
    });

  } catch (error) {
    console.error("Erro ao resgatar orçamentos:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
