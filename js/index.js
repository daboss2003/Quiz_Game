import { questions } from "./questions.js";

let questionNo = 0;
let answerNo = 0;




const initApp = () =>{
    const gameContainer = document.getElementById("game__container")
    const gameScreen = document.getElementById("screen")
    const questionPrice = document.getElementById("q-screen")
    const winPrice = document.getElementById("gain")
    const rand3 = Math.floor(Math.random() * 3)
    const startbtn = document.getElementById("start")
    const walkbtn = document.getElementById("walk")
    const askbtn = document.getElementById("ask")
    const popup = document.getElementById("popup")
    const popYes = document.getElementById("yes")
    const popNo = document.getElementById("no")
    let audienceChoice = document.querySelectorAll(".choice")
    const audienceBox = document.getElementById("audience__box")
    const hideBtn = document.getElementById("hide__btn")
    const total = document.getElementById("total")
    const fiftybtn = document.getElementById("fifty")
    const sure = document.getElementById("sure")
   


    window.addEventListener("click", (event) => {
        if(event.target.classList.contains("btn")){
             checkbtn(event,event.target)
        }
        else if(event.target === popNo){
            console.log(questionNo, answerNo)
            event.stopPropagation();
            popup.style.top = -500 + "px";
             playGame();
        }
        else if(event.target === popYes){
            console.log(questionNo, answerNo)
            event.stopPropagation()
           
            if(answerNo===questionNo){
                popup.style.top = -500 + "px";
                let button = Array.from(document.querySelectorAll(".btn")).filter(btn => btn.id == sure.innerHTML)
                answerNo = answerNo + 1;
                questionNo = questionNo + 1;
                confirmAns(button[0]);
            }
        }

    });

    let eventActive = 0;

    const stageQuestion = () =>{
        const currentQuestion = questions[questionNo];
        gameScreen.getElementsByTagName("h1")[0].innerHTML = `Question ${questionNo +1}`;
        gameScreen.getElementsByTagName("p")[0].innerHTML = currentQuestion.question;
        for(let i = 0; i < currentQuestion.answer.length; i++){
            let button = document.createElement("button");
            button.innerHTML = currentQuestion.answer[i].text;
            button.setAttribute("class","btn");
            button.setAttribute("id", currentQuestion.answer[i].text)
            button.dataset.correct = currentQuestion.answer[i].correct;
            gameScreen.appendChild(button);
        };
    };

    const checkbtn = (event,cbtn) =>{
        event.stopPropagation();
        sure.innerHTML = cbtn.innerHTML;
        popup.style.top = 0;
    }


    walkbtn.addEventListener("click",() =>{
        alert(`You earned ${total.innerHTML}`);
        window.location = "index.html";
    });

    

    const confirmAns = (button) =>{
        let continuety = decideFaith(button,questionPrice,total,gameScreen,startbtn,winPrice);
        console.log(continuety)
        if(continuety === true) {
            playGame()
            
       };
    }

    
   


  const playGame = () =>{
    if(questionNo >= 15){
        gameScreen.innerHTML = "CONGRATULATIONS"
        gameScreen.classList.add("complete")
        startbtn.style.display = "none"
        walkbtn.style.display = "none"
        winPrice.style.backgroundColor = "#2de22d"
        questionPrice.style.backgroundColor = "#2de22d"
        alert(`You Won ${total.innerHTML}`)
        setTimeout(()=>{
            window.location = "index.html"
        },3000)
     }
    winPrice.style.backgroundColor = "#00c3ff";
      clearScreen(gameContainer);
      stageQuestion()
      
};


fiftybtn.addEventListener("click", () =>{
    setFifty(rand3,gameScreen)
    fiftybtn.style.display = "none"
},{once:true});





askbtn.addEventListener("click",() =>{
    audienceBox.style.top = 0;
    let currentQuestionArray = questions[questionNo].answer;
    let rearrangedList = shufflist(currentQuestionArray);
    let num1 = Math.floor(Math.random() * 101);
    let num2 = Math.floor(Math.random() * (101 - num1));
    let num3 = Math.floor(Math.random() * (101 - num1 - num2));
    let num4 = 100 - (num1 + num2 + num3);
    let numarr = shufflist([num1,num2,num3,num4]);
    let percent = document.querySelectorAll(".percent");
    for(let i = 0; i < numarr.length; i++){
        audienceChoice[i].innerHTML = rearrangedList[i].text;
        percent[i].innerHTML = numarr[i];
    }
    // hide the audience answers
    hideBtn.addEventListener("click",()=>{
        audienceBox.style.top = -500 + "px";
    });
    askbtn.style.display = "none";
},{once:true});


startbtn.addEventListener("click",()=>{
    walkbtn.style.display = "block";
    askbtn.style.display = "block";
    fiftybtn.style.display = "block";
    startbtn.style.display = "none";
    playGame();
});

};

window.addEventListener("DOMContentLoaded",initApp);














const decideFaith = (button,questionPrice,total,gameScreen,startbtn,winPrice) =>{
    if(button.dataset.correct === 'true'){
        button.classList.add("right")
        let priceWon = questionPrice.getElementsByTagName("div")[questionNo -1]
        priceWon.classList.add("done")
        let newTotal = parseInt(total.innerHTML.replace("$","")) + parseInt(priceWon.getElementsByTagName("p")[0].innerHTML.replace("$",""))
        total.innerHTML = `$${newTotal}`
         Array.from(gameScreen.getElementsByTagName("button")).forEach(btn => {
            btn.disabled = true
            btn.style.cursor = "no-drop"
         })
            winPrice.style.backgroundColor = "#2de22d"
            setTimeout(()=>{
            }, 2000)
            return true;
    }
    else if (button.dataset.correct === 'false'){
        button.classList.add("wrong")
        console.log(button)
        questionPrice.getElementsByTagName("div")[questionNo].classList.add("lost")
        Array.from(gameScreen.getElementsByTagName("button")).forEach(btn => {
            btn.disabled = true
            btn.style.cursor = "no-drop"
         })
         gameScreen.innerHTML = "GAME OVER"
         gameScreen.classList.add("center")
         startbtn.style.display = "none"
         if(questionNo > 4 && questionNo < 9){
            let priceArr = []
            let cleanArr = []
            let finalPrice = Array.from(questionPrice.getElementsByTagName("div"))
            finalPrice = finalPrice.slice(0,5)

            finalPrice.forEach(tag =>{
                priceArr.push(tag.getElementsByTagName("p")[0].innerHTML)
            })
            priceArr.forEach(amt =>{
               let pricenum = parseInt( amt.replace("$",""))
                cleanArr.push(pricenum)
            })

            let wonAmt = cleanArr.reduce((a,b) => a + b, 0)
            alert(`You Won $${wonAmt}`)
            winPrice.style.backgroundColor = "red"
            setTimeout(()=>{
                window.location = "index.html"
            }, 2000)
         }
         else if(questionNo > 9 && questionNo < 14){
            let priceArr = []
            let cleanArr = []
            let finalPrice = Array.from(questionPrice.getElementsByTagName("div"))
            finalPrice = finalPrice.slice(0,10)

            finalPrice.forEach(tag =>{
                priceArr.push(tag.getElementsByTagName("p")[0].innerHTML)
            })
            priceArr.forEach(amt =>{
               let pricenum = parseInt( amt.replace("$",""))
                cleanArr.push(pricenum)
            })

            let wonAmt = cleanArr.reduce((a,b) => a + b, 0)
            alert(`You Won $${wonAmt}`)
            winPrice.style.backgroundColor = "red"
            setTimeout(()=>{
                window.location = "index.html"
            }, 2000)
         }
         else{
            winPrice.style.backgroundColor = "red"
            setTimeout(()=>{
                window.location = "index.html"
            }, 2000)
            
         }
    }
    else{
        return false
    }

}

const clearScreen = (gameScreen) =>{
    let btnToRemove  = gameScreen.querySelectorAll("button")
    btnToRemove.forEach((item,index) =>{
        setTimeout(function(){
            item.remove()
        },index * 50)
    })
}

const shufflist = (list) =>{
    let j;
    for(let i = list.length - 1; i > 0; i--){
        j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}


const setFifty = (rand3,gameScreen) =>{
            clearScreen(gameScreen)
            const currentQuestion = questions[questionNo]
            let filteredQuestion = currentQuestion.answer.filter(ans => ans.correct === false)
            let trueAns = currentQuestion.answer.filter(ans => ans.correct === true)
            let shufftle = [trueAns[0],filteredQuestion[rand3]]
            shufflist(shufftle)
            shufftle.forEach((btn,index) =>{
                setTimeout(function(){
                    let button = document.createElement("button")
                    button.innerHTML = btn.text;
                    button.setAttribute("class","btn")
                    button.dataset.correct = btn.correct
                    button.setAttribute("id",btn.text)
                    gameScreen.appendChild(button)
                },index * 500)
        });
};


// const myPromise = ()=>{
//     return new Promise((resolve, reject) =>{
//         setTimeout(() => {
//             resolve();
//         },1500)
//     })
    
// }


// const maxNum = (array) =>{
//     let max = 0;
//     for(let i = 0; i < array.length; i++){
//         if(array[i] > max){
//             max = array[i]
//         }
//     }
//     return max;
// }

// const emptyTheArray = (array) =>{
//     while(array.length > 0){
//         array.pop()
//     };
// };