//Contextos permitem que um componente converse com o outro
//É uma ponte entre eles

import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    //Recebe como props o componente filho
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number
}

//Tipagem do arquivo Json que contem os desafios
interface Challenge {
    //Esse campo só tem dois valores, não preciso usar string
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//Tipagem dos tipos de dados e funções que esse contexto retorna la no final
interface ChallengesContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    ativeChallenge: Challenge
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}


export const ChallengesContext = createContext({} as ChallengesContextData);


//Aqui eu faço as funções que serão compartilhadas para os componentes
//Essa função é chamada la no _app.tsx -> Ver a explicação la pra entender
export function ChallengesProvider({
    children,
    ...rest //Pega o resto dos parametros que nao sejam o children
}: ChallengesProviderProps) {

    //Gerenciamento de estado para os níveis dos desafios
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    //Cria um estado para  armazenar o desafio encontrado ao iniciar um novo desafio
    const [ativeChallenge, setAtiveChallenge] = useState(null);

    //Cria um estado para abrir e fechar a modal de nivel
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    //Calculo para ir pro proximo nivel pbaseado em potencia
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    //Criar um efeito colateral quando determinada coisa acontece
    //Quando o parametro é um array vazio, esse useEffect é executado só uma vez 
    //quando o componente é iniciado
    useEffect(() => {
        //Pedir permissão para mandar notificações
        Notification.requestPermission();
    }, [])


    //Sempre que houver uma mudança nas variaveis decladradas no vetor abaixo
    //Eu salvo os dados dela nos cookies do navegador (yarn add js-cookie)
    //Tem implementação pra ler os dados dele no index.tsx (getServerSideProps)
    useEffect(() => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', currentExperience.toString());
        Cookies.set('challengesCompleted', challengesCompleted.toString());
    }, [level, currentExperience, challengesCompleted])


    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }


    function startNewChallenge() {
        //Pegar um desafio aleatorio
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setAtiveChallenge(challenge);

        //Como está na pasta publica, ele ja entende que é a raiz do projeto
        new Audio('/notification.mp3').play();

        //Exibir uma notificação
        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🥳', {
                body: `Valendo ${challenge.amount}xp!!`
            })
        }
    }

    function resetChallenge() {
        setAtiveChallenge(null);
    }

    function completeChallenge() {

        if (!ativeChallenge) {
            return;
        }

        const { amount } = ativeChallenge;

        let finalExperience = currentExperience + amount;

        //Se ele ultrapassou o nivel, subo ele de nivel e jogo o resto como nivel atual
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setAtiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return (
        //Aqui eu informo quais variaveis e funções vou disponibilizar no contexto
        <ChallengesContext.Provider value={{
            level,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            ativeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal
        }}>
            { children}

            {/* Mostra o popup quando a variavel abaixo é true */}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}