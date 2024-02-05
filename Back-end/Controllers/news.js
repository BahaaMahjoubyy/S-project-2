const news=require('../Models/news.js')

const getAllNews=(req,res)=>{
    news.getAll((err,result)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json(result)
        }
    })
}
const getOneNews=(req,res)=>{
    nameId=req.params.id
    news.getOne(nameId,(err,result)=>{
        if(err){
            res.status(400).send(err)
        }else{
            res.status(202).json(result)
        }
    })
}
const createNews=(req,res)=>{
    news.create(req.body,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).json(result)
        }
    })
}
const deleteNews = (req, res) => {
    news.remove(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send();
      }
    });
  }
  const updateNews = (req, res) => {
    news.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(404).send("News is not found");
      } else {
        res.status(200).send();
      }
    });
  }
  const searchNewsByTitle = (req, res) => {
    const searchTerm = req.query.title;
    if (!searchTerm) {
        return res.status(400).send("Title parameter is missing");
    }

    news.searchByTitle(searchTerm, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
};

  module.exports={
    getAllNews,
    getOneNews,
    createNews,
    deleteNews,
    updateNews,
    searchNewsByTitle,
  }