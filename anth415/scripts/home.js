/* Page elements */
const galleryCaption = document.querySelector(".gallery-caption");
const galleryImage = document.querySelector(".gallery-image");
const skullTitle = document.querySelector(".skull-title");
const skullCaption = document.querySelector(".skull-caption");

/* Rotating item data */
const GALLERY_ITEMS = [
    {
        "caption":"Mandibile",
        "image":"https://iiif.elifesciences.org/lax/09560%2Felife-09560-fig5-v1.tif/full/1234,/0/default.webp"
    },
    {
        "caption":"Hand",
        "image":"https://iiif.elifesciences.org/lax/09560%2Felife-09560-fig6-v1.tif/full/1234,/0/default.webp"
    },
    {
        "caption":"Tibia",
        "image":"https://iiif.elifesciences.org/lax/09560%2Felife-09560-fig8-v1.tif/full/1234,/0/default.webp"
    },
    {
        "caption":"Foot",
        "image":"https://iiif.elifesciences.org/lax/09560%2Felife-09560-fig9-v1.tif/full/1234,/0/default.webp"
    },
    {
        "caption":"Pelvic Specimens",
        "image":"https://iiif.elifesciences.org/lax/09560%2Felife-09560-fig13-v1.tif/full/1234,/0/default.webp"
    }
];

/* Skull hover logic and listeners */
Array.from(document.querySelectorAll(".skull")).forEach(skull => {
    skull.addEventListener("mouseover", (event) => {
        skullTitle.innerText = skull.getAttribute("data-title");
        skullCaption.innerText = skull.getAttribute("data-caption");
    });

    skull.addEventListener("mouseout", (event) => {
        skullTitle.innerText = "Hominid Skulls";
        skullCaption.innerText = "Hover over a skull to learn how they compare to Homo Naledi!";
    });
});

/* Gallery logic and listeners */
let galleryImageIndex = 0;

function updateGallery() {
    galleryImage.src = GALLERY_ITEMS[galleryImageIndex].image;
    galleryCaption.innerText = GALLERY_ITEMS[galleryImageIndex].caption;
}

document.querySelector(".gallery-left").addEventListener("click", () => {
    galleryImageIndex = (galleryImageIndex + GALLERY_ITEMS.length - 1) % GALLERY_ITEMS.length;
    updateGallery();
});

document.querySelector(".gallery-right").addEventListener("click", () => {
    galleryImageIndex = (galleryImageIndex + 1) % GALLERY_ITEMS.length;
    updateGallery();
});

/* Onload events */
window.onload = () => {
    updateGallery();
};