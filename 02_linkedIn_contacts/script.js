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

function getContact() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((jsonData) => {
      state.linkedinUser = jsonData;
      renderContacts();
    });
}

getContact();

// einen Kontakt nachholen für den remove Button
function getOneContact() {
  return (
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1") // count = 1
      .then((response) => response.json())
      // nur den ersten index "abrufen" = jsonData[0]
      .then((jsonData) => jsonData[0])
  );
}

function renderContacts() {
  const mainEl = document.querySelector("main");
  for (let contact of state.linkedinUser) {
    const bgImgSection = document.createElement("figure");
    bgImgSection.setAttribute("class", "bg-img-figure");
    const contactBlockEl = document.createElement("article");
    mainEl.appendChild(contactBlockEl);
    contactBlockEl.appendChild(bgImgSection);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    bgImgSection.appendChild(removeBtn);
    removeBtn.innerText = "remove";
    removeBtn.addEventListener("click", removeContact);

    function removeContact() {
      const indexToRemove = state.linkedinUser.indexOf(contact);
      // wenn der angeklickte contact da ist  (!= -1, also nicht - 1 ist), dann remove es // (.splice(indexToRemove, 1)) = starte bei akt. contact und remove eins
      if (indexToRemove != -1) {
        state.linkedinUser.splice(indexToRemove, 1);
        getOneContact().then((newContact) => {
          // .then = nach der getContact function (=promise) führe folgende Funktion aus:
          // den neuen Kontakt in das bestehende state-Array pushen und vor dem rendern leeren!!
          state.linkedinUser.push(newContact);
          mainEl.innerHTML = "";
          renderContacts();
        });
      }
    }

    const backgroundImageEl = document.createElement("img");
    backgroundImageEl.setAttribute("class", "bg-img");
    backgroundImageEl.src = contact.backgroundImage;
    bgImgSection.appendChild(backgroundImageEl);

    const profilePicEl = document.createElement("img");
    profilePicEl.setAttribute("class", "profile-pic");
    profilePicEl.src = contact.picture;
    contactBlockEl.appendChild(profilePicEl);

    const titleEl = document.createElement("p");
    titleEl.setAttribute("class", "title");
    titleEl.innerText = contact.name.title;
    contactBlockEl.appendChild(titleEl);

    const firstNameEl = document.createElement("p");
    firstNameEl.setAttribute("class", "firstname");
    firstNameEl.innerText = contact.name.first;
    contactBlockEl.appendChild(firstNameEl);

    const lastNameEl = document.createElement("p");
    lastNameEl.setAttribute("class", "lastname");
    lastNameEl.innerText = contact.name.last;
    contactBlockEl.appendChild(lastNameEl);

    const professionEl = document.createElement("p");
    professionEl.setAttribute("class", "profession");
    professionEl.innerText = contact.title;
    contactBlockEl.appendChild(professionEl);

    const mutualConnections = document.createElement("p");
    mutualConnections.setAttribute("class", "mutual-con");
    mutualConnections.innerText =
      contact.mutualConnections + " " + "mutual connections";
    contactBlockEl.appendChild(mutualConnections);

    const connectBtn = document.createElement("button");
    connectBtn.setAttribute("class", "connect-btn");
    connectBtn.textContent = "Connect";
    contactBlockEl.appendChild(connectBtn);
    connectBtn.addEventListener("click", function () {
      if (connectBtn.innerText === "Connect") {
        connectBtn.innerText = "Pending";
        count += 1;
      } else if (connectBtn.innerText === "Pending") {
        connectBtn.innerText = "Connect";
        count -= 1;
      }
      kopf();
    });
  }
}
