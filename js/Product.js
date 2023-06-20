async function getProduct() {

  const list = document.getElementById('listProduct');
  const response = await axios.get('http://localhost:8080/product/getListProduct');
  const data = response.data;

  data.forEach(result => {
    const producId = result.id;
    const divItem = document.createElement('div');
    divItem.classList.add('detail'); // Thêm class "detail" vào div
    divItem.dataset.key = producId;

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

async function getProductByName() {
  const searchInput = document.getElementById('searchbar');
  const list = document.getElementById('searchProduct');
  let originalData = [];

  const searchProduct = async () => {
    const searchTerm = searchInput.value.toLowerCase();
    const response = await axios.get('http://localhost:8080/product/searchProductByName?name=' + searchTerm);
    const filteredData = response.data;
    renderProducts(filteredData);
  };


  const renderProducts = (products) => {
    list.innerHTML = '';
    products.forEach(result => {
      const divItem = document.createElement('div');
      divItem.classList.add('detail');

      const img = document.createElement('img');
      img.src = result.image;

      const h2 = document.createElement('h2');
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
    });
  };

  searchInput.addEventListener('keyup', searchProduct);

  const response = await axios.get('http://localhost:8080/product/getListProduct');
  originalData = response.data;
  renderProducts(originalData);
}

getProductByName();

async function getProductChuot() {

  const list = document.getElementById('name');
  const response = await axios.get('http://localhost:8080/product/searchProductByName?name=chuot');
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
getProductChuot();

