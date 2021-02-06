const hamburgerWrapper = document.querySelector('.hamburger-wrapper');
const hamburger = document.querySelector('#nav-icon2');
const navbarWrapper = document.querySelector('.nav-wrapper');

document.addEventListener('DOMContentLoaded', ()=>{
     hamburgerWrapper.addEventListener('click', openMenu);
})

function openMenu(){
     hamburger.classList.toggle('open');
     navbarWrapper.classList.toggle('open');
}

function fetchData(coin, fiat){
     fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=${fiat}`)
          .then( response => response.json())
          .then( data => {
               scriptData(data)
          })
          // .catch( err => console.log('Problemas con la moneda'))
}


function scriptData(data){
     // const { name, main: { temp, temp_max, temp_min } } = datos;
     const { RAW, USD  } = data;
     console.log(data)    
     console.log(RAW)    
     console.log(data.RAW.BTC.USD.HIGH24HOUR)    
}

fetchData('BTC', 'USD')