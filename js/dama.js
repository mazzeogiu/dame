//  ERRORE DI LOGICA segnala due movimenti possibili quando invece si può solo mangiare. Errore al primo ciclo di for della funzione checkMove
//  DA SVILUPPARE
//  sviluppare il mangia pedina
//  mangia pedina multiplo da sviluppare
//  pedina in dama
//  sistema di calcolo del vincitore
//

$(function() {
    let numberOfLine = 8;
    let numberOfRow = 8;
    let numberPieces = 24
    let config = [["blackTable","blackPawn.png", "black"], ["whiteTable","whitePawn.png", "white"]];
    let currentClass = 0;
    let indexPawn = 0;
    let nextPlayer = 1;
    let removePawn = "";
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
    // BEGIN table costruction
    for(let i = 0; i < numberOfLine; i++){
        currentLine =  $('<tr>').attr("id", i);
        // il risultato del div assumerà il valore -1 oppure 1
        //questo ci permetterà di creare l'alternanza 0 e 1 alla linea 38
        currentLineClass = i % 2 == 0 ? -1 : 1;  
        currentClass = currentLineClass;
        for(let y = 0; y < numberOfRow; y++){
            currentRow = $('<td>').attr("id", currentLine.attr("id") + "-" + y)
            index = currentClass > 0 ? currentClass : 0;
            displayClass= config[index][0];
            currentRow.addClass(displayClass);
            //Posiziona le pedine
            if (index == 0){
                // Lascia le 2 righe centrali vuote
                if(i < 3 || i > 4){
                    indexPawn = numberPieces > 12 ? 0 : 1;
                    // inserisco la classe "move" per indicare il giocatore che ha diritto a mouvere
                    currentRow.html('<img class="'+config[indexPawn][2]+'" id="' + i + '_' + y + '" src="image/'+config[indexPawn][1]+'" alt="'+config[indexPawn][1]+'"></img>');
                    numberPieces -= 1;
                }  
            }
            currentLine.append(currentRow);
            // crea l'alternanza di 0 e 1 
            currentClass = currentClass * -1;
        }
        $("table").append(currentLine);
    }
    // END table costruction
    // BEGIN hover enter control
    $(".white, .black").on("mouseenter", function(){
        // l'if esegue lo script per il giocatore che ha il diritto alla mossa
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
        //controllo se il drag and drop è stato eseguito
        if(parseInt(currentPositionPawn) !== parseInt(idParent)){
            // Rimuovo pedina mangiata
            // removePawn != "" ? $("#" + removePawn + " img").remove() : removePawn = "";
            // Aggiorno l'id della pedina
            $(this).attr("id", idParent[0] + "_" + idParent[2]);
            nextPlayer ? nextPlayer = 0 : nextPlayer = 1;
        }
    });
    // END hover leave control
    // BEGIN calcolo mosse possibili e cattura pedina avversaria
    function checkMove(newPosition, currentPosition, player){
        let eatPawn = false;
        let row = 0;
        let column = 0;
        let tempPosition = "";
        let colorPawn = "";
        for(i = 0; i < newPosition.length; i++) {
            colorPawn = $("#" + newPosition[i] + " img").attr("class");
            // Verifico se le caselle in cui si può muovere non sia vuota e se l'eventuale pedina sia dell'avversario 
            if(colorPawn != player && typeof(colorPawn) != "undefined"){
                // Calcolo posizione di destinazione per mangiare la pedina avversaria 
                row = Number(newPosition[i][0]) - Number(currentPosition[0]);
                column = Number(newPosition[i][2]) - Number(currentPosition[2]);
                tempPosition = String(parseInt(newPosition[i][0]) + row) + "-" + String(parseInt(newPosition[i][2]) + column);
                // Verifico se la casella dopo aver mangiato è libera per validare la possibile mossa
                colorPawn = $("#" + tempPosition + " img").attr("class")
                typeof(colorPawn) !="undefined" ? eatPawn = false : eatPawn = true;
                // se eatPawn è true memorizzo la posizione della pedina da mangiare
                // eatPawn ? removePawn = newPosition[i] : removePawn = "";
                // Se eatPawn è falso annullo la possibile mossa
                eatPawn ? newPosition[i] = tempPosition : newPosition[i] = "--";
            // Inibisce la mossa su una pedina dello stesso colore
            }else if(colorPawn == player || eatPawn){
                newPosition[i] = "--";
            } 
        }
        console.log(removePawn)
    return newPosition;
    }
    // END calcolo mosse possibili e cattura pedina avversaria

// -------------
});
// INIZIO drag and drop
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
//FINE drag and drop