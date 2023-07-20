const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("category_id");
    const response = await axios.get(
        `http://localhost:8080/product/filterProductByCategory?categoryid=${id}`
    );
    const products = response.data;
    renderProducts(products);
};
const renderProducts = (products) => {
    const list = document.getElementById("listProduct");
    if (list) {
        list.innerHTML = "";
        const availableProducts = products.filter((result) => result.status === 'Còn hàng');

        availableProducts.forEach(async (result) => {
            const productId = result.id;
            const divItem = document.createElement('div');
            divItem.classList.add(`detail`);
            divItem.dataset.key = productId;

            const img = document.createElement('img');
            const imageUrls = result.image.split(",");
            if (imageUrls.length > 0) {
                img.src = imageUrls[0];
            }

            const h2 = document.createElement('h5');
            h2.innerText = result.name;

            const h3 = document.createElement('p');
            h3.innerText = result.price.toLocaleString();
            h3.classList.add('price');

            const h4 = document.createElement("p");
            const strong1 = document.createElement("strong");
            strong1.innerText = "Bán tại: ";
            h4.appendChild(strong1);
            h4.appendChild(document.createTextNode(await getCampusNameById(result.sellcampusid)));

            const buytButton = document.createElement("button");
            buytButton.innerText = "Mua ngay";
            buytButton.classList.add("round-black-btn");

            buytButton.addEventListener("click", () => {
                buyProduct(productId);
            });



            divItem.appendChild(img);
            divItem.appendChild(h2);
            divItem.appendChild(h3);
            divItem.appendChild(h4);
            divItem.appendChild(buytButton);

            list.appendChild(divItem);


            img.addEventListener('click', () => {
                getProductDetail(divItem.dataset.key)
            })

        });

    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};
getData();

const getCampusNameById = async (campusId) => {
    try {
        const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${campusId}`);
        const filteredData = response.data;
        return filteredData.name;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
const ProductDetail = async (productId) => {
    // const response = await axios.get(`http://localhost:8080/product/getProductById/${productId}`);
    const testPageUrl = `productDetail.html?id=${encodeURIComponent(productId)}`;
    window.location.href = testPageUrl;
}

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
        list.innerHTML = "";
        const filteredCategories = categories.filter((category) => category.status === true);

        filteredCategories.forEach((result) => {
            const category_id = result.id;
            const a = document.createElement("a");
            a.innerText = result.name;
            a.href = `filter.html?category_id=${encodeURIComponent(category_id)}`;

            const listItem = document.createElement("span");
            listItem.className = "category-item";
            listItem.appendChild(a);

            // Xử lý sự kiện click vào nút
            a.addEventListener("click", () => {
                // Lưu trạng thái đã chọn vào localStorage
                localStorage.setItem("selectedCategory", category_id);
            });

            list.appendChild(listItem);
        });

        // Áp dụng lại trạng thái đã chọn sau khi trang được tải lại
        const selectedCategory = localStorage.getItem("selectedCategory");
        if (selectedCategory) {
            const selectedButton = document.querySelector(`[href="filter.html?category_id=${encodeURIComponent(selectedCategory)}"]`);
            if (selectedButton) {
                selectedButton.classList.add("selected");
            }
        }
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

        const filteredCategories = categories.filter((category) => category.status === true);

        filteredCategories.forEach((result) => {
            const option = document.createElement("option");
            option.value = result.id;
            option.innerText = result.name;;

            select.appendChild(option);
        });
    } else {
        console.error("Phần tử optionCategory không tồn tại.");
    }
};
optionCategory();






