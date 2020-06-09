// ////////////////////////////////////////////
// drag and drop ok ora fare i turni dei giocatori
// nel drug and drop non possiamo mettere altre funzioni oltre le standard
// ////////////////////////////////////////////


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
    let color = "";
    //Gestisce i turni
    let nextPlayer = ".white";
    //Stocca le caselle dove è possibile muovere
    let move1 = "";
    let move2 = "";
    
   //BEGIN controllo hover sui pedoni
    $(nextPlayer).on("mouseenter", function(event){
        //recupero id elemento cliccato ergo posizione sulla dama
        let id = $(this).parent().attr("id");
        let idPawn = $(this).attr("id");

       let test = $(this).css("top");
       console.log("TOP" + test);
        
        
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
                move1 = positionDama[positionRow + 1][positionCol - 1];
                //Coloro i bordi delle caselle in cui è possibile muoversi
                $("#" + move1).css("background-color", "green");
            } 
            if(positionTable[positionRow + 1][positionCol + 1] == 0){
                //Coloro i bordi delle caselle in cui è possibile muoversi
                move2 = positionDama[positionRow + 1][positionCol + 1];
                $("#" + move2).css("background-color", "green");
            }  
        }else if (positionTable[positionRow][positionCol] == 2){
            color = "black";    
            if(positionTable[positionRow - 1][positionCol + 1] == 0){
                //Coloro i bordi delle caselle in cui è possibile muoversi
                move1 = positionDama[positionRow - 1][positionCol + 1];
                $("#" + move1).css("background-color", "green");
            } 
            if(positionTable[positionRow - 1][positionCol - 1] == 0){
                //Coloro i bordi delle caselle in cui è possibile muoversi
                move2 = positionDama[positionRow - 1][positionCol - 1];
                $("#" + move2).css("background-color", "green");
            }    
        }
       
        // BEGIN drag and drop
        $("#" + idPawn).draggable({
            revert : 'invalid' // sera renvoyé à sa place s'il n'est pas déposé dans #drop
        });
        $("#" + move1).droppable({
            accept : "#" + idPawn, // je n'accepte que le bloc ayant "drag" pour id   
        });
        $("#" + move2).droppable({
            accept : "#" + idPawn, // je n'accepte que le bloc ayant "drag" pour id  
        });
        
        // cambio colore giocatore NON FINZIONA
        $(idPawn).on("mousedown", function(){
            if(nextPlayer == ".white"){
                nextPlayer = ".black";
                console.log("if" + nextPlayer);
            }else{
                nextPlayer = ".white";
                console.log("else" + nextPlayer);
            }
        });
        
        //END drag and drop
       
        console.log(typeof(id));
        console.log("id: " + id);
        console.log("row: " + positionRow);
        console.log("Col: " + positionCol);
        
    });
    //FINE controllo over pedoni
    //Cambia sfondo pedone quando si sorvola
    $(nextPlayer).on("mouseenter", function(event){
        //cambio sfondo quando si clicca sull'elemento .pawn
        $(this).css("background-color", "green");
    });
    //Ripristina i valori precedenti all'hover 
    $(".pawn").on("mouseleave", function(event){
        //cambio sfondo quando si clicca sull'elemento .pawn
        $(this).css("background-color", "");
        //elimino il bordo alle caselle accessibili al drop
        $("td").css("background-color", "");
    });
    
    

// --.
});
