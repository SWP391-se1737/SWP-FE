async function getCategoryList() {
  const response = await axios.get('http://localhost:8080/Category/listCategory');
  categories = response.data;
  console.log(categories);
  let tableData = "";
  categories.map(category => {
    tableData += "<tr>"
    tableData += "<td>" + category.id + "</td>";
    tableData += "<td>" + category.name + "</td>";
    tableData += "<td>" + category.status + "</td>";
    if (category.status == true) {
      tableData += "<td><button class='btn btn-danger' onclick='setStatusInActive(`" + category.id + "` , `" + category.name + "`  , `" + student.role + "` , `" + category.status + "`)'>Inactive</button></td>";
    }
    else {
      tableData += "<td><button class='btn btn-danger' onclick='setStatusActive(`" + category.id + "` , `" + category.name + "`  , `" + student.role + "` , `" + category.status + "`)'>Active</button></td>";
    }
    tableData += "</tr>";
  });
  document.getElementById("category-list").innerHTML = tableData;
}
getCategoryList();

document.querySelector("#category-form").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("add")) {
    const addCategoryForm = document.getElementById("category-form");
    const catergoryName = addCategoryForm.elements.catergoryName.value;
    axios.post('http://localhost:8080/Category/addCategory', {
      name: catergoryName,
      status: 'true'
    })
  }
  getCategoryList();
});
