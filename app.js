//* ---------------------------------- DOM Scripting

const hamburger = document.querySelector('#nav-icon2');
const navList = document.querySelector('.navbar-list')
const navBar = document.querySelector('.navbar-top');
const listItem = document.querySelectorAll('.navbar-list-item');
const navBarLogo = document.querySelector('.navbar-logo');

hamburger.addEventListener('click', changeNavbar)

function changeNavbar(){
     hamburger.classList.toggle('open')
     navList.classList.toggle('active');    
     navBar.classList.toggle('active');  
     navBarLogo.classList.toggle('active');  
     listItem.forEach( item => {
         item.classList.toggle('active')
     })
}

//* ---------------------------------- Fetching API

const submit = document.querySelector('.submit-button');
const form = document.querySelector('.crypto-form');
const cryptoInput = document.querySelector('#crypto');
const fiatInput = document.querySelector('#fiat');
const paritySection = document.querySelector('.parity');
const parityContainer = document.querySelector('.parity-container');
const parity = {
     coin: '',
     fiat: ''
}

function fetchData(coin, fiat){
     fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=${fiat}`)
          .then( response => response.json())
          .then( data => {
               scriptData(data, coin, fiat)
          })
          .catch( err => errorMessage(err))
}

form.addEventListener('submit', (e)=>{
     e.preventDefault();

     parity.coin = cryptoInput.value;
     parity.fiat = fiatInput.value;

     validateData(parity);

})

function scriptData(data, coin, fiat){
     const { RAW } = data;
     const price = RAW[coin][fiat].PRICE; 
     const high24hs = RAW[coin][fiat].HIGH24HOUR;
     const low24hs = RAW[coin][fiat].LOW24HOUR; 

     spinner();
     window.scroll({
          bottom: 200,
          behavior: "smooth"
     })

     setTimeout(() => {
          const parityResult = document.createElement('div');
          parityResult.classList.add('parity-result');
          let sign;

          if(fiat === 'EUR') sign = '€';
          if(fiat === 'GBP') sign = '£';
          else sign = '$';

          parityResult.innerHTML = `
          <div class="parity-info">
               <h2>${coin} / ${fiat}</h2>
               <p>Current price: ${sign}${price}</p>
               <p>Highest 24 hs: ${sign}${high24hs}</p>
               <p>Lowest 24 hs: ${sign}${low24hs}</p>
          </div>
          `;


          parityContainer.appendChild(parityResult)   
     }, 1600);
}

function validateData(parity){
     const { coin, fiat } = parity;

     if(crypto === 'Coin' && fiat === 'Fiat'){
          errorMessage('Cannot convert empty fields');
          clearHTML();
     }else if(crypto === 'Coin' && fiat !== 'Fiat'){
          errorMessage(`Cannot convert an empty field to ${fiat}`);
          clearHTML();
     }else if(crypto !== 'Coin' && fiat === 'Fiat'){
          errorMessage(`Cannot convert ${coin} to an empty field`);
          clearHTML();
     }else{
          fetchData(coin, fiat);
          form.reset()
     }
}

const errorMessage = message => {

     const messageHandler = document.createElement('div');
     messageHandler.classList.add('errorMessage');
     messageHandler.innerHTML =  `
     <h3>${message}</h3>
     `;
     paritySection.insertBefore(messageHandler, form);
     setTimeout(() => {
          messageHandler.remove();
     }, 5000);

}

function clearHTML(){
     while(parityContainer.firstChild){
          parityContainer.removeChild(parityContainer.firstChild);
     }
}

function spinner(){

     clearHTML();

     const divSpinner = document.createElement('div');

     divSpinner.classList.add('sk-fading-circle');

     divSpinner.innerHTML = `
          <div class="sk-circle1 sk-circle"></div>
          <div class="sk-circle2 sk-circle"></div>
          <div class="sk-circle3 sk-circle"></div>
          <div class="sk-circle4 sk-circle"></div>
          <div class="sk-circle5 sk-circle"></div>
          <div class="sk-circle6 sk-circle"></div>
          <div class="sk-circle7 sk-circle"></div>
          <div class="sk-circle8 sk-circle"></div>
          <div class="sk-circle9 sk-circle"></div>
          <div class="sk-circle10 sk-circle"></div>
          <div class="sk-circle11 sk-circle"></div>
          <div class="sk-circle12 sk-circle"></div>
     `;

     parityContainer.appendChild(divSpinner);

     setTimeout(() => {
          divSpinner.remove();
     }, 1500);
}

//TODO: add media queries

