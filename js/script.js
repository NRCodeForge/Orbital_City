document.getElementById("downloadAudio").addEventListener("click", function () {
    
    //audio file path
    const audioPath = "audio/radiospot.mp3";
  
    //anchor tag
    const link = document.createElement("a");
    link.href = audioPath;
  
    //file name
    link.download = "radiospot.mp3";
  
    link.click();
});

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); //verhindert seitenreload
  
    //form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    //sind alle felder ausgefüllt?
    if (name && email && message) {
      document.getElementById("contactForm").reset();
    } else {
      const formMessage = document.getElementById("formMessage");
      formMessage.textContent = "Bitte fülle alle Felder aus.";
      formMessage.classList.remove("hidden");
      formMessage.style.color = "red";
    }
});

document.getElementById('downloadPoster').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'images/og_plakat.png'; // Pfad zum Plakat
    link.download = 'Plakat.png'; // Name der heruntergeladenen Datei
    link.click();
});
  