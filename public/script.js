// https://www.w3schools.com/jsref/event_onload.asp
// https://www.w3schools.com/jsref/prop_element_classlist.asp
// https://www.w3schools.com/howto/howto_js_remove_class.asp

const minifigs = document.querySelector('#resultStats');

const dieImage = document.getElementById('hiddenimage');


restoreDefault = () =>{
  console.log('time has passed.');
    dieImage.src = 'img/image-asset-1.png';
    // make result visible. 
    minifigs.classList.remove('hideOne');
  }

randomFigure = () => {

    // hide result. 
  // set gif to animate
  dieImage.src = 'img/image-asset.gif';
  minifigs.classList.add('hideOne');
  minifigs.classList.add('hideTwo');

  // https://www.w3schools.com/js/js_timing.asp
  setTimeout(restoreDefault, 1000 )
  
  axios.get('/random')
    .then(response => {
      console.log(response.data);

      // reassign png .
      minifigs.classList.remove('hideTwo');
      
      if (response.data.set_img_url !== null) {
        let miniFigureImg = document.createElement('img');
        miniFigureImg.src =response.data.set_img_url;
        miniFigureImg.onload = () => {
          minifigs.innerHTML = '';
          let figureDetails = document.createElement('div');
          figureDetails.id = 'stats';
          /* https://rebrickable.com/api/v/docs/?key=e9840ba1336b99d905a9784e8f2436e0 */
          figureDetails.innerHTML = `
            <p><b>NAME:</b> ${response.data.name}</p>
            <p><b>MODEL #:</b> ${response.data.set_num}</p>
            <p><b>PARTS:</b> ${response.data.num_parts}</p>
            <p><b>DATE MODIFIED:</b> ${response.data.last_modified_dt}</p>   
          `;
          minifigs.appendChild(figureDetails);
          minifigs.appendChild(miniFigureImg);
          // https://www.w3schools.com/jsref/met_document_createelement.asp
        }
      }
      else {
        randomFigure();
      }
    })
    .catch(error => {
      console.log(error)
    })
}
randomFigure();
