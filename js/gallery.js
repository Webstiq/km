const galleryButtons = document.querySelectorAll('.gallery__item')
const popup = document.querySelector('.gallery__popup')
const popupImg = document.querySelector('.gallery__popup-img')
const popupCloseBtn = document.querySelector('.gallery__popup-close')
const popupLeftBtn = document.querySelector('.gallery__popup-arrow--left')
const popupRightBtn = document.querySelector('.gallery__popup-arrow--right')

let currentImgIndex

const trapFocusPopup = e => {
	const focusable = Array.from(
		popup.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])')
	)
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

const showPopup = e => {
	const button = e.currentTarget
	popup.classList.add('popup-img--active')

	popupImg.src = button.dataset.src
	popupImg.alt = button.dataset.alt
	currentImgIndex = parseInt(button.getAttribute('data-index'))

	// Block gallery buttons
	galleryButtons.forEach(btn => (btn.disabled = true))

	document.addEventListener('keydown', trapFocusPopup)
	popupCloseBtn.focus()
}

galleryButtons.forEach((button, index) => {
	button.addEventListener('click', showPopup)
	button.setAttribute('data-index', index)
})

const nextImg = () => {
	currentImgIndex = (currentImgIndex + 1) % galleryButtons.length
	const nextBtn = galleryButtons[currentImgIndex]
	popupImg.src = nextBtn.dataset.src
	popupImg.alt = nextBtn.dataset.alt
}

const previousImg = () => {
	currentImgIndex = (currentImgIndex - 1 + galleryButtons.length) % galleryButtons.length
	const prevBtn = galleryButtons[currentImgIndex]
	popupImg.src = prevBtn.dataset.src
	popupImg.alt = prevBtn.dataset.alt
}

const popupArrowKey = e => {
	if (e.code === 'ArrowRight') nextImg()
	else if (e.code === 'ArrowLeft') previousImg()
	else if (e.code === 'Escape') closePopup()
}

const closePopup = () => {
	popup.classList.add('popup-img--fadeOut')
	setTimeout(() => {
		popup.classList.remove('popup-img--active', 'popup-img--fadeOut')
	}, 500)

	// Unblock gallery buttons
	galleryButtons.forEach(btn => (btn.disabled = false))
	document.removeEventListener('keydown', trapFocusPopup)
	galleryButtons[currentImgIndex].focus()
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// Mobile POPUP

let startX = 0
let startY = 0
let endX = 0
let endY = 0

// Function called on touch start
const handleTouchStart = e => {
	startX = e.touches[0].clientX // Initial horizontal touch position
	startY = e.touches[0].clientY // Initial vertical touch position
}

// Function called when moving a finger
const handleTouchMove = e => {
	endX = e.touches[0].clientX // 	Current horizontal touch position
	endY = e.touches[0].clientY // 	Current vertical touch position

	if (popup.classList.contains('popup-img--active')) {
		e.preventDefault()
	}
}

// Function called after touch is finished
const handleTouchEnd = () => {
	const diffX = startX - endX
	const diffY = startY - endY

	if (Math.abs(diffX) > Math.abs(diffY)) {
		// Horizontal gesture
		if (diffX > 50) {
			nextImg()
		} else if (diffX < -50) {
			previousImg()
		}
	} else {
		// Vertical gesture
		if (diffY > 50) {
			closePopup()
		} else if (diffY < -50) {
			closePopup()
		}
	}

	// Reset
	startX = 0
	startY = 0
	endX = 0
	endY = 0
}

popup.addEventListener('touchstart', handleTouchStart)
popup.addEventListener('touchmove', handleTouchMove)
popup.addEventListener('touchend', handleTouchEnd)
// // -----------------------------------------------------------------------
// // -----------------------------------------------------------------------

popupCloseBtn.addEventListener('click', closePopup)
popupLeftBtn.addEventListener('click', previousImg)
popupRightBtn.addEventListener('click', nextImg)
document.addEventListener('keydown', popupArrowKey)
popup.addEventListener('click', e => {
	if (e.target === popup) {
		closePopup()
	}
})
