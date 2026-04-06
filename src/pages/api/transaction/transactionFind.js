// src/pages/api/transaction/transactionFind.js

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

    // MUDANÇA: valida o token e extrai o email de dentro dele
    const decoded = requireAuth(req, res);
    if (!decoded) return; // requireAuth já respondeu com 401

  try {

    const email = decoded.email; // pega o email do token

    // Encontra o usuário pelo email
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
