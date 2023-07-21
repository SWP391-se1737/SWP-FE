async function getStudentList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    students = response.data;
    console.log(students);
    let tableData = "";
    students.map(student => {
        if (student.role == ("Student")) {
            tableData += "<tr>"
            tableData += "<td>" + student.email + "</td>";
            tableData += "<td>" + student.id + "</td>";
            tableData += "<td>" + student.phone + "</td>";
            tableData += "<td>" + student.role + "</td>";
            if (student.status == true){
                tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + student.email + "` , `" + student.id + "`  , `" + student.phone + "` , `" + student.role + "` , `" + student.status + "`)'>Inactive</button></td>";
            }
            else {
                tableData += "<td><button class='btn btn-danger' onclick='setStatusActive(`" + student.email + "` , `" + student.id + "`  , `" + student.phone + "` , `" + student.role + "` , `" + student.status + "`)'>Active</button></td>";
            }
            tableData += "<td><button class='btn btn-danger' onclick='promoteRole(`" + student.email + "` , `" + student.id + "`  , `" + student.phone + "` , `" + student.role + "` , `" + student.status + "`)'>Promote</button></td>";

            tableData += "</tr>";
        }   
    });
    document.getElementById("student-list").innerHTML = tableData;
}
getStudentList();

function setStatusInActive(email, id, phone, role) {
    axios.put('http://localhost:8080/Account/updateAccount/' +id, {
        email : email,
        phone : phone,
        role : role,
        status : false
    })
    getStudentList();
    getStudentList();
}


function setStatusActive(email, id, phone, role) {
    axios.put('http://localhost:8080/Account/updateAccount/' +id, {
        email : email,
        phone : phone,
        role : role,
        status : true
    })
    getStudentList();
    getStudentList();
}

function promoteRole(email, id, phone, role) {
    axios.put('http://localhost:8080/Account/updateAccount/' +id, {
        email : email,
        phone : phone,
        role : 'Staff',
        status : true
    })
    getStudentList();
    getStudentList();
}