// components/InvestmentCard.js
import styles from "./InvestCard.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";

export default function InvestCard({ id, type, value, institution, growthTax, growth, date, onDelete }) {  

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{type}</h3>
                <DeleteButton 
                    onClick={() => onDelete(id)}
                />
            </div>
            <p><strong>Instituição:</strong> {institution}</p>
            <p><strong>Valor:</strong> R$ {value.toFixed(2)}</p>
            <p><strong>Data:</strong> {date}</p>
            <p><strong>Taxa de crescimento:</strong> {growthTax}%</p>
            <p><strong>Crescimento esperado em um ano:</strong><span className={styles.growthSpan}> + R$ {growth.toFixed(2)}</span></p>
        </div>
    );
}
