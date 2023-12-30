const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    DOT_AND_BOXES_total_games_played: {
        type: Number,
        required: true,
    },
    DOT_AND_BOXES_won: {
        type: Number,
        required: true
    },
    DOT_AND_BOXES_win_percentage: {
        type: Number,
        required: true
    },
    SUDOKU_total_games_played: {
        type: Number,
        required: true,
    },
    SUDOKU_won: {
        type: Number,
        required: true
    },
    SUDOKU_win_percentage: {
        type: Number,
        required: true
    },
    SUDOKU_best_time: {
        type: Number,
        required:true
    },
    TIC_TAC_TOE_total_games_played: {
        type: Number,
        required: true,
    },
    TIC_TAC_TOE_won: {
        type: Number,
        required: true
    },
    TIC_TAC_TOE_draw: {
        type: Number,
        required: true
    },
    TIC_TAC_TOE_win_percentage: {
        type: Number,
        required: true
    },
    TIC_TAC_TOE_draw_percentage: {
        type: Number,
        required: true
    },
},{timestamps: true})

module.exports=mongoose.model("User",UserSchema);