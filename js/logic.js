
$(function(){
    // dama in posizione iniziale. 
    // 0=posizione vuota
    // 1= pedine nere
    // 2= pedine bianche
    let positionTable = [[0, 1, 0, 1, 0, 1, 0, 1], 
                        [1, 0, 1, 0, 1, 0, 1, 0],
                        [0, 1, 0, 1, 0, 1, 0, 1],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [2, 0, 2, 0, 2, 0, 2, 0], 
                        [0, 2, 0, 2, 0, 2, 0, 2],
                        [2, 0, 2, 0, 2, 0, 2, 0]];
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
    let nextMove = ".white";
    let id = "";
    let idPawn = "";
    console.log(nextMove);
    
   //BEGIN controllo hover sui pedoni
    $(nextMove).on("mouseenter", function(event){
        //recupero id elemento sorvolato ergo posizione sulla dama
        id = $(this).parent().attr("id");
        idPawn = $(this).attr("id");
        // $("#" + idPawn).draggable({
        //     revert : 'invalid' // sera renvoyé à sa place s'il n'est pas déposé dans #drop
        // });
        // $("#c4, #a4").droppable({
        //     accept : '#b3p', // je n'accepte que le bloc ayant "drag" pour id    
        // });
        
        //Aggiungo attributi per il drag
        // $(this).attr("draggable", "true");
        // $(this).attr("ondragstart", "drag(event)");
        
        //cerco l'id nella lista positionDama per determinare le coordinate della pedina
        for(let i = 0; i < positionDama.length; i++) {
            for(let count = 0; count < positionDama[i].length; count++) {
                if (positionDama[i][count] === id) {
                    //stock coordinate pedone nell'array 
                    positionCol = count;
                    positionRow = i;
                }
            }
        }
        console.log(this);
        // $(this).css("border", "1px solid red");
        //Movimenti consentiti
        if (positionTable[positionRow][positionCol] == 1){
            if(positionTable[positionRow + 1][positionCol - 1] == 0){
                //Coloro lo sfondo delle caselle in cui è possibile muoversi
                $("#" + positionDama[positionRow + 1][positionCol - 1]).css("background-color", "green");
                //Aggiungo attributi per drop
                $("#" + positionDama[positionRow + 1][positionCol - 1]).attr("ondrop", "drop(event)");
                $("#" + positionDama[positionRow + 1][positionCol - 1]).attr("ondragover", "allowDrop(event)");
            } 
            if(positionTable[positionRow + 1][positionCol + 1] == 0){
                //Coloro lo sfondo delle caselle in cui è possibile muoversi
                $("#" + positionDama[positionRow + 1][positionCol + 1]).css("background-color", "green");
                //Aggiungo attributi per drop
                $("#" + positionDama[positionRow + 1][positionCol + 1]).attr("ondrop", "drop(event)");
                $("#" + positionDama[positionRow + 1][positionCol + 1]).attr("ondragover", "allowDrop(event)");
            }  
        }else if (positionTable[positionRow][positionCol] == 2){
            if(positionTable[positionRow - 1][positionCol + 1] == 0){
                //Coloro lo sfondo delle caselle in cui è possibile muoversi
                $("#" + positionDama[positionRow - 1][positionCol + 1]).css("background-color", "green");
                //Aggiungo attributi per drop
                $("#" + positionDama[positionRow - 1][positionCol + 1]).attr("ondrop", "drop(event)");
                $("#" + positionDama[positionRow - 1][positionCol + 1]).attr("ondragover", "allowDrop(event)");
            } 
            if(positionTable[positionRow - 1][positionCol - 1] == 0){
                //Coloro lo sfondo delle caselle in cui è possibile muoversi
                $("#" + positionDama[positionRow - 1][positionCol - 1]).css("background-color", "green");
                //Aggiungo attributi per drop
                $("#" + positionDama[positionRow - 1][positionCol - 1]).attr("ondrop", "drop(event)");
                $("#" + positionDama[positionRow - 1][positionCol - 1]).attr("ondragover", "allowDrop(event)");
            }    
        }
        //Verifica se il drop è stato effettuato
        // recupero id del tag td parent
        let idParent = $(this).parent().attr("id");

            //NON FUNZIONA :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            //Uniformo il formato dell'idPawn all'id del td
            let idConfronto = idPawn[0] + idPawn[1];
            console.log("id" + idConfronto);
            console.log("parent" + idParent);
            if(idConfronto != idParent){
                if(nextMove === ".white"){
                    nextMove = ".black";
                }else{
                    nextMove = ".white";
                }
            }


        console.log(typeof(id));
        console.log("id: " + id);
        console.log("row: " + positionRow);
        console.log("Col: " + positionCol);
    });
    //FINE controllo hover pedoni
    //Cambia sfondo pedone quando si sorvola
    $(nextMove).on("mouseenter", function(event){
        //cambio sfondo quando si clicca sull'elemento .pawn
        $(this).css("background-color", "green");
    });
    //Ripristina i valori precedenti all'hover 
    $(".pawn").on("mouseleave", function(event){
        //cambio sfondo quando si clicca sull'elemento .pawn
        $(this).css("background-color", "");
        //Elimino attributi per il drag
        $(this).removeAttr("draggable");
        $(this).removeAttr("ondragstart");
        //elimino il bordo alle caselle accessibili al drop
        $("td").css("background-color", "");
        $("td").removeAttr("ondrop");
        $("td").removeAttr("ondragover");
    });
    
   
    

// --.
});
// INIZIO drag and drop
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text",ev.target.id);
  }
  
  function drop(ev) {
    let color = "white"
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    
  }
//FINE drag and drop