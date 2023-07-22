const getData = async () => {
    const accid = sessionStorage.getItem('id');
    console.log(accid);

    try {
        const response = await axios.get(`http://localhost:8080/order/getOrderByBuyerId/${accid}`);
        const filteredData = response.data;
        renderOrders(filteredData);
    } catch (error) {
        console.error("Error fetching account:", error);
    }
};
getData();
const renderOrders = async (products) => {
    const list = document.getElementById("listOrder");
    if (list) {
        list.innerHTML = "";

        for (const product of products) {
            const postId = product.id;
            const productId = product.productId;
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("detail");

            const additionalInfo = await getProductById(productId);

            if (additionalInfo != null) {
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("img"); // Thêm class "img" cho div chứa hình ảnh
                const img = document.createElement('img');
                const imageUrls = additionalInfo.image.split(",");
                if (imageUrls.length > 0) {
                    img.src = imageUrls[0];
                }
                imgDiv.appendChild(img);
                infoDiv.appendChild(imgDiv);
            }

            // Tạo thẻ div mới có class "info" để chứa các thông tin còn lại
            const infoContainer = document.createElement("div");
            infoContainer.classList.add("info");

            const h3 = document.createElement('p');
            const strong3 = document.createElement("strong");
            strong3.innerText = "Tổng tiền: ";
            h3.appendChild(strong3);

            const priceSpan = document.createElement("span"); // Tạo thẻ span mới
            priceSpan.textContent = product.totalamount.toLocaleString(); // Đặt nội dung vào thẻ span
            priceSpan.classList.add("price"); // Gán class "price" cho thẻ span

            h3.appendChild(priceSpan); // Thêm thẻ span vào h3

            const p2 = document.createElement("p");
            const strong1 = document.createElement("strong");
            strong1.innerText = "Ngày đặt hàng: ";
            p2.appendChild(strong1);
            const buyAt = new Date(product.buyAt);
            const year = buyAt.getFullYear();
            const month = buyAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = buyAt.getDate();
            const hour = buyAt.getHours();
            const minute = buyAt.getMinutes();
            const second = buyAt.getSeconds();

            const dateString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
            const timeString = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
            p2.appendChild(document.createTextNode(`${dateString} ${timeString}`));

            const p = document.createElement("p");
            const strong2 = document.createElement("strong");
            strong2.innerText = "Số lượng: ";
            p.appendChild(strong2);
            p.appendChild(document.createTextNode(product.quantity));

            const p4 = document.createElement("p");
            const strong4 = document.createElement("strong");
            strong4.innerText = "Hạn chót nhận hàng: ";
            p4.appendChild(strong4);
            const shipAt = new Date(product.shipAt);
            const shipyear = shipAt.getFullYear();
            const shipmonth = shipAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const shipday = shipAt.getDate();
            const shiphour = shipAt.getHours();
            const shipminute = shipAt.getMinutes();
            const shipsecond = shipAt.getSeconds();

            const shipdateString = `${shipyear}-${shipmonth < 10 ? "0" + shipmonth : shipmonth}-${shipday < 10 ? "0" + shipday : shipday}`;
            const shiptimeString = `${shiphour < 10 ? "0" + shiphour : shiphour}:${shipminute < 10 ? "0" + shipminute : shipminute}:${shipsecond < 10 ? "0" + second : second}`;
            p4.appendChild(document.createTextNode(`${shipdateString} ${shiptimeString}`));

            const p5 = document.createElement("p");
            const strong5 = document.createElement("strong");
            strong5.innerText = "Nhận hàng tại campus: ";
            p5.appendChild(strong5);
            p5.appendChild(document.createTextNode(await getCampusNameById(product.buycampusid)));

            const p1 = document.createElement('p');
            p1.innerText = product.status;
            p1.classList.add('status');

            infoContainer.appendChild(p2);
            infoContainer.appendChild(p4);
            infoContainer.appendChild(h3);
            infoContainer.appendChild(p);
            infoContainer.appendChild(p5);
            infoContainer.appendChild(p1);
            infoDiv.dataset.key = postId;
            infoDiv.appendChild(infoContainer);

            list.appendChild(infoDiv);

            infoDiv.addEventListener('click', () => {
                OrderDetail(infoDiv.dataset.key);
            })
        };
    } else {
        console.error("Phần tử listOrder không tồn tại.");
    }
};
const OrderDetail = async (orderId) => {
    const testPageUrl = `OrderDetail.html?id=${encodeURIComponent(orderId)}`;
    window.location.href = testPageUrl;
}

const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:8080/product/getProductById/${productId}`);
        const product = response.data;
        return product; // Giả sử API trả về thông tin sản phẩm liên quan
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        return null;
    }
};
const getCampusNameById = async (buycampusid) => {
    try {
        const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${buycampusid}`);
        const filteredData = response.data;
        return filteredData.name;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};
const getOrder = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await axios.get(
        `http://localhost:8080/order/getOrderById/${id}`
    );

    renderPost(response.data);
};
getOrder();
const renderPost = async (orders) => {
    const list = document.getElementById("orderDetail");
    if (list) {
        list.innerHTML = "";

        const product = orders;
        const postId = product.id;
        const productId = product.productId;
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("detail");

        // Tạo thẻ div mới có class "info" để chứa các thông tin còn lại
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info");

        const additionalInfo = await getProductById(productId);

        if (additionalInfo != null) {
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("img"); // Thêm class "img" cho div chứa hình ảnh
            const img = document.createElement('img');
            const imageUrls = additionalInfo.image.split(",");
            if (imageUrls.length > 0) {
                img.src = imageUrls[0];
            }
            imgDiv.appendChild(img);
            infoDiv.appendChild(imgDiv);

            const h2 = document.createElement("h2");
            h2.innerText = additionalInfo.name;

            infoContainer.appendChild(h2);
        }
        const h3 = document.createElement('p');
        const strong3 = document.createElement("strong");
        strong3.innerText = "Tổng tiền: ";
        h3.appendChild(strong3);

        const priceSpan = document.createElement("span"); // Tạo thẻ span mới
        priceSpan.textContent = product.totalamount.toLocaleString(); // Đặt nội dung vào thẻ span
        priceSpan.classList.add("price"); // Gán class "price" cho thẻ span

        h3.appendChild(priceSpan); // Thêm thẻ span vào h3

        const p2 = document.createElement("p");
        const strong1 = document.createElement("strong");
        strong1.innerText = "Ngày đặt hàng: ";
        p2.appendChild(strong1);
        const buyAt = new Date(product.buyAt);
        const year = buyAt.getFullYear();
        const month = buyAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const day = buyAt.getDate();
        const hour = buyAt.getHours();
        const minute = buyAt.getMinutes();
        const second = buyAt.getSeconds();

        const dateString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
        const timeString = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
        p2.appendChild(document.createTextNode(`${dateString} ${timeString}`));

        const p = document.createElement("p");
        const strong2 = document.createElement("strong");
        strong2.innerText = "Số lượng: ";
        p.appendChild(strong2);
        p.appendChild(document.createTextNode(product.quantity));

        const p4 = document.createElement("p");
        const strong4 = document.createElement("strong");
        strong4.innerText = "Hạn chót nhận hàng: ";
        p4.appendChild(strong4);
        const shipAt = new Date(product.shipAt);
        const shipyear = shipAt.getFullYear();
        const shipmonth = shipAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
        const shipday = shipAt.getDate();
        const shiphour = shipAt.getHours();
        const shipminute = shipAt.getMinutes();
        const shipsecond = shipAt.getSeconds();

        const shipdateString = `${shipyear}-${shipmonth < 10 ? "0" + shipmonth : shipmonth}-${shipday < 10 ? "0" + shipday : shipday}`;
        const shiptimeString = `${shiphour < 10 ? "0" + shiphour : shiphour}:${shipminute < 10 ? "0" + shipminute : shipminute}:${shipsecond < 10 ? "0" + second : second}`;
        p4.appendChild(document.createTextNode(`${shipdateString} ${shiptimeString}`));

        const p5 = document.createElement("p");
        const strong5 = document.createElement("strong");
        strong5.innerText = "Nhận hàng tại campus: ";
        p5.appendChild(strong5);
        p5.appendChild(document.createTextNode(await getCampusNameById(product.buycampusid)));

        const p6 = document.createElement("p");
        const strong6 = document.createElement("strong");
        strong6.innerText = "Trạng thái: ";
        p6.appendChild(strong6);
        p6.appendChild(document.createTextNode(product.status));

        const deleteOrder = document.createElement("button");
        deleteOrder.innerText = "Hủy đơn hàng";
        deleteOrder.classList.add("round-black-btn");
        if (product.status === 'Chờ nhận hàng') {
            deleteOrder.addEventListener("click", () => {
                deleteOrders(postId);

            });
        }
        function deleteOrders(postId) {
            fetch(`http://localhost:8080/order/deleteOrderById/${postId}`, {
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
                    window.location.href = "orders.html";
                    console.log(data);
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });
        }

        infoContainer.appendChild(p2);
        infoContainer.appendChild(p4);
        infoContainer.appendChild(h3);
        infoContainer.appendChild(p);
        infoContainer.appendChild(p5);
        infoContainer.appendChild(p6);
        if (product.status === 'Chờ nhận hàng')
            infoContainer.appendChild(deleteOrder);
        infoDiv.dataset.key = postId;
        infoDiv.appendChild(infoContainer);

        list.appendChild(infoDiv);
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};
