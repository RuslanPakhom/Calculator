let displayValue = '0'
let valueA = 0
let isDot = false
const screen = document.querySelector('.screen')
const numbers = document.querySelectorAll('.numeric')

numbers.forEach((number) => {
    number.addEventListener('click',(e) => {
        
    })
})

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
    let result
    switch(operator){
        case "+":
            result = add(a,b)
            break

        case "-":
            result = subtract(a,b)
            break

        case "*":
            result = multiply(a,b)
            break

        case "/":
            result = divide(a,b)
            break

        default:
            console.log(operator)
            break
    }

    return result
}

function populateDisplayValue(){

}

console.log(operate("+",11,22))
console.log(operate("-",11,22))
console.log(operate("/",11,22))
console.log(operate("*",11,22))