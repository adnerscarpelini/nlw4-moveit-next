import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    //Inicia o estado em 25 minutos (1500 segundos)
    //O primeiro parâmetro é a variavel a ser atualizada, e o segundo a função que o atualiza
    const [time, setTime] = useState(0.1 * 60);

    //Estado para armazenar se o countdown está ativo ou parado
    const [isActive, setIsActive] = useState(false);

    //Esatado para saber se finalizou o contdown
    const [hasFinished, setHasFinished] = useState(false);

    //Arredonda pra baixo
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; //Joga o resto de cima

    //Quebra cada caractere no array pelo split e joga 0 esquerda se não tiver 2
    //Ai joga os dois valores nas  variaveis
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);

    }

    //O useEffect (efeito colateral) executa uma função sempre que algum valor mudar
    //Então sempre que o valor da variavel "isActive" e da "time": mudar executo uma função para diminuir o countdown
    useEffect(() => {

        if (isActive && time > 0) {
            //A cada um segundo rodo uma função
            countdownTimeout = setTimeout(() => {

                setTime(time - 1);
            }, 1000)
        }
        else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
        }

    }, [isActive, time])

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