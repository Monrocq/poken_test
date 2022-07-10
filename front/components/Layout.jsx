import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

function Layout({children, title}) {
  const { data: session } = useSession()
  return (
    <div className="container">
      <Head>
        <title>PokenTube</title>
        <meta name="description" content="A collecton of videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/"><a>Poken<span>Tube</span></a></Link>
        </h1>

        {session && (
          <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
        ) || <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>}
        

        <h3 className={styles.description}>
          {title}
        </h3>

        {children}
        
      </main>

      <footer className={styles.footer}>
        Développé par{' '}
        <a href="https://linkedin.com/in/monrocq">
          Adel MALIK-MONROCQ
        </a>
        <br/>
        Conçu par{' '}
        <a href="https://thepokencompany.com">
          The Poken Company
        </a>
      </footer>
      
    </div>
  )
}

export default Layout
