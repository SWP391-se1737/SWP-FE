async function optionCampus() {
    const list = document.getElementById('listCampuses');
    let originalData = [];

    try {
        const response = await axios.get('http://localhost:8080/Campus/listCampus');
        const filteredData = response.data;
        renderCampus1(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
const renderCampus1 = (campuses) => {
    const select = document.getElementById("listCampuses");

    if (select) {
        select.innerHTML = ""; // Xóa bỏ các tùy chọn cũ (nếu có)
        const defaultOption = document.createElement("option");
        defaultOption.value = "0";
        defaultOption.innerText = "Campus";
        select.appendChild(defaultOption);
        const filteredCampuses = campuses.filter((campus) => campus.status === true);

        filteredCampuses.forEach((result) => {
            const option = document.createElement("option");
            option.value = result.id; // Đặt giá trị value của option là id của campus
            option.innerText = result.name; // Hiển thị tên của campus

            select.appendChild(option);
        });
        select.addEventListener("change", function () {
            const selectedCampusId = select.value;
            // Gọi hàm xử lý để load lại danh sách sản phẩm với campus đã chọn
            loadProductsByCampusAndCategory(selectedCampusId);
        });
    } else {
        console.error("Phần tử listCampuses không tồn tại.");
    }
};
async function loadProductsByCampusAndCategory(campusId) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("category_id");
    let originalData = [];

    try {
        let response;
        if (campusId == 0) {
            response = await axios.get(`http://localhost:8080/product/filterProductByCategory?categoryid=${categoryId}`);
        } else {
            response = await axios.get(`http://localhost:8080/product/search?category_id=${categoryId}&sellcampus_id=${campusId}`);
        }

        const filteredData = response.data;
        renderProductsByCampusAndCategory(filteredData);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

optionCampus();

const renderProductsByCampusAndCategory = (products) => {
    const list = document.getElementById('listProduct');
    if (list) {
        list.innerHTML = '';
        const availableProducts = products.filter((result) => result.status === 'Còn hàng');

        availableProducts.forEach((result) => {
            const productId = result.id;
            const divItem = document.createElement('div');
            divItem.classList.add(`detail`);
            divItem.dataset.key = productId;

            const img = document.createElement('img');
            img.src = result.image;

            const h2 = document.createElement('h5');
            h2.innerText = result.name;

            const h3 = document.createElement('p');
            h3.innerText = result.price.toLocaleString();
            h3.classList.add('price');

            const addToCartButton = document.createElement("button");
            addToCartButton.innerText = "Thêm vào giỏ hàng";
            addToCartButton.classList.add("round-black-btn");

            addToCartButton.addEventListener("click", () => {
                // Thực hiện các hành động khi nhấp vào nút "Add to Cart"
                // Ví dụ: Gọi hàm thêm sản phẩm vào giỏ hàng
                addToCart(productId);
            });

            divItem.appendChild(img);
            divItem.appendChild(h2);
            divItem.appendChild(h3);
            divItem.appendChild(addToCartButton);

            list.appendChild(divItem);

            img.addEventListener('click', () => {
                getProductDetail(divItem.dataset.key);
            });
        });
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};