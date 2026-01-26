const router = require("express").Router();
const Wallet = require("../models/Wallet");
const Transfer = require("../models/Transfer")

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
    const userTransfer = await Transfer.findOne({sender: foundWallet.number} || {recevierWallet: foundWallet.number})
    res.render("wallet/my-wallet.ejs",{foundWallet: foundWallet,userTransfer: userTransfer})
    
})

router.get("/delete",async (req,res) => {
    const foundWallet = await Wallet.findOne({ owner: req.session.user._id });
    const deletedWallet = await Wallet.findByIdAndDelete(foundWallet._id)
    res.redirect("/")
    
})

router.get("/edit",async(req,res) => {
    const foundWallet = await Wallet.findOne({ owner: req.session.user._id });
    res.render("wallet/edit-wallet.ejs",{foundWallet: foundWallet})
    
})

router.post("/edit",async(req,res)=>{
    const foundWallet = await Wallet.findOne({ owner: req.session.user._id });
    foundWallet.balance = req.body.balance
    foundWallet.goal = req.body.goal
    foundWallet.save()
    res.redirect("/wallet")

})


module.exports = router;
