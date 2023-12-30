const SudokuController=require('express').Router();
const {Sudoku_RandomSolvableSudokuWithSolution}=require('./HelperFunctions/Sudoku/Sudoku_RandomSolvableSudokuWithSolution')

SudokuController.post('/findRandomSolvableSudokuWithSolution',async(req,res)=>{
    const difficulty=req.body.difficulty;
    try{
        const RandomSolvableSudokuWithSolution=await Sudoku_RandomSolvableSudokuWithSolution(difficulty);
        console.log(RandomSolvableSudokuWithSolution);
        res.json(RandomSolvableSudokuWithSolution);
    }catch(e){
        res.json({error:e});
    }
});
module.exports=SudokuController;