const getData = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await axios.get(
        `http://localhost:8080/product/getProductById/${id}`
    );

    renderProducts(response.data);
};
getData();
const renderProducts = async (product) => {
    const list = document.getElementById("productDetail");
    if (list) {
        list.innerHTML = "";
        const productId = product.id;

        const ImgDiv = document.createElement("div");
        ImgDiv.classList.add("image");

        // Thẻ div chứa hình ảnh lớn
        const mainImgDiv = document.createElement("div");
        mainImgDiv.classList.add("main-image");

        // Thẻ div chứa danh sách hình ảnh nhỏ
        const thumbnailImgDiv = document.createElement("div");
        thumbnailImgDiv.classList.add("thumbnail-images");

        // Thêm hình ảnh lớn đầu tiên
        const mainImg = document.createElement("img");
        const imageUrls = product.image.split(",");
        if (imageUrls.length > 0) {
            mainImg.src = imageUrls[0];
            mainImgDiv.appendChild(mainImg);
        }

        // Thêm các hình ảnh nhỏ
        imageUrls.forEach((url, index) => {
            if (index >= 0) {
                const thumbnailImg = document.createElement("img");
                thumbnailImg.src = url;
                thumbnailImgDiv.appendChild(thumbnailImg);

                // Thêm sự kiện lắng nghe cho hình ảnh nhỏ
                thumbnailImg.addEventListener("click", () => {
                    mainImg.src = url;
                });
            }
        });
        ImgDiv.appendChild(mainImgDiv);
        ImgDiv.appendChild(thumbnailImgDiv);

        // Thẻ div chứa các thuộc tính còn lại
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("product-info");

        const h2 = document.createElement("h2");
        h2.innerText = product.name;

        const h3 = document.createElement('p');
        h3.innerText = product.price.toLocaleString();
        h3.classList.add('price');

        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.innerText = "Mô tả: ";
        p.appendChild(strong);
        p.appendChild(document.createTextNode(product.description));
        p.appendChild(document.createElement("br"));

        const p5 = document.createElement("p");
        const strong5 = document.createElement("strong");
        strong5.innerText = "Phân loại: ";
        p5.appendChild(strong5);
        p5.appendChild(document.createTextNode(await getCategoryNameById(product.categoryid)));

        const p2 = document.createElement("p");
        const strong1 = document.createElement("strong");
        strong1.innerText = "Bán tại campus: ";
        p2.appendChild(strong1);
        p2.appendChild(document.createTextNode(await getCampusNameById(product.sellcampusid)));

        const p3 = document.createElement("p");
        const strong2 = document.createElement("strong");
        strong2.innerText = "Số lượng: ";
        p3.appendChild(strong2);
        p3.appendChild(document.createTextNode(product.quantity));

        const buyButton = document.createElement("button");
        buyButton.innerText = "Mua ngay";
        buyButton.classList.add("round-black-btn");

        buyButton.addEventListener("click", () => {
            // Thực hiện các hành động khi nhấp vào nút "Add to Cart"
            // Ví dụ: Gọi hàm thêm sản phẩm vào giỏ hàng
            buyProduct(productId);
        });

        infoDiv.appendChild(h2);
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p);
        infoDiv.appendChild(p5);
        infoDiv.appendChild(p2);
        infoDiv.appendChild(document.createElement("br"));
        infoDiv.appendChild(p3);
        infoDiv.appendChild(document.createElement("br"));
        infoDiv.appendChild(buyButton);

        // Thêm các thẻ div vào list
        const divItem = document.createElement("div");
        divItem.classList.add("detail", "d-flex");
        divItem.dataset.key = productId;
        divItem.appendChild(ImgDiv);
        divItem.appendChild(infoDiv);

        list.appendChild(divItem);
    } else {
        console.error("Phần tử searchProduct không tồn tại.");
    }
};

const getCampusNameById = async (campusId) => {
    try {
        const response = await axios.get(`http://localhost:8080/Campus/getCampusById?id=${campusId}`);
        const filteredData = response.data;
        return filteredData.name;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const getCategoryNameById = async (categoryId) => {
    try {
        const response = await axios.get(`http://localhost:8080/Category/getCategoryById/${categoryId}`);
        const filteredData = response.data;
        return filteredData.name;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};



