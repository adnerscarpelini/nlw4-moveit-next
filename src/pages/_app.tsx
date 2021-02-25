import '../styles/global.css'

// Aqui se coloca todos os componentes que são fixos, que estão
// em todas as paginas do app, como sidebar, navbar...

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';


function MyApp({ Component, pageProps }) {
  return (

    //O app é um componente geral da aplicação
    //O contexto coloco em volta da aplicação, ou seja, toda aplicação vai ter acesso no contexto
    //Aqui tem que pensar como uma arvore de hierarquia. Exemplo:
    //O Countdown depende do Challanges, então o Challanges tem que ficar acima dele na arvore
    <ChallengesProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengesProvider>
  );
}

export default MyApp
