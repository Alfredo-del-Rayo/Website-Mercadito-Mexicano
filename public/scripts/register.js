const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
let debounceTimer=500;
// Add event listener to the input field for 'input' event
usernameInput.addEventListener('input', debounce(checkUsernameAvailability, 500));
emailInput.addEventListener('input', debounce(checkEmailAvailability, 500));

function checkUsernameAvailability() {
  let messageElement = document.getElementById('username-message');
 checkAvailability('username', messageElement);
};
function checkEmailAvailability() {
  let messageElement = document.getElementById('email-message');
 checkAvailability('email', messageElement);
};


function checkAvailability(typeData, messageElement) {
  const value = usernameInput.value;

  if(!value.trim()){
    messageElement.textContent = ' ';
  }
  // Send an AJAX request to the server to check username availability
  else {
  fetch(`/check/${typeData}?value=${encodeURIComponent(value)}`)
    .then(response => response.json())
    .then(data => {
      if (typeData == 'username'){
      if (data.available) {
        messageElement.textContent = 'Username available!';
      } else {
        messageElement.textContent = 'Username already used.';
      }
    }
      else if (typeData == 'email'){
          if (!data.available) {
            messageElement.textContent = 'This email is already registered!';
          } 
      }
    })
    .catch(error => {
      console.error(`Error checking ${typeData} availability:`, error);
    });
  }
}

function debounce(callback, delay) {
  return function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
  };
}