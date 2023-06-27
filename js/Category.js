document.addEventListener('DOMContentLoaded', function () {
    const clothingLink = document.getElementById('clothing');

    clothingLink.addEventListener('click', function () {
        const categoryId = 1;
        const testPageUrl = `filter.html?category_id=${encodeURIComponent(categoryId)}`;
        window.location.href = testPageUrl;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const electronicDeviceLink = document.getElementById('electronicDeviceLink');

    electronicDeviceLink.addEventListener('click', function () {
        const categoryId = 2;
        const testPageUrl = `filter.html?category_id=${encodeURIComponent(categoryId)}`;
        window.location.href = testPageUrl;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const shoeLink = document.getElementById('shoe');

    shoeLink.addEventListener('click', function () {
        const categoryId = 3;
        const testPageUrl = `filter.html?category_id=${encodeURIComponent(categoryId)}`;
        window.location.href = testPageUrl;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const accessoryLink = document.getElementById('accessory');

    accessoryLink.addEventListener('click', function () {
        const categoryId = 4;
        const testPageUrl = `filter.html?category_id=${encodeURIComponent(categoryId)}`;
        window.location.href = testPageUrl;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const otherLink = document.getElementById('other');

    otherLink.addEventListener('click', function () {
        const categoryId = 5;
        const testPageUrl = `filter.html?category_id=${encodeURIComponent(categoryId)}`;
        window.location.href = testPageUrl;
    });
});

const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("category_id");
    const response = await axios.get(
        `http://localhost:8080/product/filterProductByCategory?category_id=${id}`
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
            // Tạo phần tử và thiết lập nội dung
            // ...
            // Thêm phần tử vào danh sách
            // ...
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





