const router = require('express').Router();
const Message = require('../../database/model/message.model');

router.get('/all', async(req,res)=>{
    const message = new Message();
    res.json(await message.getAll());
});

module.exports = router;