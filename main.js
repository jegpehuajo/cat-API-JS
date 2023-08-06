const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_DY2e8NqCNT2B5zkxPa4rGuWuyIr5c3RP0iOYhn3plIVKNjbR7Z9u24PWTQXP9vhl';
const URL_FAV = 'https://api.thecatapi.com/v1/favourites?api_key=live_DY2e8NqCNT2B5zkxPa4rGuWuyIr5c3RP0iOYhn3plIVKNjbR7Z9u24PWTQXP9vhl';

const img = document.querySelector("img");
const btnAleatorio = document.querySelector("#otro_gato");

async function getImg() {
  try {
    const response = await fetch(URL_RANDOM);
    const data = await response.json();
    img.src = data[0].url;
  } catch (error) {
    console.error("Error al obtener la imagen");
  }
}

async function getFav() {
  try {
    const response = await fetch(URL_FAV);
    const data = await response.json();
    
    console.log(data);
  } catch {
    console.error("Error al obtener la imagen en favoritos.");
  }
}

img.addEventListener("click",getImg);
btnAleatorio.addEventListener("click",getImg);

getImg();
getFav();

// Sintaxis de promesas.
// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });

