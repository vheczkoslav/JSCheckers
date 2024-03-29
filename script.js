var tbl = $(".tabulka");
var turn = $(".turn");

var gametable = [
                ["","B","","B","","B","","B"],
                ["B","","B","","B","","B",""],
                ["","B","","B","","B","","B"],
                ["","", "","", "","", "",""],
                ["","", "","", "","", "",""],
                ["W","","W","","W","","W",""],
                ["","W","","W","","W","","W"],
                ["W","","W","","W","","W",""]
            ];

document.addEventListener("DOMContentLoaded",()=>{
    render(gametable);
});

function render(gametable){
    $(".tbl tr").remove(); 
    for(let i = 0; i < gametable.length; i++){
    var tr = document.createElement("tr");
    tr.classList.add("r" + i + "");
    tbl.append(tr);
    for(let j = 0; j < gametable[i].length; j++){
        var td = document.createElement("td");
        td.classList.add("" + i + String.fromCharCode(97+j) + "");
        tr.append(td)
        switch(gametable[i][j]){
            case "B":
            td.innerHTML = "<img onclick='movement(this.id, " + i + "," + j + ")' id='" + i + String.fromCharCode(97+j) + "bp" + "' style='background: transparent; ' src='txtrs/black_pawn.png'></img>";
                break;
            case "W":
            td.innerHTML = "<img onclick='movement(this.id, " + i + "," + j + ")' id='" + i + String.fromCharCode(97+j) + "wp" + "' style='background: transparent;' src='txtrs/red_pawn.png'></img>";
                break;
            case "BK":
            td.innerHTML = "<img onclick='movement(this.id, " + i + "," + j + ")' id='" + i + String.fromCharCode(97+j) + "bk" + "'  style='background: transparent; ' src='txtrs/black_king.png'></img>";
                break;
            case "WK":
            td.innerHTML = "<img onclick='movement(this.id, " + i + "," + j + ")' id='" + i + String.fromCharCode(97+j) + "wk" + "'  style='background: transparent;' src='txtrs/red_king.png'></img>";
                break;    
            case "PM": 
            td.innerHTML = "<img onclick='movement(this.id, " + i + "," + j + ")' id='" + i + String.fromCharCode(97+j) + "pm" + "'  style='filter: blur(3px);' src='txtrs/possible_move.png'></img>";   
                break;
            default:
            td.innerHTML = "<div style='height: 46px; width: 46px; border: 0;'></div>"    
                break;
            }
        }
    }
}    

    //const gametable_limits = {lw: 0, rw: 7, uh: 0, bh: 7};
    function isBeyond(posx, posy){
        if(posx < 0){ return true; }
        else if(posx > 7){ return true; }
        if(posy < 0){ return true; }
        else if(posy > 7){ return true; }
    }

    var pm1w;
    var pm2w;
    var pm1b;
    var pm2b;
    var lastClicked;
    var isWhiteTurn = true; //if true white's turn, if false black's turn
    function movement(sender, pos1, pos2){
        console.log(sender);
        console.log(lastClicked);
        $("#senderid").html("sender ID: " + sender);
        $("#pos1").html("pos1: " + pos1); //because it is more natural for human to start at 1
        $("#pos2").html("pos2: " + pos2);
        if(sender != lastClicked){
            if(isWhiteTurn){
                if(sender.includes("wp")){
                    hidepmp(gametable);
            
                    //Drawing possible move green dot
                    if(gametable[pos1 - 1][pos2 - 1] == ""){
                        gametable[pos1 - 1][pos2 - 1] = "PM";
                        /*if(gametable[pos1 - 2][pos2 - 2] == "B" && gametable[pos1 - 3][pos2 - 3] == ""){
                            gametable[pos1 - 3][pos2 - 3] = "PM";
                        }*/
                    }
                    if(gametable[pos1 - 1][pos2 + 1] == ""){
                        gametable[pos1 - 1][pos2 + 1] = "PM";
                    }
                    //taking pawn to 1 position left and up
                    if(gametable[pos1 - 1][pos2 - 1] == "B" && gametable[pos1 - 2][pos2 - 2] == ""){
                        gametable[pos1 - 2][pos2 - 2] = "PM";
                    }
                    //taking pawn to 1 position right and up 
                    if(gametable[pos1 - 1][pos2 + 1] == "B" && gametable[pos1 - 2][pos2 + 2] == ""){
                        gametable[pos1 - 2][pos2 + 2] = "PM";
                    }
                    if(gametable[0][pos2] == "W"){
                        gametable[0][pos2] == "WK";
                    }
                
                    pm1w = pos1; //saved position of pawn
                    pm2w = pos2; // -||-
                    $("#pm1w").html("pm1w: " + pm1w);
                    $("#pm2w").html("pm2w: " + pm2w);
                }
                //Moving pawn/king to the position of that pm
                if(sender.includes("pm")){
                    hidepmp(gametable);
                    //in this context pos1/2 is position of green dot, not of the pawn
                    if(gametable[pm1w][pm2w] == "W"){
                        //taking pawn to 1 position left and up
                        if(gametable[pm1w - 1][pm2w - 1] == "B"){
                            gametable[pm1w][pm2w] = "";
                            gametable[pos1][pos2] = "W";
                            gametable[pos1 + 1][pos2 + 1] = "";
                        }
                        if(gametable[pm1w - 1][pm2w + 1] == "B"){
                            gametable[pm1w][pm2w] = "";
                            gametable[pos1][pos2] = "W";
                            gametable[pos1 + 1][pos2 - 1] = "";
                        }
                        gametable[pm1w][pm2w] = "";
                        gametable[pos1][pos2] = "W";
                        isWhiteTurn = false;
                        turn.html("<h1 style='color: black;'>Black's turn!</h1>");
                    }
                    hidepmp(gametable);
                    pm1w = undefined;
                    pm2w = undefined;    
                }        
                var div = $(".gametable");
                visugmtb(div, gametable);
                tbl.html("");
                render(gametable);
            }    
        
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            if(!isWhiteTurn){
                if(sender.includes("bp")){
                    hidepmp(gametable);
                
                //Drawing possible move green dot
                if(gametable[pos1 + 1][pos2 + 1] == ""){
                    gametable[pos1 + 1][pos2 + 1] = "PM";
                }
                if(gametable[pos1 + 1][pos2 - 1] == ""){
                    gametable[pos1 + 1][pos2 - 1] = "PM";
                }
                //taking pawn to 1 position right and down
                if(gametable[pos1 + 1][pos2 - 1] == "W" && gametable[pos1 + 2][pos2 - 2] == ""){
                    gametable[pos1 + 2][pos2 - 2] = "PM";
                }
                //taking pawn to 1 position left and down
                if(gametable[pos1 + 1][pos2 + 1] == "W" && gametable[pos1 + 2][pos2 + 2] == ""){
                    gametable[pos1 + 2][pos2 + 2] = "PM";
                }
                
                pm1b = pos1; //saved position of pawn
                pm2b = pos2; // -||-
                $("#pm1b").html("pm1b: " + pm1b);
                $("#pm2b").html("pm2b: " + pm2b);                    
                }
                //Moving pawn/king to the position of that pm
                if(sender.includes("pm")){
                    hidepmp(gametable);
                //in this context pos1/2 is position of green dot, not of the pawn
                if(gametable[pm1b][pm2b] == "B"){
                    //taking pawn to 1 position left and down
                    if(gametable[pm1b + 1][pm2b + 1] == "W"){
                        gametable[pm1b][pm2b] = "";
                        gametable[pos1][pos2] = "B";
                        gametable[pos1 - 1][pos2 - 1] = "";
                    }
                    if(gametable[pm1b + 1][pm2b - 1] == "W"){
                        gametable[pm1b][pm2b] = "";
                        gametable[pos1][pos2] = "B";
                        gametable[pos1 - 1][pos2 + 1] = "";
                    }
                    gametable[pm1b][pm2b] = "";
                    gametable[pos1][pos2] = "B";
                
                    isWhiteTurn = true;
                    turn.html("<h1 style='color: red;'>Red's turn!</h1>");
                }
            pm1b = undefined;
            pm2b = undefined;    
            }
            /*if(pm1b == 7){
                gametable[pm1b][pm2b] = "BK";
            }*/
        var div = $(".gametable");
        visugmtb(div, gametable);
        tbl.html("");
        render(gametable);
        }
        lastClicked = sender;
    }
    else{
        console.log("a")
        hidepmp(gametable);
        tbl.html("");
        render(gametable);
        lastClicked = undefined;
    }
}

function hidepmp(gametable){
    for(let i = 0; i < gametable.length; i++){
            for(let j = 0; j < gametable[i].length; j++){
                if(gametable[i][j] == "PM"){
                    gametable[i][j] = "";
                }
            }
        }
}

function visugmtb(div, gametable){ //visualize gametable inside .gametable div
    div.html("");
    for(let i = 0; i < gametable.length; i++){
        var p = document.createElement("p");
        for(let j = 0; j < gametable[i].length; j++){
            if(gametable[i][j] == ""){
                p.innerHTML += ".";
            }
            p.innerHTML += gametable[i][j] + " ";   
        }
        div.append(p);
    }
}