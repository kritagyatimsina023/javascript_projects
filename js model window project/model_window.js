const show_modal = document.querySelectorAll(".show-modal");
let close_modal = document.querySelector(".close-modal");
let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");

show_modal.forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("hidden");
    document.querySelector(".overlay").classList.remove("hidden");
    close_modal.addEventListener("click", function () {
      document.querySelector(".modal").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    });
    overlay.addEventListener("click", function () {
      document.querySelector(".modal").classList.add("hidden");
      overlay.classList.add("hidden");
    });
  });
});
document.addEventListener("keydown", function (events) {
  if (events.key == "Escape") {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
