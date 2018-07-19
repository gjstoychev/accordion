const dt1 = document.querySelector('dt');
const dl1 = document.querySelector('dl');

createNewSection(); // create a new dt/dd Section

dt1.nextElementSibling.style.display = 'block'; // show Section 1 content

dl1.addEventListener('click', onClick); // use event delegation

function createNewSection () {
  let newDt = document.createElement('dt');
  let newDd = document.createElement('dd');
  let newP = document.createElement('p');
  let textDt = document.createTextNode('New Section');

  newDt.appendChild(textDt);
  newDd.appendChild(newP);
  newDd.setAttribute('style', 'display: none;');
  dl1.appendChild(newDt);
  dl1.appendChild(newDd);
}

function onClick(e) {
  const dtItems = document.querySelectorAll('dt');
  const lastDt = dtItems[dtItems.length - 1];
  
  if (!e.target || e.target.nodeName != 'DT') {
    return;
  }
    
  if (e.target === lastDt && e.target.nextElementSibling.style.display === 'none') {
    fetchQuote();
  }
    
  for (let dt of dtItems) {
    const dd = dt.nextElementSibling;
    let active;

    if (dd.style.display === 'block') {
      active = dt;
    }

    dd.style.display = 'none';

    if (dt === e.target && dt !== active) {
      dd.style.display = 'block';
    }
  }
}

function fetchQuote () {
  const url = 'https://talaikis.com/api/quotes/random';
  const pItems = document.querySelectorAll('p');
  const lastP = pItems[pItems.length - 1];
  
  lastP.innerHTML = null;
  
  fetch(url, {
    mode: 'cors'
  })
    .then(response => {
      return response.text();
  })
    .then(text => {
      const textArray = text.split('"');  
      const quote = textArray[3];
      const author = textArray[7];
	
      lastP.innerHTML = `"${quote}" ~ ${author}`;
  })
    .catch(error => {
      lastP.innerHTML = `Request failed: ${error}`;
  });
}
