import Document, { Html, Head, Main, NextScript } from 'next/document';

// Esse arquivo serve para adicionar coisas ao HTML global da aplicação
// Aqui coloca os links de fontes globais por exemplo
//Resumindo: aqui vai tudo que é estatico, que é aproveitado em todas as rotas

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="favicon.png" type="image/png" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}