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
function createSlideshow() {
  var slideshowContainer = document.body;

  // Create a container for each pair of images
  var imageContainer = document.querySelector(".image-container");
  // Get the slider and output elements
  var slider = document.getElementById("page-slider");

  // Create a container for each pair of images
  var imagePairContainer = document.createElement("div");
  imagePairContainer.className = "image-pair";

  // Create two image elements for each pair
  var imgElement1 = document.createElement("img");
  var imgElement2 = document.createElement("img");

  // Set the source for the images
  imgElement1.src = imageFilenames[currentImagePairIndex][1]; // Switched order
  imgElement2.src = imageFilenames[currentImagePairIndex][0];

  // Append images to the container
  imagePairContainer.appendChild(imgElement1);
  imagePairContainer.appendChild(imgElement2);

  // Append the image pair container to the image container
  imageContainer.appendChild(imagePairContainer);

  // Append the image container to the slideshow container
  slideshowContainer.appendChild(imageContainer);

  var buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  // Create navigation buttons
  var prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.innerHTML = "&larr;";
  prevButton.onclick = function () {
    if (currentImagePairIndex < imageFilenames.length - 1) {
      currentImagePairIndex++;
      updateImages();
    }
  };
  buttonContainer.appendChild(prevButton);

  var nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.innerHTML = "&rarr;";
  nextButton.onclick = function () {
    if (currentImagePairIndex > 0) {
      currentImagePairIndex--;
      updateImages();
    }
  };
  buttonContainer.appendChild(nextButton);

  // Create input field for page number
  var pageInput = document.createElement("input");
  pageInput.type = "number";
  pageInput.min = 1;
  pageInput.max = 604;
  pageInput.placeholder = "Page " + (currentImagePairIndex * 2 + 1); // Set initial placeholder
  pageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      goButton.click();
    }
  });
  buttonContainer.appendChild(pageInput);

  // Create "Go" button to navigate to the specified page
  var goButton = document.createElement("button");
  goButton.textContent = "Go";
  goButton.onclick = function () {
    var page = parseInt(pageInput.value);
    if (!isNaN(page) && page >= 1 && page <= 604) {
      currentImagePairIndex = Math.floor((page - 1) / 2);
      updateImages();
    }
  };
  buttonContainer.appendChild(goButton);

  slideshowContainer.appendChild(buttonContainer);
  // Update the slider max value based on the number of image pairs
  slider.max = imageFilenames.length;

  // Display the initial image pair
  updateImages();

  // Update the page number display
  console.log(slider.value);

  slider.oninput = function () {
    console.log("Slider on input" + this.value);
    this.setAttribute("data-value", this.value);

    // Update the current image pair index
    currentImagePairIndex = this.value - 1;

    // Update the images
    updateImages();
  };

  // Add event listeners for arrow keys
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault(); // Prevent the default scrolling behavior
        if (currentImagePairIndex < imageFilenames.length - 1) {
          currentImagePairIndex++;
          updateImages();
        }
        break;
      case "ArrowRight":
        event.preventDefault(); // Prevent the default scrolling behavior
        if (currentImagePairIndex > 0) {
          currentImagePairIndex--;
          updateImages();
        }
        break;
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
