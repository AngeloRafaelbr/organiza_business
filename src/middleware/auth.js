import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

// Lê o token do cookie da requisição
export function getTokenFromCookie(req) {
    const cookieHeader = req.headers.cookie || '';
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [key, ...val] = c.trim().split('=');
            return [key, val.join('=')];
        })
    );
    return cookies['token'] || null;
}

// Middleware principal — use no início de cada API
// Retorna o payload do token ({ userId, email }) ou null se inválido
export function requireAuth(req, res) {
    const token = getTokenFromCookie(req);

    if (!token) {
        res.status(401).json({ message: 'Não autenticado.' });
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET); // retorna { userId, email }
    } catch {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
        return null;
    }
}