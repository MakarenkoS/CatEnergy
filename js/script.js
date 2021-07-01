var menu = document.querySelector(".main-navigation");
var toggle = document.querySelector(".main-navigation__toggle");

menu.classList.remove("main-navigation--nojs");

toggle.addEventListener("click", function () {
  if (menu.classList.contains("main-navigation--opened")) {
    menu.classList.remove("main-navigation--opened");
    menu.classList.add("main-navigation--closed");
  } else {
    menu.classList.remove("main-navigation--closed");
    menu.classList.add("main-navigation--opened");
  }
});

let mobileSlide = document.querySelector(".slider__bar")




class ExampleSlider {
  constructor(slider) {
    this.sliderScale = slider.querySelector(".slider__scale");
    this.sliderBar = slider.querySelector(".slider__bar")
    this.sliderToggle = slider.querySelector(".slider__toggle");
    this.imageBefore = slider.querySelector(".slider__image--before")
    this.imageAfter = slider.querySelector(".slider__image--after")

    this.togglePositions = {
      start: 195,
      end: -210,
    }

    this.sliderBar.addEventListener("click", (e) => this.changePictureMobile(e))
    this.sliderToggle.addEventListener("mousedown", (e) => {
      this.handlerMouseDown(e, this.sliderToggle)
    })

    let render = () => {
      if (document.documentElement.scrollWidth > 768) {
        this.sliderBar.classList.remove('slider__bar--swap')
        this.imageBefore.style.clip = `rect(auto, 340px, auto, auto)`;
        this.imageAfter.style.clip = `rect(auto, auto, auto, 340px)`;

        console.log('>768')

      } else {
        console.log('<768')

      }
    }


    render()

    window.addEventListener('resize', e => {
      render()
    }, false)

    this.sliderToggle.ondragstart = function () {
      return false;
    }
  }

  changePictureMobile(e) {
    if (document.documentElement.scrollWidth <= 768) {
      e.preventDefault();
      console.log('mobile redner');
      this.sliderBar.classList.toggle('slider__bar--swap')
      if (this.sliderBar.classList.contains('slider__bar--swap')) {
        this.imageBefore.style.clip = `rect(auto, 0, auto, auto)`;
        this.imageAfter.style.clip = `rect(auto, auto, auto, 0)`;
      } else {
        this.imageBefore.style.clip = `rect(auto, 240px, auto, auto)`;
        this.imageAfter.style.clip = `rect(auto, auto, auto, 240px)`;
      }
    }
  }

  handlerMouseDown(e, handler) {
    if (document.documentElement.scrollWidth > 768) {
      e.preventDefault();
      let sliderScale = this.sliderScale;
      let shiftX = event.clientX - handler.getBoundingClientRect().left + 200;
      let imageBefore = this.imageBefore;
      let imageAfter = this.imageAfter;

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function changePicture(newLeft) {

        let offset = (imageBefore.offsetWidth / 2) - newLeft * (imageBefore.offsetWidth / sliderScale.offsetWidth)
        imageBefore.style.clip = `rect(auto, ${offset}px, auto, auto)`
        imageAfter.style.clip = `rect(auto, auto, auto, ${offset}px)`
      }

      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - sliderScale.getBoundingClientRect().left;
        if (newLeft > 200) {
          newLeft = 200
        }
        if (newLeft < -210) {
          newLeft = -210
        }
        handler.style.left = newLeft + "px";
        changePicture(newLeft)
      }



      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
    }
  }
}

const slider = document.querySelector('.slider')
const exampleSlider = new ExampleSlider(slider)