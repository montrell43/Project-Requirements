
console.log("Taurus")
// Accesaa Key hidden using .gitignore
const access = key
// This will be the cup and color picker
const cup = document.getElementById("cup");
const colorPicker = document.getElementById("colorPicker");

// Additional picker for the text input
const cupText = document.getElementById("cupText");
const textInput = document.getElementById("textInput");

const stickersButtons = document.querySelectorAll('.sticker')

// Able to change the background color when user selects a new color
colorPicker.addEventListener('input', () => {
    cup.style.backgroundColor = colorPicker.value
});

// Able to update what the text on cup would be
textInput.addEventListener('input', () => {
    cupText.textContent = textInput.value;
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
        icon.style.top = `${Math.random() * 80 + 10}%`
        icon.style.left = `${Math.random() * 80 + 10}%`

        // Adding new icon to the cup
        cup.appendChild(icon);
    })
});

function displayImages(images) {
    const imageContainer = document.getElementById("imageRsults");
    imageContainer.innerHTML = '' // Helps clear last images

    images.forEach(img => {
        const imgElement = document.createElement('img')
        imgElement.src = img.urls.small;
        imgElement.style.cursor = 'pointer';

        imgElement.addEventListener("click", () => {
            cup.style.backgroundImage = `url(${img.urls.small})`;
            cup.style.backgroundSize = 'cover';
            cup.style.backgroundPosition = 'center';
        });
        imageContainer.appendChild(imgElement);
    })
}

function fetchCupImages() {
    fetch(`https://api.unsplash.com/search/photos?query=coffee cup&per_page=6&client_id=${access}`)
    .then(response => response.json())
    .then(data => {
        displayImages(data.results)
    })
    .catch(error => {
        console.error("Error fetch images:", error)
    })
}
fetchCupImages();