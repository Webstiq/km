const burgerBtn = document.querySelector('.burger-btn')
const navMobile = document.querySelector('.nav-mobile')
const navMobileLinks = document.querySelectorAll('.nav-mobile__link')
const navBtnBars = document.querySelector('.burger-btn__bars')
const cookieBox = document.querySelector('.cookie-box')
const cookieBtn = document.querySelector('.cookie-box__btn')
const allSections = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')

// Mobile Navigation

// Function for focus trap
const trapFocusMobile = e => {
	const focusable = [
		burgerBtn,
		...Array.from(navMobile.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')),
	]
	const first = focusable[0]
	const last = focusable[focusable.length - 1]

	if (e.key === 'Tab') {
		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault()
				last.focus()
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault()
				first.focus()
			}
		}
	}
}

// ⎋ Escape key handler
const handleEscape = e => {
	if (e.key === 'Escape') {
		closeMenu()
	}
}

const animateNavLinksIn = () => {

	navMobileLinks.forEach(item => {
		item.classList.remove('nav-mobile-item-animation')
		item.style.animationDelay = '0s'
	})

	let delayTime = 0
	setTimeout(() => {
		navMobileLinks.forEach(item => {
			void item.offsetWidth
			item.classList.add('nav-mobile-item-animation')
			item.style.animationDelay = '.' + delayTime + 's'
			delayTime++
		})
	}, 200)
}

const animateNavLinksOut = () => {
	navMobileLinks.forEach(item => {
		item.classList.remove('nav-mobile-item-animation')
		item.style.animationDelay = '0s'
	})
}

const openMenu = () => {
	navMobile.style.display = 'flex'
	navMobile.setAttribute('aria-hidden', 'false')

	burgerBtn.setAttribute('aria-expanded', 'true')
	document.addEventListener('keydown', trapFocusMobile)
	document.addEventListener('keydown', handleEscape)
	animateNavLinksIn()

	setTimeout(() => {
		navMobile.classList.add('nav-mobile--active')
	}, 200)
}

const closeMenu = () => {
	navMobile.classList.remove('nav-mobile--active')
	burgerBtn.setAttribute('aria-expanded', 'false')
	document.removeEventListener('keydown', trapFocusMobile)
	document.removeEventListener('keydown', handleEscape)
	animateNavLinksOut()
	burgerBtn.focus()

	setTimeout(() => {
		navMobile.style.display = 'none'
	}, 800)
}

// Burger change white/dark
const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
			burgerBtn.classList.add('burger-focus-black')
			burgerBtn.classList.remove('burger-focus-white')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
			burgerBtn.classList.add('burger-focus-white')
			burgerBtn.classList.remove('burger-focus-black')
		}
	})
}

// Cookie
const showCookie = () => {
	const cookieEaten = sessionStorage.getItem('cookie')
	if (cookieEaten) {
		cookieBox.classList.add('cookies-box--hide')
	}
}

const handleCookie = () => {
	sessionStorage.setItem('cookie', 'true')
	cookieBox.classList.add('cookies-box--hide')
}

// Current year
const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

showCookie()
handleCurrentYear()

burgerBtn.addEventListener('click', () => {
	if (!navMobile.classList.contains('nav-mobile--active')) {
		openMenu()
	} else {
		closeMenu()
	}
})

// Clicking on links in the menu closing menu
navMobileLinks.forEach(link => {
	link.addEventListener('click', closeMenu)
})

cookieBtn.addEventListener('click', handleCookie)
window.addEventListener('scroll', handleObserver)

// Force handleObserver on page load
window.addEventListener('load', () => {
	handleObserver() 
})
