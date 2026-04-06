import styles from "./Footer.module.css"
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div>
                    <h4>Organiza</h4>
                    <p>Facilitando a organização financeira</p>
                </div>

                <div>
                    <p>Telefone</p>
                    <p>(81) 91234-5678</p>
                </div>
                
                <div>
                    <p>Email</p> 
                    <p>contato@organiza.com</p>
                </div>

                <div className={styles.social}>
                    <h4>Nos siga nas redes</h4>
                    <div className={styles.socialList}>
                        <a href="https://facebook.com"><FaFacebook /></a>
                        <a href="https://x.com"><FaXTwitter /></a>
                        <a href="https://intagram.com"><FaInstagram /></a>
                    </div>
                </div>

            </div>

            <div className={styles.copyright}>
                    <p>© 2024 Organiza. Todos os direitos reservados.</p>
                </div>
        </footer>
    );
}