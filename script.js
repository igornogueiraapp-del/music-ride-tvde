const languages = document.querySelectorAll(".language");
const musicScreen = document.getElementById("musicScreen");

languages.forEach(language => {
  language.addEventListener("click", () => {
    musicScreen.classList.add("active");
  });
});
