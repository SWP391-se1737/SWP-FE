async function getCampusList() {
    const response = await axios.get('http://localhost:8080/Campus/listCampus');
      campuses = response.data;
      console.log(campuses);
      let tableData="";
      campuses.map(campuses =>{
                    tableData+= `<tr>
                    
                    </tr>`;
                });
                document.getElementById("table_body").innerHTML=tableData;
    }
    getCampusList();