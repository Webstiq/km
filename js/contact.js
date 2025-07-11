const msgStatus = document.querySelector('.contact__status')
const username = document.querySelector('#name')
const email = document.querySelector('#email')
const msg = document.querySelector('#msg')
const checkBox = document.querySelector('#consent')
const contactSatus = document.querySelector('.contact__form-error')
const sendBtn = document.querySelector('.contact__form-btn')


//Contact Form
const showError = (message) => {
    contactSatus.classList.add('contact__status--active')
    contactSatus.textContent = message
}

const clearError = () => {
    contactSatus.classList.remove('contact__status--active')
    contactSatus.textContent = ''
}

const checkForm = () => {
    if (username.value === '' || email.value === ''  || msg.value === '' ) {
        showError('Nie uzupełniono wszystkich pól!')
		return false
    } else {
        clearError()
		return true
    }
}

const checkMail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (re.test(email.value) && email.value !== ''){
        clearError()
		return true
    } else{
        showError('Email jest niepoprawny')
		return false
    }
}

const ischecked = () => {
	if (!checkBox.checked) {
		showError('Nie wyrażono zgody!')
        return false
	} else {
		clearError()
        return true
	}
}

// Funciot used fot demonstration purposes
const sendStatus = () => {
	
	username.value = '' 
	email.value = ''
	msg.value = ''
	checkBox.checked = false;
	alert('Email został wysłany')
}

const validateForm = event => {
	clearError()

	if (!checkForm()) {
		event.preventDefault()
		return
	}

	if (!checkMail(email)) {
		event.preventDefault()
		return
	}

	if (!ischecked()) {
		event.preventDefault()
		return
	}

	sendStatus()
}

sendBtn.addEventListener('click', e => {
	e.preventDefault() // Don't send email. Demonstration purposes
	validateForm(e)
})