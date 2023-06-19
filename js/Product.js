// var list = document.getElementsByClassName('list');

// getProductByAPI();

// async function getProductByAPI() {
//     const responseAPI = await fetch('http://localhost:8080/Campus/listCampus');
//     const { results } = await responseAPI.json();
//     const list = document.querySelector(".container .content .list");
//     console.log(results);
//     list.innerHTML = '';
//     results.array.forEach(result => {
//         const divProduct = document.createElement('div');
//         divProduct.innerHTML = `
//         <div class="detail">
//         <h2>${result.name}</h2>
//         </div>
//         `;

//         list.appendChild(divProduct);
//     });
// }

// async function getProduct(){
//     const response = await axios.get('http://localhost:8080/Campus/listCampus');
//     const data = response.data;

//     const div = document.createElement("div");
//     data.forEach(item => {
//         const name = document.createElement("div");
//         name.textContent = item.name;
//         div.appendChild(name);

//         const id = document.createElement("div");
//         id.textContent = item.id;
//         div.appendChild(id);
//       });
//     const listDiv = document.querySelector(".container .content .list");
//     // list.appendChild(h1)
//     listDiv.appendChild(div)
// }

// async function getProduct() {
//      const list = document.getElementById('listProduct');
//    const response = await axios.get('http://localhost:8080/product/getListProduct');
//      const data = response.data;
//      const div = document.createElement("div");
//      const [person] = data;

//     document.querySelector('div').innerHTML = Object.values(person);
//     //   const listDiv = document.querySelector(".container .content .listProduct");
//     //   list.appendChild(h2)
//     //   list.appendChild(p)
//     //  listDiv.appendChild(div)
//  }
// getProduct()

// const list = document.getElementById("listProduct");

//     async function getProduct(){
//     const responseAPI = await fetch('http://localhost:8080/product/getListProduct');
//     const { results } = await responseAPI.json();
//     list.innerHTML = '';
//     results.forEach(result => {
//         const divItem = document.createElement('div');
//         divItem.innerHTML = `
       
//         <div class="detail">
//         <h2>${result.name}</h2>
//         <p>${result.price}</p>
//         </div>
//         `;
//         list.appendChild(divItem);
//     });
// }
// getProduct();


async function getProduct() {
  
    const list = document.getElementById('listProduct');
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    const data = response.data;
  
    data.forEach(result => {
      const divItem = document.createElement('div');
      divItem.classList.add('detail'); // Thêm class "detail" vào div

      const img = document.createElement('img');
      img.src = result.image;
  
      const h2 = document.createElement('h2');
      h2.innerText = result.name; // Gán giá trị "name" vào phần tử h2

      const h3 = document.createElement('p');
      h3.innerText = result.price;
  
      const p = document.createElement('p');
      p.innerText = result.status; // Gán giá trị "price" vào phần tử p
      
      
      divItem.appendChild(img)
      divItem.appendChild(h2);
      divItem.appendChild(h3);
      divItem.appendChild(p);
      
     
        
      list.appendChild(divItem);
    });
  }
  
  getProduct();