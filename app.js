const hamburger = document.querySelector('#nav-icon2');
const navList = document.querySelector('.navbar-list')
const navBar = document.querySelector('.navbar-top');
const listItem = document.querySelectorAll('.navbar-list-item');
navBarLogo = document.querySelector('.navbar-logo');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    navList.classList.toggle('active');    
    navBar.classList.toggle('active');  
    navBarLogo.classList.toggle('active');  
    listItem.forEach( item => {
        item.classList.toggle('active')
    })
})


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
     const { RAW  } = data;
     console.log(data)    
     console.log(RAW)    
     // console.log(data.RAW.BTC.USD.HIGH24HOUR)    
}

fetchData('BTC', 'USD')
fetchData('ETH', 'GBP')
fetchData('ADA', 'ARS')