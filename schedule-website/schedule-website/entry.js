// Add this script at the end of your body or in an external JavaScript file

// Wait for the page to fully load
window.addEventListener("load", function () {
    // Hide the entry scene after a delay (e.g., 2 seconds)
    setTimeout(function () {
        const entryScene = document.querySelector(".entry-scene");
        entryScene.style.opacity = "0";
    }, 2000); // Adjust the delay as needed (in milliseconds)
});
