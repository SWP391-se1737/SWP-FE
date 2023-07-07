async function getCampusList() {
  const response = await axios.get('http://localhost:8080/Campus/listCampus');
  campuses = response.data;
  console.log(campuses);
  let tableData = "";
  campuses.map(campuses => {
    tableData += `<tr>
                      <td>${campuses.id}</td>
                      <td>${campuses.name}</td>
                      <td>${campuses.address}</td>                      
                      <td>${campuses.latitude}</td>
                      <td>${campuses.longitude}</td>                      
                      <td><button>Update</button></td>
                      <td><button>Delete</button></td>
                    </tr>`;
  });
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
});