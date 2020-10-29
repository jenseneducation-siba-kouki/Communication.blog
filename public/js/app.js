document.querySelectorAll("form").forEach((item) => {
  if (item.id === "login-form") item.addEventListener("submit", loginUser);
  if (item.id === "signup-form") item.addEventListener("submit", registerUser);
  if (item.id === "post-form") item.addEventListener("submit", createForm);
});

function registerUser(e) {
  e.preventDefault();
  const name = e.target.querySelector("#name").value;
  const email = e.target.querySelector("#email").value;
  const password = e.target.querySelector("#password").value;
  const repeatPassword = e.target.querySelector("#repeatPassword").value;

  const input = {
    name,
    email,
    password,
    repeatPassword,
  };
  if (
    input.name == "" ||
    input.email == "" ||
    input.password == "" ||
    input.repeatPassword == ""
  ) {
    console.log("Please fill in field(s)");
    return;
  }

  fetch("/api/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .then(() => (location.href = "/login"));
}

function loginUser(e) {
  e.preventDefault();

  let email = e.target.querySelector("#email").value;
  let password = e.target.querySelector("#password").value;

  const input = {
    email,
    password,
  };
  if (input.email == "" || input.password == "") {
    console.log("Please fill in field(s)");
    return;
  }

  fetch("/api/auth", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  }).then(() => (location.href = "/dashboard"));
}

function createForm(e) {
  e.preventDefault();

  let title = e.target.querySelector("#title").value;
  let content = e.target.querySelector("#content").value;

  const input = {
    title,
    content,
  };
  if (input.title == "" || input.content == "") {
    console.log("Please fill in field(s)");
    return;
  }
  fetch("/api/posts", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then((res) => res.json())
    .then((data) => (location.href = "/api/posts"));
}
