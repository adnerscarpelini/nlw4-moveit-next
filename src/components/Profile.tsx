import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {

    //Instancia o contexto do Challenges pra poder se comunicar  com o componente
    //Aqui eu passo a função ou variavel que quero usar
    const { level } = useContext(ChallengesContext);


    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/adnerscarpelini.png" alt="Adner Giovanni Scarpelini" />
            <div>
                <strong>Adner Scarpelini</strong>
                <p>
                    {/* Tudo que está na pasta public ele ja sabe que é publico, então não precisa passar a pasta */}
                    <img src="icons/level.svg" alt="Nível" />
                    {`Level ${level}`}
                </p>
            </div>
        </div>
    );
}