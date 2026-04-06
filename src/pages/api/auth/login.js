// api/auth/login.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password }= req.body;

        //Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true }
        });

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos.'});
        }

        //Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({message: 'Senha ou email inválidos.'})
        }

        //Gera um token JWT para autenticação
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );


        res.status(200).json({ message: 'Login efetuado com sucesso!', token, name: user.name, email: user.email });
    } else {
        res.status(405).json({ message: 'Método não permitido' })
    }
}