const getData = async () => {
    const accid = sessionStorage.getItem('id');
    console.log(accid);

    try {
        const response = await axios.get(`http://localhost:8080/product/getProductBySellerId?seller_id=${accid}`);
        const filteredData = response.data;
        renderSales(filteredData);
    } catch (error) {
        console.error("Error fetching account:", error);
    }
};
getData();
const renderSales = async (product) => {
    const list = document.getElementById("listSale");
    if (list) {
        list.innerHTML = "";

        product.forEach((product) => {
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

            const h3 = document.createElement('p');
            h3.innerText = product.price.toLocaleString();
            h3.classList.add('price');

            const p = document.createElement("p");
            const strong2 = document.createElement("strong");
            strong2.innerText = "Số lượng: ";
            p.appendChild(strong2);
            p.appendChild(document.createTextNode(product.quantity));

            const p1 = document.createElement('p');
            p1.innerText = product.status;
            p1.classList.add('status');

            infoDiv.appendChild(h2);
            infoDiv.appendChild(h3);
            infoDiv.appendChild(p);
            infoDiv.appendChild(p1);

            // Thêm các thẻ div vào list
            const divItem = document.createElement("div");
            divItem.classList.add("detail", "d-flex");
            divItem.dataset.key = productId;
            divItem.appendChild(imgDiv);
            divItem.appendChild(infoDiv);

            list.appendChild(divItem);
        });
    } else {
        console.error("Phần tử listOrder không tồn tại.");
    }
};