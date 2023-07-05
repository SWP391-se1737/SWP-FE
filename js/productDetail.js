const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await axios.get(
        `http://localhost:8080/product/getProductById/${id}`
    );

    renderProducts(response.data);
};
getData();
const renderProducts = (product) => {
    const list = document.getElementById("productDetail");
    if (list) {
        list.innerHTML = "";
        const productId = product.id;

        // Thẻ div chứa img
        const imgDiv = document.createElement("div");
        const img = document.createElement("img");
        img.src = product.image;
        imgDiv.appendChild(img);

        // Thẻ div chứa các thuộc tính còn lại
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        const h2 = document.createElement("h2");
        h2.innerText = product.name;

        const h3 = document.createElement("h3");
        h3.innerText = product.price;

        const p = document.createElement("p");
        p.innerText = product.description;

        const p2 = document.createElement("p");
        p2.innerText = product.sellcampus_id;

        const quantityLabel = document.createElement("p");
        quantityLabel.innerText = "Quantity:";

        const quantityValue = document.createElement("p");
        quantityValue.innerText = 2;

        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "Add to Cart";
        addToCartButton.classList.add("round-black-btn");

        addToCartButton.addEventListener("click", () => {
            // Thực hiện các hành động khi nhấp vào nút "Add to Cart"
            // Ví dụ: Gọi hàm thêm sản phẩm vào giỏ hàng
            addToCart(productId);
            
        });

        infoDiv.appendChild(h2);
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);
        infoDiv.appendChild(p2);
        infoDiv.appendChild(quantityLabel);
        infoDiv.appendChild(quantityValue);
        infoDiv.appendChild(addToCartButton);

        // Thêm các thẻ div vào list
        const divItem = document.createElement("div");
        divItem.classList.add("detail", "d-flex");
        divItem.dataset.key = productId;
        divItem.appendChild(imgDiv);
        divItem.appendChild(infoDiv);

        list.appendChild(divItem);
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};

const addToCart = async (productId) => {
    const btn = document.querySelectorAll("button")
    //console.log(btn)
    btn.forEach(function(button,index){
       button.addEventListener("click", function(event){
        var btnItem = event.target
        var productDetail = btnItem.closest(".productDetail");
        var productImg = productDetail.querySelector("img").src
        var productName = productDetail.querySelector("h2").innerText
        var productPrice = productDetail.querySelector("h3").innerText
        addCart(productPrice,productImg,productName)
       });
    });
  };

  const addCart = (price, image, name) => {
    const productCart = document.getElementById("productDetail");

    if (productCart) {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-info");

        const img = document.createElement("img");
        img.src = image;

        const h2 = document.createElement("h2");
        h2.innerText = name;

        const h3 = document.createElement("h3");
        h3.innerText = price;

        productDiv.appendChild(img);
        productDiv.appendChild(h2);
        productDiv.appendChild(h3);

        productCart.appendChild(productDiv);
    } else {
        console.error("Phần tử productCart không tồn tại.");
    }
};

  
