const connection = require("../index");

class Channel {
  constructor() {
    this.id = null;
    this.name = null;
    this.users = [];
  }

  getChannelInformationById(id) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM channel WHERE id = ?",
          [id],
          (err, result) => {
            if (err) throw err;
            this.id = result[0].id;
            this.name = result[0].name;
            resolve(this);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getChannelsByIdUser(idUser) {
    return new Promise((resolve, reject) => {
      try {
        connection.query("SELECT c.* FROM channel c INNER JOIN user_channel uc ON uc.idChannel = c.id WHERE uc.idUser = ?", [idUser], (err, result)=>{
            if(err) throw err;
            resolve(result);
        })
      } catch (error) {
        reject("API error");
      }
    });
  }

  static addUserInChannel(idUser, idChannel) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO user_channel (idUser, idChannel) VALUES (?,?)",
          [idUser, idChannel],
          (err, result) => {
            if (err) throw err;
            resolve(result.affectedRows === 1);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }
}

module.exports = Channel;
