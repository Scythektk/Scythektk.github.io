let image; // convert image into global variable

// clear text boxes
window.onload = ()=>{
    document.getElementById("top-text-box").value = "";
    document.getElementById("bottom-text-box").value = "";
}

// set timeout so that the function doesn't execute before the page is fully loaded
// window.onload does not work in this case because it only executes on window load
setTimeout(()=> { 
    document.querySelector("#file").addEventListener("change", (event) =>{
    const imageDataUrl = URL.createObjectURL(event.target.files[0]);
    
    image = new Image(); // local variable image converted to global variable at the beginning of script
    image.src = imageDataUrl; //upload image
    
    image.addEventListener("load", ()=>{
        updateCanvas(canvas, image, topTextBox.value, bottomTextBox.value);
    }, {once: true}); // listener has to execute once only
    }); 

    const canvas = document.getElementById("output");
    const topTextBox = document.querySelector("#top-text-box");
    const bottomTextBox = document.querySelector("#bottom-text-box");

    // top text
    document.querySelector("#top-text-box").addEventListener("change", () => {
        updateCanvas(canvas, image, topTextBox.value, bottomTextBox.value);
    });

    // bottom text
    document.querySelector("#bottom-text-box").addEventListener("change", () => {
        updateCanvas(canvas, image, topTextBox.value, bottomTextBox.value);
    });
}, 2000);


function downloadImg(){
    const canvas = document.getElementById("output");
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "meme.png";
    link.href = image;
    link.click();
    link.remove();
}

function clearCanvas(){
    const canvas = document.getElementById("output");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("top-text-box").value = "";
    document.getElementById("bottom-text-box").value = "";
    document.querySelector(".container").height = "200px";
}

function updateCanvas(canvas, image, topText, bottomText){
    const ctx = canvas.getContext('2d');
    const width = image.width;
    const height = image.height;
    const fontSize = (width / 18);
    const yOffset = height / 25;

    // change canvas background
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    // text styles
    ctx.strokeStyle = "black";
    ctx.lineWidth = (fontSize / 8);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.lineJoin = "round";
    ctx.font = `${fontSize}px montserrat`;

    // top text
    ctx.textBaseline = "top";
    ctx.strokeText(topText, width / 2, yOffset);
    ctx.fillText(topText, width / 2, yOffset);

    // bottom text
    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomText, width / 2, height - yOffset);
    ctx.fillText(bottomText, width / 2, height - yOffset);
}