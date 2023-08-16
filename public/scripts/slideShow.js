  const path = "slideshowImages/";
  const imageSlides = [
    `${path}main.png`,
    `${path}mercadito.png`,
    `${path}media.png`,
    `${path}discover.png`
  ];
  let timer = 0;
  function Hello() {
    document.getElementById("slideshow-img").src = imageSlides[timer];
    timer = (timer + 1) % imageSlides.length;
    setTimeout("Hello()", 3000);
  }
  window.onload = Hello;

  const forwardButton = document.getElementById("forward");
  const backButton = document.getElementById("back");

  forwardButton.addEventListener("click",()=> {
    updateButton(true);
    clearTimeout(timeoutId);
    Hello();
  })
  backButton.addEventListener("click", () => {
    updateButton(false);
    clearTimeout(timeoutId);
    Hello()})

function updateButton(forwards){
  const change = forwards? 1 : -1;
  timer = (timer + change) % imageSlides.length;
  if (timer < 0){
    timer = 3
  }
  console.log(`timer value ${timer}`)
  document.getElementById("slideshow-img").src = imageSlides[timer];
}
