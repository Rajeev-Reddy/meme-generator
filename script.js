const memeImage = document.getElementById("memeImage");
const getMemeBtn = document.getElementById("getMeme");
const generateMemeBtn = document.getElementById("generateMeme");
const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");
const memeCanvas = document.getElementById("memeCanvas");
const downloadMeme = document.getElementById("downloadMeme");

let memeUrl = ""; 

// Fetch a random meme template from Imgflip
getMemeBtn.addEventListener("click", async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    
    if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        memeUrl = randomMeme.url;
        memeImage.src = memeUrl;
    }
});

// Generate meme with text overlay
generateMemeBtn.addEventListener("click", () => {
    if (!memeUrl) return alert("Please select a meme first!");

    // Draw meme on canvas
    const ctx = memeCanvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = memeUrl;

    img.onload = () => {
        memeCanvas.width = img.width;
        memeCanvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Add text
        ctx.font = "bold 40px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        ctx.strokeText(topTextInput.value, img.width / 2, 50);
        ctx.fillText(topTextInput.value, img.width / 2, 50);
        
        ctx.strokeText(bottomTextInput.value, img.width / 2, img.height - 20);
        ctx.fillText(bottomTextInput.value, img.width / 2, img.height - 20);

        // Set download link
        downloadMeme.href = memeCanvas.toDataURL();
        downloadMeme.style.display = "block";
    };
});
