async function getProductList() {
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    products = response.data;
    console.log(products);
    let tableData1 = "";
    let tableData2 = "";
    for (const product of products) {
        if (product.sellcampusid == 1) //Product posting chờ duyệt
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
          tableData1 += "<td>" + product.status + "</td>";
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
  