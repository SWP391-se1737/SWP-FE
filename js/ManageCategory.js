async function getCategoryList() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
      categories = response.data;
      let tableData="";
      categories.map(categories =>{
                tableData+= `<tr>
                <td id="categoryID">${categories.id}</td>
                <td id="categoryName">${categories.name}</td>
                <td id="categoryStatus">${categories.status}</td>
                <td><a href="#" class="update">Update</a>
                <a a href="#" class="delete">Delete</a>
                                    </tr>`;
                                });
                                document.getElementById("category-list").innerHTML=tableData;
}
getCategoryList();

document.querySelector("#category-form").addEventListener("click", (e)=>{
  target = e.target;
  if(target.classList.contains("add")){
    const addCategoryForm = document.getElementById("category-form");
    const catergoryName = addCategoryForm.elements.catergoryName.value;
    axios.post('http://localhost:8080/Category/addCategory', {
      name : catergoryName,
      status : 'true'
  })
  }
});

document.querySelector("#category-list").addEventListener("click", (e)=>{
  target = e.target;
  if(target.classList.contains("delete")){
    const categoryName = document.getElementById("categoryName");
    console.log(categoryName);
    // const categoryName = categoryName.elements.categoryName.value;
    axios.delete('http://localhost:8080/Category/deleteCategory', {
    name : categoryName
  })
  }
});