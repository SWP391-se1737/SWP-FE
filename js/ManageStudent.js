async function getStudentList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    students = response.data;
    console.log(students);
    let tableData = "";
    students.map(students => {
        if (students.role == ("Student")) {
            // tableData += `<tr>
            // <td><input type="text" name="email" value="${students.email}" readonly=""/></td>
            // <td><input type="text" name="id" value="${students.id}" readonly=""/></td>
            // <td><input type="text" name="name" value="${students.name}" readonly=""/></td>
            // <td><input type="text" name="phone" value="${students.phone}" readonly=""/></td>
            // <td><input type="text" name="role" value="${students.role}" readonly=""/></td>
            // <td><input type="text" name="status" value="${students.status}" readonly=""/></td>
            // <td><a a href="#" class="delete">Delete</a></td>
            // </tr>`;
            tableData += `<tr>
            <td id="studentEmail" value="${students.email}">${students.email}</td>
            <td id="studentID">${students.id}</td>
            <td>${students.name}</td>
            <td>${students.phone}</td>
            <td>${students.role}</td>
            <td>${students.status}</td>
            <td><a a href="#" class="delete">Delete</a></td>
            </tr>`;
        }
    });
    document.getElementById("student-list").innerHTML = tableData;
}
getStudentList();

document.querySelector("#student-list").addEventListener("click", (e)=>{
    target = e.target;
    if(target.classList.contains("delete")){
      const studentEmail = document.getElementById("studentID");
      console.log(studentID);
      axios.delete('http://localhost:8080//Account/deleteAccount/6', {
        id : '6'
    })
    }
  });