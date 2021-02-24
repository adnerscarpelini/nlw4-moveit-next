import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    //Instancia o conexto do Challenges pra poder se comunicar  com o componente
    //Aqui eu passo a função ou variavel que quero usar
    const { ativeChallenge, resetChallenge } = useContext(ChallengesContext);


    return (
        <div className={styles.challengeBoxContainer}>
            { ativeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {ativeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${ativeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{ativeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}>
                            Falhei
                                    </button>

                        <button
                            type="button"
                            className={styles.challengeSucceededButton}>
                            Completei
                                    </button>
                    </footer>
                </div>
            ) :
                (
                    <div className={styles.challengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Avanço de Nível" />
                    Avance de nível completando desafios
                </p>
                    </div>
                )}
        </div >
    )
}