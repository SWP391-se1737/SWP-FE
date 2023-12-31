async function optionCampus() {
    const list = document.getElementById('listCampuses');
    let originalData = [];

    try {
        const response = await axios.get('http://localhost:8080/Campus/listCampus');
        const filteredData = response.data;
        renderCampus(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
const renderCampus = (campuses) => {
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
            loadProductsByCampus(selectedCampusId);
        });
    } else {
        console.error("Phần tử listCampuses không tồn tại.");
    }
};
optionCampus();

async function loadProductsByCampus(campusId) {
    const list = document.getElementById('searchProduct');
    let originalData = [];

    try {
        const response = await axios.get(`http://localhost:8080/product/filterProductByCampus?sellcampusid=${campusId}`);
        const filteredData = response.data;
        renderProductsByCampus(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

const renderProductsByCampus = (products) => {
    const list = document.getElementById('searchProduct');
    if (list) {
        list.innerHTML = '';
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
                getProductDetail(divItem.dataset.key);
            });
        });
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};