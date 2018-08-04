import axios from "axios";

const API_URL = "https://api.github.com/users";

class Form {
  constructor(addCard, clearCards) {
    this.addCard = addCard;
    //  console.log(this.addCard);
    this.clearCards = clearCards;

    this.API_URL = "";
    this.searchTerm = "";
    this.searchInput = document.querySelector(".search");
    this.searchInput.addEventListener("keyup", () => {
      this.handleKeyup(event);
    });
    this.submitButton = document.querySelector(".button-primary");
    //searchTerm will corerced to boolean
    //!"" -> disabled = true, !"searchTerm" -> disabled = false
    if (this.searchTerm === "") {
      this.submitButton.disabled = !this.searchTerm;
    }

    this.clearButton = document.querySelector('button[type="button"]');
    this.clearButton.addEventListener("click", () => this.clearCards());

    this.form = document.querySelector("form");
    this.form.addEventListener("submit", () => {
      this.handleSubmit(event);
    });
  }
  handleKeyup(event) {
    // console.log(event);
    this.searchTerm = event.target.value.trim(); //trim() will remove whitespaces entered in URL
    this.API_URL = `${API_URL}/${this.searchTerm}`;
    //console.log(this.API_URL);
    this.submitButton.disabled = !this.searchTerm;
  }
  handleSubmit(event) {
    event.preventDefault();
    //console.log(event);
    axios
      .get(this.API_URL)
      // .then(response => console.log(response.data));
      .then(({ data }) => {
        // console.log(data);
        this.addCard(data);
      })
      .catch(error => this.formatError("Promise Rejected!", error));
    this.form.reset();
  }

  formatError(err) {
    // console.log(err);
    const errorText = document.createElement("p");
    errorText.style.color = "red";
    errorText.style.fontSize = "1.5em";
    errorText.style.fontStyle = "bold";
    errorText.innerText = "No user found.";
    this.form.appendChild(errorText);
    setTimeout(() => this.form.removeChild(errorText), 5000);
  }
}

export default Form;
