// src/pages/api/budget/budgetDelete.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    //para debug (console aplicação node)
    //console.log("BODY RECEBIDO PARA DELETE:", req.body);

    const { id } = req.body; // ID do orçamento a ser deletado

    if (!id) {
      return res.status(400).json({ error: 'ID do orçamento é obrigatório.' });
    }

    // Verifica se o orçamento existe
    const budget = await prisma.budget.findUnique({
      where: { id },
    });

    if (!budget) {
      return res.status(404).json({ error: 'Orçamento não encontrado.' });
    }

    // Deleta o orçamento
    await prisma.budget.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Orçamento deletado com sucesso.' });

  } catch (error) {
    console.error("Erro ao deletar orçamento:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
