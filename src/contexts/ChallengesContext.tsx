//Contextos permitem que um componente converse com o outro
//É uma ponte entre eles

import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface ChallengesProviderProps {
    //Recebe como props o componente filho
    children: ReactNode;
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
}


export const ChallengesContext = createContext({} as ChallengesContextData);


//Aqui eu faço as funções que serão compartilhadas para os componentes
//Essa função é chamada la no _app.tsx -> Ver a explicação la pra entender
export function ChallengesProvider({ children }: ChallengesProviderProps) {

    //Gerenciamento de estado para os níveis dos desafios
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    //Cria um estado para  armazenar o desafio encontrado ao iniciar um novo desafio
    const [ativeChallenge, setAtiveChallenge] = useState(null);

    //Calculo para ir pro proximo nivel pbaseado em potencia
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);


    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        //Pegar um desafio aleatorio
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setAtiveChallenge(challenge);
    }

    function resetChallenge() {
        setAtiveChallenge(null);
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
            resetChallenge
        }}>
            { children}
        </ChallengesContext.Provider>
    );
}