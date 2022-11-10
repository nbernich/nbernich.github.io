/**
 * Click listener for copy link popup
 */
Array.from(document.getElementsByClassName("bib-entry")).forEach(el => {
    el.addEventListener("click", event => {
        try {
            const link = el.getAttribute("data-link");
            navigator.clipboard.writeText(link);
            sendPopUp("Copied Citation Link!", el, event.offsetX, event.offsetY);
        } catch(err) {
            sendPopUp("Error Copying Link", el, event.offsetX, event.offsetY);
        }
    });
});

/**
 * Imperative pop up creator at the click point.
 */
function sendPopUp(message, target, offsetX, offsetY) {
    const alertBox = document.createElement("div");
    alertBox.setAttribute("class", "alert");
    alertBox.innerText = message;
    alertBox.style.left = target.offsetLeft + offsetX + 10 + "px";
    alertBox.style.top = target.offsetTop + offsetY + 10 + "px";
    target.appendChild(alertBox);
    setTimeout(() => {
        alertBox.parentElement.removeChild(alertBox);
    }, 1000);
}