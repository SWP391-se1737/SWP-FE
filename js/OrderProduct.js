const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await axios.get(
        `http://localhost:8080/product/getProductById/${id}`
    );

    renderProducts(response.data);
};
getData();
const renderProducts = async (product) => {
    const list = document.getElementById("orderDetail");
    if (list) {
        list.innerHTML = "";
        const productId = product.id;

        // Thẻ div chứa img
        const imgDiv = document.createElement("div");
        const img = document.createElement("img");
        const imageUrls = product.image.split(",");
        if (imageUrls.length > 0) {
            img.src = imageUrls[0];
            imgDiv.appendChild(img);
        }

        // Thẻ div chứa các thuộc tính còn lại
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        const h2 = document.createElement("h2");
        h2.innerText = product.name;

        const h3 = document.createElement("p");
        h3.innerText = product.price.toLocaleString();
        h3.classList.add("price");

        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.innerText = "Mô tả: ";
        p.appendChild(strong);
        p.appendChild(document.createTextNode(product.description));
        p.appendChild(document.createElement("br"));

        const p2 = document.createElement("p");
        const strong1 = document.createElement("strong");
        strong1.innerText = "Bán tại campus: ";
        p2.appendChild(strong1);
        p2.appendChild(document.createTextNode(await getCampusNameById(product.sellcampusid)));

        const campusText = document.createElement("p");
        const strong3 = document.createElement("strong");
        strong3.innerText = "Chọn campus nhận hàng: ";
        campusText.appendChild(strong3);


        const selectCategory = document.createElement("select");
        selectCategory.id = "listCampuses";


        const orderButton = document.createElement("button");
        orderButton.innerText = "Xác nhận đặt hàng - " + product.price.toLocaleString(); // Thêm giá sản phẩm vào nút mua hàng
        orderButton.classList.add("round-black-btn");
        orderButton.classList.add("price");

        orderButton.addEventListener("click", () => {
            // Thực hiện các hành động khi nhấp vào nút "Mua hàng"
            // Ví dụ: Gọi hàm mua sản phẩm
            orderProduct(productId);
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Xóa bài đăng"
        deleteButton.classList.add("round-black-btn");

        deleteButton.addEventListener("click", () => {
            // Thực hiện các hành động khi nhấp vào nút "Mua hàng"
            // Ví dụ: Gọi hàm mua sản phẩm
            deleteProduct(productId);
        });

        function deleteProduct(productId) {
            fetch(`http://localhost:8080/product/deleteProductByStudent?id=${productId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Error deleting product');
                })
                .then(data => {
                    // Xử lý phản hồi từ máy chủ sau khi xóa thành công
                    window.location.href = "sales.html";
                    console.log(data);
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });
        }

        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.id = "errorMessage";
        errorMessageDiv.classList.add("errorMessage");

        infoDiv.appendChild(h2);
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);
        infoDiv.appendChild(p2);
        infoDiv.appendChild(document.createElement("br"));
        if (sessionStorage.getItem("id") != product.seller_id) {
            infoDiv.appendChild(campusText);
            infoDiv.appendChild(selectCategory);

            infoDiv.appendChild(orderButton);
        }
        else
            infoDiv.appendChild(deleteButton);
        infoDiv.appendChild(errorMessageDiv);

        // Thêm các thẻ div vào list
        const divItem = document.createElement("div");
        divItem.classList.add("detail", "d-flex");
        divItem.dataset.key = productId;
        divItem.appendChild(imgDiv);
        divItem.appendChild(infoDiv);

        list.appendChild(divItem);

        // Gọi hàm renderCampus để tạo danh sách các campus
        await renderCampus();
    } else {
        console.error("Phần tử orderDetail không tồn tại.");
    }
};

async function renderCampus() {
    const select = document.getElementById("listCampuses");
    if (select) {
        select.innerHTML = ""; // Xóa bỏ các tùy chọn cũ (nếu có)
        const defaultOption = document.createElement("option");
        defaultOption.value = "0";
        defaultOption.innerText = "Chọn campus";
        select.appendChild(defaultOption);

        try {
            const response = await axios.get("http://localhost:8080/Campus/listCampus");
            const campuses = response.data;
            campuses.forEach((campus) => {
                const option = document.createElement("option");
                option.value = campus.id;
                option.innerText = campus.name;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách campus:", error);
        }
    } else {
        console.error("Phần tử listCampuses không tồn tại.");
    }
}


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

const orderProduct = async (productId) => {

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Tạo chuỗi đại diện cho ngày tháng năm và thời gian hiện tại
    const BuyAt = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const BuyAtDate = new Date(BuyAt);
    const expireDate = new Date(BuyAtDate);
    expireDate.setDate(BuyAtDate.getDate() + 3);
    const dayexpire = expireDate.getDate();
    const monthexpire = expireDate.getMonth() + 1;
    const yearexpire = expireDate.getFullYear();
    const shipAT = `${yearexpire}-${String(monthexpire).padStart(2, '0')}-${String(dayexpire).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    // Lấy thông tin từ các phần tử
    const price = document.querySelector('.product-info .price').innerText;
    const selectedCampus = document.getElementById('listCampuses').value;

    // Tạo đối tượng orderData từ các thông tin đã lấy được
    const orderData = {
        buyAt: BuyAt,
        shipAt: shipAT,
        status: "chờ nhận hàng",
        buyerid: parseInt(sessionStorage.getItem('id')),
        productId: productId,
        totalamount: parseInt(price),
        quantity: 1,
        buycampusid: parseInt(selectedCampus)
    };
    createOrderProduct(orderData)

    // Gửi request POST tới API /Order/createOrder
    function createOrderProduct(orderData) {
        console.log(orderData);
        fetch("http://localhost:8080/order/createNewOrder", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Đặt hàng thành công!');
                    window.location.href = 'orders.html';
                    // Thực hiện các hành động bổ sung sau khi tạo sản phẩm thành công
                } else {
                    console.error('Đặt hàng thất bại.');
                    showErrorMessage();
                }
            })
            .catch(error => {
                console.error('Đã xảy ra lỗi:', error);
                showErrorMessage();
            });
    }

    function showErrorMessage() {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = "Đặt hàng thất bại, bạn hãy chọn Campus hoặc kiểm tra ";

        var backButton = document.createElement('button');
        backButton.textContent = "Số dư ví";
        backButton.addEventListener('click', function () {
            window.location.href = 'wallet.html';
        });

        // Clear the error message element and append the back button

        errorMessage.appendChild(backButton);
    }
}