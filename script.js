document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

    loadProducts();

});



function aiMessage() {

    let input = document.getElementById("aiInput");
    let response = document.getElementById("aiResponse");

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



function aiCommand(command){

    let response = document.getElementById("aiResponse");

    response.innerHTML =
    "<p><strong>Wyvora AI:</strong> " + command + " işlemi hazırlanıyor.</p>";

}




function addProduct(){

    let name = document.getElementById("productName").value;

    let price = document.getElementById("productPrice").value;


    if(name === "" || price === ""){

        alert("Bilgileri doldurun.");

        return;

    }


    let products = JSON.parse(localStorage.getItem("products")) || [];


    products.push({

        name:name,

        price:price

    });


    localStorage.setItem("products", JSON.stringify(products));


    loadProducts();


    document.getElementById("productName").value="";

    document.getElementById("productPrice").value="";

}




function loadProducts(){

    let menuList = document.getElementById("menuList");


    if(!menuList) return;


    menuList.innerHTML="";


    let products = JSON.parse(localStorage.getItem("products")) || [];


    products.forEach(function(product){


        let div = document.createElement("div");


        div.className="ai-message";


        div.innerHTML =

        product.name +

        "<br>₺" +

        product.price +

        "<br><button onclick='deleteProduct(\""+product.name+"\")'>Sil</button>";


        menuList.appendChild(div);


    });


}



function deleteProduct(name){

    let products = JSON.parse(localStorage.getItem("products")) || [];


    products = products.filter(function(product){

        return product.name !== name;

    });


    localStorage.setItem("products", JSON.stringify(products));


    loadProducts();

}