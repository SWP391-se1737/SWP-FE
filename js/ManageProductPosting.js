async function getProductList() {
  const response = await axios.get('http://localhost:8080/product/getListProduct');
  products = response.data;
  console.log(products);
  let tableData1 = "";
  let tableData2 = "";
  productStatus = "Chờ duyệt";
  for (const product of products) {
      if (productStatus == product.status) //Product posting chờ duyệt
      {
        tableData1 += "<tr>"
        tableData1 += "<td>" + product.id + "</td>";
        tableData1 += "<td>" + product.name + "</td>";
        tableData1 += "<td>" + `<img src="${product.image}"/>` + "</td>";
        tableData1 += "<td>" + product.price + "</td>";
        tableData1 += "<td>" + product.description+"</td>";
        tableData1 += "<td>" + await getCategoryNameByID(product.categoryid).then((category) => category) + "</td>";
        tableData1 += "<td>" + await getCampusNameById(product.sellcampusid).then((campus) => campus) + "</td>";
        tableData1 += "<td>" + await getSellerNameById(product.seller_id).then((email) => email) + "</td>";
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
        tableData2 += "<td>" + await getCategoryNameByID(product.categoryid).then((category) => category) + "</td>";
        tableData2 += "<td>" + await getCampusNameById(product.sellcampusid).then((campus) => campus) +"</td>";
        tableData2 += "<td>" + await getSellerNameById(product.seller_id).then((email) => email) + "</td>";
        tableData2 += "<td>" + reformatDate(product.createAT) + "</td>";
        tableData2 += "<td>" + reformatDate(product.expire) + "</td>";
        tableData2 += "<td>" + product.quantity + "</td>";
        tableData2 += "<td>" + product.status + "</td>";
        tableData2 += "</tr>";
      }
  
    };
  
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
  return timeArr[0] + ":" + timeArr[1] + "</br>" + dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

function acceptPosting(id, name, image, description, price, createAT, expire, quantity, categoryid, seller_id, buycampus_id, sellcampusid) {
  status1 = "Còn hàng";
  console.log(id, name, image, description, price, createAT, expire, quantity, seller_id, buycampus_id, sellcampusid, categoryid);
  axios.put('http://localhost:8080/product/updateProductById?id=' + id, {
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
    status: status1
  })
  getProductList();
  getProductList();
}

const getCategoryNameByID = async (categoryid) => {
  const response = await axios.get(`http://localhost:8080/Category/getCategoryById/${categoryid}`);
  const category = response.data;

  return category.name;
}

const getCampusNameById = async (campusId) => {
  const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${campusId}`);
  const campus = response.data;
  return campus.name;
};

const getSellerNameById = async (seller_id) => {
  const response = await axios.get(`http://localhost:8080/Account/getAccountById?id=${seller_id}`);
  const seller = response.data;
  return seller.email;
};
