import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getVideos } from '../lib/catalog.helper'
import {BACK_URL} from '../lib/constants'
import {useState} from 'react'

export default function Home({videos}) {
  const [videoSelected, setVideoSelected] = useState('video0')
  const [delayHandler, setDelayHandler] = useState(null)
  const handleMouseEnter = event => {
    setDelayHandler(setTimeout(() => {
      setVideoSelected(event.target.id)
    }, 1000))
  }
  const handleMouseLeave = () => {
    clearTimeout(delayHandler)
    setVideoSelected('video0')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>PokenTube</title>
        <meta name="description" content="A collecton of videos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>Poken<span>Tube</span></a>
        </h1>

        <h3 className={styles.description}>
          Catalogue de vidéos
        </h3>

        <div className={styles.grid}>
          {videos.map(video => (
            <a className={styles.card} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id={video.title}>
              <img src={BACK_URL + (videoSelected ===  video.title ? video.extract : video.thumbnail) } alt=""/>
              <h2>{video.title}</h2>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const videos = await getVideos();
  return {
    props: {
      videos
    }
  }
}