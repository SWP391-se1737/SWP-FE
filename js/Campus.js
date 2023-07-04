async function getCampus() {
    const list = document.getElementById('listCampuses');
    let originalData = [];

    try {
        const response = await axios.get('http://localhost:8080/Campus/listCampus');
        const filteredData = response.data;
        renderCampus(filteredData);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
const renderCampus = (campuses) => {
    const select = document.getElementById("listCampuses");
    if (select) {
        select.innerHTML = ""; // Xóa bỏ các tùy chọn cũ (nếu có)
        const defaultOption = document.createElement("option");
        defaultOption.value = "0";
        defaultOption.innerText = "Campus";
        select.appendChild(defaultOption);

        campuses.forEach((result) => {
            const option = document.createElement("option");
            option.value = result.id; // Đặt giá trị value của option là id của campus
            option.innerText = result.name; // Hiển thị tên của campus

            select.appendChild(option);
        });
    } else {
        console.error("Phần tử listCampuses không tồn tại.");
    }
};
getCampus();