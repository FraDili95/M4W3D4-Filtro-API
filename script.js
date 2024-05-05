
const URL = "https://jsonplaceholder.typicode.com/users";
const dataArray = [];
fetch(`${URL}`)
.then( response => response.json() )
.then( data => {
    console.log("HEY API!: ",data);
    renderingDOM(data);//faccio il primo rendering
    return data;
})
.then( data => dataArray.push(...data))
.catch( error => console.error("Si è verificato un errore: ", error));
console.log("array",dataArray);

function renderingDOM( dataBase ) {
    const workStation = document.getElementById("workstation");
    workStation.innerHTML = "";
    dataBase.forEach(elemento => {
        workStation.innerHTML += 
        `
                <tr>
                    <th scope="row">${elemento.id}</th>
                    <td>${elemento.name}</td>
                    <td>${elemento.username}</td>
                    <td>${elemento.email}</td>
                </tr>
        `;
    });
}
function inputOfFilter( punct ){//ritorna la selezione da ricercare
// console.log(punct.value);
   return punct.value;//ritorna il campo di ricerca
}
 function returnArrayNew( key, array, researchImputUser){
     const newArray = [];
      array.forEach( elemento => {
          if( elemento[key].toLowerCase().includes(`${researchImputUser.toLowerCase()}`) ){
              newArray.push(elemento);
          }
      });
   //console.log(array[0][key]);
     return newArray;
 }

document.addEventListener("DOMContentLoaded", function(){
    const select = document.getElementById("filtro");//punct SELECT - OPTIONS
    const barSearch = document.getElementById("research");// punct INPUT
    let keyCurrent = inputOfFilter(select);
    select.addEventListener("change", function(){  //EVENTO SULLA CHIAVE  
       keyCurrent = inputOfFilter(select);
       barSearch.value = "";//quando utente cambia chiave pulisco la barra di ricerca
       renderingDOM(dataArray);//e reniderizzo il dom
    });
     barSearch.addEventListener("input", function(){//EVENTO SULLA BARRA DI RICERCA(AD OGNI LETTERA INSERITA) 
        // console.log(barSearch.value);
         
         renderingDOM( returnArrayNew( keyCurrent, dataArray, barSearch.value )  );
     })


})