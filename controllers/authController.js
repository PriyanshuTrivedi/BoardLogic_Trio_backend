const authController = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const path = require('path');

require("dotenv").config();

authController.post('/register', async (req, res) => {
  try {

      console.log(req.body);

      const isExisting = await User.findOne({ email: req.body.email })
  
      if (isExisting) {
        return res.status(200).json({msg:"Email is already taken by another user"});
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const initialFill={
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
        DOT_AND_BOXES_total_games_played:0,
        DOT_AND_BOXES_won:0,
        DOT_AND_BOXES_win_percentage:0,
        SUDOKU_total_games_played:0,
        SUDOKU_won:0,
        SUDOKU_win_percentage:0,
        SUDOKU_best_time:36000,
        TIC_TAC_TOE_total_games_played:0,
        TIC_TAC_TOE_won:0,
        TIC_TAC_TOE_draw:0,
        TIC_TAC_TOE_win_percentage:0,
        TIC_TAC_TOE_draw_percentage:0,
      }

      const newUser = await User.create(initialFill);
  
      const { password, ...others } = newUser._doc;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '8d' });
  
      return res.status(201).json({ msg:"Registered Successfully!!" ,others, token });
    } catch (error) {
      console.log("Error while registering in catch block")
      return res.status(500).json(error.message);
    }
})

authController.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(200).json({msg:"Wrong credentials. Try again!!"});
      }

      const comparePass = await bcrypt.compare(req.body.password, user.password)
      if (!comparePass) {
        return res.status(200).json({msg:"Wrong credentials. Try again!!"});
      }

      const { password, ...others } = user._doc
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' })

      return res.status(200).json({msg:"Logged in successfully!!", others, token })
    } catch (error) {
      console.log("Error while logging in in catch block")
      return res.status(500).json(error.message)
    }
})

module.exports=authController