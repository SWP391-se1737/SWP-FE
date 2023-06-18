// var list = document.getElementsByClassName('list');

// getProductByAPI();

// async function getProductByAPI() {
//     const responseAPI = await fetch('http://localhost:8080/Campus/listCampus');
//     const { results } = await responseAPI.json();
//     const list = document.querySelector(".container .content .list");
//     console.log(results);
//     list.innerHTML = '';
//     results.array.forEach(result => {
//         const divProduct = document.createElement('div');
//         divProduct.innerHTML = `
//         <div class="detail">
//         <h2>${result.name}</h2>
//         </div>
//         `;

//         list.appendChild(divProduct);
//     });
// }

// async function getProduct(){
//     const response = await axios.get('http://localhost:8080/Campus/listCampus');
//     const data = response.data;

//     const div = document.createElement("div");
//     data.forEach(item => {
//         const name = document.createElement("div");
//         name.textContent = item.name;
//         div.appendChild(name);

//         const id = document.createElement("div");
//         id.textContent = item.id;
//         div.appendChild(id);
//       });
//     const listDiv = document.querySelector(".container .content .list");
//     // list.appendChild(h1)
//     listDiv.appendChild(div)
// }

async function getProduct() {
    const response = await axios.get('http://localhost:8080/Campus/listCampus');
    const data = response.data;
    const div = document.createElement("div");
    const [person] = data;

    document.querySelector('div').innerHTML = Object.values(person);
    // const listDiv = document.querySelector(".container .content .list");
    // // list.appendChild(h1)
    // listDiv.appendChild(div)
}
getProduct()