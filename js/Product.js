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


// async function getProduct() {

//     const list = document.getElementById('listProduct');
//     const response = await axios.get('http://localhost:8080/product/getListProduct');
//     const data = response.data;

//     data.forEach(result => {
//       const divItem = document.createElement('div');
//       divItem.classList.add('detail'); // Thêm class "detail" vào div

//       const img = document.createElement('img');
//       img.src = result.image;

//       const h2 = document.createElement('h2');
//       h2.innerText = result.name; // Gán giá trị "name" vào phần tử h2

//       const h3 = document.createElement('p');
//       h3.innerText = result.price;

//       const p = document.createElement('p');
//       p.innerText = result.status; // Gán giá trị "price" vào phần tử p


//       divItem.appendChild(img)
//       divItem.appendChild(h2);
//       divItem.appendChild(h3);
//       divItem.appendChild(p);



//       list.appendChild(divItem);
//     });
//   }
//   getProduct();



let currentSearchTerm = '';


async function redirectToSearchProduct() {
  const searchInput = document.getElementById('searchbar');
  const searchTerm = searchInput.value.toLowerCase();
  console.log('Search Term:', searchTerm);
  // Chuyển hướng đến trang searchProduct.html với tham số tìm kiếm trong URL
  window.location.href = 'searchproduct.html?search=' + searchTerm;
}

async function resetSearchInput() {
  const searchInput = document.getElementById('searchbar');
  searchInput.value = currentSearchTerm; // Gán lại giá trị tìm kiếm trước đó vào thanh tìm kiếm
}

async function getProductByName() {
  const searchInput = document.getElementById('searchbar');
  const list = document.getElementById('searchProduct');
  let originalData = [];

  const searchProduct = async () => {
    const searchTerm = searchInput.value.toLowerCase();
    currentSearchTerm = searchTerm;
    const response = await axios.get('http://localhost:8080/product/searchProductByName?name=' + searchTerm);
    const filteredData = response.data;
    renderProducts(filteredData);
  };


  const renderProducts = (products) => {

    const list = document.getElementById('searchProduct');
    if (list) {
      list.innerHTML = '';
      products.forEach(result => {
        const productId = result.id;
        const divItem = document.createElement('div');
        divItem.classList.add(`detail`);
        divItem.dataset.key = productId;


        const img = document.createElement('img');
        img.src = result.image;

        const h2 = document.createElement('h5');
        h2.innerText = result.name;

        const h3 = document.createElement('p');
        h3.innerText = result.price;

        const p = document.createElement('p');
        p.innerText = result.status;



        divItem.appendChild(img);
        divItem.appendChild(h2);
        divItem.appendChild(h3);
        divItem.appendChild(p);

        list.appendChild(divItem);

        divItem.addEventListener('click', () => {
          getProductDetail(divItem.dataset.key)
        })

      });

    } else {
      console.error("Phần tử searchProduct không tồn tại.");
    }

  };
  // 
  searchInput.addEventListener('keyup', searchProduct);
  const response = await axios.get('http://localhost:8080/product/getListProduct');
  originalData = response.data;
  renderProducts(originalData);

  await resetSearchInput();
}

const getProductDetail = async (productId) => {
  // const response = await axios.get(`http://localhost:8080/product/getProductById/${productId}`);
  const testPageUrl = `productDetail.html?id=${encodeURIComponent(productId)}`;
  window.location.href = testPageUrl;
}
getProductByName();

// function loginWithGoogle() {
//   fetch('/api/login/google')
//     .then(response => {
//       if (response.ok) {
//         // Xử lý đăng nhập thành công
//         console.log('Đăng nhập thành công');
//       } else {
//         // Xử lý đăng nhập thất bại
//         console.error('Đăng nhập thất bại');
//       }
//     })
//     .catch(error => {
//       console.error('Lỗi:', error);
//     });
// }


