const router = require('express').Router();
const Message = require('../../database/model/message.model');

router.get('/all', async(req,res)=>{
    const message = new Message();
    res.json(await message.getAll());
});

router.get('/getMessagesByIdChannel/:idChannel', async(req,res)=>{
    const {private} = req.query;
    const {idChannel} = req.params;
    res.json(await Message.getMessageByIdChannel(idChannel, private))
})

module.exports = router;