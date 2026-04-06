import { verifyToken } from "@/middleware/auth";

export default function handler(req, res) {
    verifyToken(req, res, () => {
        //Aqui, só os usuários autenticados chegam
        res.status(200).json({ message: 'Usuário está autenticado', user: req.user });
    });
}