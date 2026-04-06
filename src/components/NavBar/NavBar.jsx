'use client';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { MdBarChart, MdOutlineHome, MdMonetizationOn, MdTrendingUp } from 'react-icons/md';
import UserMenu from '@/components/UserMenu/UserMenu';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <section className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/dashboard">
                    <img 
                        src="https://res.cloudinary.com/dcbd1dnvk/image/upload/v1730427036/rganiza__2_-removebg-preview_2_rdnqbn.png" 
                        alt="logo" 
                    />
                </Link>
            </div>

            <div className={styles.menu}>
                <button className={styles.menuToggle} onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes className={styles.menuIcon} /> : <FaBars className={styles.menuIcon} />}
                </button>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
                    <Link href="/dashboard">
                        <MdOutlineHome /> Home
                    </Link>
                    <Link href="/budget">
                        <MdBarChart /> Orçamento
                    </Link>
                    <Link href="/resume">
                        <MdMonetizationOn /> Despesas/Receitas
                    </Link>
                    <Link href="/investments">
                        <MdTrendingUp /> Investimentos
                    </Link>
                </div>
            </div>

            <div className={styles.userMenuDiv}>
                <UserMenu />
            </div>
        </section>
    );
};
