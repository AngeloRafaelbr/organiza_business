import InvestCard from "@/components/InvestCard/InvestCard";
import styles from "@/styles/invest.module.css";

export default function InvestmentList({ investments, onDelete }) {
    return (
        <section className={styles.investListSection}>
            {investments.map((investment) => (
                <div key={investment.id}>
                    <InvestCard {...investment} onDelete={() => onDelete(investment.id)} />
                </div>
            ))}
        </section>
    );
}
