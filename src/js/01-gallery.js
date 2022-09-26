import { galleryItems } from './gallery-items.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');


const makeGalleryStr = makeGallery(galleryItems).join('')

function makeGallery(item){
    return item.map(({preview, original, description}) =>{
           return`<div class="gallery__item">
           <a class="gallery__link" href="${original}">
             <img
               class="gallery__image"
               src="${preview}"
               data-source="${original}"
               alt="${description}"
             />
           </a>
         </div>` 
    })
}

galleryRef.innerHTML = makeGalleryStr

    
let gallery = new SimpleLightbox('.gallery a');


