(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

console.log("Js loaded");

const Taxtoggle = document.querySelector("#tax-toggle");
const prices = document.querySelectorAll(".card-price");

Taxtoggle.addEventListener("change",()=>{
   if(Taxtoggle.checked){
     prices.forEach((priceElement)=>{
         const price = Number(priceElement.dataset.price);
         const tax = price * 18/100;
         const total = price+ tax;
         priceElement.textContent = "₹ " + total.toLocaleString("en-IN");
     })
   }else{
      prices.forEach((priceElement)=>{
         const price = Number(priceElement.dataset.price);
         priceElement.textContent = "₹ " + price.toLocaleString("en-IN");
      })
   }
})

const searchinp = document.querySelector("#search-input");
const cards = document.querySelectorAll(".card");

searchinp.addEventListener("input",(e)=>{
    let val = e.target.value;
    cards.forEach((card)=>{
      const title = card.querySelector(".card-title").textContent;
      if(title.toLowerCase().includes(val.toLowerCase())){
          card.classList.remove("hide");
      }else{
        card.classList.add("hide");
      }
    })
})