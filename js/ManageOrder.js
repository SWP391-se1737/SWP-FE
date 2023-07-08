async function getOrderList() {
    const response = await axios.get('http://localhost:8080/order/getListOrder');
    orders = response.data;
    let tableData = "";
    console.log(orders)
    orders.map(order => {
        tableData += "<tr>"
        tableData += "<td>" + order.id + "</td>";
        tableData += "<td>" + reformatDate(order.buyAt) + "</td>";
        tableData += "<td>" + reformatDate(order.shipAt) + "</td>";
        tableData += "<td>" + order.buyerid + "</td>";
        tableData += "<td>" + order.productId + "</td>";
        tableData += "<td>" + order.totalamount + "</td>";
        tableData += "<td>" + order.quantity + "</td>";
        tableData += "<td>" + order.buycampusid + "</td>";
        if (order.status == "ready") {
            tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + order.id +
                "` , `" + order.buyAt + "`  , `" + order.shipAt + "` , `" + order.buyerid + "` , `" + order.productId +
                "` , `" + order.totalamount + "`  , `" + order.quantity + "` , `" + order.buycampusid + "` , `" + order.status + "`)'>Inactive</button></td>";
        }
        else {
            tableData += "<td><button class='btn btn-danger' onclick='setStatusActive(`" + order.id +
                "` , `" + order.buyAt + "`  , `" + order.shipAt + "` , `" + order.buyerid + "` , `" + order.productId +
                "` , `" + order.totalamount + "`  , `" + order.quantity + "` , `" + order.buycampusid + "` , `" + order.status + "`)'>Active</button></td>";
        }
        tableData += "<tr>";
    });
    document.getElementById("order-list").innerHTML = tableData;
}
getOrderList();

function setStatusInActive(id, buyAt, shipAt, buyerid, productId, totalamount, quantity, buycampusid) {
    axios.put('http://localhost:8080/Account/updateOrder/' + id, {
        id: id,
        buyAt: buyAt,
        shipAt: shipAt,
        buyerid: buyerid,
        productId: productId,
        totalamount: totalamount,
        quantity: quantity,
        buycampusid: buycampusid,
        // status : false
    })
    getOrderList();
    getOrderList();
}


function setStatusActive(id, buyAt, shipAt, buyerid, productId, totalamount, quantity, buycampusid) {
    axios.put('http://localhost:8080/Account/updateOrder/' + id, {
        id: id,
        buyAt: buyAt,
        shipAt: shipAt,
        buyerid: buyerid,
        productId: productId,
        totalamount: totalamount,
        quantity: quantity,
        buycampusid: buycampusid,
        // status : true
    })
    getOrderList();
    getOrderList();
}

function reformatDate(dateStr) {
    var dArr = dateStr.split("T"); // input yyyy-MM-ddTHH:mm:ss.SSSZ
    var dateStr = dArr[0];         // string yyyy-MM-dd
    dateArr = dateStr.split("-");
    var timeStr = dArr[1];         // string HH:mm:ss.SSSZ
    timeArr = timeStr.split(":");
    return timeArr[0] + ":" + timeArr[1] + "/" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}