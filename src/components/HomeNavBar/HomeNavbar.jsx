import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './HomeNavbar.module.css';
import Link from 'next/link';
import { useState } from 'react';


export default function InitialNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}><Link href="/"><img src="https://res.cloudinary.com/dcbd1dnvk/image/upload/v1730427036/rganiza__2_-removebg-preview_2_rdnqbn.png" alt="logo" /></Link></div>

            <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">Sobre</Link></li>
                <li><Link href="/contact">Contato</Link></li>
            </ul>

            <button className={styles.menuToggle} onClick={toggleMenu}>
                {isMenuOpen ? <FaTimes className={styles.menuIcon} /> : <FaBars className={styles.menuIcon} />}
            </button>

            <div className={styles.authLinks}>
                <button className={styles.registerButton}><Link href="/auth/register">Registre-se</Link></button>
                <button className={styles.loginButton}><Link href="/auth/login">Login</Link></button>
            </div>
        </nav>
    );
};
