async function getStaffList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    staffs = response.data;
    console.log(staffs);
    let tableData = "";
    staffs.map(staffs => {
        if (staffs.role == ("Staff")) {
            tableData += `<tr>
            <td>${staffs.email}</td>
            <td>${staffs.id}</td>
            <td>${staffs.name}</td>
            <td>${staffs.phone}</td>
            <td>${staffs.role}</td>
            <td>${staffs.status}</td>
            <td><button>Delete</button></td>
            </tr>`;
        }
    });
    document.getElementById("table_body").innerHTML = tableData;
}
getStaffList();
