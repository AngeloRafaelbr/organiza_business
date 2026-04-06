import { PrismaClient } from '@prisma/client';
import { requireAuth } from '@/middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

    // MUDANÇA: valida o token e extrai o email de dentro dele
    const decoded = requireAuth(req, res);
    if (!decoded) return;

  try {
    const { id } = req.body; // ID do investimento

    if (!id) {
      return res.status(400).json({ error: 'ID do investimento é obrigatório.' });
    }

    const email = decoded.email; // email do usuário autenticado
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o investimento pertence ao usuário
    const investment = await prisma.investment.findUnique({
      where: { id },
    });

    if (!investment || investment.userId !== existingUser.id) {
      return res.status(403).json({ error: 'O investimento não pertence ao usuário.' });
    }

    // Deleta o investimento
    await prisma.investment.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Investimento deletado com sucesso.' });

  } catch (error) {
    console.error("Erro ao deletar investimento:", error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
}
