import '../styles/global.css'

// Aqui se coloca todos os componentes que são fixos, que estão
// em todas as paginas do app, como sidebar, navbar...

import { ChallengesProvider } from '../contexts/ChallengesContext';


function MyApp({ Component, pageProps }) {
  return (

    //O app é um componente geral da aplicação
    //O contexto coloco em volta da aplicação, ou seja, toda aplicação vai ter acesso no contexto
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  );
}

export default MyApp
