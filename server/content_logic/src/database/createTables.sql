CREATE TABLE social.posts (
  id uniqueidentifier DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  content VARCHAR(500) NOT NULL,
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE social.comment (
  id uniqueidentifier DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE CASCADE NOT NULL,
  post_id uniqueidentifier REFERENCES social.posts(id) ON DELETE CASCADE NOT NULL,
  content VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE social.reply (
  id uniqueidentifier DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  comment_id uniqueidentifier REFERENCES social.comment(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  content VARCHAR(500) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE social.ReplyLikes (
  reply_like_id uniqueidentifier DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE NO ACTION NOT NULL,
  reply_id uniqueidentifier REFERENCES social.reply(id) ON DELETE NO ACTION CASCADE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_replylike_relationship UNIQUE (user_id, reply_id)
);
GO

CREATE TABLE social.CommentLikes (
  comment_like_id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE NO ACTION NOT NULL,
  comment_id uniqueidentifier REFERENCES social.comment(id) ON DELETE NO ACTION NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_like_relationship UNIQUE (user_id, comment_id)
);
GO

CREATE TABLE social.PostLikes (
  post_like_id uniqueidentifier DEFAULT NEWID() PRIMARY KEY NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE NO ACTION NOT NULL,
  post_id uniqueidentifier REFERENCES social.posts(id) ON DELETE NO ACTION NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_postlike_relationship UNIQUE (user_id, post_id)
);
GO

CREATE TABLE social.Notifications (
  notification_id INTEGER PRIMARY KEY IDENTITY(1,1) NOT NULL,
  user_id uniqueidentifier REFERENCES social.users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  notification_type VARCHAR(20) NOT NULL,
  description VARCHAR(100) NOT NULL,
  IsRead BIT DEFAULT 0 NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
GO

CREATE TABLE social.follow (
  following_user_id  uniqueidentifier REFERENCES social.users(id) ON DELETE NO ACTION NOT NULL,
  followed_user_id uniqueidentifier REFERENCES social.users(id) ON DELETE NO ACTION NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT check_different_users CHECK (following_user_id <> followed_user_id),
  
  CONSTRAINT unique_follow_relationship UNIQUE (following_user_id, followed_user_id)
);
GO