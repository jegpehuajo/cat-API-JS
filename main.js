const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=1&api_key=live_DY2e8NqCNT2B5zkxPa4rGuWuyIr5c3RP0iOYhn3plIVKNjbR7Z9u24PWTQXP9vhl';
const URL_FAV = 'https://api.thecatapi.com/v1/favourites?limit=3&api_key=live_DY2e8NqCNT2B5zkxPa4rGuWuyIr5c3RP0iOYhn3plIVKNjbR7Z9u24PWTQXP9vhl';

const img = document.querySelector("img");
const btnAleatorio = document.querySelector("#otro_gato");
const btnGuardar = document.querySelector("#guardar_fav");
const spanError = document.querySelector("#spanError");

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

async function saveFav() {
  const response = await fetch(URL_FAV, {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      image_id:'12'
    }),
  });

  const data = await response.json();

  if (response.status !== 200) {
    spanError.innerHTML = "Hay un error: " + response.status + data.message;
  } else {
    data.forEach(gato => {
      const section = document.getElementById('favoritesCat');
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode("Sacar de favoritos");

      btn.appendChild(btnText);
      img.src = gato.image.url;
      
      article.appendChild(img);
      article.appendChild(btn);

      section.appendChild(article);
    });
  }
}

img.addEventListener("click",getImg);
btnAleatorio.addEventListener("click",getImg);
btnGuardar.addEventListener("click",saveFav);

getImg();
getFav();

// Sintaxis de promesas.
// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });

