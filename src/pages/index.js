import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Minha Página com Next.js</title>
        <meta name="description" content="Exemplo em JavaScript puro com Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="centerIt">
        <p>Acesse localhost:port/cotacao para a página ser exibida. Fiquei com preguiça de adicionar qualquer coisa aqui.</p>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyvAQu57cDeHp2H6h0sPokbJgJVKb8YeSeg&s" alt="galinha pintadinha" />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
