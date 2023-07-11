async function getProductList() {
  const response = await axios.get('http://localhost:8080/product/getListProduct');
  products = response.data;
  console.log(products);
  let tableData1 = "";
  let tableData2 = "";
  productStatus = "Chờ duyệt";
  products.map(product => {
    if (productStatus == product.status) //Product posting chờ duyệt
    {
      tableData1 += "<tr>"
      tableData1 += "<td>" + product.id + "</td>";
      tableData1 += "<td>" + product.name + "</td>";
      tableData1 += "<td>" + `<img src="${product.image}"/>` + "</td>";
      tableData1 += "<td>" + product.price + "</td>";
      tableData1 += "<td>" + product.description+"</td>";
      tableData1 += "<td>" + getCategoryNameByID(product.categoryid) +"</td>";
      tableData1 += "<td>" + product.sellcampusid+"</td>";
      tableData1 += "<td>" + product.seller_id+"</td>";
      tableData1 += "<td>" + reformatDate(product.expire) + "</td>";
      tableData1 += "<td>" + reformatDate(product.expire) + "</td>";
      tableData1 += "<td>" + product.quantity + "</td>";
      tableData1 += "<td><button value='product.status' class='btn btn-danger' onclick='acceptPosting(`" + product.id +
                "` , `" + product.name + "`  , `" + product.image + "` , `" + product.description + "` , `" + product.price +
                "` , `" + product.expire + "`  , `" + product.expire + "` , `" + product.quantity + "` , `" + product.categoryid + 
                "` , `" + product.seller_id + "`  , `" + product.buycampus_id + "` , `" + product.sellcampusid + "` , `" + product.status + "`)'>Chờ duyệt</button></td>";
      tableData1 += "</tr>";
    }
    else {
      tableData2 += "<tr>"
      tableData2 += "<td>" + product.id + "</td>";
      tableData2 += "<td>" + product.name + "</td>";
      tableData2 += "<td>" + `<img src="${product.image}"/>` + "</td>";
      tableData2 += "<td>" + product.price + "</td>";
      tableData2 += "<td>" + product.description+"</td>";
      tableData2 += "<td>" + getCategoryNameByID(product.categoryid) +"</td>";
      tableData2 += "<td>" + product.sellcampusid+"</td>";
      tableData2 += "<td>" + product.seller_id+"</td>";
      tableData2 += "<td>" + reformatDate(product.expire) + "</td>";
      tableData2 += "<td>" + reformatDate(product.expire) + "</td>";
      tableData2 += "<td>" + product.quantity + "</td>";
      if(product.status == ""){
        tableData2 += "<td><button name='product.status' class='btn btn-danger' onclick='changeStatus(`" + product.id +
      "` , `" + product.name + "`  , `" + product.image + "` , `" + product.description + "` , `" + product.price +
      "` , `" + product.expire + "`  , `" + product.expire + "` , `" + product.quantity + "` , `" + product.status + "`)' > ||| </button></td>";
      
      }
      tableData1 += "</tr>";
    }

  });
  document.getElementById("product-list1").innerHTML = tableData1;
  document.getElementById("product-list2").innerHTML = tableData2;
}

getProductList();

function reformatDate(dateStr) {
  var dArr = dateStr.split(" "); // input yyyy-MM-dd HH:mm:ss
  var dateStr = dArr[0];         // string yyyy-MM-dd
  dateArr = dateStr.split("-");
  var timeStr = dArr[1];         // string HH:mm:ss.SSSZ
  timeArr = timeStr.split(":");
  return timeArr[0] + ":" + timeArr[1] + "/" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

function acceptPosting(id, name, image, description, price, createAT, expire, quantity, categoryid, seller_id, buycampus_id, sellcampusid) {
  status1 = "Còn hàng";
  console.log(id, name, image, description, price, createAT, expire, quantity, seller_id, buycampus_id, sellcampusid, categoryid);
  axios.put('http://localhost:8080/product/updateProductById?id=' +id, {
    id: id,
    name: name,
    image: image,
    description: description,
    price: price,
    createAT: createAT,
    expire: expire,
    quantity: quantity,
    seller_id: seller_id,
    buycampus_id: buycampus_id,
    sellcampusid: sellcampusid,
    categoryid: categoryid,
    status : status1
  })
  getProductList();
  getProductList();
}

async function getCategoryNameByID(id){
  const response = await axios.get('http://localhost:8080/Campus/getCampusById?id=' + id);
  categories = response.data;
  var categoryName;
  console.log(categories);
  categoryName = categories.name;
  console.log(categoryName);
  return categoryName;
}
