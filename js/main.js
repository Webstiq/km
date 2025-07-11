const burgerBtn = document.querySelector('.burger-btn')
const navMobile = document.querySelector('.nav-mobile')
const navMobileLink = document.querySelectorAll('.nav-mobile__link')
const navBtnBars = document.querySelector('.burger-btn__bars')
const cookieBox = document.querySelector('.cookie-box')
const cookieBtn = document.querySelector('.cookie-box__btn')
const allSections = document.querySelectorAll('.section')
const footerYear = document.querySelector('.footer__year')



// Mobile Navigation
const handleNav = () => {
	navMobile.classList.toggle('nav-mobile--active')

	navMobileLink.forEach(item => {
		item.classList.toggle('nav-mobile-item-animation')

		item.addEventListener('click', () => {
			navMobile.classList.remove('nav-mobile--active')
		})
	})
	navMobileItemAnimation()
}

const navMobileItemAnimation = () => {
	let delayTime = 0

	navMobileLink.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = '.' + delayTime + 's'
		delayTime++
	})
}

// Burger change white/dark
const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
		}
	})
}

// Cookie
const showCookie = () => {
	const cookieEaten = sessionStorage.getItem('cookie')
	if(cookieEaten){
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


burgerBtn.addEventListener('click', handleNav)
cookieBtn.addEventListener('click', handleCookie)
window.addEventListener('scroll', handleObserver)
