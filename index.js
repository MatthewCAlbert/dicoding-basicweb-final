// Handler
function toggleAside() {
  const aside = document.querySelector(".aside-wrapper");
  if (aside.classList.contains("active")) {
    aside.classList.remove("active");
  } else {
    aside.classList.add("active");
  }
}

let navOffset = document.querySelector("nav.main-nav").offsetTop;

window.addEventListener("scroll", (e) => {
  let tgt = document.querySelector("nav.main-nav").classList;
  let top = window.pageYOffset || document.documentElement.scrollTop;
  if (top > navOffset - 1) {
    tgt.add("nav-sticky");
  } else {
    tgt.remove("nav-sticky");
  }
});

// Mobile Menu Toggler
function toggleMenu() {
  let menuTgt = document.querySelector(".wrapped-menu").classList;
  if (menuTgt.contains("active")) menuTgt.remove("active");
  else menuTgt.add("active");
}

// Dropdown
const handleDropdownClick = (e) => {
  let dropdownTgt = document.getElementById(
    e.target.getAttribute("data-target")
  ).classList;

  if (dropdownTgt.contains("active")) dropdownTgt.remove("active");
  else dropdownTgt.add("active");
};

document.querySelectorAll(".dropdown-toggle").forEach((el) => {
  el.addEventListener("click", (e) => handleDropdownClick(e));
});

document.querySelectorAll(".dropdown-wrapper i").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// Slider
let slider = document.getElementById("slider-1");
slider.current_slide = 0;
slider.autoplay = true;
slider.arrows = true;
slider.autoplayDelay = 5000;
slider.pauseAutoplayOnHover = true;

// Get max slide
slider.slideMaxIndex = slider.querySelectorAll(".slider-item").length - 1;

// Generate slider dots navigation
for (let i = 0; i < slider.slideMaxIndex + 1; i++) {
  let dot = document.createElement("span");
  dot.setAttribute("data-target", i);
  slider.querySelector(".slider-dots").appendChild(dot);
}

// Initiate function
slider.showSlide = (e) => {
  e.classList.remove("put-left", "put-right");
};
slider.nextSlide = () => {
  const nextSlide =
    slider.current_slide + 1 > slider.slideMaxIndex
      ? 0
      : slider.current_slide + 1;
  slider.setSlide(nextSlide);
};
slider.prevSlide = () => {
  const prevSlide =
    slider.current_slide - 1 < 0
      ? slider.slideMaxIndex
      : slider.current_slide - 1;
  slider.setSlide(prevSlide);
};
slider.setSlide = (index) => {
  slider.querySelectorAll(".slider-item").forEach((e, id) => {
    if (id !== index) {
      const aSlide = e.classList;
      if (id > index) {
        aSlide.remove("put-left");
        aSlide.add("put-right");
      } else {
        aSlide.remove("put-right");
        aSlide.add("put-left");
      }
    }
  });
  slider.current_slide = index;
  slider.querySelectorAll(".slider-dots > *").forEach((e, id) => {
    if (id !== index) e.classList.remove("active");
    else e.classList.add("active");
  });
  slider.showSlide(slider.querySelectorAll(".slider-item")[index]);
};

// Initial Slider Setup
slider.querySelectorAll(".slider-item").forEach((e, index) => {
  if (index > 0) e.classList.add("put-right");
});

// Adding event listener to dots navigation
slider.querySelectorAll(".slider-dots > *").forEach((e, index) => {
  if (index === 0) e.classList.add("active");
  e.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-target");
    slider.setSlide(parseInt(id));
  });
});

// Adding event listener to arrow navigation
if (slider.arrows) {
  slider
    .querySelector(".slider-nav-left")
    .addEventListener("click", slider.prevSlide);
  slider
    .querySelector(".slider-nav-right")
    .addEventListener("click", slider.nextSlide);
} else {
  try {
    slider.querySelector(".slider-nav-left").remove();
    slider.querySelector(".slider-nav-right").remove();
  } catch (e) {}
}

// Added extra
slider.ishovering = false;
slider.addEventListener("mouseover", () => {
  slider.ishovering = true;
});
slider.addEventListener("mouseout", () => {
  slider.ishovering = false;
});
slider.autoplayInterval = slider.autoplay
  ? setInterval(() => {
      if (!slider.ishovering || !slider.pauseAutoplayOnHover)
        slider.nextSlide();
    }, slider.autoplayDelay)
  : "";
