const router = require('express').Router();
const Message = require('../../database/model/message.model');

router.get('/all', async(req,res)=>{
    const message = new Message();
    res.json(await message.getAll());
});

router.get('/getMessagesByIdChannel/:idChannel', async(req,res)=>{
    const {idChannel} = req.params;
    res.json(await Message.getMessageByIdChannel(idChannel))
})

module.exports = router;