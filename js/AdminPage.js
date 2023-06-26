let list = document.querySelectorAll(".navigation li");

function activeLink(){
    list.forEach((item) => {
        item.classList.remove("hovered");
    });
    this.classList.add("hovered");  
}

list.forEach(item => item.addEventListener("mouseover", activeLink));

let toggle = document.querySelector(".toggle");
let navigation= document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};

async function getProductList() {
    try {
        const res = await fetch('localhost:8080/product/getListProduct');
        const data = await res.json();
        if(!res.ok){
            console.log(data.description);
            return;
        }
        let tableData="";
        data.map(products =>{
            tableData+= `<tr>
            <td>${products.id}<td>
            <td>${products.name}<td>
            <td>${products.image}<td>
            <td>${products.description}<td>
            <td>${products.price}<td>
            <td>${products.createat}<td>
            <td>${products.exprire}<td>
            <td>${products.status}<td>
            <td>${products.quantity}<td>
            </tr>`;
        });
        document.getElementById("table_body").innerHTML=tableData;
        
    } catch (error) {
        console.log(error);
    }
};


async function getAccountList() {
    try {
        const data = await fetch('http://localhost:8080/Account/listAccount');
        const objectData = await data.json();
        if(!res.ok){
            console.log(objectData.description);
            return;
        }
        let tableData="";
        objectData.map(accounts =>{
            tableData+= `<tr>
            <td>${accounts.id}<td>
            <td>${accounts.email}<td>
            <td>${accounts.phone}<td>
            <td>${accounts.role}<td>
            <td>${accounts.status}<td>
            </tr>`;
        });
        document.getElementById("table_body").innerHTML=tableData;
        
    } catch (error) {
        console.log(error);
    }
};

