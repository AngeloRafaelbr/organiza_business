'use client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(false); // Começa como false
    const router = useRouter();

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const token = getCookie("token");
            if (!token) {
                router.push('/auth/login');
            } else {
                setLoading(false);
            }
        };

        checkAuth(); // Executa a verificação do lado do cliente
    }, [router]);

    if (loading) return <div>Carregando...</div>;

    return <>{children}</>;
};
