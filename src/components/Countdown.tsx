import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';


export function Countdown() {

    //Instancia o contexto do Countdown pra poder se comunicar  com o componente
    //Aqui eu passo a função ou variavel que quero usar
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);


    //Quebra cada caractere no array pelo split e joga 0 esquerda se não tiver 2
    //Ai joga os dois valores nas  variaveis
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>


            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) :
                (
                    <div>
                        {

                            isActive ?
                                (
                                    <button
                                        type="button"
                                        className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                        onClick={resetCountdown}>
                                        Abandonar ciclo
                                    </button>
                                )
                                :
                                (
                                    <button
                                        type="button"
                                        className={styles.countdownButton}
                                        onClick={startCountdown}>
                                        Iniciar um ciclo
                                    </button>
                                )
                        }
                    </div>

                )}

        </div>
    )
}