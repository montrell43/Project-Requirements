
console.log("Taurus")
// Accesaa Key hidden using .gitignore
const access = UNSPLASH_ACCESS_KEY;
// This will be the cup and color picker
const cup = document.getElementById("cup");
const colorPicker = document.getElementById("colorPicker");

// Additional picker for the text input
const cupText = document.getElementById("cupText");
const textInput = document.getElementById("textInput");

const stickersButtons = document.querySelectorAll('.sticker');
const stickerLayer = document.getElementById("stickerLayer");

const searchInput = document.getElementById("searchInput");

const resetButton = document.getElementById("resetButton");

const glassImage = document.getElementById("glassImage");

const overlay = document.getElementById("overlay");
const imageContainer = document.getElementById("imageResults");
const prevCupButton = document.getElementById("prevCup");
const nextCupButton = document.getElementById("nextCup");
//const swapCup = document.getElementById("swapCup");
//const swapGlass = document.getElementById("swapGlass");


// Sets the overlay for the colors
//const overlay = document.createElement("div");
// overlay.className = "overlay";
// cup.appendChild(overlay);

// Able to change the background color when user selects a new color
colorPicker.addEventListener('input', () => {
    overlay.style.backgroundColor = colorPicker.value;
});

// Able to update what the text on cup would be
textInput.addEventListener('input', () => {
    cupText.textContent = textInput.value || "Your Text Here";
});


// Able to place stickers on cup
stickersButtons.forEach(button => {
    button.addEventListener('click', () => {
        const iconClass = button.querySelector('i').className;

// creating an new <i> element
        const icon = document.createElement('i');
        icon.className = iconClass;

        icon.style.fontSize = "30px";
        icon.style.position = "absolute";

        // Making an random position inside the cup
        icon.style.top = "40%";
        icon.style.left = "40%";
        icon.style.cursor = "grab";
        //icon.style.transform = "translate(-50%, -50%)";
        icon.style.zIndex = 10;

         // Adding new icon to the cup
        stickerLayer.appendChild(icon);

        // Adds the grab and dragging functionality to cursor pointer
        icon.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // This tells where the cup is sitting on the screen
            const cupRect = cup.getBoundingClientRect();
            const iconRect = icon.getBoundingClientRect();
            // Once mouse is clicked absolute on the screen with clientX and clientY
            // icon.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - iconRect.left;
            const shiftY = event.clientY - iconRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup   
            function moveAt(pageX, pageY) {
                icon.style.left = `${pageX - cupRect.left - shiftX}px`;
                icon.style.top = `${pageY - cupRect.top - shiftY}px`;
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
        });

    })
});

// Able to place text on cup/glasses

        // Adds the grab and dragging functionality to cursor pointer
        cupText.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // This tells where the cup is sitting on the screen
            const cupRect = cup.getBoundingClientRect();
            const iconRect = icon.getBoundingClientRect();
            // Once mouse is clicked absolute on the screen with clientX and clientY
            // icon.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - iconRect.left;
            const shiftY = event.clientY - iconRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup   
            function moveAt(pageX, pageY) {
                icon.style.left = `${pageX - cupRect.left - shiftX}px`;
                icon.style.top = `${pageY - cupRect.top - shiftY}px`;
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
        });


// Able to place images where want to on cup
imgElement.addEventListener("click", () => {
// creating an new <img> element and add it to stickerLayer
        const image = document.createElement('img');
        image.src = img.urls.small;
        image.className = "draggable-image";
        image.style.position = "absolute";

        // Making an random position inside the cup
        image.style.top = "40%";
        image.style.left = "40%";
        image.style.cursor = "grab";
         // Adding new image to the cup
        stickerLayer.appendChild(image);

        // Adds the grab and dragging functionality to cursor pointer
        image.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // This tells where the cup is sitting on the screen
            const cupRect = cup.getBoundingClientRect();
            const imageRect = image.getBoundingClientRect();
            // Once mouse is clicked absolute on the screen with clientX and clientY
            // image.getBoundingClientRect allows me to know where is the sticker on the screen
            // shiftX and shiftY is to prevent the sticker from jumping to it's original placing to top-left of screen when I drag and shows how far inside the the sticker the mouse has clicked
            const shiftX = event.clientX - imageRect.left;
            const shiftY = event.clientY - imageRect.top;


            // this function allows the mouseAt to calculate where to place the sticker that it follows the mouse  and moves X relative to cup   
            function moveAt(pageX, pageY) {
                image.style.left = `${pageX - cupRect.left - shiftX}px`;
                image.style.top = `${pageY - cupRect.top - shiftY}px`;
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
        });

    })


function displayImages(images) {
    //const imageContainer = document.getElementById("imageResults");
    imageContainer.innerHTML = ''; // Helps clear last images

    if(images.length === 0) {
        imageContainer.textContent = "No images found. Try a different search";
        return;
    }

    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        imgElement.alt = img.alt_description;
        imgElement.style.cursor = 'pointer';

        imgElement.addEventListener("click", () => {

            overlay.style.backgroundImage = `url(${img.urls.small})`; // replaces the glasses images to wrap the image around the selected glass
            overlay.style.backgroundSize = "45% auto"; // covers the glass fully
            overlay.style.backgroundRepeat = "no-repeat"; // to make sure the images do not show multiple same images
            overlay.style.backgroundPosition = "center center"; // center the images presented
            //overlay.style.backgroundColor = "transparent"; // removes overlay on real glasses
            //glassImage.src = "images/white-mug.png";
        });
        imageContainer.appendChild(imgElement);
    })
}


function fetchCupImages(query = 'coffee cup') { // This lines allow the query to be accepted
    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=6&client_id=${access}`)
    .then(response => response.json())
    .then(data =>  displayImages(data.results))
    .catch(error => console.error("Error fetching images:", error))
}
fetchCupImages();

// This listens for enter key to trigger search
searchInput.addEventListener('keypress', (event) => {
    if(event.key === "Enter") {
        const query = searchInput.value.trim();
        if(query.length > 0) {
            fetchCupImages(query);
            searchInput.value = ""; // clears input after clicking
        }
    }
});

resetButton.addEventListener("click", () => {
    // Once clicked Resets background-color and images
    //glassImage.style.backgroundImage = "url('images/white-mug.png')";
    //overlay.style.backgroundColor = "transparent";
    overlay.style.backgroundImage = "none"

    // Once clicked resets the cup's text
    cupText.textContent = "Your text";
    textInput.value = "";

    // Once clicked removes all stickers in the <i> tags that goes on the cup
    const stickers = cup.querySelectorAll("i");
    stickers.forEach(sticker => sticker.remove());


});

const cupImages = [
    "images/white-mug.png",
    "images/black-mug.png",
    "images/small-glass.jpg",
    "images/clear-glass.jpg"
]

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

// prev button / next button
prevCupButton.addEventListener("click", () => {
    currentCupIndex = (currentCupIndex - 1 + cupImages.length) % cupImages.length;
    glassImage.src = cupImages=[currentCupIndex];

    overlay.style.backgroundColor = "transparent";
    overlay.style.backgroundImage = "none";
});

nextCupButton.addEventListener("click", () => {
    currentCupIndex = (currentCupIndex + 1) % cupImages.length;
    glassImage.src = cupImages[currentCupIndex];

    overlay.style.backgroundColor = "transparent";
    overlay.style.backgroundImage = "none";
});