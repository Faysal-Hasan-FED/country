let error = document.getElementById("error");
const cardContainer = document.getElementById("card-container");
const detailsContainer = document.getElementById("details-container");


document.getElementById("search-button").addEventListener('click',function(){
    const inputField = document.getElementById("input-field");
    let inputFieldText = inputField.value;

    // result repeat na hoar jnne 
    cardContainer.textContent='';
    detailsContainer.textContent='';


    // error hnadling 
    if(inputFieldText===''){
        error.innerText='Search field can not be empty';
        return;
    }
    const url = `https://www.restcountries.eu/rest/v2/name/${inputFieldText}`;
   
    fetch(url)
    .then(res=>res.json())
    .then(data=>showData(data))
   
    .finally(()=>inputField.value ='');
  
})

function showData(countries){
  
    if(countries.status===404){
        error.innerText ='no result found';
        return;
    }
    else{
        error.innerText='';
    }
   
    countries.forEach(country=>{
        // console.log(country);
        const div= document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card">
                    <img  src="${country.flag}" class="card-img-top" alt="...">
            <div class="card-body">
                  <h5 class="card-title">Name: ${country.name}</h5>
                  <button onclick="loadDetails('${country.alpha3Code}')" class="bg-info p-2 rounded text-white">See More</button>
                 
            </div>
        </div>
        `;
        cardContainer.appendChild(div);

    })
}

function loadDetails(id){
    // console.log(id); // akhne j id pailam ai id die abar fetch kora lagbe 
    fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    .then(res=>res.json())
    .then(data=>showDetails(data));
}

function showDetails(data){
    // console.log(data);
  
    detailsContainer.innerHTML=`
    <div >
            <img style="width:300px"  src="${data.flag}" class="card-img-top" alt="...">
        <div >
              <h5 >Name: ${data.name}</h5>
              <p>Capital: ${data.capital}</p>
              <p>Population: ${data.population}</p>
              <p>Timezone: ${data.timezones[0]}</p>
              <p>Currency Name: ${data.currencies[0].name}</p>
              <p>Currency Symbol: ${data.currencies[0].symbol}</p>
              <p>Calling Code: ${data.callingCodes[0]}</p>
            
        </div>
    </div>
    `;
}