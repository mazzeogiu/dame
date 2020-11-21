//  LOGIC ERROR signals two possible movements when you can only eat. Error on first for loop of checkMove function
//  TO DEVELOP
//  develop the pawn eater
//  eat multiple pawn to develop
//  pawn in checkers
//  winner calculation system
//

$(function() {
    let numberOfLine = 8;
    let numberOfColumn = 8;
    let numberPieces = 24
    let config = [["blackTable","blackPawn.png", "black"], ["whiteTable","whitePawn.png", "white"]];
    let currentClass = 0;
    let indexPawn = 0;
    let nextPlayer = 1;
    let removePawn = "";
    
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
    // BEGIN table costruction
    for(let i = 0; i < numberOfLine; i++){
        currentLine =  $('<tr>').attr("id", i);
        currentLineClass = i % 2 == 0 ? -1 : 1;  
        currentClass = currentLineClass;

        for(let y = 0; y < numberOfColumn; y++){
            currentRow = $('<td>').attr("id", currentLine.attr("id") + "-" + y)
            index = currentClass > 0 ? currentClass : 0;
            displayClass= config[index][0];
            currentRow.addClass(displayClass); 
            //Place the pieces
            if (index == 0){
                // Leave the 2 middle lines blank
                if(i < 3 || i > 4){
                    indexPawn = numberPieces > 12 ? 0 : 1;
                    // I insert the class "move" to indicate the player who has the right to move
                    currentRow.html('<img class="'+config[indexPawn][2]+'" id="' + i + '_' + y + '" src="image/'+config[indexPawn][1]+'" alt="'+config[indexPawn][1]+'"></img>');
                    numberPieces -= 1;
                }  
            }
            currentLine.append(currentRow);
            currentClass = currentClass * -1;
        }
        // Print next player to move
        $("#table").append(currentLine);
    }
    $("#player").text(config[nextPlayer][2]);
    // END table costruction
    // BEGIN hover enter control
    $(".white, .black").on("mouseenter", function(){
        // the if executes the script for the player who is entitled to move
        if($(this).attr("class") == config[nextPlayer][2]){
            currentPositionPawn = $(this).attr("id");
            color = $(this).attr("class");
            row = color == "black" ? 1 : -1;
            col = 1;
            //Add style and drag and drop
            $(this).css("background-color", "green").attr("draggable", "true").attr("ondragstart", "drag(event)");
            let newPosition = [];
            newPosition.push((parseInt(currentPositionPawn[0]) + row) + "-" + (parseInt(currentPositionPawn[2]) + (col * -1)));
            newPosition.push((parseInt(currentPositionPawn[0]) + row) + "-" + (parseInt(currentPositionPawn[2]) + (col)));
            newPosition = checkMove(newPosition, currentPositionPawn, config[nextPlayer][2], row);
            console.log(newPosition)
            for(i = 0; i < newPosition.length; i++){
                $("#" + newPosition[i]).css("background-color", "green").attr("ondrop", "drop(event)").attr("ondragover", "allowDrop(event)");
            }
        }
    });
    // END hover enter control
    // BEGIN hover leave control
    $(".white, .black").on("mouseleave", function(){
        $(this).removeAttr("draggable ondragstart style");
        $("td").removeAttr("ondrop ondragover style");
        let idParent = $(this).parent().attr("id");
        currentPositionPawn = $(this).attr("id");
        //check if the drag and drop has been performed
        if(parseInt(currentPositionPawn) !== parseInt(idParent)){
            // Update the pawn id
            $(this).attr("id", idParent[0] + "_" + idParent[2]);
            nextPlayer ? nextPlayer = 0 : nextPlayer = 1;
            // Stampa a video il prossimo giocatore che muove
            $("#player").text(config[nextPlayer][2]);
        }
    });
    // END hover leave control
    // BEGIN calculation of possible moves and capture of opponent's pawn
    function checkMove(newPosition, currentPosition, player){
        let eatPawn = false;
        let row = 0;
        let column = 0;
        let tempPosition = "";
        let colorPawn = "";
        for(i = 0; i < newPosition.length; i++) {
            colorPawn = $("#" + newPosition[i] + " img").attr("class");
            // Check if the squares in which you can move are not empty and if the possible piece belongs to the opponent
            if(colorPawn != player && typeof(colorPawn) != "undefined"){
                // Calculation of target position to eat the opponent's piece
                row = Number(newPosition[i][0]) - Number(currentPosition[0]);
                column = Number(newPosition[i][2]) - Number(currentPosition[2]);
                tempPosition = String(parseInt(newPosition[i][0]) + row) + "-" + String(parseInt(newPosition[i][2]) + column);
                // I check if the space after eating is free to validate the possible move
                colorPawn = $("#" + tempPosition + " img").attr("class")
                typeof(colorPawn) !="undefined" ? eatPawn = false : eatPawn = true;
                eatPawn ? newPosition[i] = tempPosition : newPosition[i] = "--";
            // Inhibits the move on a pawn of the same color
            }else if(colorPawn == player || eatPawn){
                newPosition[i] = "--";
            } 
        }
        console.log(removePawn)
    return newPosition;
    }
    // END calculation of possible moves and capture of opponent's pawn

// -------------
});
// BEGIN drag and drop
function allowDrop(ev) {
    ev.preventDefault();
  }
function drag(ev) {
    ev.dataTransfer.setData("text",ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
//END drag and drop