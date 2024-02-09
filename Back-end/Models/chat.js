
const connection=require('../database/index.js')

const getAll=(callback)=>{
    const query='SELECT * FROM chat'
    connection.query(query,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}

const getOne = (userName, callback) => {
    const query = 'SELECT * FROM chat WHERE userName=?'; 
    connection.query(query, [userName], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};


const remove=(userName,callback)=>{
    const query='DELETE FROM chat WHERE userName=?'
    connection.query(query,userName,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const update = (userName, chatData, callback) => {
    const query = 'UPDATE chat SET userName=?, msg=? WHERE userName=?';
    const values = [chatData.userName, chatData.msg, userName];

    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

const create = (chatData, callback) => {
    const { userName, msg } = chatData;
    const query = 'INSERT INTO chat SET ?';

    const values = {
        userName: userName,
        msg: msg,
    };

    connection.query(query, values, (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};



module.exports={
    getAll,
    getOne,
    remove,
    update,
    create
}