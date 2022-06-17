import {useState, useEffect} from 'react'
import { animated, useTransition } from "react-spring";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getVideos } from '../lib/catalog.helper'
import {BACK_URL} from '../lib/constants'
import Loading from '../components/Loading';
import { SpinnerCircular } from 'spinners-react';


export default function Home(props) {
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState(props.videos)
  const [videoSelected, setVideoSelected] = useState('video0')
  const [listEnded, setListEnded] = useState(false)
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
  const handleScroll = async () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (!listEnded && bottom && !loading) {
      setLoading(true)
      const newFetch = await getVideos(videos.length + 1, videos.length + 6)
      if (newFetch.length === 0) setListEnded(true)
      setVideos([...videos, ...newFetch])
      setLoading(false)
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading])
  return (
    <div className={styles.container} onScroll={handleScroll}>
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
              <div className="image">
                <img src={
                  BACK_URL + (videoSelected ===  video.title ? video.extract : video.thumbnail) 
                  } alt="" className={videoSelected === video.title ? styles.fadeImg : ""}/>
                  <div className="background"></div>
              </div>
              <h2>{video.title}</h2>
            </a>
          ))}
        </div>
        {loading && <SpinnerCircular color="#0000FF"/>}
        {listEnded && "Fin de la liste"}
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

export async function getServerSideProps() {
  const videos = await getVideos();
  return {
    props: {
      videos
    }
  }
}