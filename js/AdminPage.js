async function getProductList() {
const response = await axios.get('http://localhost:8080/product/getListProduct');
  products = response.data;
  console.log(products);
  let tableData="";
  products.map(products =>{
                tableData+= `<tr>
                <td>${products.id}<td>
                <td>${products.name}<td>
                <td><img src="${products.image}"/><td>
                <td>${products.price}<td>
                <td>${products.status}<td>
                <td>${products.quantity}<td>
                
                </tr>`;
            });
            document.getElementById("table_body").innerHTML=tableData;
}
getProductList();
