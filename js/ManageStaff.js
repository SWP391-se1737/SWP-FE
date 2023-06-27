async function getStaffList() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    staffs = response.data;
    console.log(staffs);
    let tableData="";
    // staffs.map(staffs =>{
    //                 tableData+= `<tr>
    //                 </tr>`;
    //             });
    //             document.getElementById("table_body").innerHTML=tableData;
    }
    getStaffList();
