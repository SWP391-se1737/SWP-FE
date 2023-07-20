async function getProductList() {
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    products = response.data;
    for (const product of products) {

    }

}

async function getCategoryList() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
    categories = response.data;
    console.log(categories);
    var categoryName = [];
    for (const category of categories) {
        var i = 0;
        categoryName[i] = category.name;
        i++;
    };
    console.log(categoryName);
}


var categories = ['Quần Áo', 'Thiết bị điện tử', 'Giày', 'Cặp sách', 'Khác', 'Nhạc Cụ'];
var times = ['6', '6', '3', '3', '2', '1'];
getCategoryList();

const options = {
    labels: categories,
    series: times,
    chart: {
        type: 'polarArea',
    },
    stroke: {
        colors: ['#fff']
    },
    fill: {
        opacity: 0.8
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();