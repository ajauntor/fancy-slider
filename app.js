// Document selected ara..............!
const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const query = document.getElementById('search');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

// selected image.....................!
let sliders = [];
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

const getImages = (query) => {
  const url = `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`;
  toggleSpinner();
  fetch(url)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err));
}

// handling enter pressing.........................!
query.addEventListener("keypress", function (event) {
  if (event.key == 'Enter') {
    searchBtn.click();
  }
});

// show images.....................!
const showImages = (images) => {
  query.value = "";
  toggleSpinner();
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title...................!
  galleryHeader.style.display = 'flex';

  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img id="selectedImage" class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);

  });
}

let slideIndex = 0;
// handling selecting items.............!
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle("added");
  let item = sliders.indexOf(img);

  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.splice(item, 1);
  }
}
var timer
const createSlider = () => {
  if (sliders.length < 2) {
    alert('Select more then one photos')
    return;
  }

  // crate slider previous next area............!
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria..............!


  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  });
  // handling unexpected time input................!
  changeSlide(0)
  if (duration >= 500) {
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
  } else {
    alert('choose at least 500 milliseconds for your slides, or you can set time manually');
  }
}

// change slider index..............!
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item.............!
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  });

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  let searchValue = query.value;
  let letters = /^[A-Za-z]+$/;

  // handling input for empty search.............!
  if(searchValue.match(letters)){
    getImages(searchValue);
  }else{
   alert("Nothing found, Enter your keyword!");
  }
  sliders.length = 0;
});

sliderBtn.addEventListener('click', function () {
  createSlider()
});

//loding spinner added....................!
const toggleSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.classList.toggle('d-none');
  imagesArea.classList.toggle('d-none');
}