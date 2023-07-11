async function getProductMoving() {
    const response = await axios.get('http://localhost:8080/productMoving/getListProductMoving');
    productMovings = response.data;
    console.log(productMovings);
    let tableData = "";
    productMovings.map(productMoving => {
        tableData += "<tr>"
        tableData += "<td>" + productMoving.fromLocation + "</td>";
        tableData += "<td>" + productMoving.toLocation + "</td>";
        tableData += "<td>" + productMoving.arrivalDate + "</td>";
        tableData += "<td>" + productMoving.shipperId + "</td>";
        tableData += "<td>" + productMoving.movingDate + "</td>";
        tableData += "<td>" + productMoving.movingId + "</td>";
        tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + productMoving.fromLocation +
            "` , `" + productMoving.toLocation + "`  , `" + productMoving.arrivalDate + "` , `" + productMoving.shipperId +
            "` , `" + productMoving.movingDate + "`  , `" + productMoving.movingId + "` , `" + productMoving.status + "`)'>Status</button></td>";
        tableData += "</tr>";
    });
    document.getElementById("productMoving-list").innerHTML = tableData;
}
getProductMoving();
