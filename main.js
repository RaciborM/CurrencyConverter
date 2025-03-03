const amountOne = document.querySelector('.amount-one')
const currencyOne = document.querySelector('#currency-one')
const amountTwo = document.querySelector('.amount-two')
const currencyTwo = document.querySelector('#currency-two')

const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')

const API_KEY = '8c2956d22b30604c640bccd100f29e19'

async function calculate() {
	const response = await fetch(
		`https://api.exchangerate.host/live?access_key=${API_KEY}&source=${currencyOne.value}&currencies=${currencyTwo.value}`
	)
	const data = await response.json()

	const currency1 = currencyOne.value
	const currency2 = currencyTwo.value
	const rate = data.quotes[currency1 + currency2]
	rateInfo.textContent = `1 ${currency1}=${rate.toFixed(4)} ${currency2}`

	amountTwo.value = (amountOne.value * rate).toFixed(2)
	console.log(data)
}

const swap = () => {
	let oldValue = currencyOne.value
	currencyOne.value = currencyTwo.value
	currencyTwo.value = oldValue

	calculate()
}

currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
swapBtn.addEventListener('click', swap)

calculate()
