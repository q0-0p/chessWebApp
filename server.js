'use strict';
const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect('mongodb://localhost:27017/chessDB')
app.use(express.static('public'));


var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));

var chess = {};

var white_player_start = true;



//black pieces
var black_bishop = "<img class='chesspiece' alt=\"Black Bishop\" id=\"bbishop\" src=\"img/bbishop.png\">";
var black_king = "<img class='chesspiece'  alt=\"Black King\" id=\"bking\" src=\"img/bking.png\">";
var black_knight = "<img class='chesspiece' alt=\"Black Knight\" id=\"bknight\" src=\"img/bknight.png\">";
var black_pawn = "<img class='chesspiece' alt=\"Black Pawn\" id=\"bpawn\" src=\"img/bpawn.png\">";
var black_queen = "<img class='chesspiece' alt=\"Black Queen\" id=\"bqueen\" src=\"img/bqueen.png\">";
var black_rook = "<img class='chesspiece' alt=\"Black Rook\" id=\"brook\" src=\"img/brook.png\">";

//white pieces
var white_bishop = "<img class='chesspiece' alt=\"White Bishop\" id=\"wbishop\" src=\"img/wbishop.png\">";
var white_king = "<img class='chesspiece' alt=\"White King\" id=\"wking\" src=\"img/wking.png\">";
var white_knight = "<img class='chesspiece' alt=\"White Knight\" id=\"wknight\" src=\"img/wknight.png\">";
var white_pawn = "<img class='chesspiece' alt=\"White Pawn\" id=\"wpawn\" src=\"img/wpawn.png\">";
var white_queen = "<img class='chesspiece' alt=\"White Queen\" id=\"wqueen\" src=\"img/wqueen.png\">";
var white_rook = "<img class='chesspiece' alt=\"White Rook\" id=\"wrook\" src=\"img/wrook.png\">";

function startGame(white_player_start) {

    for (var i = 0; i < 8; i++) {
        chess[i] = {};
    }

    //white start game
    if (white_player_start) {
        for (var i = 0; i < 8; i++) {//white pawns
            chess[6][i] = white_pawn;
        }
        for (var i = 0; i < 8; i++) {//black pawns
            chess[1][i] = black_pawn;
        }
        //white pieces
        chess[7][0] = white_rook;
        chess[7][1] = white_knight;
        chess[7][2] = white_bishop;
        chess[7][3] = white_queen;
        chess[7][4] = white_king;
        chess[7][5] = white_bishop;
        chess[7][6] = white_knight;
        chess[7][7] = white_rook;

        //black pieces
        chess[0][0] = black_rook;
        chess[0][1] = black_knight;
        chess[0][2] = black_bishop;
        chess[0][3] = black_queen;
        chess[0][4] = black_king;
        chess[0][5] = black_bishop;
        chess[0][6] = black_knight;
        chess[0][7] = black_rook;
    }
    else { //black start game
        for (var i = 0; i < 8; i++) {//white pawns
            chess[6][i] = black_pawn;
        }
        for (var i = 0; i < 8; i++) {//black pawns
            chess[1][i] = white_pawn;
        }
        //white pieces
        chess[0][0] = white_rook;
        chess[0][1] = white_knight;
        chess[0][2] = white_bishop;
        chess[0][3] = white_king;
        chess[0][4] = white_queen;
        chess[0][5] = white_bishop;
        chess[0][6] = white_knight;
        chess[0][7] = white_rook;

        //black pieces
        chess[7][0] = black_rook;
        chess[7][1] = black_knight;
        chess[7][2] = black_bishop;
        chess[7][3] = black_king;
        chess[7][4] = black_queen;
        chess[7][5] = black_bishop;
        chess[7][6] = black_knight;
        chess[7][7] = black_rook;

    }
}


var chesstable;

function table() {
    chesstable = "<!DOCTYPE html>\n<html><head><link rel='stylesheet' type='text/css' href='client.css' /></head>\n<body>\n<table>";
    for (var i = 0; i < 8; i++) {
        chesstable += "<tr>"
        for (var j = 0; j < 8; j++) {
            var tdchessclass = "brown";
            if ((i + j) % 2 == 0)
                tdchessclass = "white";

            chesstable += "<td class='squarepiece " + tdchessclass + "' data-x='"+i+"' data-y='"+j+"' >";
            if (chess[i] != undefined && white_player_start) {
                if (chess[i][j] != undefined) {
                    chesstable += chess[i][j];
                }
               
            }
            
            chesstable += "</td>";

        }
        chesstable += "</tr>\n";
    }

    chesstable += "</table>\n <p>Clicked: <span id='clickedSpan'></span></p><button type=\"button\" id=\"white_player\" onclick =\"whiteStart()\">White Start!</button><button type=\"button\" id=\"black_player\" onclick =\"blackStart()\">Black Start!</button> \n<script src='https://code.jquery.com/jquery-3.2.1.min.js' type='text/javascript'></script>\n<script src='client.js' type='text/javascript'></script>\n</body></html>";
    return chesstable;

}

startGame();


app.get('/', function (req, res) {
    res.send(table());
})

app.get('/', function (req, res) {
    res.send(table());
})

app.get('/chess', function (req, res) {
    chess[0][0] = 'X';
    res.send(table());
})
app.get('/reset', function (req, res) {
    var startColor = req.query["start"];
    if (startColor == "black") {
        startGame(false);
    }
    else {
        startGame(true);
    }
    
    res.send();
})
app.get('/move', function (req, res) {
    //Here data changes happens.
    //So I want to move a piece
    var xFrom = req.query["fromX"];
    var yFrom = req.query["fromY"];

    if (xFrom < 8) {    
        chess[xFrom][yFrom] = 'X';
        res.send(true);
    }
    else {
        res.send(false);
    }

})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

