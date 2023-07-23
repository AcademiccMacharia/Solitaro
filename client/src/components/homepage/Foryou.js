import React, { useState, useEffect } from 'react';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc';
import { CiShare2 } from 'react-icons/ci';
import axios from 'axios';
import placeholder2 from '../../assets/placeholder2.png';
import UserProfile from './UserProfile';

const Foryou = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPostComments, setSelectedPostComments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserImageClick = (user) => {
        setSelectedUser(user);
    };


    const handlePostClick = async (postId) => {
        console.log(postId)
        try {
            const response = await axios.get(`http://localhost:5051/postdetails/${postId}`, {
                withCredentials: true,
            });
            console.log(response)
            if (response.data.success) {
                setSelectedPostComments(response.data.data.comments);
                console.log(response.data.data.comments)
            } else {
                setSelectedPostComments([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setSelectedPostComments([]);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5051/posts', { withCredentials: true });
            console.log(response);
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
            {selectedUser && <UserProfile user={selectedUser} />}
            {posts.map((post) => {
                const imageUrls = post.image_url ? post.image_url.split(',') : [];
                const videoUrls = post.video_url ? post.video_url.split(',') : [];

                return (
                    <div key={post.post_id} className='post-container' onClick={() => handlePostClick(post)}>
                        <div>
                            <div className='post-header'>
                                <div className='profile-image'>
                                    <img src={post.user_dp_url ? post.user_dp_url : placeholder2} alt='man' onClick={() => handleUserImageClick(post)} />
                                </div>
                                <div className='post-info'>
                                    <div className='post-info-top'>
                                        <h3>{post.user_full_name}</h3>
                                        <p>@{post.user_username}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='post-content'>
                                <p>{post.post_content}</p>
                                <div className='post-media-container'>
                                    {imageUrls.length > 0 &&
                                        imageUrls.map((imageUrl, index) => (
                                            <img key={index} src={imageUrl} alt={`post_image_${index}`} />
                                        ))}
                                    {videoUrls.length > 0 &&
                                        videoUrls.map((videoUrl, index) => (
                                            <video key={index} controls>
                                                <source src={videoUrl} type='video/mp4' />
                                            </video>
                                        ))}
                                </div>
                                <div className='post-media-count'>
                                    {imageUrls.length + videoUrls.length > 0 && (
                                        <div className='media-count'>
                                            {imageUrls.length + videoUrls.length}{' '}
                                            {imageUrls.length + videoUrls.length > 1 ? 'media' : 'medium'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='post-stats'>
                                <div className='post-stat'>
                                    <FcLikePlaceholder size={20} />
                                    <p>{post.post_likes_count}</p>
                                </div>
                                <div
                                    className='post-stat'
                                >
                                    <GoComment onClick={() => handlePostClick(post.post_id)} size={20} />
                                    <p>{post.total_comments_count}</p>
                                </div>
                                <div className='post-stat'>
                                    <CiShare2 size={20} />
                                    <p>{post.total_shares_count}</p>
                                </div>
                            </div>
                            {selectedPostComments && selectedPostComments.length > 0 && (
                                <div className='comments-container'>
                                    {selectedPostComments.map((comment) => (
                                        <div key={comment.CommentId} className='comment'>
                                            <p>{comment.CommentContent}</p>
                                            {comment.replies && comment.replies.length > 0 && (
                                                <div className='replies'>
                                                    {comment.replies.map((reply) => (
                                                        <div key={reply.ReplyId} className='reply'>
                                                            <p>{reply.ReplyContent}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Foryou;
