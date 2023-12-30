const DotAndBoxesController=require('express').Router();
const {DotAndBoxes_FindOptimalMove}=require('./HelperFunctions/DotAndBoxes/DotAndBoxes_FindOptimalMove');

DotAndBoxesController.post('/findOptimalMove',(req,res)=>{
  const vertLineMatrix=req.body.vertLineMatrix;
  const horiLineMatrix=req.body.horiLineMatrix;
  const difficulty=req.body.difficulty;
  try{
    const findOptimalMove=DotAndBoxes_FindOptimalMove(horiLineMatrix,vertLineMatrix,difficulty);
    res.json({result:findOptimalMove});
  }catch(e){
    res.json({error:e});
  }
});


module.exports=DotAndBoxesController;