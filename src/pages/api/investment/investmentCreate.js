// src/pages/api/investment/investmentCreate.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    //para debug (console aplicação node)
    //console.log("REQ.BODY - test for investmentCreate");
    //console.log(req.body);

    const dadosInvest = req.body.dados;
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const newInvestment = await prisma.investment.create({
      data: {
        type: dadosInvest.type,
        value: parseFloat(dadosInvest.value),
        institution: dadosInvest.institution,
        growthTax: parseFloat(dadosInvest.growthTax),
        growth: parseFloat(dadosInvest.growth),
        date: new Date(dadosInvest.date),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Investimento registrado com sucesso.',
      investment: newInvestment,
    });

  } catch (error) {
    console.error("Erro ao criar investimento:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
