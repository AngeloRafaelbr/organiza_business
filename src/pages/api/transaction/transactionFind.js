// src/pages/api/transaction/transactionFind.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {

  const { email } = req.query; // <-- Aqui é onde você acessa os parâmetros da URL

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    
    const getTransaction = await prisma.transaction.findMany({
        where: {
        userId: existingUser.id,
        },
    });

    //para debug (console aplicação node)
    //console.log("Transações encontradas:");
    //console.log(getTransaction)

    return res.status(200).json({
      message: 'Transações RESGATADAS com sucesso.',
      transactions: getTransaction
    });

  } catch (error) {
    console.error("Erro ao criar transações:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
