document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

function aiMessage() {

    let message = document.getElementById("aiInput").value;

    let response = document.getElementById("aiResponse");

    if (message === "") {

        response.innerHTML = "<p><strong>Wyvora AI:</strong> Lütfen bir soru yazın.</p>";

    } else {

        response.innerHTML = "<p><strong>Wyvora AI:</strong> Sorunuz alındı. Size yardımcı olmak için hazırlanıyorum.</p>";

    }

}