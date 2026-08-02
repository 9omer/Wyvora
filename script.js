document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

});


// Kullanıcının yazdığı mesajı işler
function aiMessage() {

    let input = document.getElementById("aiInput");
    let response = document.getElementById("aiResponse");

    let message = input.value.toLowerCase();


    if (message === "") {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Lütfen bir soru yazın.</p>";

        return;

    }


    if (message.includes("kampanya")) {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> İşletmeniz için hafta sonu %15 indirim kampanyası öneriyorum.</p>";

    }

    else if (message.includes("menü")) {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> En çok satan ürünlerinizi öne çıkararak menünüzü optimize edebilirsiniz.</p>";

    }

    else if (message.includes("yorum")) {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Müşteri yorumlarınızı analiz ederek memnuniyet oranınızı artırabilirsiniz.</p>";

    }

    else {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Sorunuzu analiz ediyorum. İşletmenizi geliştirmek için öneriler hazırlıyorum.</p>";

    }


    input.value = "";

}



// Hazır AI komutları

function aiCommand(command) {


    let response = document.getElementById("aiResponse");


    if (command === "Menümü analiz et") {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Menü analizi tamamlandı. En çok satan ürünlerinizi öne çıkarmanızı öneriyorum.</p>";

    }


    else if (command === "Kampanya oluştur") {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Yeni kampanya önerisi: Hafta içi kahve yanında tatlı indirimi.</p>";

    }


    else if (command === "Ürün açıklaması yaz") {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Ürünlerinizi daha çekici açıklamalarla müşterilere sunabilirsiniz.</p>";

    }


    else if (command === "Google yorumlarını analiz et") {

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Yorum analizi için müşteri geri bildirimleri inceleniyor.</p>";

    }


}
function addProduct() {

    let name = document.getElementById("productName").value;

    let price = document.getElementById("productPrice").value;


    if (name === "" || price === "") {

        alert("Lütfen ürün adı ve fiyat girin.");

        return;

    }


    let menuList = document.getElementById("menuList");


    let product = document.createElement("div");


    product.className = "ai-message";


    product.innerHTML = 
    name + 
    "<br>₺" + price +
    "<br><button onclick='this.parentElement.remove()'>Sil</button>";


    menuList.appendChild(product);



    document.getElementById("productName").value = "";

    document.getElementById("productPrice").value = "";


}