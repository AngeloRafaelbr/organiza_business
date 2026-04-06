// api/auth/register.js
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
        }

        //Verifica se o usuário já existe
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe'});
        }

        //Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        //Cria novo usuário
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}