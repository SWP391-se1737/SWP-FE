async function getCategoryList() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
      categories = response.data;
      console.log(categories);
      let tableData="";
      categories.map(categories =>{
                    tableData+= `<tr>
                      <td>${categories.id}</td>
                      <td>${categories.name}</td>
                      <td>${categories.status}</td>
                      <td><button>Update</button></td>
                      <td><button>Delete</button></td>
                    </tr>`;
                });
                document.getElementById("table_body").innerHTML=tableData;
    }
    getCategoryList();