//----------------- Enregistrement utilisateur ---------------------------
document.querySelector("#register").addEventListener("click", function () {
  const userInfos = {
    name: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    password: document.querySelector("#registerPassword").value,
  };

  fetch("https://weather-app-capsule-backend.vercel.app/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfos),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        window.location.assign("index.html");
      } else {
        document.querySelector("#registerName").textContent = "";
        document.querySelector("#registerEmail").textContent = "";
        document.querySelector("#registerPassword").textContent = "";
      }
    });
});
//----------------- Enregistrement utilisateur ---------------------------
document.querySelector("#connection").addEventListener("click", function () {
  const userInfos = {
    email: document.querySelector("#connectionEmail").value,
    password: document.querySelector("#connectionPassword").value,
  };

  fetch("https://weather-app-capsule-backend.vercel.app/users/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfos),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.result) {
        window.location.assign("index.html");
      } else {
        document.querySelector("#connectionEmail").value = "";
        document.querySelector("#connectionEmail").placeholder = "Mauvais identifiants"
        document.querySelector("#connectionPassword").value = "";
      }
    });
});
