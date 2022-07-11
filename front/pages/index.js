import {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getVideos, searchVideos } from '../lib/catalog.helper'
import {BACK_URL} from '../lib/constants'
import { SpinnerCircular } from 'spinners-react';
import Link from 'next/link'
import Layout from '../components/Layout'
import { useSession } from "next-auth/react"


export default function Home(props) {
  const [loading, setLoading] = useState(false)
  const [videos, setVideos] = useState(props.videos)
  const [videoSelected, setVideoSelected] = useState('video0')
  const [listEnded, setListEnded] = useState(false)
  const [delayHandler, setDelayHandler] = useState(null)
  const { data: session } = useSession()
  const handleMouseEnter = event => {
    setDelayHandler(setTimeout(() => {
      session && setVideoSelected(event.target.id)
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
  const onInputChange = async event => {
    setLoading(true)
    setListEnded(false)
    const keyword = event.target.value
    if (keyword.length > 0) {
      const searchFetch = await searchVideos(keyword)
      setVideos(searchFetch)
      if (searchFetch.length === 0) setListEnded(true)
    } else {
      location.reload()
    }
    setLoading(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading])
  return (
    <Layout onScroll={handleScroll} title="Catalogue de vidéos">
      <Head>
        <title>PokenTube - Catalogue</title>
      </Head>
      <div className={styles.search_box}>
        <input type="text" className={styles.input} name="" id="" placeholder="Rechercher..." onChange={onInputChange} />
        <i>Indiquez le numéro d'une vidéo</i>
      </div>
      <div className={styles.grid}>
          {videos.map(video => (
            <Link href={`/catalog/${video.id}`} key={video.id}>
              <a className={styles.card} id={video.title} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className={!session && styles.blur}>
                  <img src={
                    BACK_URL + (videoSelected ===  video.title ? video.extract : video.thumbnail) 
                    } alt={video.title} className={videoSelected === video.title ? styles.fadeImg : ""}/>
                    <div className="background"></div>
                </div>
                <h2>{video.title}</h2>
              </a>
            </Link>
          ))}
        </div>
        {loading && <SpinnerCircular color="#0000FF"/>}
        {listEnded && "Fin de la liste"}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const videos = await getVideos();
  return {
    props: {
      videos
    }
  }
}