// src/pages/api/investment/investmentFind.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email } = req.query; // pega o email da query string

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const investments = await prisma.investment.findMany({
      where: {
        userId: existingUser.id,
      },
    });

    return res.status(200).json({
      message: 'Investimentos resgatados com sucesso.',
      investments,
    });
  } catch (error) {
    console.error("Erro ao buscar investimentos:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
