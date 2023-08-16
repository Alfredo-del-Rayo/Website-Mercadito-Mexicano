function updateElementsDisplay() {
const mobiles = document.getElementsByClassName('mobile')
const desktops = document.getElementsByClassName('desktop')
const menus = document.getElementById('menu')
const closed = document.getElementById('close')
if (window.innerWidth > 800){
    menus.style.display = 'none'
    closed.style.display = 'none'
    for (let i = 0; i < mobiles.length; i++) {
        const mobile= mobiles[i]
        mobile.style.display = 'none'
      }  
      for (let i = 0; i < desktops.length; i++) {
        const desktop = desktops[i]
          desktop.style.display = 'flex'
      }
    }
else{
      for (let i = 0; i < desktops.length; i++) {
        const desktop = desktops[i]
          desktop.style.display = 'none'
      }
      if (window.getComputedStyle(closed).getPropertyValue('display') === 'none' && window.getComputedStyle(menus).getPropertyValue('display') === 'none'){
        menus.style.display = 'block'
      }
}
}

  
  window.addEventListener('load', updateElementsDisplay)
  
  window.addEventListener('resize', updateElementsDisplay)

  const menus = document.getElementById('menu')
  const closed = document.getElementById('close')
  const mobiles = document.getElementsByClassName('mobile')
  
  menus.addEventListener('click', () => {
    closed.style.display = 'block'
    menus.style.display = 'none'
    for (let i = 0; i < mobiles.length; i++) {
        const mobile= mobiles[i]
        mobile.style.display = 'flex'
      }  
  })

  closed.addEventListener('click', () => {
    closed.style.display = 'none'
    menus.style.display = 'block'
    for (let i = 0; i < mobiles.length; i++) {
        const mobile= mobiles[i]
        mobile.style.display = 'none'
      }  
  })

  
  
  
  
  
