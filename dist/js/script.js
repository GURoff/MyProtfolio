const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeElem = document.querySelector(".menu__close");

hamburger.addEventListener("click", () => {
  menu.classList.add("active");
});

closeElem.addEventListener("click", () => {
  menu.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    menu.classList.remove("active");
  }
});
