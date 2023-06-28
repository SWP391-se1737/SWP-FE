async function getProductList() {
  
  const response = await axios.get('http://localhost:8080/product/getListProduct');
  products = response.data;
  console.log(products);
  let tableData1 = "";
  let tableData2 = "";
  productStatus = "Chờ duyệt";
  products.map(products => { 
    if (productStatus == products.status) //Product posting chờ duyệt
    {
      tableData1 += `<tr>
                <td>${products.id}</td>
                <td>${products.name}</td>
                <td><img src="${products.image}"/></td>
                <td>${products.description}</td>
                <td>${products.price}</td>
                <td>${reformatDate(products.create_AT)}</td>
                <td>${reformatDate(products.expire)}</td>
                <td>${products.status}</td>
                <td>${products.quantity}</td>
                <td><button>Accept</button></td>
                <td><button>Delete</button></td>
                </tr>`;
  }
  else{
    tableData2 += `<tr>
                <td>${products.id}</td>
                <td>${products.name}</td>
                <td><img src="${products.image}"/></td>
                <td>${products.description}</td>
                <td>${products.price}</td>
                <td>${reformatDate(products.create_AT)}</td>
                <td>${reformatDate(products.expire)}</td>
                <td>${products.status}</td>
                <td>${products.quantity}</td>
                <td><button>Update</button></td>
                <td><button>Delete</button></td>
                </tr>`;
  }
    
  });
  document.getElementById("table_body_1").innerHTML = tableData1;
  document.getElementById("table_body_2").innerHTML = tableData2;
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
