const scrollContainer = document.querySelector('.large-grid');
const scrollForwardBtn = document.getElementById('scroll-forward-btn');
const scrollBackBtn = document.getElementById('scroll-back-btn');
let end = false;

scrollForwardBtn.addEventListener('click', () => {
    let scrollAmount = scrollContainer.clientWidth
    if (scrollContainer.scrollLeft + scrollContainer.clientWidth +1 >= scrollContainer.scrollWidth) {
        scrollContainer.scrollLeft = 0;
        return;
      }
    if (scrollContainer.scrollWidth -(scrollContainer.scrollLeft + scrollContainer.clientWidth) < scrollAmount){
        scrollAmount = scrollContainer.scrollWidth -(scrollContainer.scrollLeft + scrollContainer.clientWidth)
    }
  scrollContainer.scrollLeft += scrollAmount
})

scrollBackBtn.addEventListener('click', () => {
    let scrollAmount = scrollContainer.clientWidth
    if (scrollContainer.scrollLeft - 1 <= 0) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth
        return
      }
    if (scrollContainer.scrollLeft < scrollAmount){
        scrollAmount = scrollContainer.scrollLeft
    }
  scrollContainer.scrollLeft -= scrollAmount
})