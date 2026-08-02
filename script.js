document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

    loadProducts();

    loadPhotos();

    loadReservations();
generateAIRecommendations();

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
    "<p><strong>Wyvora AI:</strong> İşletmeniz için analiz hazırlanıyor.</p>";

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

        message =
        "Müşterileri çekmek için özel indirim veya hafta sonu kampanyası oluşturabilirsiniz.";

    }


    else if(command === "Ürün açıklaması yaz"){

        message =
        "Ürünlerinizi daha çekici anlatmak için lezzet, içerik ve özel özelliklerini vurgulayın.";

    }


    else if(command === "Google yorumlarını analiz et"){

        message =
        "Google yorumlarını inceleyerek müşteri memnuniyeti ve geliştirme alanlarını bulabilirsiniz.";

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



    let products = JSON.parse(localStorage.getItem("products")) || [];



    products.push({

        name:name,

        price:price,

        image:image

    });



    localStorage.setItem(
        "products",
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



    let products =
    JSON.parse(localStorage.getItem("products")) || [];



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


    let products =
    JSON.parse(localStorage.getItem("products")) || [];



    let newName =
    prompt("Yeni ürün adı:", products[index].name);



    let newPrice =
    prompt("Yeni fiyat:", products[index].price);



    if(newName && newPrice){


        products[index].name=newName;

        products[index].price=newPrice;


        localStorage.setItem(
            "products",
            JSON.stringify(products)
        );


        loadProducts();

    }

}



// Ürün silme

function deleteProduct(index){


    let products =
    JSON.parse(localStorage.getItem("products")) || [];



    products.splice(index,1);



    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );


    loadProducts();

}
function login(){

    let username = document.getElementById("username").value;

    let password = document.getElementById("password").value;

    let message = document.getElementById("loginMessage");


    if(username === "admin" && password === "123456"){


        localStorage.setItem("loggedIn","true");


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

    let business = {

        name: document.getElementById("businessName").value,

        phone: document.getElementById("phone").value,

        address: document.getElementById("address").value,

        hours: document.getElementById("hours").value,

        description: document.getElementById("description").value

    };


    localStorage.setItem(
        "business",
        JSON.stringify(business)
    );


    document.getElementById("saveMessage").innerHTML =
    "İşletme bilgileri kaydedildi.";

}



document.addEventListener("DOMContentLoaded", function(){


    let data = JSON.parse(localStorage.getItem("business"));


    if(data){


        if(document.getElementById("businessName")){

            document.getElementById("businessName").value = data.name;

            document.getElementById("phone").value = data.phone;

            document.getElementById("address").value = data.address;

            document.getElementById("hours").value = data.hours;

            document.getElementById("description").value = data.description;

        }


    }


});
function addPhoto(){

    let url = document.getElementById("photoUrl").value;


    if(url === ""){

        alert("Fotoğraf linki girin.");

        return;

    }


    let photos =
    JSON.parse(localStorage.getItem("photos")) || [];


    photos.push(url);


    localStorage.setItem(
        "photos",
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
function addPhoto(){

    let url = document.getElementById("photoUrl").value;


    if(url === ""){

        alert("Fotoğraf linki girin.");

        return;

    }


    let photos = JSON.parse(localStorage.getItem("photos")) || [];


    photos.push(url);


    localStorage.setItem(
        "photos",
        JSON.stringify(photos)
    );


    loadPhotos();


    document.getElementById("photoUrl").value = "";

}



function deletePhoto(index){

    let photos = JSON.parse(localStorage.getItem("photos")) || [];


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


    let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];


    reservations.push({

        name:name,

        date:date,

        count:count

    });


    localStorage.setItem(
        "reservations",
        JSON.stringify(reservations)
    );


    loadReservations();


    document.getElementById("customerName").value="";

    document.getElementById("customerDate").value="";

    document.getElementById("customerCount").value="";

}



function loadReservations(){

    let list =
    document.getElementById("reservationList");


    if(!list) return;


    list.innerHTML="";


    let reservations =
    JSON.parse(localStorage.getItem("reservations")) || [];


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

let products =
JSON.parse(localStorage.getItem("products")) || [];

let reservations =
JSON.parse(localStorage.getItem("reservations")) || [];


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