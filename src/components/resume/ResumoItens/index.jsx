import React from 'react';
import styles from '@/components/resume/Resumo/styles.module.css';

function ResumoItens({ valor, titulo, className}) {
  return (
    <div className={`${styles.itens} ${className}`}>
      <h2>{titulo}</h2>
      <span>R$ {valor}</span>
    </div>
  );
}

export default ResumoItens;