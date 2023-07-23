import React, { useState, useEffect } from 'react';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc'
import { CiShare2 } from 'react-icons/ci';
import SinglePostDetails from '../homepage/SinglePost';
import axios from 'axios';
import placeholder2 from '../../assets/placeholder2.png';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [viewingSinglePost, setViewingSinglePost] = useState(false);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setViewingSinglePost(true);
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/followingposts', { withCredentials: true });
            console.log(response)
            if (response.data.success) {
                setPosts(response.data.data);
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (!posts) {
        return <div>Loading...</div>;
    }
    return (
        <div className='feed-container'>
            {viewingSinglePost ? (
                <SinglePostDetails post={selectedPost} />
            ) : (
                posts.map((post) => {
                    const imageUrls = post.post_image_url ? post.post_image_url.split(',') : [];
                    const videoUrls = post.post_video_url ? post.post_video_url.split(',') : [];

                    return (
                        <div
                            key={post.post_id}
                            className='post-container'
                            onClick={() => handlePostClick(post)}
                        >
                            <div>
                                <div className='post-header'>
                                    <div className='profile-image'>
                                        <img src={post.dp_url ? post.dp_url : placeholder2} alt='man' />
                                    </div>
                                    <div className='post-info'>
                                        <div className='post-info-top'>
                                            <h3>{post.full_name}</h3>
                                            <p>@{post.username}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='post-content'>
                                    <p>{post.post_content}</p>
                                    <div className='post-media-container'>
                                        {imageUrls.length > 0 && (
                                            imageUrls.map((imageUrl, index) => (
                                                <img key={index} src={imageUrl} alt={`post_image_${index}`} />
                                            ))
                                        )}
                                        {videoUrls.length > 0 && (
                                            videoUrls.map((videoUrl, index) => (
                                                <video key={index} controls>
                                                    <source src={videoUrl} type='video/mp4' />
                                                </video>
                                            ))
                                        )}
                                    </div>
                                    <div className='post-media-count'>
                                        {(imageUrls.length + videoUrls.length) > 0 && (
                                            <div className='media-count'>
                                                {imageUrls.length + videoUrls.length} {(imageUrls.length + videoUrls.length) > 1 ? 'media' : 'medium'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='post-stats'>
                                    <div className='post-stat'>
                                        <FcLikePlaceholder size={20} />
                                        <p>{post.post_likes_count}</p>
                                    </div>
                                    <div className='post-stat'>
                                        <GoComment size={20} />
                                        <p>{post.total_comments_count}</p>
                                    </div>
                                    <div className='post-stat'>
                                        <CiShare2 size={20} />
                                        <p>{post.total_shares_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Feed