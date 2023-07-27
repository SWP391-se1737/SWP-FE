async function getOrderList() {
    const response = await axios.get('http://localhost:8080/order/getListOrder');
    orders = response.data;
    let tableData = "";
    status1 = "Thành công";
    status2 = "Thất bại";
    console.log(orders)
    for (const order of orders) {
        tableData += "<tr>"
        tableData += "<td>" + order.id + "</td>";
        tableData += "<td>" + reformatDate(order.buyAt) + "</td>";
        tableData += "<td>" + reformatDate(order.shipAt) + "</td>";
        tableData += "<td>" + reformatEmail(await getSellerNameById(order.buyerid).then((buyer) => buyer)) + "</td>";
        tableData += "<td>" + await getProductNameById(order.productId).then((product) => product) + "</td>";
        tableData += "<td>" + order.totalamount + "</td>";
        tableData += "<td>" + await getCampusNameById(order.buycampusid).then((campus) => campus) + "</td>";
        tableData += "<td>" + order.status + "</td>";
        if (order.status == "Chờ nhận hàng") {
            tableData += "<td><button class='btn btn-danger' onclick='changeStatus(`" + order.id + "` , `" + status1 + "`)'>Nhận hàng thành công</button></td>";
            tableData += "<td><button class='btn btn-danger' onclick='changeStatus(`" + order.id + "` , `" + status2 + "`)'>Nhận hàng thất bại</button></td>";
        }
        tableData += "</tr>";
    };
    document.getElementById("order-list").innerHTML = tableData;
}
getOrderList();

function changeStatus(id,status) {
    if (status == "Thành công"){
        status = "Đã nhận hàng";
    }
    else {
        status = "Hủy đơn hàng";
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

function reformatEmail(email){
    const emailUrls = email.split("@");
    return emailUrls[0] + "</br>" + "@" + emailUrls[1];
  }