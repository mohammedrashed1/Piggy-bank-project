const router = require("express").Router()
const Wallet = require("../models/Wallet")

router.get('/',async(req,res)=>{
    const user = req.session.user
    res.render('homepage.ejs',)}
    )
module.exports = router;
