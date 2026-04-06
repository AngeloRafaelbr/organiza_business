// src/pages/api/budget/budgetFind.js

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

    // MUDANÇA: valida o token e extrai o email de dentro dele
    const decoded = requireAuth(req, res);
    if (!decoded) return;

  try {
    const email = decoded.email; // email do usuário autenticado

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
