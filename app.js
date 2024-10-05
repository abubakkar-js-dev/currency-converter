const Base_URL =   "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll('.dropdown select');
const convertBtn = document.getElementById('btn-convert');
const fromCurreny = document.querySelector('.from select')
const toCurreny = document.querySelector('.to select');
const mgsEl = document.querySelector('form .mgs')

for(let select of dropdowns){
    for(let currcode in countryList){
       const newOption = document.createElement('option');
       newOption.innerText = currcode;
       newOption.value = currcode;
       select.appendChild(newOption);
       if(select.name === 'from' && currcode === 'USD'){
        newOption.selected = true;
       }else if(select.name === 'to' && currcode === "BDT"){
        newOption.selected = true;
       }
    };

    select.addEventListener('change',(e)=>{
        updateFlageImg(e.target);
    })
}

const updateFlageImg = (element)=>{
    let currcode = element.value;
    let countryCode = currcode.slice(0,2);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    const imgTag = element.parentElement.querySelector("img");
    imgTag.setAttribute('src',`${newSrc}`);
}

convertBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let amountEl = document.querySelector(".amount input");
    let amountVal = amountEl.value;
    let amountNumber = parseFloat(amountVal);
    
    if(amountVal === "" || amountNumber < 1){
        amountNumber = 1;
        amountEl.value = 1;
    }

    updateExchangeTotal(amountNumber);
});

const updateExchangeTotal = async (amountNumber)=>{
    const fromCurrenyVal = fromCurreny.value.toLowerCase();
    const toCurrenyVal = toCurreny.value.toLowerCase();
    const URL = `${Base_URL}/${fromCurreny.value.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[fromCurrenyVal][toCurrenyVal];
    const exchangedTotal = (amountNumber * rate).toFixed(2);
    console.log(exchangedTotal);

    mgsEl.innerText = `${amountNumber} ${fromCurreny.value} = ${exchangedTotal} ${toCurreny.value}`;
}

window.addEventListener('load',()=>{
    const amountValue = document.querySelector(".amount input").value;
    updateExchangeTotal(amountValue);
})

