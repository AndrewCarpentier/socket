const connection = require("../index");

class Channel {
  constructor() {
    this.id = null;
    this.name = null;
    this.users = [];
    this.privateMessage = null;
  }

  static addChannel(name, idUser) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO channel (name, idUser) VALUES (?, ?)",
          [name, idUser],
          (err, result) => {
            if (err) throw err;
            const idChannel = result.insertId;
            if(result.affectedRows === 1){
              connection.query("INSERT INTO user_channel (idUser, idChannel) VALUES (?,?)", [idUser, idChannel], (err, result)=>{
                if(err) throw err;
                resolve(result.affectedRows === 1);
              })
            }else{
              resolve(false);
            }
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  static addPrivateChannel(idUser, idUser2) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO private_channel (idUser, idUser2) VALUES (?,?)",
          [idUser, idUser2],
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

  static verifyChannelExist(name){
    return new Promise((resolve,reject)=>{
      try {
        connection.query("SELECT * FROM channel", (err, result)=>{
          if(err) throw err;
          if(result.length > 0){
            result.forEach(e => {
              if(e.name.toLowerCase() === name.toLowerCase()){
                resolve(true);
              }
            });
            resolve(false);
          }else{
            resolve(false);
          }
        })
      } catch (error) {
        reject("API error")
      }
    })
  }

  static verifyPrivateMessageChannelExist(idUser, idUser2) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? AND idUser2 = ?",
          [idUser, idUser2],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              resolve(true);
            }
          }
        );
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? AND idUser2 = ?",
          [idUser2, idUser],
          (err, result) => {
            if (err) throw err;
            resolve(result.length > 0)
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
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
            this.privateMessage = false;
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
        connection.query(
          "SELECT c.* FROM channel c INNER JOIN user_channel uc ON uc.idChannel = c.id WHERE uc.idUser = ?",
          [idUser],
          async(err, result) => {
            if (err) throw err;
            if(result.length > 0){
              await Promise.all(
                result.map(async (e)=> {
                  e.privateMessage = false;
                  return e;
                })
              )
            }
            resolve(result);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  getPrivateChannel(idUser, idUser2) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? and idUser2 = ?",
          [idUser, idUser2],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              this.id = result[0].id;
              this.privateMessage = true;
            }
          }
        );
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? and idUser2 = ?",
          [idUser2, idUser],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              this.id = result[0].id;
              this.privateMessage = true;
              resolve(result[0]);
            } else {
              resolve([]);
            }
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getChannels(){
    return new Promise((resolve, reject)=>{
      try {
        connection.query("SELECT * FROM channel", (err, result)=>{
          if(err) throw err;
          resolve(result);
        })
      } catch (error) {
        reject('API error')
      }
    })
  }

  static joinChannel(idUser, idChannel){
    return new Promise((resolve, reject)=>{
      try {
        connection.query("INSERT INTO user_channel (idUser, idChannel) VALUES (?,?)", [idUser, idChannel], (err, result)=>{
          if(err) throw err;
          resolve(result.affectedRows === 1);
        })
      } catch (error) {
        reject("API error");
      }
    })
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
