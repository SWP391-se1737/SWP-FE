const getData = async () => {
    const accid = sessionStorage.getItem('id');
    console.log(accid);

    try {
        const response = await axios.get(`http://localhost:8080/product/getProductBySellerId?seller_id=${accid}`);
        const filteredData = response.data;
        renderSales(filteredData);
    } catch (error) {
        console.error("Error fetching account:", error);
    }
};
getData();
const renderSales = async (product) => {
    const list = document.getElementById("listSale");
    if (list) {
        list.innerHTML = "";

        product.forEach((product) => {
            const productId = product.id;

            // Thẻ div chứa img
            const img = document.createElement('img');
            const imageUrls = product.image.split(",");
            if (imageUrls.length > 0) {
                img.src = imageUrls[0];
            }

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

            const p3 = document.createElement("p");
            const strong3 = document.createElement("strong");
            strong3.innerText = "Ngày tạo bài đăng: ";
            p3.appendChild(strong3);
            p3.appendChild(document.createTextNode(product.createAT));

            const p4 = document.createElement('p');
            p4.innerText = product.status;
            p4.classList.add('status');

            if(product.status == "Còn hàng" || product.status == "Chờ duyệt"){
                p4.classList.add('status', 'green-text');
            }

            infoDiv.appendChild(h2);
            infoDiv.appendChild(h3);
            infoDiv.appendChild(p);
            infoDiv.appendChild(p3);
            infoDiv.appendChild(p4);


            // Thêm các thẻ div vào list
            const divItem = document.createElement("div");
            divItem.classList.add("detail", "d-flex");
            divItem.dataset.key = productId;
            divItem.appendChild(img);
            divItem.appendChild(infoDiv);

            list.appendChild(divItem);

            divItem.addEventListener('click', () => {
                followPost(divItem.dataset.key)
            })
        });
    } else {
        console.error("Phần tử listOrder không tồn tại.");
    }
};
const followPost = async (productId) => {
    const testPageUrl = `followPost.html?id=${encodeURIComponent(productId)}`;
    window.location.href = testPageUrl;
}
const getPost = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const response = await axios.get(
        `http://localhost:8080/product/getProductById/${id}`
    );

    renderPost(response.data);
};
getPost();
const renderPost = async (product) => {
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

        const p1 = document.createElement("p");
        const strong1 = document.createElement("strong");
        strong1.innerText = "Bán tại campus: ";
        p1.appendChild(strong1);
        p1.appendChild(document.createTextNode(await getCampusNameById(product.sellcampusid)));

        const p3 = document.createElement("p");
        const strong3 = document.createElement("strong");
        strong3.innerText = "Ngày tạo bài đăng: ";
        p3.appendChild(strong3);
        p3.appendChild(document.createTextNode(product.createAT));

        const p4 = document.createElement("p");
        const strong4 = document.createElement("strong");
        strong4.innerText = "Ngày bài đăng hết hạn: ";
        p4.appendChild(strong4);
        p4.appendChild(document.createTextNode(product.expire));

        const p5 = document.createElement("p");
        const strong5 = document.createElement("strong");
        strong5.innerText = "Phân loại: ";
        p5.appendChild(strong5);
        p5.appendChild(document.createTextNode(await getCategoryNameById(product.categoryid)));

        const p6 = document.createElement("p");
        const strong6 = document.createElement("strong");
        strong6.innerText = "Trạng thái: ";
        p6.appendChild(strong6);
        p6.appendChild(document.createTextNode(product.status));

        const deleteProduct = document.createElement("button");
        deleteProduct.innerText = "Xóa bài đăng";
        deleteProduct.classList.add("round-black-btn");
        if (product.status === 'Còn hàng') {
            deleteProduct.addEventListener("click", () => {
                deleteProductByUser(productId);

            });
        }
        function deleteProductByUser(productId) {
            fetch(`http://localhost:8080/product/deleteProductByStudent?id=${productId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error('Error deleting product');
                })
                .then(data => {
                    // Xử lý phản hồi từ máy chủ sau khi xóa thành công
                    window.location.href = "sales.html";
                    console.log(data);
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error(error);
                });
        }

        infoDiv.appendChild(h2);
        infoDiv.appendChild(h3);
        infoDiv.appendChild(p5);
        infoDiv.appendChild(p);
        infoDiv.appendChild(p1);
        infoDiv.appendChild(document.createElement("br"));
        infoDiv.appendChild(p3);
        infoDiv.appendChild(p4);
        infoDiv.appendChild(p6);
        infoDiv.appendChild(document.createElement("br"));
        if (product.status === 'Còn hàng')
            infoDiv.appendChild(deleteProduct);

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
        console.error("Error fetching campus:", error);
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