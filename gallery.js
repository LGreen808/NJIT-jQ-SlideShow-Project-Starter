let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially




  // Select the moreIndicator button and add a click event to:
  $('.moreIndicator').on("click", () => {
    $('.moreIndicator').toggleClass('rot90 rot270')
    $('.details').slideToggle('rot180')
  })
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('.nextPhoto').on("click", () => {
    showNextPhoto()
  })

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('.prevPhoto').on("click", () => {
    showPrevPhoto()
  })

  // Call fetchJSON() to load the initial set of images
  fetchJSON();
})

// Function to fetch JSON data and store it in mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      mImages = data.images;
      console.log('Data fetched successfully:', data);
      swapPhoto();
// Call a function here to start the timer for the slideshow
      startTimer();






    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error fetching data:', textStatus, errorThrown);
    }
  })

  // Use $.ajax here to request the JSON data from mUrl
  // On success, parse the JSON and push each image object into mImages array

  // After JSON is loaded, call swapPhoto() to display the first image
}

// Function to swap and display the next photo in the slideshow
function swapPhoto() {
  // Access mImages[mCurrentIndex] to update the image source and details
  const img = mImages[mCurrentIndex];
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath);
  $('.name').text(img.name);
  $('.oneMovie').text(img.oneMovie);

  // Update the #photo element's src attribute with the current image's path
  // Update the .imgPath, .name, and .oneMovie elements with the current image's details
}
// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto() {
  mCurrentIndex++
  swapPhoto();
  // Increment mCurrentIndex and call swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  if (mCurrentIndex >= mImages.length) mCurrentIndex = 0;
}
// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto() {
  mCurrentIndex--
  swapPhoto();
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
   if (mCurrentIndex < 0) mCurrentIndex = mImages.length -1;
}
// Starter code for the timer function
function startTimer() {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  const timer = setInterval(showNextPhoto, mWaitTime);
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
