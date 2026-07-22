const filterButtons = document.querySelectorAll(".filter-button");
const postCards = document.querySelectorAll(".post-card");
const searchInput = document.querySelector("#site-search");
const newsletterForm = document.querySelector("#newsletter-form");
const formMessage = document.querySelector("#form-message");

let activeFilter = "all";

function normalize(value) {
  return value.trim().toLowerCase();
}

function updatePosts() {
  const searchTerm = normalize(searchInput.value);

  postCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchableText = `${card.textContent} ${card.dataset.search}`;
    const matchesSearch = normalize(searchableText).includes(searchTerm);
    card.hidden = !(matchesFilter && matchesSearch);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updatePosts();
  });
});

searchInput.addEventListener("input", updatePosts);

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(newsletterForm).get("email");
  formMessage.textContent = `${email} is on the ShieldPoint list.`;
  newsletterForm.reset();
});
