import '../styles/global.css'

// Aqui se coloca todos os componentes que são fixos, que estão
// em todas as paginas do app, como sidebar, navbar...
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
