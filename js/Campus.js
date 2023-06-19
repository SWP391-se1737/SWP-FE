// var list = document.getElementsByClassName('list');

// getProductByAPI();

// async function getProductByAPI(){
//     const responseAPI = await fetch('http://localhost:8080/Campus/listCampus');
//     const { results } = await responseAPI.json();
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


async function getCampus() {
    const response = await axios.get('http://localhost:8080/Campus/listCampus');
    const data = response.data;

    const div = document.createElement("div");
    div.innerHTML = data.map(item => item.name).join(', ');
    const listDiv = document.querySelector(".container .content .list");
    // list.appendChild(h1)
    listDiv.appendChild(div)
}

// async await xử lý bất đồng bộ vì dòng 21 chưa thực thi xong thì dòng 22 23 không nhận
// nên dùng async await để thực thi xong dòng 21 thì dòng 22 23 mới chạy 
// hàm map như forEach
// mấy cái kia sửa lại không null đi
// làm lại giống trên mà sài hàm map 
getCampust()