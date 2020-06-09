// dama in posizione iniziale. 
// 0=posizione vuota
// 1= pedine nere
// 2= pedine bianche
let positionTable = [[0, 1, 0, 1, 0, 1, 0, 1], 
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 2, 0, 2, 0, 2, 0, 2], 
                    [2, 0, 2, 0, 2, 0, 2, 0],
                    [0, 2, 0, 2, 0, 2, 0, 2]];
let positionDama = [["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
                    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
                    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
                    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
                    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
                    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
                    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
                    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"]];
let positionRow = 0;
let positionCol = 0;
let imgTag = document.querySelectorAll("img");
//
// console.log(imgTag);
let tdTag = document.querySelectorAll("td");
//
// console.log(tdTag[1]);
//controlla il dragstart su tutto la scacchiera e recupera la posizione del drag
for(let i in positionDama){
    for(let idStart of positionDama[i]){
        document.getElementById(idStart).addEventListener("dragstart", function(){
            //cerco la posizione della casella cliccata nell'array positionDama
            for(countx in positionDama){
                for(county in positionDama){
                    //trovata la posizione stocco la posizione in due variabili separate
                    if(idStart == positionDama[countx][county]){
                        positionRow = parseInt(countx);
                        positionCol = parseInt(county);
                    }
                }
            }
            
            console.log("x" + positionRow);
            console.log("y" + positionCol);
        });
    }
    i = 0;
}
//controlla il drag mentre viene effettuato
document.addEventListener("drag", function(){
    console.log("drag in corso");
    //se la pedina è bianca row +1
    if (positionTable[positionRow][positionCol] == 1){
        document.getElementById(positionDama[positionRow + 1][positionCol + 1]).style.border = "2px solid green";
        document.getElementById(positionDama[positionRow + 1][positionCol - 1]).style.border = "2px solid green";
    }else if (positionTable[positionRow][positionCol] == 2){
        //se la pedina è nera row -1
        document.getElementById(positionDama[positionRow - 1][positionCol + 1]).style.border = "2px solid green";
        document.getElementById(positionDama[positionRow - 1][positionCol - 1]).style.border = "2px solid green";
    }    
}); 
//controlla il dragend su tutto la scacchiera e recupera la posizione del drag


document.addEventListener("dragend", function(){
    console.log("dragend");
    if (positionTable[positionRow][positionCol] == 1){
        document.getElementById(positionDama[positionRow + 1][positionCol + 1]).style.border = "none";
        document.getElementById(positionDama[positionRow + 1][positionCol - 1]).style.border = "none";
    }else if (positionTable[positionRow][positionCol] == 2){
        document.getElementById(positionDama[positionRow - 1][positionCol + 1]).style.border = "none";
        document.getElementById(positionDama[positionRow - 1][positionCol - 1]).style.border = "none";
    }  
});



