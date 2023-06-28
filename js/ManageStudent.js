async function getStudentList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    students = response.data;
    console.log(students);
    let tableData = "";
    students.map(students => {
        if (students.role == ("Student")) {
            tableData += `<tr>
            <td>${students.email}</td>
            <td>${students.id}</td>
            <td>${students.name}</td>
            <td>${students.phone}</td>
            <td>${students.role}</td>
            <td>${students.status}</td>
            <td><button>Delete</button></td>
            </tr>`;
        }
    });
    document.getElementById("table_body").innerHTML = tableData;
}
getStudentList();