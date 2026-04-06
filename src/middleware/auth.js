import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Nenhum token fornecido' })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token está faltando' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; //Anexa os dados do usuário à requisição
        next(); //Passa para a próxima função
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'});
    }
}