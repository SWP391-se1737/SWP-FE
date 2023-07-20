async function getTotalProducts() {
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    products = response.data;
    var categoryID = await getcategoryID();
    var totalProducts = [];
    var i = 0;
    for (i = 0; i < categoryID.length; i++) {   // Gán giá trị 0 vào tất cả vị trí trong array
         totalProducts[i] = 0;
    }

    for (const product of products) {
        for (i = 0; i < categoryID.length; i++) {
            if(product.categoryid === categoryID[i]){
                totalProducts[i] += 1;
            }
       }
    }
    return totalProducts;
}

async function getCategoryName() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
    categories = response.data;
    var categoryName = [];
    var i = 0;
    for (const category of categories) {
        categoryName[i] = category.name;
        i++;
    };
    return categoryName;
}

async function getcategoryID() {
    const response = await axios.get('http://localhost:8080/Category/listCategory');
    categories = response.data;
    var categoryID = [];
    var i = 0;
    for (const category of categories) {
        categoryID[i] = category.id;
        i++;
    };
    return categoryID;
}

async function renderChart() {
    var categoryName = await getCategoryName();
    
    var totalProducts = await getTotalProducts();

    const options = {
        labels: categoryName,
        series: totalProducts,
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
}

renderChart();