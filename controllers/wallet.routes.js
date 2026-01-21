const router = require("express").Router();
const Wallet = require("../models/Wallet")

router.get("/create",async (req,res) => {
    const existingWallet = await Wallet.findOne({
    owner: req.session.user._id
  });

  if (existingWallet) {
    return res.redirect("/wallet");
  }
let number;
  let exists = true;

  while (exists) {
    number = Math.floor(Math.random() * 10000000)
    exists = await Wallet.exists({ number });
  }
    res.render("wallet/create-wallet.ejs",{number: number}) 
})

router.post("/create", async (req,res) => {
    try {
        req.body.owner = req.session.user._id
        const createdWallet = await Wallet.create(req.body)
    res.redirect("/wallet")
    } catch (error) {
        console.log("Error create wallet:", error)
    }
    
})

router.get("/",async(req,res)=>{
    const foundWallet = await Wallet.findOne({ owner: req.session.user._id });
    res.render("wallet/my-wallet.ejs",{foundWallet: foundWallet})
})


module.exports = router;
