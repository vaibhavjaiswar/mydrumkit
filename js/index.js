const clickDrumPads = document.querySelectorAll('.drumpads')
const padsActive = document.querySelectorAll('.pad-active')
const playBtn = document.getElementById('play-btn')
const stopBtn = document.getElementById('stop-btn')

const drumURL = [
	'./sounds/kick_hard.ogg',
	'./sounds/snare.ogg',
	'./sounds/hihat_closed.ogg',
	'./sounds/crash.ogg',
	'./sounds/hihat_opened.ogg',
]
const numOfInstruments = drumURL.length
let drumpads = []
let position = null
let counter = 0
let tempo = 100
let numOfPads = 16
let delay = 15000/tempo
let status = 'stopped'

stopBtn.disabled = true
stopBtn.classList.add('disabled')
// console.log()

//-------------------- Mouse Click Drums --------------------
const hit = (index) => {
	// console.log(index, drums_array[index], 'Hit')
	new Audio(drumURL[index]).play()
	clickDrumPads[index].classList.add('drumpad-hit')
	setTimeout(() => {
		clickDrumPads[index].classList.remove('drumpad-hit')
	}, 100)
}


//-------------------- KeyBoard Drums --------------------
document.addEventListener("keypress", (key) => {
	// console.log(key.code, 'pressed.')
	const keyCode = key.code
	switch(keyCode) {
		case 'KeyZ':
		case 'KeyS':
				new Audio(drumURL[0]).play()
				clickDrumPads[0].classList.add('drumpad-hit')
				setTimeout(() => {
					clickDrumPads[0].classList.remove('drumpad-hit')
				}, 100)
		break;
		case 'KeyX':
		case 'KeyD':
				new Audio(drumURL[1]).play()
				clickDrumPads[1].classList.add('drumpad-hit')
				setTimeout(() => {
					clickDrumPads[1].classList.remove('drumpad-hit')
				}, 100)
		break;
		case 'KeyC':
		case 'KeyF':
				new Audio(drumURL[2]).play()
				clickDrumPads[2].classList.add('drumpad-hit')
				setTimeout(() => {
					clickDrumPads[2].classList.remove('drumpad-hit')
				}, 100)
		break;
		case 'KeyV':
		case 'KeyG':
				new Audio(drumURL[3]).play()
				clickDrumPads[3].classList.add('drumpad-hit')
				setTimeout(() => {
					clickDrumPads[3].classList.remove('drumpad-hit')
				}, 100)
		break;
		default:
				
		break;
	}
})


//-------------------- Digi drumpads --------------------
// Initializing drumpads variable
for (var i = 0; i < numOfPads; i++) {
	drumpads.push([])
	for (var j = 0; j < numOfInstruments; j++) {
		drumpads[i].push(false)
	}
}

// Start playing
const digiplay = () => {
	// console.log('Digi DrumPad Playing...')
	status = 'playing'
	playBtn.disabled = true
	playBtn.classList.add('disabled')
	stopBtn.disabled = false
	stopBtn.classList.remove('disabled')

	position = window.setInterval(() => {		
		drumpads[counter].map((play,i) => {
			if (play) {
				new Audio(drumURL[i]).play()
				padsActive[i].classList.add('hit')
				setTimeout(() => {
					padsActive[i].classList.remove('hit')
				},300)
			}
		})
		counter++
		if (counter >= numOfPads) {
			counter = 0
		}
	}, delay)
}

// Stop playing
const digistop = () => {
	status = 'stopped'
	stopBtn.disabled = true
	stopBtn.classList.add('disabled')
	playBtn.disabled = false
	playBtn.classList.remove('disabled')

	clearInterval(position)
	// console.log('Digi DrumPad Stopped.')
}

// Shows activated drumpad
const activate = ([i,j]) => {
	const pad = document.querySelectorAll('.pad')[i*16 + j]
	pad.classList.toggle('on')
	if (drumpads[j][i]) {
		drumpads[j][i] = false
	} else {
		drumpads[j][i] = true
	}
}

// Set tempo
const setTempo = () => {
	const temp = document.getElementById('tempo').value
	if (0 < temp && temp < 500) {
		tempo = temp
		delay = 15000/tempo
		digistop()
	} else {
		alert('Tempo should be 0 < tempo < 300.')
	}
}

window.addEventListener('keypress', (key) => {
	if (key.code == 'Space') {
		if (status == 'stopped') {
			counter = 0
			digiplay()
		} else {
			digistop()
		}
	}
})