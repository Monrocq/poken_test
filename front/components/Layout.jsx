import React from 'react'
import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Link from 'next/link'

function Layout({children, title}) {
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
