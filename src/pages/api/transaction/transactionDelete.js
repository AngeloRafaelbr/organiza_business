// src/pages/api/transaction/transactionDelete.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // MUDANÇA: valida o token e extrai o email de dentro dele
    const decoded = requireAuth(req, res);
    if (!decoded) return;

  try {
    const { id } = req.body; // ID da transação a ser deletada

    if (!id) {
      return res.status(400).json({ error: 'ID da transação é obrigatório.' });
    }


    // Verifica se a transação pertence ao usuário
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });


        if (!transaction) {
            return res.status(404).json({ error: 'Transação não encontrada.' });
        }

        // MUDANÇA: busca o usuário pelo token e verifica se é dono da transação
        const existingUser = await prisma.user.findUnique({
            where: { email: decoded.email }
        });

        if (transaction.userId !== existingUser.id) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar esta transação.' });
        }


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
