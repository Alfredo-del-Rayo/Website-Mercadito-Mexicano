const BackToPrevious = document.getElementById("previous-page");
const previousContent = document.getElementById("previous-content");
var previousURL = document.referrer;
let rootURL = window.location.origin;
rootURL = rootURL + '/';
let prevContent= sessionStorage.getItem('previousContent');
let prevURL= sessionStorage.getItem('previousURL');

  if(previousURL !== null && previousURL.endsWith('/cart')){
    BackToPrevious.href = previousURL;
    previousContent.innerText = `Back To Shopping Cart`;
  } else if(previousURL !== null && previousURL.endsWith('/products')){
    BackToPrevious.href = previousURL;
    previousContent.innerText = `Back To Search`;
  } 
  else if (previousURL !== null && previousURL.includes('collections')) {
    BackToPrevious.href = previousURL;
    let parts = previousURL.split('/');
    let lastPart = parts[parts.length - 1];
    lastPart = lastPart.replace(/%20/g, ' ');
    previousContent.innerText = `Back To ${lastPart}`;
    console.log("got the first")
    sessionStorage.setItem('previousContent', `Back To ${lastPart}`);
    sessionStorage.setItem('previousURL',previousURL);
    }  else if (prevURL != null && rootURL != previousURL && prevURL != '' ){
        BackToPrevious.href = prevURL;
        previousContent.innerText = prevContent;
        console.log(`now prevUrl = ${prevURL} `)
    }
    else {
    BackToPrevious.href = '/';
    previousContent.innerText = 'Back to Home';
    console.log('got the second')
    sessionStorage.setItem('previousContent', '');
    sessionStorage.setItem('previousURL', '');
    } 

    
    console.log(previousURL);
    console.log(rootURL);
