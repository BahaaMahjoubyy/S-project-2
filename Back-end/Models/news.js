const connection=require('../database/index.js')


const getAll=(callback)=>{
    const query='SELECT * FROM news'
    connection.query(query,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}

const getOne=(id,callback)=>{
    const query='SELECT FROM news WHERE id=?'
    connection.query(query,[id],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const create=(newsData,callback)=>{
    const{title,image,description,date}=newsData
    const query='INSERT INTO news SET ?'
    connection.query(query,newsData,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const remove=(newsId,callback)=>{
    const query='DELETE FROM news WHERE id=?'
    connection.query(query,newsId,(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const update=(newsId,newsData,callback)=>{
    const {title,image,description,date}=newsData
    const query= 'UPDATE  news SET  title=?,image=?,description=?,date=?  WHERE id= ? '
    connection.query(query,[title,image,description,date,newsId],(err,result)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,result)
        }
    })
}
const searchByTitle = (searchTerm, callback) => {
    const query = 'SELECT * FROM news WHERE title LIKE ?';
    const searchValue = `%${searchTerm}%`; // To search for titles containing the searchTerm
    connection.query(query, [searchValue], (err, result) => {
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
    create,
    remove,
    update,
    searchByTitle
}