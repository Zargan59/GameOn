function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBody = document.querySelector(".modal-body")
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const closeForm = document.querySelector(".close")
const btnSubmit = document.querySelector(".btn-submit")

//Form Elements
const FirstName = document.getElementById("first")
const LastName = document.getElementById("last")
const Email = document.getElementById("email")
const BirthDate = document.getElementById("birthdate")
const AllReadyPlay = document.getElementById("quantity")
const TournamentContent = document.querySelector(".checkbox-label")
const Read = document.getElementById("checkbox1")
const NewsLetter = document.getElementById("checkbox2")

//Expression régulière pour s'assurer que le mail est valide
let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$')

//Expression régulière pour s'assurer que le nombre de tournoi soit une valeur uniquement numérique
let allReadyPlayRegExp = new RegExp('^[0-9]+')


//Gestion du formulaire
function Form(){
  let error = 0
  //Prénom
    //Si le champs est vide ou à moins de 2 caractères je renvois une erreur
    if (FirstName.textLength >= 2){
      const clostestForm= FirstName.closest(".formData")
      DeleteErrorMessage(clostestForm)
    }

    else{
      const clostestForm= FirstName.closest(".formData")
      const MessageError = "Veillez saisir au moins 2 caractères"
      ErrorMessage(clostestForm, MessageError)
      error++
    }

  //Nom
   //Si le champs est vide ou à moins de 2 caractères je renvois une erreur
   if (LastName.textLength >= 2){
    const clostestForm= LastName.closest(".formData")
    DeleteErrorMessage(clostestForm)
  }
  
  else{
    const clostestForm= LastName.closest(".formData")
    const MessageError = "Veillez saisir au moins 2 caractères"
    ErrorMessage(clostestForm, MessageError)
    error++
  }

  //Email
   //Si le champs est vide ou à moins de 2 caractères je renvois une erreur
   if (emailRegExp.test(Email.value)){
    const clostestForm= Email.closest(".formData")
    DeleteErrorMessage(clostestForm)
  }
  
  else{
    const clostestForm= Email.closest(".formData")
    const MessageError = "Veillez saisir une adresse mail valide"
    ErrorMessage(clostestForm, MessageError)
    error++
  }

  //La date de naissance
  let now = new Date()
  //On vérifie que la date renseigné soit bien inférieur à la date actuelle
  let userBirthDate = new Date(BirthDate.value)
  let today = new Date(now)
  //Si la date renseigné est supérieur à lma date d'aujourd'hui
  if( userBirthDate < today){
    const clostestForm= BirthDate.closest(".formData")
    DeleteErrorMessage(clostestForm)
  } 
  else{
    const clostestForm= BirthDate.closest(".formData")
    const MessageError = "Veillez saisir une date valide"
    ErrorMessage(clostestForm, MessageError)
    error++

  }

  //Le nombre de tournoi déjà réalisé
  if(allReadyPlayRegExp.test(AllReadyPlay.value)){
    const clostestForm= AllReadyPlay.closest(".formData")
    DeleteErrorMessage(clostestForm)
  }else{
    const clostestForm= AllReadyPlay.closest(".formData")
    const MessageError = "Veillez saisir un nombre"
    ErrorMessage(clostestForm, MessageError)
    error++

  }

  //Prochaine compète
  //Verifier pour chaque localisation si elle est coché ou non

  let content =TournamentContent.closest(".formData")
  let contentChild = content.childNodes
  let test = false
  contentChild.forEach(element => {
    if(element.id){
      if(element.checked === true){
        test = true
      }
      else{
        const clostestForm= content
        DeleteErrorMessage(clostestForm)
      }
    }
  });
  if(test == false){
        const clostestForm= content
        const MessageError = "Veillez saisir un Tournoi"
        ErrorMessage(clostestForm, MessageError)
        error++
  }

  //Conditions générale
  if(Read.checked === false){
    const clostestForm= Read.closest(".formData")
    const MessageError = "Veillez accepter les conditions d'utilisations"
    ErrorMessage(clostestForm, MessageError)
    error++
  }
  else{
    const clostestForm= Read.closest(".formData")
    DeleteErrorMessage(clostestForm)
  }


//Si le nombre d'erreur est à 0 alors j'envoie une confirmation
if (error ===0){
  modalBody.style.display = "none"
  Confirmation()
  Erase()
}


  
}
//Quand je clique sur le bouton submit du form, j'envoie un message de validation et je ferme le form
btnSubmit.addEventListener("click",e=>{
  e.preventDefault()
  Form()
})
//Fonction de confirmation de formulaire

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  EraseConfirmation()
}
//Fonction pour fermer le form
function closeModal(){
  modalbg.style.display = "none"
}

//*********Fonction pour la création d'un message d'erreur

function ErrorMessage(clostestForm,MessageError){
  //Je supprime le message d'erreur pour qu'il ne s'affiche qu'une fois
  DeleteErrorMessage(clostestForm)
  //Création du message d'erreur
  const errorMessage = document.createElement("p")
  errorMessage.classList.add("error")
  errorMessage.innerHTML = MessageError
  clostestForm.appendChild(errorMessage)
}
//Fonction pour supprimer le message d'erreur
function DeleteErrorMessage(clostestForm) {
  let error = clostestForm.childNodes
  error.forEach(element => {
    if(element.className == "error"){
      element.remove()
    }
  });
}

//Lancer la fonction lorsqu'on clic sur la croix
closeForm.addEventListener("click", e=>{
  closeModal()
})


//Fonction pour créer le message de confirmation de la commande
function Confirmation(){

  const content = document.querySelector(".content")


  const confirmationText = document.createElement("h2")
  confirmationText.classList.add("confirmation")
  confirmationText.innerHTML = "Merci! Votre réservation à été enregistré"
  
  const div = document.createElement("div")
  div.classList.add("modal-body")
  div.classList.add("confirmationContent")

  const btnClose = document.createElement("button")
  btnClose.classList.add("btnClose")
  btnClose.classList.add("modal-btn")
  btnClose.innerHTML = "Fermer"

  content.appendChild(div)
  div.appendChild(confirmationText)
  div.appendChild(btnClose)

  btnClose.addEventListener("click",closeModal)


}



function EraseConfirmation(){
  const confirmation = document.querySelector('.confirmationContent')
  if(confirmation){
    confirmation.remove()
    modalBody.style.display = "block"
  }
}


//Fonction pour vider le contenu des inputs si aucune erreur est détecté
function Erase(){
  //Lorsque l'insciption est validé, je supprime tous les inputs
  FirstName.value = ""
  LastName.value = ""
  Email.value = ""
  BirthDate.value = ""
  AllReadyPlay.value = ""

  //Je parcours tous les inputs présents et si l'un d'eux est cochén je le décoche
  let content =TournamentContent.closest(".formData")
  let contentChild = content.childNodes
  contentChild.forEach(element => {
    if(element.id){
      if(element.checked === true){
       element.checked = false
      }
      else{
        const clostestForm= content
        DeleteErrorMessage(clostestForm)
      }
    }
  });
}
  