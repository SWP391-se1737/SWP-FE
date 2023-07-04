const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("category_id");
    const response = await axios.get(`http://localhost:8080/product/filterProductByCategory?category_id=${id}`
    );
    const products = response.data;
    renderProducts(products);
};
getData();
const renderProducts = (products) => {
    const list = document.getElementById("listDetail");
    if (list) {
        list.innerHTML = "";
        products.forEach((result) => {
            const productId = result.id;
            const divItem = document.createElement("div");
            divItem.classList.add(`detail`);
            divItem.dataset.key = productId;

            const img = document.createElement("img");
            img.src = result.image;

            const h2 = document.createElement("h2");
            h2.innerText = result.name;

            const h3 = document.createElement("p");
            h3.innerText = result.price;

            const p = document.createElement("p");
            p.innerText = result.status;

            divItem.appendChild(img);
            divItem.appendChild(h2);
            divItem.appendChild(h3);
            divItem.appendChild(p);

            list.appendChild(divItem);

            divItem.addEventListener("click", () => {
                getProductDetail(divItem.dataset.key);
            });
        });
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};