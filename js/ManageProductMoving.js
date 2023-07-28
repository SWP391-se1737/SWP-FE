var accid = sessionStorage.getItem('id');

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
        if (productMoving.MovingDate != null) {
            tableData += "<td>" + reformatDate(productMoving.MovingDate) + "</td>";
        }
        else { tableData += "<td>" + "Chưa khởi hành" + "</td>"; }
        if (productMoving.ArrivalDate != null) {
            tableData += "<td>" + reformatDate(productMoving.ArrivalDate) + "</td>";
        }
        else { tableData += "<td>" + "Chưa đến" + "</td>"; }
        if (productMoving.shipperId == null) {
            tableData += "<td>" + "" + "</td>";
        }
        else { tableData += "<td>" + await getShipperNameById(productMoving.shipperId).then((shipper) => shipper) + "</td>"; }
        tableData += "<td>" + productMoving.status + "</td>";
        if (productMoving.status == "Đang chuyển") {
            tableData += "<td><button class='btn btn-success' onclick='finishMoving(`" + productMoving.fromLocation +
                "` , `" + productMoving.toLocation + "`  , `" + productMoving.ArrivalDate + "` , `" + productMoving.shipperId +
                "` , `" + productMoving.MovingDate + "`  , `" + productMoving.movingId + "`)'>Vận chuyển thành công</button></td>";
        } else if (productMoving.status == "Đang chuẩn bị") {
            tableData += "<td><button class='btn btn-success' onclick='startMoving(`" + productMoving.fromLocation +
                "` , `" + productMoving.toLocation + "`  , `" + productMoving.ArrivalDate + "` , `" + accid +
                "` , `" + productMoving.MovingDate + "`  , `" + productMoving.movingId + "`)'>Bắt đầu vận chuyển</button></td>";
        }
        tableData += "</tr>";
    };
    document.getElementById("productMoving-list").innerHTML = tableData;
}
getProductMoving();

function startMoving(fromLocation, toLocation, ArrivalDate, accid, MovingDate, movingId) {
    var MovingDate = getCurretDateTime();
    axios.put('http://localhost:8080/productMoving/updateProductMovingByMovingId/' + movingId, {
        MovingDate: MovingDate,
        ArrivalDate: ArrivalDate,
        status: "Đang chuyển",
        movingId: movingId,
        shipperId: accid,
        fromLocation: fromLocation,
        toLocation: toLocation
    })
    getProductMoving();
    getProductMoving();
}

function finishMoving(fromLocation, toLocation, ArrivalDate, shipperId, MovingDate, movingId) {
    var ArrivalDate = getCurretDateTime();
    axios.put('http://localhost:8080/productMoving/updateProductMovingByMovingId/' + movingId, {
        MovingDate: MovingDate,
        ArrivalDate: ArrivalDate,
        status: "Chuyển thành công",
        movingId: movingId,
        shipperId: shipperId,
        fromLocation: fromLocation,
        toLocation: toLocation
    })
    getProductMoving();
    getProductMoving();
}

function reformatDate(dateStr) {
    var dArr = dateStr.split(" "); // input yyyy-MM-dd HH:mm:ss
    var dateStr = dArr[0];         // string yyyy-MM-dd
    dateArr = dateStr.split("-");
    var timeStr = dArr[1];         // string HH:mm:ss.SSSZ
    timeArr = timeStr.split(":");
    return timeArr[0] + ":" + timeArr[1] + "</br>" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

const getCampusNameById = async (location) => {
    const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${location}`);
    const campus = response.data;
    return campus.name;
};

const getShipperNameById = async (shipperId) => {
    const response = await axios.get(`http://localhost:8080/Account/getAccountById?id=${shipperId}`);
    const shipper = response.data;
    return shipper.email;
};

const getProductIDByMovingID = async (productID) => {
    const response = await axios.get(`http://localhost:8080/MovingItems/listItems`);
    const product = response.data;

    return product.productID;
};

function getCurretDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    var dateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    console.log(dateTime);
    return dateTime;
}

getCurretDateTime();

