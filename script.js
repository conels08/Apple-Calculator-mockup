const displayEl = document.getElementById("display")
const numberBtn = document.querySelectorAll(".number")
const clearBtn = document.getElementById("clear")
const deleteBtn = document.getElementById("delete")
const percentBtn = document.getElementById("percent")
const operatorBtns = document.querySelectorAll(".operator:not(#equals)")
const equalsBtn = document.getElementById("equals")

let firstOperand = ""
let secondOperand = ""
let operator = ""
let shouldResetDisplay = false

function loveMsg(screen) {
  if (screen === 2) {
  displayEl.value = "Colby ❤️'s Monica"
}
}

operatorBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    firstOperand = displayEl.value
    operator = btn.textContent
    shouldResetDisplay = true
    displayEl.value += ` ${operator} `
  })
})

numberBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    if (shouldResetDisplay) {
      // Only clear if we *just* finished an evaluation (not after operator)
      if (!displayEl.value.includes(` ${operator} `)) {
        displayEl.value = ""
      }
      shouldResetDisplay = false
    }
    displayEl.value += btn.textContent
  })
})


equalsBtn.addEventListener("click", () => {
  // console.log("Display Value:", displayEl.value)
  // console.log("Operator Stored:", operator)
  const parts = displayEl.value.split(` ${operator} `)
  // console.log("Split Result:", parts)

  if (parts.length !== 2) {
    displayEl.value = "Error"
    return
  }

  firstOperand = parts[0].trim()
  secondOperand = parts[1].trim()
  const result = calculate(firstOperand, secondOperand, operator)
  
  displayEl.value = result
  loveMsg(result)
  shouldResetDisplay = true
})

clearBtn.addEventListener("click", () => {
  displayEl.value = ""
  operator = ""
})

deleteBtn.addEventListener("click", () => {
  if (displayEl.value !== "") {
    displayEl.value = displayEl.value.slice(0, -1)
  }
})

function calculate(a, b, op) {
  a = parseFloat(a)
  b = parseFloat(b)

  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "x":
      return a * b
    case "/":
      return b !== 0 ? a /b: "Error"
    default:
      return "Invalid"
  }
}



