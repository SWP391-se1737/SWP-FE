async function getCategoryList() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
      categories = response.data;
      console.log(categories);
      let tableData="";
      categories.map(categories =>{
                    tableData+= `<tr>
                    
                    </tr>`;
                });
                document.getElementById("table_body").innerHTML=tableData;
    }
    getCategoryList();