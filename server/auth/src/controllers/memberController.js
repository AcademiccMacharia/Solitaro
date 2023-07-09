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
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
  loginMember: async (req, res) => {
    const { email, password } = req.body;
    try {
      const sql = await mssql.connect(config);
      const request = sql.request();
      request.input('email', mssql.VarChar, email);
      const result = await request.query('SELECT id, username, Password FROM social.users WHERE email = @email');
      const member = result.recordset[0];

      if (member) {
        const passwordMatch = await bcrypt.compare(password, member.Password);
        if (passwordMatch) {
          req.session.member_id = member.id;
          req.session.authorized = true;
          req.session.member_name = member.username;
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

  logoutMember: async (req, res) => {
    try {
      if (req.session.member_id && req.session.member_id === req.params.id) {
        req.session.member_id = null;
        req.session.authorized = false;
        req.session.member_name = null;
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
            res.status(500).json({ error: "Internal server error" });
          } else {
            res.json({ success: true, message: "Logged out successfully" });
          }
        });
      } else {
        res.json({ success: false, message: "User is not logged in" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
