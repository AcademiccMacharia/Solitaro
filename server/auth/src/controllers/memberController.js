const config = require('../config/appConfig');
const mssql = require('mssql');
const { newMemberValidator } = require('../validators/newMemberValidator');
const bcrypt = require('bcrypt');
const { sendWelcomeMail } = require('../utils/sendWelcomeMail');
const { app } = require('../../server');

module.exports = {

  registerMember: async (req, res) => {
    try {
      const { pool } = req;
      let member = req.body;
      let hashedpwd = await bcrypt.hash(member.password, 8);
      let { value } = newMemberValidator(member);
      if (pool && pool.connected) {
        let results = await pool.request()
          .input("full_name", value.full_name)
          .input("username", value.username)
          .input("email", value.email)
          .input("password", hashedpwd)
          .input("dob", value.dob)
          .input("gender", value.gender)
          .input("country", value.country)
          .execute('social.InsertUser');
        console.log(results);
        try {
          await sendWelcomeMail(member.email);
        } catch (error) {
          console.log(error);
        }
        res.json({
          success: true,
          message: "Member registered successfully",
          data: results.recordsets[0]
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  loginMember: async (req, res) => {
    const { email, password } = req.body;
    const { pool } = req;
    try {
      const request = pool.request();
      request.input('email', mssql.VarChar, email);
      const result = await request.query('SELECT id, username, Password FROM social.users WHERE email = @email');
      const member = result.recordset[0];

      if (member) {
        const passwordMatch = await bcrypt.compare(password, member.Password);
        if (passwordMatch) {
          req.session.member_id = member.id;
          req.session.authorized = true;
          req.session.member = email;
          res.json({
            success: true,
            message: "Member logged in successfully",
            data: {
              session_id: req.sessionID,
              member_id: member.id,
              member_name: member.username
            }
          });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(404).json({ message: "You are not registered!" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getFollowedPosts: async (req, res) => {
    try {
      const pool = req.pool;
      const userId = req.session?.member_id;

      const request = await pool.request()
                      .input('userId', userId)
                      .execute('social.GetFollowedUsersPostsData');

      console.log(request);
      const followedPosts = request.recordset;
      const formattedPosts = followedPosts.map((post) => {
        const comments = post.comments ? JSON.parse(post.comments) : [];
        return {
          post_id: post.post_id,
          user_id: post.user_id,
          full_name: post.full_name,
          username: post.username,
          dp_url: post.dp_url,
          post_content: post.post_content,
          post_image_url: post.post_image_url,
          post_video_url: post.post_video_url,
          post_created_at: post.post_created_at,
          post_likes_count: post.post_likes_count,
          total_comments_count: post.total_comments_count,
          comments,
        };
      });
  
      res.json({
        success: true,
        data: formattedPosts,
      });
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  changePassword: async (req, res) => {
    try {
      const { pool } = req;
      const { currentPassword, newPassword } = req.body;
      const userId = req.session?.member_id;
  
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required.',
        });
      }
  
      if (pool.connected) {
        let passwords_match = await bcrypt.compare(
          currentPassword,
          req.session?.member.Password
        );
        let newPassword_hashed = await bcrypt.hash(newPassword, 8);
        if (passwords_match) {
          const result = await pool.request()
            .input('userId', userId)
            .input('NewPassword', newPassword_hashed)
            .execute('ChangePassword');
          console.log(result);
  
          if (result.rowsAffected[0] > 0) {
            res.json({
              success: true,
              message: 'Successfully changed your password',
            });
          } else {
            res.status(500).send('Failed to change password');
          }
        } else {
          res.status(401).send('Wrong password');
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  },
  editProfile: async (req, res) => {
    const userId = req.session?.member_id;
    const { bio, dpUrl } = req.body;
    const { pool } = req;

    try {
      const request = await pool.request()
        .input('userId', mssql.UniqueIdentifier, userId)
        .input('bio', mssql.VarChar(500), bio)
        .input('dpUrl', mssql.VarChar(255), dpUrl)
        .execute('social.EditProfile');

      console.log(request)
      //condition
      if (request.rowsAffected[0] === 0) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, message: 'Profile updated successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  //get a member profile
  getMemberProfile: async (req, res) => {
    const userId = req.session?.member_id;
    const { pool } = req;
    try {
      const request = await pool.request()
        .input('userId', mssql.UniqueIdentifier, userId)
        .execute('social.GetMemberProfile');
      const member = request.recordset[0];
      if (member) {
        res.json({ success: true, data: member });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  getMemberProfileById: async (req, res) => {
    const {userId} = req.params;
    const { pool } = req;
    try {
      const request = await pool.request()
        .input('userId', mssql.UniqueIdentifier, userId)
        .execute('social.GetMemberProfile');
      const member = request.recordset[0];
      if (member) {
        res.json({ success: true, data: member });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  //get all member details
  getAUser: async (req, res) => {
    const userId = req.session?.member_id;
    const pool = req.pool;

    try {
      const request = await pool
        .request()
        .input('userId', mssql.UniqueIdentifier, userId)
        .execute('social.GetAUser');

      const profile = request.recordsets[0][0];
      const posts = request.recordsets[1];
      const comments = request.recordsets[2];
      const replies = request.recordsets[3];

      if (!profile) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({
        success: true,
        data: {
          profile: {
            user_id: profile.user_id,
            full_name: profile.full_name,
            username: profile.username,
            gender: profile.gender,
            bio: profile.bio,
            dp_url: profile.dp_url,
            followers_count: profile.followers_count,
            following_count: profile.following_count,
            posts_count: profile.posts_count,
          },
          posts: posts.map((post) => ({
            post_id: post.post_id,
            user_id: post.user_id,
            content: post.content,
            image_url: post.image_url,
            video_url: post.video_url,
            created_at: post.created_at,
          })),
          comments: comments.map((comment) => ({
            comment_id: comment.comment_id,
            user_id: comment.user_id,
            post_id: comment.post_id,
            content: comment.content,
            created_at: comment.created_at,
          })),
          replies: replies.map((reply) => ({
            reply_id: reply.reply_id,
            user_id: reply.user_id,
            comment_id: reply.comment_id,
            content: reply.content,
            created_at: reply.created_at,
          })),
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  getAUserById: async (req, res) => {
    const {userId} = req.params;
    const pool = req.pool;

    try {
      const request = await pool
        .request()
        .input('userId', mssql.UniqueIdentifier, userId)
        .execute('social.GetAUser');

      const profile = request.recordsets[0][0];
      const posts = request.recordsets[1];
      const comments = request.recordsets[2];
      const replies = request.recordsets[3];

      if (!profile) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({
        success: true,
        data: {
          profile: {
            user_id: profile.user_id,
            full_name: profile.full_name,
            username: profile.username,
            gender: profile.gender,
            bio: profile.bio,
            dp_url: profile.dp_url,
            followers_count: profile.followers_count,
            following_count: profile.following_count,
            posts_count: profile.posts_count,
          },
          posts: posts.map((post) => ({
            post_id: post.post_id,
            user_id: post.user_id,
            content: post.content,
            image_url: post.image_url,
            video_url: post.video_url,
            created_at: post.created_at,
          })),
          comments: comments.map((comment) => ({
            comment_id: comment.comment_id,
            user_id: comment.user_id,
            post_id: comment.post_id,
            content: comment.content,
            created_at: comment.created_at,
          })),
          replies: replies.map((reply) => ({
            reply_id: reply.reply_id,
            user_id: reply.user_id,
            comment_id: reply.comment_id,
            content: reply.content,
            created_at: reply.created_at,
          })),
        },
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const sql = await mssql.connect(config);
      const request = sql.request();
      request.input('userId', mssql.UniqueIdentifier, userId);

      const result = await request.query('EXEC social.DeleteUser @userId');
      const success = result.recordset[0].Success;
      console.log(result)
      if (success === 1) {
        res.json({ success: true, message: 'User deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  logoutMember: async (req, res) => {
    console.log(req.session)

    req.session.destroy((err) => {
      if (err) {
        res.send("Error logging out");
      } else {
        res.send("Logged out successfully");
      }
    })
  }
};
