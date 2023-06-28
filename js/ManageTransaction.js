async function getTransactionList() {
    const response = await axios.get('http://localhost:8080/transaction/getListTransaction');
      transactions = response.data;
      console.log(transactions);
      let tableData="";
      transactions.map(transactions =>{
                    tableData+= `<tr>
                    <td>${transactions.id}</td>
                    <td>${transactions.amount}</td>
                    <td>${transactions.status}</td>
                    </tr>`;
                });
                document.getElementById("table_body").innerHTML=tableData;
    }
    getTransactionList();
