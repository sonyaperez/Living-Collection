//Making avatar move up and down.

document.addEventListener("DOMContentLoaded", () => {

    const sonya = document.querySelector('.minisonya');
    const bubble = document.querySelector('.speech-bubble');

    let y = 0;
    let direction = 1;

    function animateSonya() {
        y += 0.4 * direction;
        if (y > 10 || y < -10) direction *= -1;
        sonya.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(animateSonya);
    }

    animateSonya();

//Speech bubble messages that appear when avatar is hovered over.Using random array selection; variety of messages.
//More messages means there will be fewer repeat messages.
    const messages = [
        "A collection of my works.", 
        "Look around!",
        "Happy end of Sem 1!",
        "Hope you like my works.",
        "Happy Holidays!",
        "I ❤︎ web design",
        "Add a pic of your site!>⩊<",
    ];
//Fit bubble to length of text.
    function showBubble() {
        bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
        bubble.style.opacity = 1;
    }
//Bubble hidden when not hovered.
    function hideBubble() {
        bubble.style.opacity = 0;
    }
//Hover mouse events.
    sonya.addEventListener('mouseenter', showBubble);
    sonya.addEventListener('mouseleave', hideBubble);
});

//Function to clear all images from the gallery using delete button.
    function clearGallery() {
        // Clear the gallery grid.
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        // Remove images from localStorage
        localStorage.removeItem('galleryImages');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Clear Gallery';
    deleteButton.className = 'delete-button';

    // When clicked, delete images from page.
    deleteButton.addEventListener('click', clearGallery);
    document.body.appendChild(deleteButton);

    //Function to preview image and save it to storage; Add button.
    function previewImage(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgData = e.target.result;

                // Save the image data to localStorage, saves even when refreshed.
                const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
                galleryImages.push(imgData);
                localStorage.setItem('galleryImages', JSON.stringify(galleryImages));

                //New image element when user adds image.
                const img = document.createElement('img');
                img.src = imgData;
                img.alt = "User uploaded image";
                img.className = "gallery-image";

                // Add the image to the gallery.
                document.getElementById('gallery').appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    //Images that were added and then saved to localStorage show when page is loaded.
    window.onload = function() {
        const galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
        const gallery = document.getElementById('gallery');
        galleryImages.forEach(imgData => {
            const img = document.createElement('img');
            img.src = imgData;
            img.alt = "User uploaded image";
            img.className = "gallery-image";
            gallery.appendChild(img);
        });
    };
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // New image element.
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = "User uploaded image";
                img.className = "gallery-image";

                // Add image to the gallery.
                document.getElementById('gallery').appendChild(img);
            };
            reader.readAsDataURL(file);
        }