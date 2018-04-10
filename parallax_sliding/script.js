const SLIDE_PARALLAX_RATIO = 0.8;

class Slider {
  
  constructor() {
    this.startX;
    this.currentX;
    this.diffX;
    this.isDragging;
    this.slides = 0;
    this.currentIndex = 0;
    this.slider;
    this.firstSlide;

    this.slider = document.getElementById('slider');

    Array.from(document.getElementsByClassName('card-wrapper')).forEach((element, index) => {
      if(index === 0) {
        this.firstSlide = element;
      }

      element.addEventListener('touchstart', (evt) => this.handleTouchStart(evt));
      element.addEventListener('touchmove', (evt) => this.handleTouchMove(evt));
      element.addEventListener('touchend', (evt) => this.handleTouchEnd(evt));
      element.addEventListener('mousedown', (evt) => this.handleTouchStart(evt));
      element.addEventListener('mousemove', (evt) => this.handleTouchMove(evt));
      element.addEventListener('mouseup', (evt) => this.handleTouchEnd(evt));
      this.slides++;
    });
  }
  
  handleTouchStart(evt) {
    this.isDragging = true;
    this.startX = evt.x;
  }

  handleTouchMove(evt) {
    if (this.isDragging) {
      this.currentX = evt.x;
      this.diffX = this.currentX - this.diffX;
    }
  }

  handleTouchEnd(evt) {
    this.isDragging = false;
    this.currentX = evt.x;
    this.diffX = this.currentX - this.startX;

    let slideWidth = this.firstSlide.offsetWidth;
    if ((this.currentIndex === 0 && this.diffX > 0)
      || (this.currentIndex === this.slides - 1 && this.diffX < 0)
      || (Math.abs(this.diffX) < slideWidth/4)) {
        this.cancelSlide();
    } else if (this.diffX < 0) {
      this.changeSlide(this.currentIndex + 1);
    } else if (this.diffX > 0) {
      this.changeSlide(this.currentIndex - 1);
    }
  }

  changeSlide(slideIndex) {
    this.slider.style.cssText = `transform: translateX(${-slideIndex*this.firstSlide.offsetWidth}px)`;
    this.currentIndex = slideIndex;
  }

  cancelSlide() {
    this.slider.style.cssText = `transform: translateX(${-this.currentIndex*this.firstSlide.offsetWidth}px)`;
  }
}

main = () => {
  const slider = new Slider();
}

main();