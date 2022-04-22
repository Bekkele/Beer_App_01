// https://www.w3schools.com/jsref/event_onload.asp
// https://www.w3schools.com/jsref/prop_element_classlist.asp
// https://www.w3schools.com/howto/howto_js_remove_class.asp

// const beercontainer = document.querySelector('#beercontainer');

const dieImage = document.getElementById('hiddenimage');


// restoreDefault = () =>{
//   console.log('time has passed.');
//     dieImage.src = 'img/image-asset-1.png';
//     // make result visible. 
//     minifigs.classList.remove('hideOne');
//   }





  // https://www.w3schools.com/js/js_timing.asp
  // setTimeout(restoreDefault, 1000 )
  
  axios.get('/beers')
    .then(response => {
      // console.log(response.data);
      for(beer of response.data){
      console.log(beer); 
      
      
      if (beer.image_url !== null) {
        
        let beerImg = document.createElement('img');
        console.log(beer.image_url)
        beerImg.src =beer.image_url;
        beerImg.onload = () => {
      
          let beerDetails = document.createElement('div');
          beerDetails.id = 'stats';
      //https://www.w3schools.com/jsref/met_document_createelement.asp
          
          beerDetails.innerHTML = `
          <div class="card1">


            <p><b>Name:</b> ${beer.name}</p>
            <p><b>IBU :</b> ${beer.ibu}</p>
            <p><b>Tagline:</b> ${beer.tagline}</p>   
            <p><b>description:</b> ${beer.description}</p>
          </div>
          `;

          
let beercontainer = document.querySelector('#beercontainer');
         beercontainer.appendChild(beerDetails);
          beercontainer.appendChild(beerImg);

          
        }
      }
        }
     
    })
    .catch(error => {
      console.log(error)
    })


