const WYVORA_AI = true;

document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

    loadProducts();

    loadPhotos();

    loadReservations();
generateAIRecommendations();
loadStore();
loadStoreMenu();
loadStoreGallery();
function loadStoreMenu(){

    let menu =
    document.getElementById("storeMenu");


    if(!menu) return;


    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];


    menu.innerHTML = "";


    products.forEach(function(product){


        menu.innerHTML += `

        <div class="ai-message">

        <h3>${product.name}</h3>

        <p>₺${product.price}</p>


        ${product.image ?
        "<img src='"+product.image+"' width='200'>"
        :
        ""}


        </div>

        `;


    });


}
});


// AI mesaj sistemi

function aiMessage() {

    let input = document.getElementById("aiInput");
    let response = document.getElementById("aiResponse");

    if(!input || !response) return;


    let message = input.value.toLowerCase();


    if(message === ""){

        response.innerHTML =
        "<p><strong>Wyvora AI:</strong> Lütfen bir soru yazın.</p>";

        return;
    }


    response.innerHTML =
"<p><strong>Wyvora AI:</strong> " + generateAIResponse(message) + "</p>";

    input.value = "";

}



function aiCommand(command) {

    let response = document.getElementById("aiResponse");


    if(!response) return;


    let message = "";


    if(command === "Menümü analiz et"){

        let products =
        JSON.parse(localStorage.getItem("products")) || [];


        message =
        "Menünüzde " + products.length + 
        " ürün bulunuyor. Ürün çeşitliliğinizi artırmayı düşünebilirsiniz.";

    }


    else if(command === "Kampanya oluştur"){

    let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];


    if(reservations.length > 10){

        message =
        "Rezervasyonlarınız yoğun. Hafta içi özel indirim kampanyası oluşturabilirsiniz.";

    }
    else{

        message =
        "Müşteri çekmek için yeni ürün tanıtımı veya özel kampanya oluşturabilirsiniz.";

    }

}


    else if(command === "Ürün açıklaması yaz"){

    let products =
    JSON.parse(localStorage.getItem("products")) || [];


    if(products.length === 0){

        message =
        "Önce menünüze ürün ekleyin. Daha sonra ürün açıklamaları oluşturabilirim.";

    }
    else{

        let productName = products[0].name;


        message =
        productName + " için açıklama önerisi: Özel tarifimiz, kaliteli malzemelerimiz ve eşsiz lezzetiyle misafirlerimize unutulmaz bir deneyim sunar.";

    }

}


    else if(command === "Google yorumlarını analiz et"){

    message =
    "Google yorum analizi sonucu: Müşterilerinizin memnun olduğu noktaları öne çıkarın. Olumsuz geri bildirimlerde ise hizmet hızını, ürün kalitesini ve müşteri deneyimini geliştirmeyi düşünebilirsiniz.";

}


    response.innerHTML = `

    <p>
    <strong>Wyvora AI:</strong> ${message}
    </p>

    `;

}


    response.innerHTML =
    "<p><strong>Wyvora AI:</strong> " + command + " hazırlanıyor.</p>";

}



// Ürün ekleme

function addProduct(){

    let name = document.getElementById("productName").value;

    let price = document.getElementById("productPrice").value;

    let image = document.getElementById("productImage").value;



    if(name === "" || price === ""){

        alert("Ürün adı ve fiyat girin.");

        return;

    }



    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];



    products.push({

        name:name,

        price:price,

        image:image

    });



    localStorage.setItem(
        "products_" + businessCode,
        JSON.stringify(products)
    );


    loadProducts();


    document.getElementById("productName").value="";

    document.getElementById("productPrice").value="";

    document.getElementById("productImage").value="";

}



// Ürünleri gösterme

function loadProducts(){

    let menuList = document.getElementById("menuList");


    if(!menuList) return;


    menuList.innerHTML="";



    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];



    products.forEach(function(product,index){


        let div=document.createElement("div");


        div.className="ai-message";



        div.innerHTML = `

        ${product.image ? 
        "<img src='"+product.image+"' width='150'>" 
        : ""}


        <h3>${product.name}</h3>

        <p>₺${product.price}</p>


        <button onclick="editProduct(${index})">
        Düzenle
        </button>


        <button onclick="deleteProduct(${index})">
        Sil
        </button>

        `;


        menuList.appendChild(div);


    });


}



// Ürün düzenleme

function editProduct(index){


    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];



    let newName =
    prompt("Yeni ürün adı:", products[index].name);



    let newPrice =
    prompt("Yeni fiyat:", products[index].price);



    if(newName && newPrice){


        products[index].name=newName;

        products[index].price=newPrice;


       localStorage.setItem(
    "products_" + businessCode,
    JSON.stringify(products)
);


        loadProducts();

    }

}



// Ürün silme

function deleteProduct(index){


    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];



    products.splice(index,1);



    localStorage.setItem(
        "products_" + businessCode,
        JSON.stringify(products)
    );


    loadProducts();

}
function login(){

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    let message = document.getElementById("loginMessage");


    let businesses =
JSON.parse(localStorage.getItem("businesses")) || [];

let business =
businesses.find(function(item){

    return item.username === username &&
           item.password === password;

});

if(business){


        localStorage.setItem("loggedIn","true");
localStorage.setItem(
    "activeBusinessCode",
    business.code
);

        message.innerHTML =
        "Giriş başarılı. Dashboard açılıyor...";


        setTimeout(function(){

            window.location.href="dashboard.html";

        },1000);


    }

    else{


        message.innerHTML =
        "Kullanıcı adı veya şifre yanlış.";


    }


}
function logout(){

    localStorage.removeItem("loggedIn");

    window.location.href="admin.html";

}
function saveBusiness(){
let businessCode = 
"wyvora-" + Date.now();
    let business = {
        
        code: businessCode,
        username: document.getElementById("businessUsername").value,

password: document.getElementById("businessPassword").value,
        
        logo: document.getElementById("logo").value,

        name: document.getElementById("businessName").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        hours: document.getElementById("hours").value,

        description: document.getElementById("description").value

    };




let businesses =
JSON.parse(localStorage.getItem("businesses")) || [];

businesses.push(business);

localStorage.setItem(
    "businesses",
    JSON.stringify(businesses)
);


    document.getElementById("saveMessage").innerHTML =
    "İşletme bilgileri kaydedildi.";
let qrLink = document.getElementById("qrLink");

if(qrLink){

    qrLink.innerHTML =
window.location.origin +
"/store.html?code=" +
businessCode;
    }
let qrImage = document.getElementById("qrImage");


    if(qrImage){

    qrImage.src = 
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" 
    + window.location.origin + "/store.html?code=" 
    + businessCode;

}


}
let codeBox = document.getElementById("businessCode");

if(codeBox){

    codeBox.innerHTML = "İşletme Kodunuz: " + businessCode;

}
}

document.addEventListener("DOMContentLoaded", function(){


    let businesses =
JSON.parse(localStorage.getItem("businesses")) || [];


let activeCode = localStorage.getItem("activeBusinessCode");

let data = businesses.find(function(item){

    return item.code === activeCode;

});


if(data){


        if(document.getElementById("businessName")){
            
            document.getElementById("logo").value = data.logo || "";

            document.getElementById("businessName").value = data.name;

            document.getElementById("phone").value = data.phone;

            document.getElementById("address").value = data.address;

            document.getElementById("hours").value = data.hours;

            document.getElementById("description").value = data.description;
if(document.getElementById("businessCode")){

    document.getElementById("businessCode").innerHTML =
    "İşletme Kodunuz: " + (data.code || "");

}
        }


    }


});
function addPhoto(){

    let url = document.getElementById("photoUrl").value;


    if(url === ""){

        alert("Fotoğraf linki girin.");

        return;

    }


    let businessCode =
localStorage.getItem("activeBusinessCode");

let photos =
JSON.parse(localStorage.getItem("photos_" + businessCode)) || [];


    photos.push(url);


    localStorage.setItem(
    "photos_" + businessCode,
    JSON.stringify(photos)
);


    loadPhotos();


    document.getElementById("photoUrl").value="";

}



function loadPhotos(){

    let gallery =
    document.getElementById("galleryList");


    if(!gallery) return;


    gallery.innerHTML="";


    let photos =
    JSON.parse(localStorage.getItem("photos")) || [];



    photos.forEach(function(photo,index){


        let div=document.createElement("div");


        div.className="ai-message";


        div.innerHTML = `

        <img src="${photo}" width="200">

        <br>

        <button onclick="deletePhoto(${index})">
        Sil
        </button>

        `;


        gallery.appendChild(div);


    });


}



function deletePhoto(index){


    let photos =
    JSON.parse(localStorage.getItem("photos")) || [];


    photos.splice(index,1);


    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );


    loadPhotos();

}

function addReservation(){

    let name = document.getElementById("customerName").value;

    let date = document.getElementById("customerDate").value;

    let count = document.getElementById("customerCount").value;


    if(name === "" || date === "" || count === ""){

        alert("Tüm bilgileri doldurun.");

        return;

    }


    let businessCode =
localStorage.getItem("activeBusinessCode");

let reservations =
JSON.parse(localStorage.getItem("reservations_" + businessCode)) || [];


    reservations.push({

        name:name,

        date:date,

        count:count

    });


    localStorage.setItem(
    "reservations_" + businessCode,
    JSON.stringify(reservations)
);


    loadReservations();


    document.getElementById("customerName").value="";

    document.getElementById("customerDate").value="";

    document.getElementById("customerCount").value="";
alert("Rezervasyonunuz alındı. Teşekkür ederiz.");
}



function loadReservations(){

    let list =
    document.getElementById("reservationList");


    if(!list) return;


    list.innerHTML="";


    let businessCode =
localStorage.getItem("activeBusinessCode");

let reservations =
JSON.parse(localStorage.getItem("reservations_" + businessCode)) || [];

    reservations.forEach(function(reservation,index){


        let div=document.createElement("div");


        div.className="ai-message";


        div.innerHTML = `

        <h3>${reservation.name}</h3>

        <p>Tarih: ${reservation.date}</p>

        <p>Kişi: ${reservation.count}</p>


        <button onclick="deleteReservation(${index})">
        Sil
        </button>

        `;


        list.appendChild(div);


    });


}



function deleteReservation(index){

    let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];


    reservations.splice(index,1);


    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );


    loadReservations();

}
function generateAIRecommendations(){

    let box = document.getElementById("aiSuggestions");

    if(!box) return;

let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];

let reservations =
JSON.parse(localStorage.getItem("reservations_" + businessCode)) || [];


let message = "";


if(products.length < 5){

    message = "Menünüze daha fazla ürün ekleyerek müşterilerinize daha fazla seçenek sunabilirsiniz.";

}
else if(reservations.length > 10){

    message = "Rezervasyonlarınız yoğun. Kampanya oluşturarak müşteri sayınızı artırabilirsiniz.";

}
else{

    message = "İşletmeniz iyi ilerliyor. Yeni kampanya ve ürün analizleri yapabilirsiniz.";

}



box.innerHTML = `

<div class="ai-message">

<p>
<strong>Wyvora AI:</strong> ${message}
</p>

</div>

`;

function analyzeReviews(){

    let box = document.getElementById("reviewAnalysis");


    if(!box) return;


    box.innerHTML = `

    <div class="ai-message">

    <p>
    <strong>Wyvora AI:</strong>
    Müşteri yorumları analiz edildi.
    </p>

    <p>
    ⭐ Olumlu yorumlar: Müşteri memnuniyeti yüksek görünüyor.
    </p>

    <p>
    ⚠️ Geliştirme önerisi: Daha hızlı hizmet ve daha fazla kampanya deneyebilirsiniz.
    </p>

    </div>

    `;

}
function generateAIResponse(message){

    let businessCode =
localStorage.getItem("activeBusinessCode");

let products =
JSON.parse(localStorage.getItem("products_" + businessCode)) || [];


    let reservations =
JSON.parse(localStorage.getItem("reservations_" + businessCode)) || [];


    let businesses =
JSON.parse(localStorage.getItem("businesses")) || [];

let business =
businesses.find(function(item){

    return item.code === businessCode;

}) || {};

if(message.includes("kaç ürün") || message.includes("ürün sayısı") || message.includes("menümde kaç") ){

    return "Menünüzde şu anda " + products.length + " ürün bulunuyor.";

}


if(message.includes("rezervasyon") || message.includes("kaç rezervasyon") || message.includes("rezervasyon sayısı")){

    return "Şu anda " + reservations.length + " rezervasyon kaydı bulunuyor.";

}

if(message.includes("saat") || message.includes("açık") || message.includes("çalışma")){

    return "Çalışma saatleriniz: " + business.hours;

}

if(message.includes("işletme") || message.includes("firma") || message.includes("dükkan") || message.includes("mekan")){

    if(business.name){

        return business.name + " işletmesi için analiz yapabilirim. Açıklama: " + business.description + ". Menü, rezervasyon, müşteri deneyimi ve kampanya konularında size yardımcı olabilirim.";
        
    }

    return "Henüz işletme bilgisi eklenmemiş.";

}
    if(message.includes("bugün") || message.includes("durum") || message.includes("özet")){

    return "İşletme özeti: Menünüzde " + products.length + 
    " ürün, toplam " + reservations.length + 
    " rezervasyon kaydı bulunuyor. İşletmenizi geliştirmek için yeni kampanyalar ve müşteri analizleri yapabilirsiniz.";

}

        return "Menünüzü analiz ediyorum. Ürün çeşitliliği ve fiyatlandırma konusunda öneriler hazırlayabilirim.";

    }


    if(message.includes("kampanya")){

        return "İşletmeniz için müşteri çekmeye yönelik kampanya fikirleri oluşturabilirim.";

    }


    if(message.includes("ürün")){

        return "Ürünleriniz için daha etkili açıklamalar ve tanıtım fikirleri hazırlayabilirim.";

    }


    if(message.includes("yorum")){

        return "Müşteri yorumlarını analiz ederek geliştirme önerileri sunabilirim.";

    }


    return "Sorunuzu analiz ediyorum. İşletmeniz için uygun öneriler hazırlayabilirim.";

}
function loadStore(){

    let businesses =
    JSON.parse(localStorage.getItem("businesses")) || [];

    const params = new URLSearchParams(window.location.search);

    const code = params.get("code");

    let business = businesses.find(function(item){

        return item.code === code;

    }) || {};

    let name = document.getElementById("storeName");
    let title = document.getElementById("pageTitle");
    let description = document.getElementById("storeDescription");
let logo = document.getElementById("storeLogo");

    if(name){

        name.innerHTML = business.name || "İşletme Adı";

    }


    if(description){

        description.innerHTML = business.description || "";

    }
    
if(logo){

    logo.src = business.logo || "";

}

}
function loadStoreGallery(){

    let gallery =
    document.getElementById("storeGallery");


    if(!gallery) return;


    let businessCode =
localStorage.getItem("activeBusinessCode");

let photos =
JSON.parse(localStorage.getItem("photos_" + businessCode)) || [];


    gallery.innerHTML = "";


    photos.forEach(function(photo){

        gallery.innerHTML += `

        <div class="ai-message">

        <img src="${photo}" width="200">

        </div>

        `;

    });

}