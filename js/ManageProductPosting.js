async function getProductList() {
  const res1 = await axios.get('http://localhost:8080/product/getListProduct'); //Product Posting chờ duyệt
  waitingProducts = res1.data;
  console.log(waitingProducts);
  let tableData1 = "";
  waitingProducts.map(waitingProducts => {
    tableData1 += `<tr>
                <td>${waitingProducts.id}<td>
                <td>${waitingProducts.name}<td>
                <td><img src="${waitingProducts.image}"/><td>
                <td>${waitingProducts.description}<td>
                <td>${waitingProducts.price}<td>
                <td>${reformatDate(waitingProducts.create_AT)}<td>
                <td>${reformatDate(waitingProducts.expire)}<td>
                <td>${waitingProducts.status}<td>
                <td>${waitingProducts.quantity}<td>
                <td><button>Accept</button><td>
                <td><button>Delete</button><td>
                </tr>`;
  });
  document.getElementById("table_body_waitingProducts").innerHTML = tableData1;

  const res2 = await axios.get('http://localhost:8080/product/getListProduct'); // Product posting
  readyProducts = res2.data;
  console.log(readyProducts);
  let tableData2 = "";
  readyProducts.map(readyProducts => {
    tableData2 += `<tr>
                          <td>${readyProducts.id}<td>
                          <td>${readyProducts.name}<td>
                          <td><img src="${readyProducts.image}"/><td>
                          <td>${readyProducts.description}<td>
                          <td>${readyProducts.price}<td>
                          <td>${reformatDate(readyProducts.create_AT)}<td>
                          <td>${reformatDate(readyProducts.expire)}<td>
                          <td>${readyProducts.status}<td>
                          <td>${readyProducts.quantity}<td>
                          <td><button>Update</button><td>
                          <td><button>Delete</button><td>
                          </tr>`;
  });
  document.getElementById("table_body_readyProducts").innerHTML = tableData2;
}
getProductList();
function reformatDate(dateStr) {
  var dArr = dateStr.split("T"); // input yyyy-MM-ddTHH:mm:ss.SSSZ
  var dateStr = dArr[0];         // string yyyy-MM-dd
  dateArr = dateStr.split("-");  
  var timeStr = dArr[1];         // string HH:mm:ss.SSSZ
  timeArr = timeStr.split(":");  
  return timeArr[0] + ":" + timeArr[1] + "/" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}
