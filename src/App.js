import React from 'react';
import './App.css';
import srcImagePlaceholder from './img-placeholder.jpg'

function App() {
  const {images} = useGallery()

  return (
    <div className="App">
      <h1>Galería</h1>

      <section className="gallery">
        {images.length === 0 &&  (<p>There are no images in the current portfolio</p>)}
        {images.map(image => (
          <img
            src={srcImagePlaceholder}
            className="img img-lazy"
            key={image.url}
            data-src={image.download_url}
            alt={`Taken by ${image.author}`}/>
        ))}
      </section>
    </div>
  );
}

function useGallery() {
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    getImages()
      .then(response => response.json())
      .then(setImages)
      .then(observeImages)

    async function getImages() {
      return fetch('https://picsum.photos/v2/list')
    }

    async function observeImages() {
      if (!!window.IntersectionObserver) {
        function handleImageObserver(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              let image =  entry.target
              loadImage(image)
              lazyImagesObserver.unobserve(image)
            }
          })
        }
  
        const options = {root: null, rootMargin: '0px', threshold: 0}
        const lazyImagesObserver = new IntersectionObserver(handleImageObserver, options)
        const lazyLoadImages = document.querySelectorAll('.img-lazy');
        lazyLoadImages.forEach(image => lazyImagesObserver.observe(image))
      }
    }
  
    async function fetchImage(url) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
      });
    }
  
    async function loadImage(image) {
      const src = image.dataset.src;
      fetchImage(src).then(() => { image.src = src })
    }
  }, [])

  return {images}
}

export default App;
