// src/pages/api/transaction/transactionDelete.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.body; // ID da transação a ser deletada

    if (!id) {
      return res.status(400).json({ error: 'ID da transação é obrigatório.' });
    }


    // Verifica se a transação pertence ao usuário
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    // Deleta a transação
    await prisma.transaction.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Transação deletada com sucesso.' });

  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
