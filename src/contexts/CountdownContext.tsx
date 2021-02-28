//Contextos permitem que um componente converse com o outro
//É uma ponte entre eles

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownProviderProps {
    //Recebe como props o componente filho
    children: ReactNode;
}


//Tipagem dos tipos de dados e funções que esse contexto retorna la no final
interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}


export const CountdownContext = createContext({} as CountdownContextData);


let countdownTimeout: NodeJS.Timeout;


//Aqui eu faço as funções que serão compartilhadas para os componentes
//Essa função é chamada la no _app.tsx -> Ver a explicação la pra entender
export function CountdownProvider({ children }: CountdownProviderProps) {


    //Instancia o contexto do Challenges pra poder se comunicar  com o componente
    //Aqui eu passo a função ou variavel que quero usar
    const { startNewChallenge } = useContext(ChallengesContext);

    //Inicia o estado em 25 minutos (1500 segundos)
    //O primeiro parâmetro é a variavel a ser atualizada, e o segundo a função que o atualiza
    const [time, setTime] = useState(25 * 60);

    //Estado para armazenar se o countdown está ativo ou parado
    const [isActive, setIsActive] = useState(false);

    //Esatado para saber se finalizou o contdown
    const [hasFinished, setHasFinished] = useState(false);

    //Arredonda pra baixo
    const minutes = Math.floor(time / 60);
    const seconds = time % 60; //Joga o resto de cima


    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(25 * 60);
        setHasFinished(false);

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
            startNewChallenge();
        }

    }, [isActive, time])


    return (
        //Aqui eu informo quais variaveis e funções vou disponibilizar no contexto
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            { children}
        </CountdownContext.Provider>
    );
}