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
const renderOrders = async (product) => {
    const list = document.getElementById("listOrder");
    if (list) {
        list.innerHTML = "";

        product.forEach((product) => {
            const productId = product.id;
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("detail");

            const h3 = document.createElement('p');
            const strong3 = document.createElement("strong");
            strong3.innerText = "Tống tiền: ";
            h3.appendChild(strong3);
            h3.appendChild(document.createTextNode(product.totalamount.toLocaleString()));

            const p2 = document.createElement("p");
            const strong1 = document.createElement("strong");
            strong1.innerText = "Ngày đặt hàng: ";
            p2.appendChild(strong1);
            const buyAt = new Date(product.buyAt);
            const year = buyAt.getFullYear();
            const month = buyAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = buyAt.getDate();

            const dateString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
            p2.appendChild(document.createTextNode(dateString));

            const p = document.createElement("p");
            const strong2 = document.createElement("strong");
            strong2.innerText = "Số lượng: ";
            p.appendChild(strong2);
            p.appendChild(document.createTextNode(product.quantity));

            const p1 = document.createElement('p');
            p1.innerText = product.status;
            p1.classList.add('status');

            infoDiv.appendChild(p2);
            infoDiv.appendChild(h3);
            infoDiv.appendChild(p);
            infoDiv.appendChild(p1);

            list.appendChild(infoDiv);
        });
    } else {
        console.error("Phần tử listOrder không tồn tại.");
    }
};