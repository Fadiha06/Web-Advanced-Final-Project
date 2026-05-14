const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add("dark"); // default
}

const btn = document.getElementById("theme-toggle");

function updateButton() {
  if (document.body.classList.contains("light")) {
    btn.textContent = "🌙"; // dark mode icon
  } else {
    btn.textContent = "☀️"; // light mode icon
  }
}

updateButton();

btn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");

  const newTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);

  updateButton();
});