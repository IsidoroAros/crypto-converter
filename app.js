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

const parityInjection = document.querySelector('.parity-injection');
const submit = document.querySelector('.submit-button');
const form = document.querySelector('.crypto-form');
const cryptoInput = document.querySelector('#crypto');
const fiatInput = document.querySelector('#fiat');
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
          // .catch( err => console.log('Problemas con la moneda'))
}

form.addEventListener('submit', (e)=>{
     e.preventDefault();

     parity.coin = cryptoInput.value;
     parity.fiat = fiatInput.value;

     validateData(parity);

})

function scriptData(data, coin, fiat){
     const { RAW } = data;
     console.log(RAW[coin][fiat].PRICE)    
     console.log(RAW[coin][fiat].LOW24HOUR)    
     console.log(RAW[coin][fiat].HIGH24HOUR)    
}

function validateData(parity){
     const { coin, fiat } = parity;

     if(crypto === 'Coin' || fiat === 'Fiat'){
          errorMessage()
     }else{
          fetchData(coin, fiat);
     }

}

const errorMessage = message =>{

     document.createElement('div')

}

