const WORDSIGNS = {
    "plus" : "+",
    "minus" : "-",
    "mult" : "×",
    "division" : "÷"
}

let displayValue = '0'
let valueA = ''
let valueB = ''
let answer = ''
let currentSign = ''

/*DOM Nodes*/

const display = document.querySelector('.display')
const calc = document.querySelector('.calc')
const numbers = document.querySelectorAll('.numeric')
const clear = document.querySelector('#clear')
const backspace = document.querySelector('#backspace')
const signs = document.querySelectorAll('.sign')
const plus = document.querySelector('#plus')
const minus = document.querySelector('#minus')
const division = document.querySelector('#division')
const mult = document.querySelector('#mult')
const equal = document.querySelector('#equal')

/*Event Listeners*/

clear.addEventListener('click', clearButton)
backspace.addEventListener('click', backspaceButton)
equal.addEventListener('click', equalButton)

numbers.forEach((number) => {
    number.addEventListener('click',numberButton)
})

signs.forEach((sign) => {
    sign.addEventListener('click', signButton)
})

window.addEventListener('keyup', (e) => {
    if(e.key >= '0' && e.key <= '9'){
        let numNode = document.querySelector("#num"+e.key).click()
    }
    if(e.key === '.'){
        let dotNode = document.querySelector("#dot").click()
    }
    if(e.key==="+"){
    plus.click()
    }
    if(e.key==="-"){
        minus.click()
    }
    if(e.key==="/"){
        division.click()
    }
    if(e.key==="*"){
        mult.click()
    }
    if (e.key === "="){
        equal.click()
    }
    if(e.key === "Backspace"){
        backspace.click()
    }
    if(e.key === "c" || e.key === "C"){
        clear.click()
    }
})

/* Callbacks */

function clearButton (e) {
    displayValue = '0'
    valueA = ''
    valueB = ''
    currentSign = ''
    answer = ''
    display.textContent = displayValue;
    calc.textContent = ''
    
}

function backspaceButton (e) {
    if(displayValue.length === 1 || displayValue === ''){
        displayValue = '0'
        
    }
    else{
        displayValue = displayValue.slice(0,displayValue.length-1)
    }
    
    display.textContent = displayValue
}

function equalButton(e){
    if(valueA && currentSign){
        if(displayValue === ''){
            return
        }
    valueB = displayValue
    answer = operate(WORDSIGNS[currentSign],valueA,valueB).toString()
    calc.textContent = `${valueA}${WORDSIGNS[currentSign]}${valueB}=`
    display.textContent = answer
    displayValue = '0'
    
    if(answerIsError()){
        answer = ''
    }    
    valueA = ''
    valueB = ''
    currentSign = ''
    }

}

function numberButton(e){
    if(displayValue.length < 11){
        if(e.target.textContent === '.' && (!displayValue.includes('.') && displayValue!=='')){
            displayValue = displayValue + e.target.textContent;
            display.textContent = displayValue
        }
        if(e.target.textContent === '0' && displayValue!=='0'){
            displayValue = displayValue + e.target.textContent;
            display.textContent = displayValue
        }
        if(e.target.textContent === '0' && displayValue === '0'){
            display.textContent = displayValue
        }
        if(e.target.textContent >= '1' && e.target.textContent <= '9'){
            displayValue = displayValue + e.target.textContent;
            displayValue = Number(displayValue).toString()
            display.textContent = displayValue
        }
        answer = ''
    }
    
 
    
}

function signButton(e){

    if(!valueA){
        if(answer){
            valueA = answer
        }
        else{
        valueA = displayValue;
        }
        answer = ''
        displayValue = '0'
        currentSign = e.target.id
        calc.textContent = `${valueA}${WORDSIGNS[currentSign]}`
        display.textContent = displayValue
        
      
    }
    else{
        if(displayValue === ''){
            currentSign = e.target.id
            calc.textContent = `${valueA}${WORDSIGNS[currentSign]}`
            displayValue = '0'
            display.textContent = displayValue
            return
        }
        valueB = displayValue;
        answer = operate(WORDSIGNS[currentSign],valueA,valueB).toString();
        display.textContent = answer
        if(answerIsError()){
            answer = ''
            calc.textContent = `${valueA}${WORDSIGNS[currentSign]}${valueB}=`
            valueA = ''
            valueB = ''
            currentSign = ''
            displayValue = '0'
            
         }
         else{

            calc.textContent = `${valueA}${WORDSIGNS[currentSign]}${valueB}=`
            currentSign = e.target.id 
            calc.textContent += `${answer}${WORDSIGNS[currentSign]}`
            valueA = answer    
            displayValue = ''      
         }

        
        
        

        
    }
    
    console.log(currentSign)

}

function answerIsError(){
    
    return answer === "ERROR"
    
}

/* Calculations */

function add(a,b){

    return a+b
}

function subtract(a,b){
   return a-b
}

function multiply(a,b){
    return a*b
}

function divide(a,b){
    return a/b
}

function operate(operator,a,b){
    a = Number(a)
    b = Number(b)
    let result
    switch(operator){
        case "+":
            result = add(a,b)
            break

        case "-":
            result = subtract(a,b)
            break

        case "×":
            result = multiply(a,b)
            break

        case "÷":
            result = divide(a,b)
            break

        default:
            console.log(operator)
            break
    }

    if(isNaN(result) || !isFinite(result)){
        
        
        return "ERROR"
    }

    return Math.round(result*100000000)/100000000
}

