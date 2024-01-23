/* WhiteBoard

How can we store state of the calculator? How are we tracking?

After a user click on a certain button, what code am i going to run?

Try not to use a separate event handler for each button.
    use for loop or forEach()

*/

const display = document.getElementById('display')
const numButtons = document.querySelectorAll('.numButton')
const opButtons = document.querySelectorAll('.opButton')
const clearButton = document.getElementById('btnClear')
const equalsButton = document.getElementById('btnEquals')
let previousInput = ''
let currentInput = ''
let currentOperation = null

//loop through each number button and add an eventlistener when user clicks
numButtons.forEach((button) => {
	button.addEventListener('click', function (event) {
		currentInput += event.target.innerHTML
		updateDisplay()
	})
})

//loop through each operator button and add an eventlistener when user clicks
opButtons.forEach((button) => {
	button.addEventListener('click', function (event) {
		operator(event.target.innerHTML)
	})
})
//Create function for when an operator is clicked
function operator(operator) {
	if (currentInput === '') {
		return
	}
	if (previousInput !== '') {
		calculate()
	}
	currentOperation = operator
	previousInput = currentInput
	currentInput = ''
}
//Update the display with the currentInput
function updateDisplay() {
	display.value = currentInput
}
//Perform the calculation based on what was clicked
function calculate() {
	let result = ''
	const previous = parseFloat(previousInput)
	const current = parseFloat(currentInput)

	if (!isFinite(previous) || !isFinite(current)) {
		//checking to see if the number is a number
		return // value, if not return
	}
	//check currentOperation and perform calculation based on operator chosen
	if (currentOperation === '+') {
		result = previous + current
	} else if (currentOperation === '-') {
		result = previous - current
	} else if (currentOperation === 'x') {
		result = previous * current
	} else if (currentOperation === '÷') {
		if (current === 0) {
			display.value = 'ERROR'
			return
		}
		result = previous / current
	} else {
		return
	}

	currentInput = result.toString()
	previousInput = ''
	currentOperation = null
	updateDisplay()
}
//update the display and return back to 0
function clear() {
	previousInput = ''
	currentInput = ''
	currentOperation = null
	updateDisplay()
}
clearButton.addEventListener('click', clear)
equalsButton.addEventListener('click', calculate)
