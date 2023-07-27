const getData = async () => {
    const accid = sessionStorage.getItem('id');
    console.log(accid);

    try {
        const response = await axios.get(`http://localhost:8080/transaction/getListByWallet_user/${accid}`);
        const filteredData = response.data;
        renderTransactions(filteredData);
    } catch (error) {
        console.error("Error fetching account:", error);
    }
};
getData();
const renderTransactions = async (product) => {
    const list = document.getElementById("listTransaction");
    if (list) {
        list.innerHTML = "";

        product.forEach((product) => {

            // Thẻ div chứa các thuộc tính còn lại
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("product-info");

            const p = document.createElement("p");
            p.innerText = product.status;

            const p2 = document.createElement("p");
            const buyAt = new Date(product.transaction_datetime);
            const year = buyAt.getFullYear();
            const month = buyAt.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
            const day = buyAt.getDate();
            const hour = buyAt.getHours();
            const minute = buyAt.getMinutes();
            const second = buyAt.getSeconds();

            const dateString = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
            const timeString = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
            p2.appendChild(document.createTextNode(`${dateString} ${timeString}`));

            const h3 = document.createElement('p');
            const priceText = (product.status === 'nạp tiền' || product.status === 'hủy hàng') ? `+${product.amount.toLocaleString()}` : `-${product.amount.toLocaleString()}`;
            h3.innerText = priceText;
            h3.classList.add('price');

            if (product.status === 'nạp tiền' || product.status === 'hủy hàng') {
                h3.classList.add('price', 'green-text');
            } else {
                h3.classList.add('price', 'red-text');
            }

            infoDiv.appendChild(p);
            infoDiv.appendChild(p2);
            infoDiv.appendChild(h3);


            // Thêm các thẻ div vào list
            const divItem = document.createElement("div");
            divItem.classList.add("detail", "d-flex");
            divItem.appendChild(infoDiv);

            list.appendChild(divItem);
        });
    } else {
        console.error("Phần tử listOrder không tồn tại.");
    }
};
