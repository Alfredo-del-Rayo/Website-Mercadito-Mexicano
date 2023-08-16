const scrollContainer = document.querySelector('.large-grid')
const clickForwardBtn = document.getElementById('product-click-forward-btn');
const clickBackBtn = document.getElementById('product-click-back-btn');

document.addEventListener('DOMContentLoaded', function () {

    const images = document.querySelectorAll('.image-unit img')
    const largeImage = document.getElementById('largeImage')
    const imgs = document.getElementsByClassName('image-unit')
    let scrollAmount = scrollContainer.clientWidth
    
    clickForwardBtn.addEventListener('click', function(){
      console.log('clicked button')
      console.log(`${largeImage.src}`)
      let rawSrc =largeImage.src
      let largeSrc ='/'+ rawSrc.split('/').slice(3).join('/')
      console.log(`${largeSrc}`)
      for (let i=0; i<imgs.length; i++){
        let img = imgs[i]
        console.log(`${img.getAttribute('data-src')}`)
      if(img.getAttribute('data-src') == largeSrc){
        img.querySelector('img').style['outline'] = 'transparent'
        if( i+1 == imgs.length ){
          img =imgs[0]
        }
        else{
          img =imgs[i+1]
        }
        largeImage.src = img.querySelector('img').src
        img.querySelector('img').style['outline'] = '2px solid black'
        const targetImagePosition = Math.floor( (img.querySelector('img').offsetLeft -100) / scrollContainer.clientWidth);
        scrollContainer.scrollLeft = scrollAmount * targetImagePosition
        return
      }
    }
    })

    clickBackBtn.addEventListener('click', function(){
      console.log('clicked button')
      console.log(`${largeImage.src}`)
      let rawSrc =largeImage.src
      let largeSrc ='/'+ rawSrc.split('/').slice(3).join('/')
      console.log(`${largeSrc}`)
      for (let i=0; i<imgs.length; i++){
        let img = imgs[i]
        console.log(`${img.getAttribute('data-src')}`)
      if(img.getAttribute('data-src') == largeSrc){
        img.querySelector('img').style['outline'] = 'transparent'
        if( i-1 == -1 ){
          img =imgs[imgs.length-1]
        }
        else{
          img =imgs[i-1]
        }
        largeImage.src = img.querySelector('img').src
        img.querySelector('img').style['outline'] = '2px solid black'
        const targetImagePosition = Math.floor( (img.querySelector('img').offsetLeft -100) / scrollContainer.clientWidth);
        scrollContainer.scrollLeft = scrollAmount * targetImagePosition
        return
      }
    }
    })

    images.forEach((image) =>{

      let rawSelectedImage = largeImage.src
      let selectedImageSrc = '/'+ rawSelectedImage.split('/').slice(3).join('/')
      largeImage.src = selectedImageSrc
      for (let i=0; i<imgs.length; i++){
        let img = imgs[i]
      if(img.getAttribute('data-src') == selectedImageSrc){
        img.querySelector('img').style['outline'] = '2px solid black'
        const targetImagePosition = Math.floor( (img.querySelector('img').offsetLeft -100) / scrollContainer.clientWidth);
        scrollContainer.scrollLeft = scrollAmount * targetImagePosition

      }
    }
    })
   
   
   
   
    images.forEach((image) => {
      image.addEventListener('click',  function() {
        const selectedImageSrc = this.dataset.src
        largeImage.src = selectedImageSrc
        for (let i=0; i<imgs.length; i++){
          let img = imgs[i]
          if(img.getAttribute('data-src') == selectedImageSrc){
            img.querySelector('img').style['outline'] = '3px solid black'
          }
          else{
            img.querySelector('img').style['outline'] = 'transparent'
          }
        }
      })
    })



  })