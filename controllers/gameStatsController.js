const gameStatsController=require('express').Router();
const verifyToken=require('../middlewares/verifyToken');
const  User= require('../models/User');

gameStatsController.post('/leaderboard',async(req,res)=>{
    try{
        const sortField = req.body.sortField;
        // const game=req.body.game;
        // const sortAccTo = req.body.sortAccTo;
        // const fieldsToSelect=['username'];
        // let sortField='';
        // switch (game.toLowerCase()) {
        //     case 'dot_and_boxes':
        //         sortField = `DOT_AND_BOXES_${sortAccTo}`;
        //         fieldsToSelect.push('DOT_AND_BOXES_total_games_played');
        //         fieldsToSelect.push('DOT_AND_BOXES_won');
        //         fieldsToSelect.push('DOT_AND_BOXES_win_percentage');
        //         break;
        //     case 'sudoku':
        //         sortField = `SUDOKU_${sortAccTo}`;
        //         fieldsToSelect.push('SUDOKU_total_games_played');
        //         fieldsToSelect.push('SUDOKU_won');
        //         fieldsToSelect.push('SUDOKU_win_percentage');
        //         fieldsToSelect.push('SUDOKU_best_time');
        //         break;
        //     case 'tic_tac_toe':
        //         sortField = `TIC_TAC_TOE_${sortAccTo}`;
        //         fieldsToSelect.push('TIC_TAC_TOE_total_games_played');
        //         fieldsToSelect.push('TIC_TAC_TOE_won');
        //         fieldsToSelect.push('TIC_TAC_TOE_win_percentage');
        //         break;
        //     default:
        //         return res.status(400).json({ error: 'Invalid game type' });
        // }

        const users = await User.find().sort({ [sortField]: -1 });

        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})


gameStatsController.put('/', verifyToken, async (req, res) => {
    try {
        const game = req.body.game;
        const gameResult = req.body.gameResult;

        const currStat=await User.findById(req.user.id);

        const updateFields={};

        switch (game.toLowerCase()) {
            case 'dot_and_boxes':
                updateFields.DOT_AND_BOXES_total_games_played = currStat.DOT_AND_BOXES_total_games_played+1;
                if (gameResult) {
                    updateFields.DOT_AND_BOXES_won = currStat.DOT_AND_BOXES_won+1;
                }
                updateFields.DOT_AND_BOXES_win_percentage=(currStat.DOT_AND_BOXES_won+(gameResult?1:0))/(currStat.DOT_AND_BOXES_total_games_played+1)*100;
                break;
            case 'sudoku':
                updateFields.SUDOKU_total_games_played = currStat.SUDOKU_total_games_played+1;
                if (gameResult) {
                    updateFields.SUDOKU_won = currStat.SUDOKU_won+1;
                    updateFields.SUDOKU_best_time= Math.min(currStat.SUDOKU_best_time,req.body.timeTaken);
                }
                updateFields.SUDOKU_win_percentage=(currStat.SUDOKU_won+(gameResult?1:0))/(currStat.SUDOKU_total_games_played+1)*100;
                break;
            case 'tic_tac_toe':
                updateFields.TIC_TAC_TOE_total_games_played = currStat.TIC_TAC_TOE_total_games_played+1;
                if (gameResult==='User') {
                    updateFields.TIC_TAC_TOE_won = currStat.TIC_TAC_TOE_won+1;
                }
                else if (gameResult==='Draw') {
                    updateFields.TIC_TAC_TOE_draw = currStat.TIC_TAC_TOE_draw+1;
                }
                updateFields.TIC_TAC_TOE_win_percentage=(currStat.TIC_TAC_TOE_won+(gameResult==='User'?1:0))/(currStat.TIC_TAC_TOE_total_games_played+1)*100;
                updateFields.TIC_TAC_TOE_draw_percentage=(currStat.TIC_TAC_TOE_draw+(gameResult==='Draw'?1:0))/(currStat.TIC_TAC_TOE_total_games_played+1)*100;
                break;
            default:
                return res.status(400).json({ error: 'Invalid game type' });
        }

        const updatedStat = await User.findByIdAndUpdate(
            req.user.id,
            updateFields,
            { new: true } // Return the updated document
        );

        return res.status(200).json(updatedStat);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

module.exports=gameStatsController;