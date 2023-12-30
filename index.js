const express=require('express');
const cors=require('cors');
const Connection =require("./config/db")
require("dotenv").config();

const DotAndBoxesController=require('./controllers/DotAndBoxesController');
const SudokuController=require('./controllers/SudokuController');
const TicTacToeController=require('./controllers/TicTacToeController');
const authController=require('./controllers/authController');
const gameStatsController=require('./controllers/gameStatsController');

const app=express();

Connection();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/auth',authController);
app.use('/gameStats',gameStatsController);
app.use('/DotAndBoxes',DotAndBoxesController);
app.use('/Sudoku',SudokuController);
app.use('/TicTacToe',TicTacToeController);

const port=3000;
app.listen(port,()=>{
    console.log(`Backend is running on port ${port}`);
})

