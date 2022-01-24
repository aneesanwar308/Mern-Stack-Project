const express = require("express");
const { json } = require("express/lib/response");
const router = express();
const User = require("../model/user_model")
const { validatedUser, validation } = require("../validation/userValidation")

router.post("/addnewuser", validatedUser(validation), async (req, res) => {
    console.log(req.body)
    const existedMail = await User.findOne({ email: req.body.email })
    if (existedMail) {
        res.status(409).json({ status: 409, message: "Email is already existed" })
    } else {
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            cell_no: req.body.cell_no,
            isDeleted: "false",
            created_at: new Date().toLocaleDateString()
        })
        let addUser = await newUser.save()
        res.status(200).send({ status: 200, addUser })
    }
})

router.get("/getusers", async (req, res) => {
    console.log(req.query)
    const { userId } = req.query
    let searchedQuery = userId;
    if (userId != undefined) {
        searchedQuery = JSON.parse(userId)
    }
    let selectedUser = await User.find(searchedQuery)
    let allUsers = await User.find()
    res.status(200).send({ selectedUser, allUsers })
})


module.exports = router