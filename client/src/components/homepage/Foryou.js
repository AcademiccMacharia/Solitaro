import React, { useState, useEffect } from 'react';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc';
import { CiShare2 } from 'react-icons/ci';
import axios from 'axios';
import placeholder2 from '../../assets/placeholder2.png';
import UserProfile from './UserProfile';

const Foryou = () => {
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCommentInputs, setShowCommentInputs] = useState({});
  const [postComments, setPostComments] = useState({});
  const [postCommentInputs, setPostCommentInputs] = useState({});
  const [postReplyInputs, setPostReplyInputs] = useState({});
  const [showCommentReplies, setShowCommentReplies] = useState({});

  const handleUserImageClick = (user) => {
    setSelectedUser(user);
  };

  const handlePostClick = async (post_id) => {
    setShowCommentInputs((prevInputs) => ({
      ...prevInputs,
      [post_id]: !prevInputs[post_id],
    }));

    if (!showCommentInputs[post_id]) {
      try {
        const response = await axios.get(`http://localhost:5051/postdetails/${post_id}`, {
          withCredentials: true,
        });
        console.log(response.data.data[0].comments);
        if (response.data.success) {
          setPostComments((prevComments) => ({
            ...prevComments,
            [post_id]: response.data.data[0].comments,
          }));
        } else {
          setPostComments((prevComments) => ({
            ...prevComments,
            [post_id]: [],
          }));
        }
      } catch (error) {
        console.error('Error:', error);
        setPostComments((prevComments) => ({
          ...prevComments,
          [post_id]: [],
        }));
      }
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5051/posts', { withCredentials: true });
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

  const handleCommentInputChange = (e, post_id) => {
    setPostCommentInputs((prevInputs) => ({
      ...prevInputs,
      [post_id]: e.target.value,
    }));
  };

  const handleCommentSubmit = async (post_id) => {
    const commentText = postCommentInputs[post_id];
    const data = {
      post_id: post_id,
      content: commentText,
    };
    try {
      await axios.post(
        `http://localhost:5051/comments`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      handlePostClick(post_id);
      fetchPosts();
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleReplyInputChange = (e, comment_id) => {
    setPostReplyInputs((prevInputs) => ({
      ...prevInputs,
      [comment_id]: e.target.value,
    }));
  };

  const handleReplySubmit  = async(comment_id) => {
    const replyText = postReplyInputs[comment_id];
    const data = {
      comment_id: comment_id,
      content: replyText,
    };
    try {
      const response = await axios.post(
        `http://localhost:5051/reply`,
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      fetchPosts();
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const handleToggleCommentReplies = (commentId) => {
    setShowCommentReplies((prevReplies) => ({
      ...prevReplies,
      [commentId]: !prevReplies[commentId],
    }));
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
          <div key={post.post_id} className='post-container'>
            <div>
              <div className='post-header'>
                <div className='profile-image'>
                  <img
                    src={post.user_dp_url ? post.user_dp_url : placeholder2}
                    alt='man'
                    onClick={() => handleUserImageClick(post)}
                  />
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
                      {imageUrls.length + videoUrls.length} {imageUrls.length + videoUrls.length > 1 ? 'media' : 'medium'}
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
                  <GoComment onClick={() => handlePostClick(post.post_id)} size={20} />
                  <p>{post.total_comments_count}</p>
                </div>
                <div className='post-stat'>
                  <CiShare2 size={20} />
                  <p>{post.total_shares_count}</p>
                </div>
              </div>
              {postComments[post.post_id] && showCommentInputs[post.post_id] && (
                <div className='comments-container'>
                  {postComments[post.post_id].map((comment) => (
                    <div key={comment.CommentId} className='comment-body'>
                      <div className='comment'>
                        <img src={comment.CommentUserDpUrl ? comment.CommentUserDpUrl : placeholder2} alt='comment' />
                        <div className='comment-content'>
                          <h3>{comment.CommentUserFullName}</h3>
                          <p>{comment.CommentContent}</p>
                          <h6 onClick={() => handleToggleCommentReplies(comment.CommentId)}>Replies</h6>
                        </div>
                      </div>
                      {showCommentReplies[comment.CommentId] && (
                        <div className='replies-container'>
                          {comment.replies &&
                            comment.replies.map((reply) => (
                              <div key={reply.ReplyId} className='reply'>
                                <img src={reply.ReplyUserDpUrl ? reply.ReplyUserDpUrl : placeholder2} alt='reply' />
                                <div className='reply-content'>
                                  <h3>{reply.ReplyUserFullName}</h3>
                                  <p>{reply.ReplyContent}</p>
                                </div>
                              </div>
                            ))}
                          <div className='reply-input'>
                            <input
                              type='text'
                              value={postReplyInputs[comment.CommentId] || ''}
                              onChange={(e) => handleReplyInputChange(e, comment.CommentId)}
                              placeholder='Write a reply...'
                            />
                            <button onClick={() => handleReplySubmit(comment.CommentId)}>Reply</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {showCommentInputs[post.post_id] && (
                <div className='comment-input'>
                  <input
                    type='text'
                    value={postCommentInputs[post.post_id] || ''}
                    onChange={(e) => handleCommentInputChange(e, post.post_id)}
                    placeholder='Write a comment...'
                  />
                  <button onClick={() => handleCommentSubmit(post.post_id)}>Submit</button>
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
