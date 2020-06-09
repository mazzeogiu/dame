$(function() {
    let table = $("table");
    let numberOfLine = 8;
    let numberOfRow = 8;
    let numberPieces = 24
    let config = [[".blackTable","blackPawn.png"], [".whiteTable","whitePawn.png"]];
    let currentClass = 0;
    // 0=posizione vuota
    // 1= pedine nere
    // 2= pedine bianche
    let letter = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let positionOfPawn =[[9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 
                        [9, 1, 0, 1, 0, 1, 0, 1, 0, 9], 
                        [9, 0, 1, 0, 1, 0, 1, 0, 1, 9],
                        [9, 1, 0, 1, 0, 1, 0, 1, 0, 9],
                        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9], 
                        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
                        [9, 0, 2, 0, 2, 0, 2, 0, 2, 9], 
                        [9, 2, 0, 2, 0, 2, 0, 2, 0, 9],
                        [9, 0, 2, 0, 2, 0, 2, 0, 2, 9],
                        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]];
    for(let i = 0; i < numberOfLine; i++){
        curentLine =  $('<tr>').attr("id", i)
        currentLineClass = i % 2 ? -1 : 1;
        currentClass = currentLineClass
        for(let y = 0; y < numberOfRow; y++){
            currentRow = $('<td>').attr("id", curentLine.attr("id") + "_" + y)
            index = currentClass > 0 ? currentClass : 0;
            console.log("e", currentClass)
            displayClass= config[index][0]
            currentRow.addClass(displayClass);

            currentRow.html("<img class=\"pawn black\" id=\"' + i + '_' + y + '\" src=\"image/"+config[index][1]+"\" alt=\"Black Pawn\"></img>")
            curentLine.append(currentRow);
            currentClass = currentClass * -1;
            
            
        }
        $("table").append(curentLine);
        
    }










            // if(i == 0 || i == 9){
            //     switch(y){
            //         case 0: 
            //             $(table[i]).append("<th></th>");
            //             break;
            //         case 1 : 
            //             $(table[i]).append("<th>A</th>");
            //             break;
            //         case 2 : 
            //             $(table[i]).append("<th>B</th>");
            //             break;
            //         case 3 : 
            //             $(table[i]).append("<th>C</th>");
            //             break;
            //         case 4 : 
            //             $(table[i]).append("<th>D</th>");
            //             break;
            //         case 5 : 
            //             $(table[i]).append("<th>E</th>");
            //             break;
            //         case 6 : 
            //             $(table[i]).append("<th>F</th>");
            //             break;
            //         case 7 : 
            //             $(table[i]).append("<th>G</th>");
            //             break;
            //         case 8 : 
            //             $(table[i]).append("<th>H</th>");
            //             break;
            //         case 9 : 
            //             $(table[i]).append("<th></th>");
            //             break;     
            //     }
            // }else if(y == 0 || y == 9){
            //     switch(i){
            //         case 0: 
            //             $(table[i]).append("<th></th>");
            //             break;
            //         case 1 : 
            //             $(table[i]).append("<th>8</th>");
            //             break;
            //         case 2 : 
            //             $(table[i]).append("<th>7</th>");
            //             break;
            //         case 3 : 
            //             $(table[i]).append("<th>6</th>");
            //             break;
            //         case 4 : 
            //             $(table[i]).append("<th>5</th>");
            //             break;
            //         case 5 : 
            //             $(table[i]).append("<th>4</th>");
            //             break;
            //         case 6 : 
            //             $(table[i]).append("<th>3</th>");
            //             break;
            //         case 7 : 
            //             $(table[i]).append("<th>2</th>");
            //             break;
            //         case 8 : 
            //             $(table[i]).append("<th>1</th>");
            //             break;
            //         case 9 : 
            //             $(table[i]).append("<th></th>");
            //             break;
                    
            //     }
            // }else{
            //     if(i % 2 != 0){
            //         if(y % 2 == 0){
            //             $(table[i]).append('<td class="whiteTable"></td>');
            //         }else{
            //             if(positionOfPawn[i][y] == 1){
            //                 $(table[i]).append('<td class="blackTable"><img class="pawn black" id="' + i + '_' + y + '" src="image/blackPawn.png" alt="Black Pawn"></td>');
            //             }else if(positionOfPawn[i][y] == 2){
            //                 $(table[i]).append('<td class="blackTable"><img class="pawn white" id="' + i + '_' + y + '" src="image/whitePawn.png" alt="White Pawn"></td>');
            //             }else{
            //                 $(table[i]).append('<td class="blackTable"></td>');
            //             }
            //         }
            //     }else {
            //         if(y % 2 != 0){
            //             $(table[i]).append('<td class="whiteTable"></td>');
            //         }else{
            //             if(positionOfPawn[i][y] == 1){
            //                 $(table[i]).append('<td class="blackTable"><img class="pawn black" id="' + i + '_' + y + '" src="image/blackPawn.png" alt="Black Pawn"></td>');
            //             }else if(positionOfPawn[i][y] == 2){
            //                 $(table[i]).append('<td class="blackTable"><img class="pawn white" id="' + i + '_' + y + '" src="image/whitePawn.png" alt="White Pawn"></td>');
            //             }else{
            //                 $(table[i]).append('<td class="blackTable"></td>');
            //             }
            //         }
            //     }
                
            // }
    //     }
    // }  
});