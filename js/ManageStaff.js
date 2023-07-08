async function getStaffList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    staffs = response.data;
    console.log(staffs);
    let tableData = "";
    staffs.forEach(staff => {
        if (staff.role == ("Staff")) {
            tableData += "<tr>"
            tableData += "<td>" + staff.email + "</td>";
            tableData += "<td>" + staff.id + "</td>";
            tableData += "<td>" + staff.phone + "</td>";
            tableData += "<td>" + staff.role + "</td>";
            if (staff.status == true){
                tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + staff.email + 
                "` , `" + staff.id + "`  , `" + staff.phone + "` , `" + staff.role + "` , `" + staff.status + "`)'>Inactive</button></td>";
            }
            else {
                tableData += "<td><button class='btn btn-danger' onclick='setStatusActive(`" + staff.email + 
                "` , `" + staff.id + "`  , `" + staff.phone + "` , `" + staff.role + "` , `" + staff.status + "`)'>Active</button></td>";
            }
            tableData += "<tr>";
        }
    });
    document.getElementById("staff-list").innerHTML= tableData;
}
getStaffList();

function setStatusInActive(email, id, phone, role) {
    axios.put('http://localhost:8080/Account/updateAccount/' +id, {
        email : email,
        phone : phone,
        role : role,
        status : false
    })
    getStaffList();
    getStaffList();
}


function setStatusActive(email, id, phone, role) {
    axios.put('http://localhost:8080/Account/updateAccount/' +id, {
        email : email,
        phone : phone,
        role : role,
        status : true
    })
    getStaffList();
    getStaffList();
}
