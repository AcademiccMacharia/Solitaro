const config = require('../config/appConfig');
const mssql = require('mssql');
const { newMemberValidator } = require('../validators/newMemberValidator');
const bcrypt = require('bcrypt');
const { sendWelcomeMail } = require('../utils/sendWelcomeMail');
const { app } = require('../../server');

module.exports = {
  
  registerMember: async (req, res) => {
    try {
        const {pool} = req;
      let member = req.body;
      let hashedpwd = await bcrypt.hash(member.Password, 8);
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
    const {pool} = req;
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
    const userId = req.session?.member_id;
    const {pool} = req;
    try {
      const request = await pool.request()
      .input('userId', userId)
      .execute('social.GetFollowedPosts');

      console.log(request)
      const posts = request.recordset;
      console.log(posts);
      if (posts.length === 0) {
        return res.status(404).json({ success: false, message: 'No posts found' });
      } else {
        return res.json({ success: true, data: posts });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  },
  changePassword: async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    try {
      const sql = await mssql.connect(config);
      const request = sql.request();
      request.input('userId', mssql.UniqueIdentifier, userId);
      request.input('currentPassword', mssql.NVarChar(100), currentPassword);
      request.input('newPassword', mssql.NVarChar(100), newPassword);
      
      const result = await request.query('EXEC social.ChangePassword @userId, @currentPassword, @newPassword');
      const success = result.recordset[0].Success;

      if (success) {
        res.json({ success: true, message: 'Password changed successfully' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid current password' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
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
