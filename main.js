const URL = 'https://api.thecatapi.com/v1/images/search';

const img = document.querySelector("img");

const btnAleatorio = document.querySelector("button");

async function getImg() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    img.src = data[0].url;
  } catch (error) {
    console.error("Error al obtener la imagen");
  }
}

img.addEventListener("click",getImg);
btnAleatorio.addEventListener("click",getImg);

getImg();

// Sintaxis de promesas.
// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });

