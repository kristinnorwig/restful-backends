const state = {
  linkedinUser: [],
};

let count = 0;

function kopf() {
  const headerEl = document.querySelector("header");
  const phead = document.createElement("p");
  headerEl.innerHTML = "";
  headerEl.appendChild(phead);

  phead.innerText = count + " " + "pending invitation";
}

kopf();

function getContacts() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((jsonData) => {
      state.linkedinUser = jsonData;
      renderContacts();
    });
}

getContacts();

function renderContacts() {
  const mainEl = document.querySelector("main");
  for (let contact of state.linkedinUser) {
    const bgImgSection = document.createElement("header");
    const contactBlockEl = document.createElement("article");
    mainEl.appendChild(contactBlockEl);
    mainEl.appendChild(bgImgSection);

    const backgroundImageEl = document.createElement("img");
    backgroundImageEl.src = contact.backgroundImage;
    bgImgSection.appendChild(backgroundImageEl);

    const profilePicEl = document.createElement("img");
    profilePicEl.src = contact.picture;
    contactBlockEl.appendChild(profilePicEl);

    const titleEl = document.createElement("p");
    titleEl.innerText = contact.name.title;
    contactBlockEl.appendChild(titleEl);

    const firstNameEl = document.createElement("p");
    firstNameEl.innerText = contact.name.first;
    contactBlockEl.appendChild(firstNameEl);

    const lastNameEl = document.createElement("p");
    lastNameEl.innerText = contact.name.last;
    contactBlockEl.appendChild(lastNameEl);

    const professionEl = document.createElement("p");
    professionEl.innerText = contact.title;
    contactBlockEl.appendChild(professionEl);

    const mutualConnections = document.createElement("p");
    mutualConnections.innerText =
      contact.mutualConnections + " " + "mutual connections";
    contactBlockEl.appendChild(mutualConnections);

    const btn = document.createElement("button");
    btn.textContent = "Connect";
    contactBlockEl.appendChild(btn);
    btn.addEventListener("click", function () {
      if (btn.innerText === "Connect") {
        btn.innerText = "Pending";
        count += 1;
      } else if (btn.innerText === "Pending") {
        btn.innerText = "Connect";
        count -= 1;
      }

      kopf();
    });
  }
}
