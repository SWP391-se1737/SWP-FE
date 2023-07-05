const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("category_id");
    const response = await axios.get(
        `http://localhost:8080/product/filterProductByCategory?category_id=${id}`
    );
    const categories = response.data;
    renderCategories(categories);
};
const renderCategories = (categories) => {
    const list = document.getElementById("listDetail");
    if (list) {
        list.innerHTML = "";
        categories.forEach((result) => {
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
getData();

async function getCategory() {
    const list = document.getElementById('listCategories');
    let originalData = [];

    try {
        const response = await axios.get('http://localhost:8080/Category/listCategory');
        const filteredData = response.data;
        renderCategory(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
const renderCategory = (categories) => {
    const list = document.getElementById("listCategories");
    if (list) {
        list.innerHTML = ""; // Xóa bỏ các nút ấn cũ (nếu có)

        categories.forEach((result) => {
            const listItem = document.createElement("li");

            const category_id = result.id;
            const a = document.createElement("a");
            a.innerText = result.name;
            a.href = `filter.html?category_id=${encodeURIComponent(category_id)}`;

            listItem.appendChild(a);

            list.appendChild(listItem);
        });
    } else {
        console.error("Phần tử listCategories không tồn tại.");
    }
};
getCategory();


async function optionCategory() {
    const list = document.getElementById('optionCategory');
    let originalData = [];

    try {
        const response = await axios.get('http://localhost:8080/Category/listCategory');
        const filteredData = response.data;
        renderOptionCategory(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
const renderOptionCategory = (categories) => {
    const select = document.getElementById("optionCategory");
    if (select) {
        select.innerHTML = ""; // Xóa bỏ các tùy chọn cũ (nếu có)
        const defaultOption = document.createElement("option");
        defaultOption.value = "0";
        defaultOption.innerText = "Phân loại";
        select.appendChild(defaultOption);

        categories.forEach((result) => {
            const option = document.createElement("option");
            option.value = result.id;
            option.innerText = result.name;

            select.appendChild(option);
        });
    } else {
        console.error("Phần tử optionCategory không tồn tại.");
    }
};
optionCategory();







