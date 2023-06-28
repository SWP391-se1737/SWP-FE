async function getCampusList() {
    const response = await axios.get('http://localhost:8080/Campus/listCampus');
      campuses = response.data;
      console.log(campuses);
      let tableData="";
      campuses.map(campuses =>{
                    tableData+= `<tr>
                      <td>${campuses.id}</td>
                      <td>${campuses.name}</td>
                      <td>${campuses.address}</td>                      
                      <td>${campuses.latitude}</td>
                      <td>${campuses.longitude}</td>                      
                      <td><button>Update</button></td>
                      <td><button>Delete</button></td>
                    </tr>`;
                });
                document.getElementById("table_body").innerHTML=tableData;
    }
    getCampusList();