const router = require('express').Router();
const Channel = require('../../database/model/channel.model');
const User = require('../../database/model/user.model');

router.get('/getChannelById/:id', async(req, res)=>{
    const {id} = req.params;
    const channel = new Channel();
    await channel.getChannelInformationById(id);
    channel.users = await User.getUsersByChannelId(id);
    res.json(channel);
});

router.get('/getChannelsByIdUser/:idUser', async(req, res)=>{
    const {idUser} = req.params;
    const channels = await Channel.getChannelsByIdUser(idUser);
    res.json(channels);
})

module.exports = router;