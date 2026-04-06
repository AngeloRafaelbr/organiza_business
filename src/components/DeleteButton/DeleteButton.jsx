import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import styles from "./DeleteButton.module.css";


export default function DeleteButton({ onClick }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = () => {
        onClick();
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.deleteButtonDiv}>
            <button className={styles.deleteButton} onClick={handleDelete}>
                <MdDeleteForever />
            </button>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>Tem certeza que deseja excluir este investimento?</p>
                        <button onClick={confirmDelete} className={styles.confirmButton}>Sim</button>
                        <button onClick={cancelDelete} className={styles.cancelButton}>Não</button>
                    </div>
                </div>
            )}
        </div>

    );
}