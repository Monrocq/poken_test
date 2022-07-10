import Layout from "../../components/Layout";
import {checkDislike, checkLike, dislikeVideo, getVideo, getVideosLength, likeVideo, cancelLike, cancelDislike, commentVideo} from "../../lib/catalog.helper"
import {BACK_URL} from "../../lib/constants";
import styles from '../../styles/Catalog.module.css'
import timestampToDate from 'timestamp-to-date';
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react"

export default function Video({video}) {
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likes, setLikes] = useState(video.like)
  const [dislikes, setDislikes] = useState(video.dislike)
  const [comments, setComments] = useState(video.comments)
  const [comment, setComment] = useState("")
  useEffect(() => {
    setLoading(true)
    getSession().then((data) => {
      init(data.user)
    })
  }, [])
  async function init(user) {
    setLiked(await checkLike(video.id, user.name))
    setDisliked(await checkDislike(video.id, user.name))
    setLoading(false)
  }
  async function handleLike() {
    if (!loading) {
      setLoading(true)
      getSession().then(async data => {
        let result;
        if (liked) {
          result = await cancelLike(video.id, data.user.name)
        } else {
          result = await likeVideo(video.id, data.user.name)
        }
        setLiked(!liked)
        setLikes(result)
        setLoading(false)
      })
    }
  }
  async function handleDislike() {
    if (!loading) {
      setLoading(true)
      getSession().then(async data => {
        let result;
        if (disliked) {
          result = await cancelDislike(video.id, data.user.name)
        } else {
          result = await dislikeVideo(video.id, data.user.name)
        }
        setDisliked(!disliked)
        setDislikes(result)
        setLoading(false)
      })
    }
  }
  function postComment(event) {
    event.preventDefault()
    if (!loading) {
      setLoading(true)
      getSession().then(async data => {
        const result = await commentVideo(video.id, data.user.name, comment);
        setComments(result);
        setLoading(false)
        console.log(result)
      })
    }
  }
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
              <img src={liked ? "/icons/liked.png" : "/icons/like.png"} alt="thumb to up" width="25" onClick={handleLike}/>
              <b className={styles.vote_item}>{likes}</b>
              <div className={styles.divider}></div>
              <img src={disliked ? "/icons/disliked.png" : "/icons/dislike.png"} alt="thumb to up" width="25" onClick={handleDislike}/>
              <b className={styles.vote_item}>{dislikes}</b>
            </div>
          </div>
        </div>
        <p className={styles.description}>{video.description}</p>
        <h4>Commentaires</h4>
        <form className={styles.form}>
          <textarea name="comment" id="comment" cols="30" rows="10" onChange={event => setComment(event.target.value)}></textarea>
          <button onClick={postComment}>Send</button>
        </form>
        {comments.map((comment, index) => (
          <div className={styles.comment} key={index}>
            <div className={styles.comments}>
              <h5>{comment.user} said :</h5>
              <h5>{timestampToDate(comment.date, 'yyyy-MM-dd HH:mm:ss')}</h5>
            </div>
            {comment.text}
          </div>
        )).reverse()}
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params}) {
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