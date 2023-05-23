const connection = require("../index");

class User {
  constructor(email, pseudo, password) {
    (this.id = 0),
      (this.email = email),
      (this.pseudo = pseudo),
      (this.password = password);
  }

  get getUserWithoutPassword() {
    return { id: this.id, email: this.email, pseudo: this.pseudo };
  }

  add() {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO user (email, pseudo, password) VALUES (?,?,?)",
          [this.email, this.pseudo, this.password],
          (err, result) => {
            if (err) throw err;
            this.id = result.insertId;
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

  getUserByMail() {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [this.email],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
              this.id = result[0].id;
              this.pseudo = result[0].pseudo;
              this.password = result[0].password;
              resolve({ result });
            } else {
              this.id = 0;
              resolve({ id: 0 });
            }
          }
        );
      } catch (error) {
        reject("API error");
      }
    });
  }

  verifyIfMailAlreadyExist() {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [this.email],
          (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
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

module.exports = User;
