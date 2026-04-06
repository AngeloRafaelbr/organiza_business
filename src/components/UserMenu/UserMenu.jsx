import styles from "./UserMenu.module.css";
import { useEffect, useState } from "react";
import { MdEdit, MdLogout, MdOutlineAccountCircle, MdSettings } from "react-icons/md";
import Link from 'next/link';
import logout from "@/pages/api/auth/logout";
import PrivateRoute from "@/components/PrivateRoute";
import { useRouter } from "next/router";

export default function UserMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem('userName');
        setUserName(name || "Usuário");

        if (!name) {
            router.push('/auth/login')
        }
    }, [router]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <PrivateRoute>
            <div className={styles.userMenu}>
                <div className={styles.icon} onClick={toggleMenu}>
                    <MdOutlineAccountCircle size={50} />
                </div>

                {menuOpen && (
                    <div className={styles.menu}>
                        <p>Olá, {userName}!</p>
                        <ul>
                            <li><Link href="/edit"><MdEdit /> Editar perfil</Link></li>
                            <li><Link href="/config"><MdSettings /> Configurações</Link></li>
                            <li className={styles.logout} onClick={logout}><MdLogout /> Sair</li>
                        </ul>
                    </div>
                )}

            </div>
        </PrivateRoute>
    );
}