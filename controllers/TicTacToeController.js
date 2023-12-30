const TicTackToeController=require('express').Router();
const {TicTacToe_FindMoveAccToDifficulty}=require('./HelperFunctions/TicTacToe/TicTacToe_FindMoveAccToDifficulty');

TicTackToeController.post('/findOptimalMove',(req,res)=>{
    const difficulty=req.body.difficulty;
    const board=req.body.board;
    try{
        const optimalMove=TicTacToe_FindMoveAccToDifficulty(difficulty,board);
        res.json({result:optimalMove});
    }catch(e){
        res.json({error:e});
    }
});
module.exports=TicTackToeController;