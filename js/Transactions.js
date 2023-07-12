async function getWalletIdByAccId() {
    var accid = sessionStorage.getItem('id');

    try {
        const response = await axios.get(`http://localhost:8080/Account/updateAccount/${accid}`);
        const filteredData = response.data;
        renderProfile(filteredData);
    } catch (error) {
        console.error("Error fetching account:", error);
    }
}
const renderProfile = (account) => {
    const select = document.getElementById("profileDetail");

    if (select) {
        select.innerHTML = ""; // Xóa bỏ các tùy chọn cũ (nếu có)
        const divItem = document.createElement('div');
        divItem.classList.add(`detail`);

        const p = document.createElement("p");
        const strong1 = document.createElement("strong");
        strong1.innerText = "Email: ";
        p3.appendChild(strong1);
        p3.appendChild(document.createTextNode(account.email));

        const p1 = document.createElement("p");
        const strong2 = document.createElement("strong");
        strong2.innerText = "Email: ";
        p3.appendChild(strong2);
        p3.appendChild(document.createTextNode(account.phone));

        const changeButton = document.createElement("button");
        changeButton.innerText = "Sửa thông tin";
        changeButton.classList.add("change-btn");

        changeButton.addEventListener("click", () => {
            // Thực hiện các hành động khi nhấp vào nút "Add to Cart"
            // Ví dụ: Gọi hàm thêm sản phẩm vào giỏ hàng
            changeButton(account.id);
        });



        divItem.appendChild(p);
        divItem.appendChild(p1);
        divItem.appendChild(changeButton);

        list.appendChild(divItem);

    } else {
        console.error("Phần tử profileDetail không tồn tại.");
    }
};
getWalletIdByAccId()

