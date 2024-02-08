const chat = require('../Models/chat.js')


const getAllChat=(req,res)=>{
    chat.getAll((err,result)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json(result)
        }
    })
}
const getOneChat=(req,res)=>{
    user=req.params.userName
    chat.getOne(user,(err,result)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(202).json(result)
        }
    })
}


const deleteChat = (req, res) => {
    chat.remove(req.params.userName, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send();
      }
    });
  }
  const updateChat = (req, res) => {
    chat.update(req.params.userName, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(404).send("chat is not found");
      } else {
        res.status(200).send();
      }
    });
  }

  module.exports={
    getAllChat,
    getOneChat,
    deleteChat ,
    updateChat
  }