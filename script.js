// Function to generate image filenames
function generateImageFilenames() {
  var imageFilenames = [];

  for (var i = 1; i <= 604; i += 2) {
    var filename1 = "public/pages/" + i + "-scaled.jpg";
    var filename2 = "public/pages/" + (i + 1) + "-scaled.jpg";
    imageFilenames.push([filename1, filename2]);
  }

  return imageFilenames;
}
// Function to save the current page index to localStorage
function saveCurrentPage() {
  localStorage.setItem("currentPage", currentImagePairIndex);
}

// Function to retrieve the last saved page index from localStorage
function getLastPage() {
  currentPage = localStorage.getItem("currentPage");
  if (!currentPage) {
    return;
  }
  return Number(currentPage);
}

var imageFilenames = generateImageFilenames();
var currentImagePairIndex = getLastPage() || 0;

// Function to create the slideshow
function createButton(text, html, onClick) {
  var button = document.createElement("button");
  button.textContent = text;
  button.innerHTML = html;
  button.onclick = onClick;
  return button;
}

function createImage(src) {
  var img = document.createElement("img");
  img.src = src;
  return img;
}

function createSlideshow() {
  var slideshowContainer = document.body;
  var imageContainer = document.querySelector(".image-container");
  var slider = document.getElementById("page-slider");

  var imagePairContainer = document.createElement("div");
  imagePairContainer.className = "image-pair";

  var imgElement1 = createImage(imageFilenames[currentImagePairIndex][1]);
  var imgElement2 = createImage(imageFilenames[currentImagePairIndex][0]);

  imagePairContainer.append(imgElement1, imgElement2);
  imageContainer.appendChild(imagePairContainer);
  slideshowContainer.appendChild(imageContainer);

  var buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  var prevButton = createButton("Previous", "&larr;", function () {
    if (currentImagePairIndex < imageFilenames.length - 1) {
      currentImagePairIndex++;
      updateImages();
    }
  });

  var nextButton = createButton("Next", "&rarr;", function () {
    if (currentImagePairIndex > 0) {
      currentImagePairIndex--;
      updateImages();
    }
  });

  buttonContainer.append(prevButton, nextButton);

  var pageInput = document.createElement("input");
  pageInput.type = "number";
  pageInput.min = 1;
  pageInput.max = 604;
  pageInput.placeholder = "Page " + (currentImagePairIndex * 2 + 1);
  pageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      goButton.click();
    }
  });
  buttonContainer.appendChild(pageInput);

  var goButton = createButton("Go", "", function () {
    var page = parseInt(pageInput.value);
    if (!isNaN(page) && page >= 1 && page <= 604) {
      currentImagePairIndex = Math.floor((page - 1) / 2);
      updateImages();
    }
  });
  buttonContainer.appendChild(goButton);

  slideshowContainer.appendChild(buttonContainer);

  slider.max = imageFilenames.length;

  updateImages();

  slider.oninput = function () {
    this.setAttribute("data-value", this.value);
    currentImagePairIndex = this.value - 1;
    updateImages();
  };

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "ArrowLeft" &&
      currentImagePairIndex < imageFilenames.length - 1
    ) {
      event.preventDefault();
      currentImagePairIndex++;
      updateImages();
    } else if (event.key === "ArrowRight" && currentImagePairIndex > 0) {
      event.preventDefault();
      currentImagePairIndex--;
      updateImages();
    }
  });
}

// Function to update the displayed image pair
function updateImages() {
  var imgElement1 = document.querySelector(".image-pair img:first-child");
  var imgElement2 = document.querySelector(".image-pair img:nth-child(2)");

  imgElement1.src = imageFilenames[currentImagePairIndex][1]; // Switched order
  imgElement2.src = imageFilenames[currentImagePairIndex][0];

  // Update the value of the page input field
  updatePlaceholder();
  updatePageInputValue();
  updateSlider();
  updatePageNumber();
  saveCurrentPage();
}

// Function to update the value of the page input field
function updatePageInputValue() {
  var pageInput = document.querySelector("input[type='number']");
  pageInput.value = currentImagePairIndex * 2 + 1;
}

function updateSlider() {
  var slider = document.querySelector("#page-slider");
  slider.value = currentImagePairIndex + 1;
}

// Function to update the placeholder value
function updatePlaceholder() {
  var pageInput = document.querySelector("input[type='number']");
  pageInput.placeholder = "Page " + (currentImagePairIndex * 2 + 1);
}

function updatePageNumber() {
  var pageNumber = document.querySelector("#page-number");
  pageNumber.innerHTML = currentImagePairIndex * 2 + 1;
}

// Call the function to create the slideshow when the page loads
window.onload = createSlideshow;
