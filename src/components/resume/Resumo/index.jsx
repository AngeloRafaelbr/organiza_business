import React from 'react';
import styles from './styles.module.css';
import ResumoItens from '../ResumoItens';

function Resumo({saldo, entrada, saida}) {
  return (

    <div className={styles.resumoFinanceiro}>
       <ResumoItens valor={saldo} titulo="Saldo" className={styles.resumoSaldo}/>
       <ResumoItens valor={entrada} titulo="Entrada" className={styles.resumoEntrada}/>
       <ResumoItens valor={saida} titulo="Saída" className={styles.resumoSaida}/>
    </div>
  );
}

export default Resumo;