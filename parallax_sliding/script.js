const SLIDE_PARALLAX_RATIO = 0.2;    // %

class Slider {
  
  constructor() {
    this.startX;
    this.currentX;
    this.diffX;
    this.isDragging;

    this.body;
    this.slider;
    this.indicator = [];
    this.slides = [];
    this.currentSlide;
    this.currentIndex = 0;

    this.body = document.getElementById('body');
    this.bodyLayer = document.getElementById('body-layer');
    this.slider = document.getElementById('slider');
    let indicator = document.getElementById('indicator');

    Array.from(document.getElementsByClassName('card-wrapper')).forEach((element, index) => {
      element.addEventListener('touchstart', (evt) => this.handleTouchStart(evt));
      element.addEventListener('touchmove', (evt) => this.handleTouchMove(evt));
      element.addEventListener('touchend', (evt) => this.handleTouchEnd(evt));
      element.addEventListener('mousedown', (evt) => this.handleTouchStart(evt));
      element.addEventListener('mousemove', (evt) => this.handleTouchMove(evt));
      element.addEventListener('mouseup', (evt) => this.handleTouchEnd(evt));
      let backgroundElement = element.querySelector('.card');
      let foregroundElement = element.querySelector('.animate-foreground');
      let slide = element;
      slide.backgroundElement = backgroundElement;
      slide.foregroundElement = foregroundElement;
      slide.startColor = this.getRandomColor();
      slide.endColor = this.getRandomColor();
      this.slides.push(slide);

      // Indicator
      let indicatorItem = document.createElement("div");
      indicatorItem.classList.add('indicator-item');
      if (index === 0) {
        indicatorItem.classList.add('indicator-item-highlight');
      }
      indicator.appendChild(indicatorItem);
      this.indicator.push(indicatorItem);
    });
    this.currentSlide = this.slides[this.currentIndex];
    this.updateColor(this.currentIndex);
  }
  
  handleTouchStart(evt) {
    this.isDragging = true;
    this.startX = evt.x;
  }

  handleTouchMove(evt) {
    if (this.isDragging) {
      this.currentX = evt.x;
      this.diffX = this.currentX - this.startX;
      if (Math.abs(this.diffX) > this.currentSlide.offsetWidth / 4) {
        this.diffX = Math.sign(this.diffX) * (this.currentSlide.offsetWidth / 4);
      }
      this.currentSlide.backgroundElement.style.transition = "";
      this.currentSlide.backgroundElement.style.transform = "translate(calc(-50% + " + this.diffX + "px), -50%)";
      this.currentSlide.foregroundElement.style.transition = "";
      this.currentSlide.foregroundElement.style.transform = "translate(calc(-50% - " + this.diffX*SLIDE_PARALLAX_RATIO + "px), -50%)";
    }
  }

  handleTouchEnd(evt) {
    this.isDragging = false;
    this.currentX = evt.x;
    this.diffX = this.currentX - this.startX;

    let slideWidth = this.slides[0].offsetWidth;
    if ((this.currentIndex === 0 && this.diffX > 0)
      || (this.currentIndex === this.slides.length - 1 && this.diffX < 0)
      || (Math.abs(this.diffX) < slideWidth/4)) {
        this.cancelSlide();
    } else if (this.diffX < 0) {
      this.changeSlide(this.currentIndex + 1);
    } else if (this.diffX > 0) {
      this.changeSlide(this.currentIndex - 1);
    }
  }

  changeSlide(slideIndex) {
    this.currentSlide.backgroundElement.style.transition = "transform ease-out 0.5s";
    this.currentSlide.backgroundElement.style.transform = "translate(-50% , -50%)";

    this.currentSlide.foregroundElement.style.transition = "transform ease-out 0.5s";
    this.currentSlide.foregroundElement.style.transform = "translate(-50%, -50%)";

    this.slider.style.cssText = `transform: translateX(${-slideIndex*this.slides[0].offsetWidth}px)`;
    this.updateColor(slideIndex);
    this.updateIndicator(slideIndex);
  }

  cancelSlide() {
    this.currentSlide.backgroundElement.style.transition = "transform ease-out 0.3s";
    this.currentSlide.backgroundElement.style.transform = "translate(-50% , -50%)";
    
    this.currentSlide.foregroundElement.style.transition = "transform ease-out 0.3s";
    this.currentSlide.foregroundElement.style.transform = "translate(-50%, -50%)";
  }

  updateIndicator(index) {
    this.indicator[this.currentIndex].classList.remove("indicator-item-highlight");
    this.indicator[index].classList.add("indicator-item-highlight");
    this.currentIndex = index;
    this.currentSlide = this.slides[this.currentIndex];
  }

  updateColor(nextIndex) {
    let nextSlide = this.slides[nextIndex];

    this.body.style.backgroundImage = "linear-gradient(" + this.currentSlide.startColor + ", " + this.currentSlide.endColor + ")";
    this.bodyLayer.style.backgroundImage =  "linear-gradient(" + nextSlide.startColor + ", " + nextSlide.endColor + ")";
    // this.bodyLayer.style.animation = "fadeOut 2s";
    this.bodyLayer.classList.remove("fade-in");
    void this.bodyLayer.offsetWidth;
    this.bodyLayer.classList.add("fade-in");
    console.log(this.body.style);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

main = () => {
  const slider = new Slider();
}

main();