import styles from '../styles/components/ChallangeBox.module.css'

export function ChallangeBox() {
    const hasActiveChallange = true;

    return (
        <div className={styles.challangeBoxContainer}>
            { hasActiveChallange ? (
                <div className={styles.challangeActive}>
                    <header>Ganhe 400 xp</header>

                    <main>
                        <img src="icons/body.svg" alt="Body" />
                        <strong>Novo desafio</strong>
                        <p>Levante e faça uma caminhada de 3 minutos.</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challangeFailedButton}>
                            Falhei
                                    </button>

                        <button
                            type="button"
                            className={styles.challangeSucceededButton}>
                            Completei
                                    </button>
                    </footer>
                </div>
            ) :
                (
                    <div className={styles.challangeNotActive}>
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