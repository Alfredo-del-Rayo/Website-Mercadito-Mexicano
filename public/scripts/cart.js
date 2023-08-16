
const addToCartForm = document.getElementById("currentURL");
const addToCartAnker = document.getElementById("acurrentURL");
const currentUrl = window.location.href;

if (addToCartForm != null){
addToCartForm.action = currentUrl;
}
addToCartAnker.href = currentUrl;