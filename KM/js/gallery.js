const images = document.querySelectorAll('.gallery__item-img')
const image = document.querySelector('.gallery__item-img')
const popup = document.querySelector('.gallery__popup')
const popupImg = document.querySelector('.gallery__popup-img')
const popupCloseBtn = document.querySelector('.gallery__popup-close')
const popupLeftBtn = document.querySelector('.gallery__popup-arrow--left')
const popupRightBtn = document.querySelector('.gallery__popup-arrow--right')

let currentImgIndex

const showPopup = e => {
	popup.classList.toggle('popup-img--active')

	popupImg.src = e.target.src
	currentImgIndex = parseInt(e.target.getAttribute('id'))

	images.forEach(item => {
		item.setAttribute('tabindex', -1)
	})
}

images.forEach((item, index) => {
	item.addEventListener('click', showPopup)
	item.addEventListener('keydown', e => {
		if (e.code === 'Enter' || e.keyCode === 13) {
			showPopup(e)
		}
	})
	item.setAttribute('id', index)
})

const nextImg = () => {
	if (currentImgIndex < images.length - 1) {
		currentImgIndex++
		popupImg.src = images[currentImgIndex].src
	} else {
		currentImgIndex = 0
		popupImg.src = images[currentImgIndex].src
	}
}

const previousImg = () => {
	if (currentImgIndex > 0) {
		currentImgIndex--
		popupImg.src = images[currentImgIndex].src
	} else if (currentImgIndex < 1) {
		currentImgIndex = images.length - 1
		popupImg.src = images[currentImgIndex].src
	}
}

const popupArrowKey = e => {
	if (e.code === 'ArrowRight' || e.keyCode === 39) {
		nextImg()
	} else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
		previousImg()
	} else if (e.key === 'Escape' || e.keyCode === 27) {
		closePopup()
	}
}

const closePopup = () => {
	popup.classList.add('popup-img--fadeOut')
	setTimeout(() => {
		popup.classList.remove('popup-img--active')
		popup.classList.remove('popup-img--fadeOut')
	}, 500)

	images.forEach(item => {
		item.setAttribute('tabindex', 0)
	})
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
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

image.addEventListener('click', showPopup)
popupCloseBtn.addEventListener('click', closePopup)
popupLeftBtn.addEventListener('click', previousImg)
popupRightBtn.addEventListener('click', nextImg)
document.addEventListener('keydown', popupArrowKey)
popup.addEventListener('click', e => {
	if (e.target === popup) {
		closePopup()
	}
})
