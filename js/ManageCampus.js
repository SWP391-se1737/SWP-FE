async function getCampusList() {
  const response = await axios.get('http://localhost:8080/Campus/listCampus');
  campuses = response.data;
  console.log(campuses);
  let tableData = "";
  for (const campus of campuses) {
    tableData += "<tr>"
    tableData += "<td>" + campus.id + "</td>";
    tableData += "<td>" + campus.name + "</td>";
    tableData += "<td>" + campus.address + "</td>";
    tableData += "<td>" + campus.longitude + "</td>";
    tableData += "<td>" + campus.latitude + "</td>";
    // if (category.status == true) {
    //   tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + category.id + "` , `" + category.name + "`  , `" + student.role + "` , `" + category.status + "`)'>Inactive</button></td>";
    // }
    // else {
    //   tableData += "<td><button class='btn btn-danger' onclick='setStatusActive(`" + category.id + "` , `" + category.name + "`  , `" + student.role + "` , `" + category.status + "`)'>Active</button></td>";
    // }
    tableData += "</tr>";
  };
  document.getElementById("campus-list").innerHTML = tableData;
}
getCampusList();

document.querySelector("#campus-form").addEventListener("click", (e)=>{
  target = e.target;
  if(target.classList.contains("add")){
    const addCampusForm = document.getElementById("campus-form");
    const campusName = addCampusForm.elements.campusName.value;
    const campusAddress = addCampusForm.elements.campusAddress.value;
    const campusLongitude = addCampusForm.elements.campusLongitude.value;
    const campusLatitude = addCampusForm.elements.campusLatitude.value;
    axios.post('http://localhost:8080/Campus/addCampus', {
      name : campusName,
      address : campusAddress,
      longitude : campusLongitude,
      latitude : campusLatitude
  })
  }
  getCampusList();
});