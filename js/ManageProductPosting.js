async function getProductList() {
  
  const res1 = await axios.get('http://localhost:8080/product/getListProduct');
  products = res1.data;
  console.log(products);
  let tableData1 = "";
  products = "Chờ duyệt";
  products.map(waitingProducts => { 
    if (products.status == productStatus) //Product posting chờ duyệt
    {
      tableData1 += `<tr>
                <td>${products.id}<td>
                <td>${products.name}<td>
                <td><img src="${products.image}"/><td>
                <td>${products.description}<td>
                <td>${products.price}<td>
                <td>${reformatDate(products.create_AT)}<td>
                <td>${reformatDate(products.expire)}<td>
                <td>${products.status}<td>
                <td>${products.quantity}<td>
                <td><button>Accept</button><td>
                <td><button>Delete</button><td>
                </tr>`;
  }
  else{
    tableData2 += `<tr>
                <td>${products.id}<td>
                <td>${products.name}<td>
                <td><img src="${products.image}"/><td>
                <td>${products.description}<td>
                <td>${products.price}<td>
                <td>${reformatDate(products.create_AT)}<td>
                <td>${reformatDate(products.expire)}<td>
                <td>${products.status}<td>
                <td>${products.quantity}<td>
                <td><button>Update</button><td>
                <td><button>Delete</button><td>
                </tr>`;
  }
    
  });
  document.getElementById("table_body_waitingProducts").innerHTML = tableData1;
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
