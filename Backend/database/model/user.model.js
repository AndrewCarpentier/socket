const connection = require("../index");

class User {
  constructor() {
    this.id = 0;
    this.email = null;
    this.pseudo = null;
    this.password = null;
    this.connected = null;
    this.channelList = null;
    this.privateChannelList = null;
  }

  get getUserWithoutPassword() {
    return {
      id: this.id,
      email: this.email,
      pseudo: this.pseudo,
      connected: this.connected,
      channelList: this.channelList,
      privateChannelList: this.privateChannelList,
    };
  }

  add(email, pseudo, img, password) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO user (email, pseudo, img, password) VALUES (?,?,?,?)",
          [email, pseudo,img, password],
          (err, result) => {
            if (err) throw err;
            this.id = result.insertId;
            resolve(result.affectedRows === 1);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE id = ?",
          [id],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              this.id = result[0].id;
              this.pseudo = result[0].pseudo;
              this.email = result[0].email;
              this.img = result[0].img;
              this.password = result[0].password;
              this.connected = result[0].idSocket != "";
            } else {
              this.id = 0;
              resolve({ id: 0 });
            }
          }
        );
        connection.query(
          "SELECT c.* FROM channel c INNER JOIN user_channel uc ON uc.idChannel = c.id WHERE uc.idUser = ?",
          [id],
          (err, result) => {
            if (err) throw err;
            this.channelList = result;
          }
        );
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? OR idUser2 = ?",
          [id, id],
          (err, result) => {
            if (err) throw err; 
            this.privateChannelList = result;
            resolve(this);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getUserByIdStatic(id) {
    const user = new User();
    return new Promise((resolve, reject) => {
      try {
        resolve(user.getUserById(id));
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getUsersByChannelId(idChannel) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT u.id, u.pseudo, u.email, u.idSocket FROM user_channel uc INNER JOIN user u ON u.id = uc.idUser WHERE uc.idChannel = ?",
          [idChannel],
          async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              await Promise.all(
                result.map(async (e) => {
                  e.connected = e.idSocket != "";
                  delete e.idSocket;
                  return e;
                })
              );
            }
            resolve(result);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  static getUsersByPrivateChannelId(idChannel) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT u.id, u.pseudo, u.email, u.idSocket FROM private_channel pc INNER JOIN user u ON u.id = pc.idUser OR u.id = pc.idUser2 WHERE pc.id = ?",
          [idChannel],
          async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              await Promise.all(
                result.map(async (e) => {
                  e.connected = e.idSocket != "";
                  delete e.idSocket;
                  return e;
                })
              );
            }
            resolve(result);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  getUserByMail(email) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              this.id = result[0].id;
              this.pseudo = result[0].pseudo;
              this.email = result[0].email;
              this.password = result[0].password;
              this.connected = result[0].idSocket != "";
            } else {
              this.id = 0;
              resolve({ id: 0 });
            }
          }
        );
        connection.query(
          "SELECT c.* FROM channel c INNER JOIN user_channel uc ON uc.idChannel = c.id INNER JOIN user u ON u.id = uc.idUser WHERE u.email = ?",
          [email],
          (err, result) => {
            if (err) throw err;
            this.channelList = result;
          }
        );
        connection.query(
          "SELECT * FROM private_channel WHERE idUser = ? OR idUser2 = ?",
          [this.id, this.id],
          (err, result) => {
            if (err) throw err;
            this.privateChannelList = result;
            resolve(this);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  connectedSocket(idSocket, idUser) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "UPDATE user SET idSocket = ? WHERE id = ?",
          [idSocket, idUser],
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

  disconnectedSocket(idUser) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "UPDATE user SET idSocket = '' WHERE id = ?",
          [idUser],
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

  verifyIfMailAlreadyExist(email) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
          (err, result) => {
            if (err) throw err;
            resolve(result.length > 0);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  verifyIfPseudoAlreadyExist(pseudo) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE pseudo = ?",
          [pseudo],
          (err, result) => {
            if (err) throw err;
            resolve(result.length > 0);
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }
}

module.exports = User;
