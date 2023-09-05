const URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?api_key=live_gNZmKpyklLz3kIQ16bcJFcwiDq21cJVpjLI96FXF5tXQNe7VHnG6LNv0vSgGPSTM';
const URL_FAV = 'https://api.thecatapi.com/v1/favourites?api_key=live_gNZmKpyklLz3kIQ16bcJFcwiDq21cJVpjLI96FXF5tXQNe7VHnG6LNv0vSgGPSTM';
const URL_FAV_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_gNZmKpyklLz3kIQ16bcJFcwiDq21cJVpjLI96FXF5tXQNe7VHnG6LNv0vSgGPSTM`;
const API_KEY = 'live_gNZmKpyklLz3kIQ16bcJFcwiDq21cJVpjLI96FXF5tXQNe7VHnG6LNv0vSgGPSTM';
const URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const img = document.querySelector("img");
const btnAleatorio = document.querySelector("#otro_gato");
const btnGuardar = document.querySelector("#guardar_fav");
const spanError = document.querySelector("#spanError");

async function getImg() {
  try {
    const response = await fetch(URL_RANDOM);
    const data = await response.json();
    img.src = data[0].url;
    btnGuardar.onclick = () => saveFav(data[0].id);
  } catch (error) {
    console.error("Error al obtener la imagen");
    spanError.innerText = "Hubo un error: " + response.status + data.message;
  }
}

async function getFav() {
    const response = await fetch(URL_FAV);
    const data = await response.json();
    
    console.log(data);

  if (response.status !== 200) {
    console.error("Error al obtener la imagen en favoritos.");
    spanError.innerHTML = "Hay un error: " + response.status + data.message;
  } else {
    const section = document.getElementById('favoritesCat');
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Favoritos");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(gato => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      btn.id = "sacar_fav";
      const btnText = document.createTextNode("Sacar de favoritos");
      img.src = gato.image.url;

      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      btn.onclick = () => deleteFav(gato.id);
      section.appendChild(article);
    });
  }
  
}

async function saveFav(id) {
  const response = await fetch(URL_FAV, {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      image_id:`${id}`
    }),
  });
  const data = await response.json();
  console.log("Save");
  console.log(response);

  if (response.status !== 200) {
    spanError.innerHTML = "Hay un error" + response.status + data.message;
  } else {
    getFav();
  }
}

async function deleteFav(id) {
  const response = await fetch(URL_FAV_DELETE(id), {
    method: 'DELETE',
    // headers: {
    //   "x-api-key": `{API_KEY}`,
    // },
  });
  const data = await response.json();

  if(response.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + response.status + data.message;
  } else {
    console.log("Se elimino de favoritos.");
    getFav();
  }
}

async function uploadImg() {
  const form = document.getElementById('uploadForm');
  const formData = new FormData(form);

  const response = await fetch(URL_UPLOAD, {
    method:'POST',
    headers: {
      //'Content-Type':'multipart/form-data',
      'X-API-KEY': 'live_gNZmKpyklLz3kIQ16bcJFcwiDq21cJVpjLI96FXF5tXQNe7VHnG6LNv0vSgGPSTM',
    },
    body: formData,
    //body: JSON.stringify
  })
  const data = await response.json();
  if ( response.status  !== 201 ){
    spanError.innerText = "Hubo un error: " + response.status + " "  + data.message
  } else {
    console.log("Cargo correctamente la imagen.");
    console.log({data});
  }
}

img.addEventListener("click",getImg);
btnAleatorio.addEventListener("click",getImg);
//btnGuardar.addEventListener("click",saveFav);

getImg();
getFav();

// Sintaxis de promesas.
// fetch(URL)
//   .then(res => res.json())
//   .then(data => {
//     const img = document.querySelector('img');
//     img.src = data[0].url;
//   });

