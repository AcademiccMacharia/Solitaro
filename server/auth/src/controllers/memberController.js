const config = require('../config/appConfig');
const mssql = require('mssql');
const { newMemberValidator } = require('../validators/newMemberValidator');
const bcrypt = require('bcrypt');
const {sendWelcomeMail} = require('../utils/sendWelcomeMail');
const GetUserByEmail = require('../utils/getUser');

module.exports = {
  registerMember: async (req, res) => {
    try {
      let member = req.body;
      let hashedpwd = await bcrypt.hash(member.Password, 8);
      let { value } = newMemberValidator(member)
      const sql = await mssql.connect(config);
      if (sql.connected) {
        let results = await sql.request()
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
      let member = await request.query('SELECT * FROM social.users WHERE email = @email');
      if (member.recordset.length > 0) {
        let passwordMatch = await bcrypt.compare(password, member.recordset[0].Password);
        if (passwordMatch) {
          req.session.member_id = member.recordset[0].id;
          res.json({
            success: true,
            message: "Member logged in successfully",
            data: {
              session_id: req.sessionID, 
              member_id: member.recordset[0].id,
              member_name: member.recordset[0].name
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
      req.session.member_id = null;
      req.session.destroy();
      res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
