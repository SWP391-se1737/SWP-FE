async function getOrderList() {
    const response = await axios.get('http://localhost:8080/order/getListOrder');
    orders = response.data;
    let tableData = "";
    console.log(orders)
    for (const order of orders) {
        tableData += "<tr>"
        tableData += "<td>" + order.id + "</td>";
        tableData += "<td>" + reformatDate(order.buyAt) + "</td>";
        tableData += "<td>" + reformatDate(order.shipAt) + "</td>";
        tableData += "<td>" + await getSellerNameById(order.buyerid).then((buyer) => buyer) + "</td>";
        tableData += "<td>" + await getProductNameById(order.productId).then((product) => product) + "</td>";
        tableData += "<td>" + order.totalamount + "</td>";
        tableData += "<td>" + order.quantity + "</td>";
        tableData += "<td>" + await getCampusNameById(order.buycampusid).then((campus) => campus) + "</td>";
        if (order.status == "chờ nhận hàng") {
            tableData += "<td><button class='btn btn-danger' onclick='changeStatus(`" + order.id + "` , `" + order.status + "`)'>Chờ nhận hàng</button></td>";
        }
        else {
            tableData += "<td><button class='btn btn-danger' onclick='changeStatus(`" + order.id + "` , `" + order.status + "`)'>Đã nhận hàng</button></td>";
        }
        tableData += "<tr>";
    };
    document.getElementById("order-list").innerHTML = tableData;
}
getOrderList();

function changeStatus(id,status) {
    if (status == "chờ nhận hàng"){
        status = "đã nhận hàng";
    }
    else {
        status = "chờ nhận hàng";
    }

    axios.put(`http://localhost:8080/order/updateOrderStatusById/${id}?status=${status}`)
    getOrderList();
}

function reformatDate(dateStr) {
    var dArr = dateStr.split(" "); // input yyyy-MM-dd HH:mm:ss
    var dateStr = dArr[0];         // string yyyy-MM-dd
    dateArr = dateStr.split("-");
    var timeStr = dArr[1];         // string HH:mm:ss.SSSZ
    timeArr = timeStr.split(":");
    return timeArr[0] + ":" + timeArr[1] + "</br>" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

const getProductNameById = async (productId) => {
    const response = await axios.get(`http://localhost:8080/product/getProductById/${productId}`);
    const product = response.data;
    return product.name;
};

const getCampusNameById = async (buycampusid) => {
    const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${buycampusid}`);
    const campus = response.data;
    return campus.name;
};

const getSellerNameById = async (buyerid) => {
    const response = await axios.get(`http://localhost:8080/Account/getAccountById?id=${buyerid}`);
    const buyer = response.data;
    return buyer.email;
};