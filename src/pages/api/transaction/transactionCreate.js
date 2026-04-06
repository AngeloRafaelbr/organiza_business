// src/pages/api/transaction/transactionCreate.js

import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

    // MUDANÇA: valida o token e extrai o email de dentro dele
    const decoded = requireAuth(req, res);
    if (!decoded) return; // requireAuth já respondeu com 401

  try {
    //para debug (console aplicação node)
    //console.log("REQ.BODY - test for transactionCreate")
    //console.log(req.body)

    const dadosFin = req.body.dados;

    //para debug (console aplicação node)
    //console.log("dadosFin- test for transactionCreate")
    //console.log(dadosFin)
    
    const email = decoded.email; // pega o email do token
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Salvar todas as transações recebidas
    const createdTransactions = [];

    
      const newTransaction = await prisma.transaction.create({
      data: {
        data: new Date(dadosFin.dataIncome || dadosFin.dataSpent),
        tipo: dadosFin.tipo,
        categoria: dadosFin.categoriaSelecionadaIncome || dadosFin.categoriaSelecionadaSpent,
        descricao: dadosFin.descricaoIncome || dadosFin.descricaoSpent,
        valor: parseFloat(dadosFin.income || dadosFin.spent),
        user: {
          connect: {
            id: existingUser.id,
          },
        },
      },
    });

      createdTransactions.push(newTransaction);
    

    return res.status(201).json({
      message: 'Transações registradas com sucesso.',
      transactions: createdTransactions,
    });

  } catch (error) {
    console.error("Erro ao criar transações:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
