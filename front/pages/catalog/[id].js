import Layout from "../../components/Layout";
import {getVideo, getVideosLength} from "../../lib/catalog.helper"
import {BACK_URL} from "../../lib/constants";
import styles from '../../styles/Catalog.module.css'
import timestampToDate from 'timestamp-to-date';

export default function Video({video, likes, dislikes}) {
  return (
    <Layout title={video.title}>
      <div className={styles.content}>
        <video controls>
          <source src={BACK_URL+video.video} type="video/mp4"/>
          Désolé mais votre navigateur n'est pas adapté
        </video>
        <div className={styles.metadata}>
          <div>
            <em>Creator : <strong>{video.creator}</strong></em><br/>
            <em>Created at : {timestampToDate(video.creator_at, 'yyyy-MM-dd HH:mm:ss')}</em>
          </div>
          <div className={styles.metadata_right}>
            <strong>Views : {video.views}</strong>
            <div className={styles.vote}>
              <img src="/icons/like.png" alt="thumb to up" width="25"/>
              <b className={styles.vote_item}>{video.like}</b>
              <div className={styles.divider}></div>
              <img src="/icons/dislike.png" alt="thumb to up" width="25"/>
              <b className={styles.vote_item}>{video.dislike}</b>
            </div>
          </div>
        </div>
        <p className={styles.description}>{video.description}</p>
        <h4>Commentaires</h4>
        {video.comments.map(comment => (
          <div>
            <div className={styles.comments}>
              <h5>{comment.user}</h5>
              <h5>{timestampToDate(comment.date)}</h5>
            </div>
            {comment.text}
          </div>
        ))}
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