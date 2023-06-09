const connection = require("../index");
const User = require("./user.model");

class Message {
  constructor() {
    (this.id = 0),
      (this.message = null),
      (this.creationDate = null),
      (this.gif = null);
    this.userId = 0;
    this.user = null;
  }

  getAll() {
    const user = new User();
    return new Promise((resolve, reject) => {
      try {
        connection.query("SELECT * FROM message", async (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            await Promise.all(
              result.map(async (e) => {
                e.user = await user.getUserById(e.idUser);
                delete e.idUser;
                return e;
              })
            );
          }
          resolve(result);
        });
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getMessageByIdChannel(idChannel){
    const user = new User();
    return new Promise((resolve, reject)=>{
      try {
        connection.query('SELECT * FROM message WHERE idChannel = ?', [idChannel], async(err, result)=>{
          if(err) throw err;
          if(result.length > 0){
            await Promise.all(
              result.map(async (e)=>{
                e.user = await user.getUserById(e.idUser);
                delete e.idUser;
                return e;
              })
            )
          }
          resolve(result);
        })
      } catch (error) {
        reject('Error api');
      }
    })
  }

  add(message, idUser, gif) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO message (message, creationDate, idUser, gif) VALUES (?,now(),?, ?)",
          [message, idUser, gif],
          (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 1) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }
}

module.exports = Message;
