const router=require('express').Router()

const controller=require('../Controllers/news.js')

router.get('/getAll',controller.getAllNews)
router.get('/getOne/:id',controller.getOneNews)
router.post('/add',controller.createNews)
router.delete('/delete/:id',controller.deleteNews)
router.put('/update/:id',controller.updateNews)
router.get('/search', controller.searchNewsByTitle);
module.exports=router