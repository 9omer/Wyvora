document.addEventListener("DOMContentLoaded", function () {

    console.log("Wyvora başlatıldı.");

    loadProducts();

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



function aiCommand(command){

    let response = document.getElementById("aiResponse");

    if(!response) return;


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