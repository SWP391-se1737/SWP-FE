async function getProductMoving() {
    const response = await axios.get('http://localhost:8080/productMoving/getListProductMoving');
    productMovings = response.data;
    console.log(productMovings);
    let tableData = "";
    for (const productMoving of productMovings) {
        tableData += "<tr>"
        tableData += "<td>" + productMoving.movingId + "</td>";
        tableData += "<td>" + await getCampusNameById(productMoving.fromLocation).then((campus) => campus) + "</td>";
        tableData += "<td>" + await getCampusNameById(productMoving.toLocation).then((campus) => campus) + "</td>";
        tableData += "<td>" + productMoving.movingDate + "</td>";
        tableData += "<td>" + productMoving.arrivalDate + "</td>";
        tableData += "<td>" + await getShipperNameById(productMoving.shipperId).then((shipper) => shipper) + "</td>";
        if (productMoving.status == "Đang chuyển") {
            tableData += "<td><button class='btn btn-success' onclick='changeStatus(`" + productMoving.fromLocation +
                "` , `" + productMoving.toLocation + "`  , `" + productMoving.arrivalDate + "` , `" + productMoving.shipperId +
                "` , `" + productMoving.movingDate + "`  , `" + productMoving.movingId + "`)'>Đang chuyển</button></td>";
        } else {
            tableData += "<td>" + productMoving.status + "</td>";
        }
        tableData += "</tr>";
    };
    document.getElementById("productMoving-list").innerHTML = tableData;
}
getProductMoving();

function changeStatus(fromLocation, toLocation, arrivalDate, shipperId, movingDate, movingId) {
    axios.put('http://localhost:8080/productMoving/updateProductMovingByMovingId?MovingId=' + movingId, {
        fromLocation: fromLocation,
        toLocation: toLocation,
        arrivalDate: arrivalDate,
        shipperId: shipperId,
        movingDate: movingDate,
        movingId: movingId,
        status: "Thành công"
    })
    getProductMoving();
    getProductMoving();
}

const getCampusNameById = async (location) => {
    const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${location}`);
    const campus = response.data;
    console.log(campus.name);
    return campus.name;
};

const getShipperNameById = async (shipperId) => {
    const response = await axios.get(`http://localhost:8080/Account/getAccountById?id=${shipperId}`);
    const shipper = response.data;
    return shipper.email;
};