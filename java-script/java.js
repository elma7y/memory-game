let score = document.querySelector(".score span");
document.querySelector(".controls-button span").onclick = function () {
    
    // create promt that accept the player name
    let yourname = prompt("what is your name");
    if ( yourname == null || yourname == ""){
        document.querySelector(".name span").innerHTML = "unknown"
    }else{
        document.querySelector(".name span").innerHTML = yourname;
    }
    // remove the intro page to enter the game
    document.querySelector(".controls-button").remove();
}
//  set the duration of flipping of each card
let duration = 1000;
// set the container to a variable 
let blocks_container  = document.querySelector(".memory-game");
//  make an array out of the containers children (cards)
let blocks = Array.from(blocks_container.children);
//  make an array of the number of the cards 
let orderNumbers = [...Array(blocks.length).keys()];
//  create a function to suffle the cards number
shuffle(orderNumbers);
//  give every card an order of its index number in the array
blocks.forEach((block , index) => {
    block.style.order = orderNumbers[index];
    block.addEventListener("click" , function(){
        flip(block);
        matched(block);

    })
})
// flip function
function flip (selectedBlock){
    selectedBlock.classList.add("is-flipped")
    let flippedSelectedBlock = blocks.filter(flipped => flipped.classList.contains("is-flipped"))
    if(flippedSelectedBlock.length === 2){
        noclicking();
        chekMatching(flippedSelectedBlock[0] , flippedSelectedBlock[1]);
    }
}
// no clicking function
function noclicking(){
    blocks_container.classList.add("no-clicking");
    setTimeout(() => {
    blocks_container.classList.remove("no-clicking");
    }, duration)
}

function chekMatching(firstChecked , secondChecked){
    let triesNumber = document.querySelector(".tries span");
    if(firstChecked.dataset.pic === secondChecked.dataset.pic){
        firstChecked.classList.remove("is-flipped");
        secondChecked.classList.remove("is-flipped");
        firstChecked.classList.add("has-matched");
        secondChecked.classList.add("has-matched");
        firstChecked.classList.add("myscore");
        secondChecked.classList.add("myscore");
        score.innerHTML = parseInt(score.innerHTML) +10;


    }else{
        triesNumber.innerHTML = parseInt(triesNumber.innerHTML) +1;
        setTimeout(() =>{
            firstChecked.classList.remove("is-flipped");
            secondChecked.classList.remove("is-flipped");
        } , duration)
    }
    let myScoreBlocks = document.querySelectorAll(".myscore")
    
    if(myScoreBlocks.length === 20){
        let wrongTries = document.querySelector(".tries span")
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML)
        score.innerHTML = score.innerHTML - (wrongTries.innerHTML * 2)
        console.log(score.innerHTML)
        let playerName = document.querySelector(".info .player");
        let ourEnd = document.querySelector(".memory-game");
        ourEnd.classList.toggle("endloop") 
        if(ourEnd.classList.contains("endloop")){
        console.log("hello")
        let leaderBoard = document.createElement("div");
        leaderBoard.className = "leader-container";
        let showLeaderBoard = document.createElement("span");
        showLeaderBoard.className = "leader-button"
        let showLeaderBoardText = document.createTextNode("show leader board");
        showLeaderBoard.appendChild(showLeaderBoardText);
        leaderBoard.appendChild(showLeaderBoard);
        document.body.appendChild(leaderBoard);
        localStorage.setItem( playerName.innerHTML , score.innerHTML)  
        leaderBoard.innerHTML = `${playerName.innerHTML} ${score.innerHTML}` 
        console.log(playerName.innerHTML)
        function showitems() {

            if(localStorage.length){
        
                leaderBoard.innerHTML =""
        
                for(let [key,value] of Object.entries(localStorage)){
        
                    leaderBoard.innerHTML += `<span class = "key">${key}</span> <span class = "key">${value}</span>` ;
        
                }
        
        }
        }
        showitems();
        }else{
                ourEnd.classList.add("endloop");
            }
        let closeDiv = document.createElement("div");
        let closeSpan = document.createElement("span");
        let spanText = document.createTextNode(`congratulation you managed to win the game your score is ${score.innerHTML}/100`); 
        let refresh = document.createElement("button");
        let refreshText = document.createTextNode("play again");
        refresh.addEventListener("click" ,reload ,false );
        closeDiv.classList.add("end-game");
        closeSpan.classList.add("close");
        refresh.classList.add("reset");
        closeDiv.appendChild(closeSpan);
        closeDiv.appendChild(refresh);
        closeSpan.appendChild(spanText);
        refresh.appendChild(refreshText);
        document.body.appendChild(closeDiv);
        function reload(){
            reload = location.reload();
            
        }  

    }   
    
    }
function shuffle (array) {
    let current = array.length,
    random,
    temp;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array
}

function matched(){
    let matched = blocks.filter(matched => matched.classList.contains("has-matched"));
    if(matched.length === orderNumbers.length){
        
        let helooo = document.querySelector(".end-game")
        
        helooo.style.cssText = "display : block";
    }

}



