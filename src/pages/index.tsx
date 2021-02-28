
import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';


interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export default function Home(props: HomeProps) {

  return (

    //Coloco o ChallengesProvider em volta da aplicação, assim todo o app consegue usa-lo
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ ChallengesProvider>
  );
}


//Essa função é usada para obtermos os cookies com os dados salvos
//Deve ter obrigatoriamente esse nome pra funcionar no next
//Essa função roda no servidor Node do  Next, e não no browser
//Ela fica aqui para poder ser usada em todos os componentes 
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //Obter os cookies
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    //Os cookies salvam em string, aqui converte pra numero
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}