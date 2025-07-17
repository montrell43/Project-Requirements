
console.log("Taurus")
// Accesaa Key hidden using .gitignore in unsplash const file security
const access = UNSPLASH_ACCESS_KEY;
// This will be the cup and color picker from the DOM
const cup = document.getElementById("cup");
const colorPicker = document.getElementById("colorPicker");

// Additional picker for the text input to go on the cup for users
const cupText = document.getElementById("cupText");
const textInput = document.getElementById("textInput");

// Get stickers with the icon and container for stickers added
const stickersButtons = document.querySelectorAll('.sticker');
// positions over the cup where will be append
const stickerLayer = document.getElementById("stickerLayer");

const searchInput = document.getElementById("searchInput");

const resetButton = document.getElementById("resetButton");

const glassImage = document.getElementById("glassImage");

// Get overlay element for patterens unsplash will show
const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("imageResults");
// nav between different cups/glasses
const prevCupButton = document.getElementById("prevCup");
const nextCupButton = document.getElementById("nextCup");

const downloadButton = document.getElementById("downloadButton");
//const swapCup = document.getElementById("swapCup");
//const swapGlass = document.getElementById("swapGlass");


// Sets the overlay for the colors
//const overlay = document.createElement("div");
// overlay.className = "overlay";
// cup.appendChild(overlay);

// Able to change the background color when user selects a new color of overlay element
colorPicker.addEventListener('input', () => {
    // applies the color visually over the cup/ while colorPicker holds value
    overlay.style.backgroundColor = colorPicker.value;
});

// Able to update what the text on cup would be live on screen with cupText  making interactive
textInput.addEventListener('input', () => {
    cupText.textContent = textInput.value || "Your Text Here"; // if empty this a fallback
});


// Able to place stickers on cup
stickersButtons.forEach(button => {
    // adds a click listener for each sticker button
    button.addEventListener('click', () => {
        const iconClass = button.querySelector('i').className; // gets all font awesome class

     // creating an new <i> element to go on cup
        const icon = document.createElement('i');
        icon.className = iconClass;
     // Making an random position inside the cup setting size and location relative to cup making draggable
        icon.style.fontSize = "30px";
        icon.style.position = "absolute";
        icon.style.top = "40%";
        icon.style.left = "40%";
        icon.style.cursor = "grab";
        //icon.style.transform = "translate(-50%, -50%)";
        icon.style.zIndex = 10;

         // Adding new icon to the cup overlayer
        stickerLayer.appendChild(icon);

        // Adds the grab and dragging functionality to cursor pointer when clicked
        icon.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // This tells where the cup is sitting on the screen mouse offset point clicked
            const cupRect = cup.getBoundingClientRect();
            const iconRect = icon.getBoundingClientRect();
            // Once mouse is clicked absolute on the screen with clientX and clientY
            // icon.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - iconRect.left;
            const shiftY = event.clientY - iconRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup defining adjusted  
            function moveAt(pageX, pageY) {
                icon.style.left = `${pageX - cupRect.left - shiftX}px`;
                icon.style.top = `${pageY - cupRect.top - shiftY}px`;
            }
            // applying mousemove
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // the addEventListener mousemove updates the position
            document.addEventListener("mousemove", onMouseMove);

            // the addEventListener mouseup stops the dragging point of the sticker upon mouse
            document.addEventListener("mouseup", () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true});
        });

    })
});

// Able to place text on cup/glasses

        // Adds the grab and dragging functionality to cursor pointer when clicked drag begins
        cupText.addEventListener('mousedown', (event) => {
            event.preventDefault(); //prevents unintented behaviors

            // This tells where the cup is sitting currently on the screen
            const cupRect = cup.getBoundingClientRect(); // use to position text
            const textRect = cupText.getBoundingClientRect(); // gives teh position and size

            // Once mouse is clicked tracks the values how far absolute on the screen with clientX and clientY
            // icon.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - textRect.left;
            const shiftY = event.clientY - textRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup   
            function moveAt(pageX, pageY) {
                // keeps within context of cup by subtracting
                cupText.style.left = `${pageX - cupRect.left - shiftX}px`; 
                cupText.style.top = `${pageY - cupRect.top - shiftY}px`;
                // controls effect to take place .left .top
                cupText.style.position = "absolute";
            }
            // listen for mousemove
            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // the addEventListener mousemove updates the position continuously
            document.addEventListener("mousemove", onMouseMove);

            // the addEventListener mouseup stops the dragging point of the sticker upon mouse
            document.addEventListener("mouseup", () => {
                document.removeEventListener('mousemove', onMouseMove); // when user releases mouse it stops listening
            }, { once: true});  // to ensure it runs only one time not to build to many events
        });





function displayImages(images) {
    //const imageContainer = document.getElementById("imageResults");
    imageContainer.innerHTML = ''; // Helps clear last images

    if(images.length === 0) {
        imageContainer.textContent = "No images found. Try a different search";
        return; // if no images found look for new one for basic error handling for empty array results
    }
    // looping through image results
    images.forEach(img => {
        const imgElement = document.createElement('img'); // creates <img>
        imgElement.src = img.urls.small; // set src to small version of images
        imgElement.alt = img.alt_description; // gives description for (alt)
        // styling for interactivity with hover effect
        imgElement.style.cursor = 'pointer';
        imgElement.style.width ="150px";
        imgElement.style.margin = "10px";
        imgElement.style.borderRadius = "8px";
        imgElement.style.transition = "transform 0.2s";

        imgElement.addEventListener("mouseenter", () => imgElement.style.transform = "scale(1.05)");
        imgElement.addEventListener("mouseleave", () => imgElement.style.transform = "scale(1)")

        imgElement.addEventListener("click", () => {
           // setting display of image upon the overlay how it will look realisticly
            overlay.style.backgroundImage = `url(${img.urls.small})`; // replaces the glasses images to wrap the image around the selected glass
            overlay.style.backgroundSize = "45% auto"; // covers the glass fully
            overlay.style.backgroundRepeat = "no-repeat"; // to make sure the images do not show multiple same images
            overlay.style.backgroundPosition = "center center"; // center the images presented
            overlay.style.backgroundColor = "transparent"; // removes overlay on real glasses
            //glassImage.src = "images/white-mug.png";


        // Able to place images where want to on cup and draggable with overlay 
        // Adds the grab and dragging functionality to cursor pointer
        overlay.onmousedown = (event) => {
            event.preventDefault();

            // This tells where the cup is sitting on the screen
            const cupRect = cup.getBoundingClientRect();
            const overlayRect = overlay.getBoundingClientRect();
            // Once mouse is clicked absolute on the screen with clientX and clientY
            // image.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - overlayRect.left;
            const shiftY = event.clientY - overlayRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup   
            function moveAt(pageX, pageY) {
                overlay.style.left = `${pageX - cupRect.left - shiftX}px`;
                overlay.style.top = `${pageY - cupRect.top - shiftY}px`;
                overlay.style.position = "absolute";
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // the addEventListener mousemove updates the position
            document.addEventListener("mousemove", onMouseMove);

            // the addEventListener mouseup stops the dragging point of the sticker upon mouse
            document.addEventListener("mouseup", () => {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true});
        }
    });
        // adds image to search results
        imageContainer.appendChild(imgElement);
    })
}

function fetchCupImages(query = 'coffee cup') { // This lines allow the query to be accepted and if nothing is passed it defaults to cup
    // constructing a request to unsplash api
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&client_id=${access}`) // query makes the search safe for urls/ per_pae set limit/ client_id uses my unslash key
    .then(response => response.json()) // converts response to json
    .then(data =>  displayImages(data.results)) // sends result array to my displayImages
    .catch(error => console.error("Error fetching images:", error)) // logs any errors in api
}
fetchCupImages(); // triggers the first search when app loads and defaults to "coffe-cup"

// This listens for enter key to trigger search for #searchInput
searchInput.addEventListener('keypress', (event) => {
    if(event.key === "Enter") { // if user press enter it grabs the value of the input field
        const query = searchInput.value.trim(); // get type value and trims whitspace
        if(query.length > 0) {
            fetchCupImages(query);
            searchInput.value = ""; // clears input after clicking
        }
    }
});

    // sets up listener on #resetButton to run when button is clicked
resetButton.addEventListener("click", () => {
    // Once clicked Resets background-color and images
    //glassImage.style.backgroundImage = "url('images/white-mug.png')";
    overlay.style.backgroundColor = "transparent";
    overlay.style.backgroundImage = "none"

    // Once clicked resets the cup's text
    cupText.textContent = "Your text";
    textInput.value = ""; // clears the text input field

    // Once clicked removes all stickers in the <i> tags that goes on the cup
    const stickers = cup.querySelectorAll("i");
    stickers.forEach(sticker => sticker.remove()); // loops through them and removes each from the DOM


});

// images included in array to switch between
const cupImages = [
    "images/white-mug.png",
    "images/black-mug.png",
    "images/small-glass.jpg",
    "images/clear-glass.jpg"
]
// tracks current cup image starting at zero
let currentCupIndex = 0;

// Swap buttons
// swapCup.addEventListener("click", () => {
//     glassImage.src = ;
//     overlay.style.backgroundColor = "transparent";
// });

// swapGlass.addEventListener("click", () => {
//     glassImage.src = ;
//     overlay.style.backgroundColor = "transparent";
// });

// prev button / next button lets user go through my designs and reset anything custom
prevCupButton.addEventListener("click", () => {
    // moves the index backwards if at 0 wraps to last image moving currenIndex by 1 and updates src of glassImage
    currentCupIndex = (currentCupIndex - 1 + cupImages.length) % cupImages.length;
    // updates cup image src of main image #glassImage
    glassImage.src = cupImages[currentCupIndex];
});

 // works the same as prevButton but moves forwards in the array
nextCupButton.addEventListener("click", () => {
    // ensures wrap to start once at end
    currentCupIndex = (currentCupIndex + 1) % cupImages.length; 
    glassImage.src = cupImages[currentCupIndex];
});

downloadButton.addEventListener("click", () => {
    html2canvas(cup).then(canvas => {
        const link = document.createElement("a");
        link.download = "my-cup-design.png";
        link.href = canvas.toDataURL("image.png");
        link.click();
    });
});