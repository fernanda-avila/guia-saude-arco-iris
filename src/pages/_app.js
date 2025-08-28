import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Guia de Saúde Arco-Íris - Apoio LGBT+</title>
        <meta name="description" content="Saúde mental e bem-estar para a comunidade LGBTQIA+" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp