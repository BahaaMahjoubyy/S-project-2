const router=require('express').Router()

const controller=require('../Controllers/chat.js')
router.get('/getAll',controller.getAllChat)
router.get('/getOne/:userName',controller.getOneChat)

router.delete('/delete/:userName',controller.deleteChat)
router.put('/update/:userName',controller.updateChat)

router.post('/add',controller.createChat)

module.exports=router