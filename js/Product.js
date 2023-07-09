
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
      const availableProducts = products.filter((result) => result.status === 'Còn hàng');

      availableProducts.forEach((result) => {
        const productId = result.id;
        const divItem = document.createElement('div');
        divItem.classList.add(`detail`);
        divItem.dataset.key = productId;

        const img = document.createElement('img');
        img.src = result.image;

        const h2 = document.createElement('h5');
        h2.innerText = result.name;

        const h3 = document.createElement('p');
        h3.innerText = result.price.toLocaleString();
        h3.classList.add('price');

        const buytButton = document.createElement("button");
        buytButton.innerText = "Mua ngay";
        buytButton.classList.add("round-black-btn");

        buytButton.addEventListener("click", () => {
          // Thực hiện các hành động khi nhấp vào nút "Add to Cart"
          // Ví dụ: Gọi hàm thêm sản phẩm vào giỏ hàng
          buyProduct(productId);
        });



        divItem.appendChild(img);
        divItem.appendChild(h2);
        divItem.appendChild(h3);
        divItem.appendChild(buytButton);

        list.appendChild(divItem);


        img.addEventListener('click', () => {
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


