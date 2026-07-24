import { getFeed, createPost, likePost, unLikePost } from "../services/post.api"
import { useContext, useEffect } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {

    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([ data.post, ...feed ])
        setLoading(false)
    }

    const handleLike = async (postId) => {
    await likePost(postId)

    setFeed(prevFeed =>
        prevFeed.map(post =>
            post._id === postId
                ? { ...post, isLiked: true }
                : post
        )
    )
}

const handleUnLike = async (postId) => {
    await unLikePost(postId)

    setFeed(prevFeed =>
        prevFeed.map(post =>
            post._id === postId
                ? { ...post, isLiked: false }
                : post
        )
    )
}

    

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnLike }

}