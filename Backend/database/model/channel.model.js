const connection = require('../index');

class Channel{
    constructor(){

    }

    static addUserInChannel(idUser, idChannel){
        return new Promise((resolve,reject)=>{
            try {
                connection.query('INSERT INTO user_channel (idUser, idChannel) VALUES (?,?)', [idUser, idChannel], (err, result)=>{
                    if(err) throw err;
                    resolve(result.affectedRows === 1);
                })
            } catch (error) {
                reject("API error");
            }
        })
    }
}

module.exports = Channel;