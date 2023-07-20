import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <h2>{user.full_name}</h2>
      <p>@{user.username}</p>
      <img src={user.dp_url} alt={user.username} />
      {/* Add other profile details here */}
    </div>
  );
};

export default UserProfile;
