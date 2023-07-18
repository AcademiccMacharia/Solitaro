const SinglePostDetails = ({ post }) => {
    // You can access the post data here and render it in a detailed view
    return (
      <div className='single-post-details'>
        <p>{post.content}</p>
      </div>
    );
  };

    export default SinglePostDetails;
  