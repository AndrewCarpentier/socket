const connection = require("../index");

class User {
  constructor() {
    (this.id = 0),
      (this.email = null),
      (this.pseudo = null),
      (this.password = null);
  }

  get getUserWithoutPassword() {
    return { id: this.id, email: this.email, pseudo: this.pseudo };
  }

  add(email, pseudo, password) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "INSERT INTO user (email, pseudo, password) VALUES (?,?,?)",
          [email, pseudo, password],
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
              this.password = result[0].password;
              resolve({
                id: this.id,
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
              });
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
              resolve({
                id: this.id,
                pseudo: this.pseudo,
                email: this.email,
                password: this.password,
              });
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

  verifyIfMailAlreadyExist(email) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE email = ?",
          [email],
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

  verifyIfPseudoAlreadyExist(pseudo) {
    return new Promise((resolve, reject) => {
      try {
        connection.query(
          "SELECT * FROM user WHERE pseudo = ?",
          [pseudo],
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
