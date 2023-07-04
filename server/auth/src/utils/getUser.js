const mssql = require('mssql');
const {config} = require('../config/appConfig');


async function GetUserByEmail(email) {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let result = await sql
        .request()
        .input("email", email)
        .execute("social.GetUserByEmail");

      return result.recordset[0];
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};


module.exports = GetUserByEmail;
