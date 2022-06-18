import Layout from "../../components/Layout";
import {getVideo, getVideosLength} from "../../lib/catalog.helper"
import {BACK_URL} from "../../lib/constants";
import styles from '../../styles/Catalog.module.css'

export default function Video({video}) {
  return (
    <Layout title={video.title}>
      <div className={styles.content}>
        <video controls>
          <source src={BACK_URL+video.video} type="video/mp4"/>
          Désolé mais votre navigateur n'est pas adapté
        </video>
        <p className={styles.description}>{video.description}</p>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const video = await getVideo(params.id);
  return {
    props: {
      video
    }
  }
}

export async function getStaticPaths() {
  const count = await getVideosLength();
  let paths = [];
  for (let i = 1; i <= parseInt(count); i++) {
    paths.push({
      params: {
        id: i.toString()
      }
    })
  }
  return { 
    paths,
    fallback: false
  }
}