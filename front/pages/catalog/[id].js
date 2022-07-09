import Layout from "../../components/Layout";
import {getVideo, getVideosLength} from "../../lib/catalog.helper"
import {BACK_URL} from "../../lib/constants";
import styles from '../../styles/Catalog.module.css'
import timestampToDate from 'timestamp-to-date';

export default function Video({video}) {
  console.log(video)
  return (
    <Layout title={video.title}>
      <div className={styles.content}>
        <video controls>
          <source src={BACK_URL+video.video} type="video/mp4"/>
          Désolé mais votre navigateur n'est pas adapté
        </video>
        <div class={styles.metadata}>
          <div>
            <em>Creator : <strong>{video.creator}</strong></em><br/>
            <em>Created at : {timestampToDate(video.creator_at, 'yyyy-MM-dd HH:mm:ss')}</em>
          </div>
          <strong>Views : {video.views}</strong>
        </div>
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