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
            if (product.categoryid === categoryID[i]) {
                totalProducts[i] += 1;
            }
        }
    }
    return totalProducts;
}

async function getDepositAmount() {
    const response = await axios.get('http://localhost:8080/transaction/getListTransaction');
    transactions = response.data;
    var dateArr = getArrayOfDate();
    var totalDepositAmount = [];
    var i = 0;
    for (i = 0; i < dateArr.length; i++) {   // Gán giá trị 0 vào tất cả vị trí trong array
        totalDepositAmount[i] = 0;
    }
    for (const transaction of transactions) {
        if (transaction.status === "nạp tiền") {
            for (i = 0; i < dateArr.length; i++) {
                if (reformatDate(transaction.transaction_datetime) == dateArr[i]) {
                    amount = transaction.amount * 10;
                    totalDepositAmount[i] += amount;
                }
            }
        }
    };
    return totalDepositAmount;
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

function getArrayOfDate() {
    const d = new Date();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    var dateArr = [];
    var o = 10; // number of past days
    for (var i = 0; i < 9; i++) {
        switch (month) {
            case 1:
                monthString = 'Jan';
                break;
            case 2:
                monthString = 'Feb';
                break;
            case 3:
                monthString = 'Mar';
                break;
            case 4:
                monthString = 'Apr';
                break;
            case 5:
                monthString = 'May';
                break;
            case 6:
                monthString = 'Jun';
                break;
            case 7:
                monthString = 'Jul';
                break;
            case 8:
                monthString = 'Aug';
                break;
            case 9:
                monthString = 'Sep';
                break;
            case 10:
                monthString = 'Oct';
                break;
            case 11:
                monthString = 'Nov';
                break;
            case 12:
                monthString = 'Dec';
                break;
            default:
                break;
        }

        dateArr[i] = day + " " + monthString + " " + year ;

        day -= 1;

        if (day <= 0) {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                day = 31;
            }
            if (month == 4 || month == 6 || month == 9 || month == 11) {
                day = 30;
            }
            if (month == 2) {
                if (year % 4 == 0) {
                    day = 29;
                } else {
                    day = 28;
                }
            }
            month -= 1;
        }
        if (month <= 0) {
            month = 12;
            year -= 1;
        }
    }
    return dateArr;
}


async function renderProductsChart() {
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
        title: {
            text: 'Type of Products'
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

    var chart = new ApexCharts(document.querySelector("#productChart"), options);
    chart.render();
}

async function renderDepositChart() {
    var dateArr = getArrayOfDate();
    dateArr.reverse();
    var depositAmount = await getDepositAmount();
    depositAmount.reverse();
    var options = {
        series: [{
            name: 'Inflation',
            data: depositAmount
        }],
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "Đ";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },

        xaxis: {
            categories: dateArr,
            position: 'top',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            tooltip: {
                enabled: true,
            }
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "Đ";
                }
            }

        },
        title: {
            text: 'Deposit of last 10 days',
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444'
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#depositChart"), options);
    chart.render();

}

renderProductsChart();
renderDepositChart()

function reformatDate(dateStr) {
    var dArr = dateStr.split(" "); // input yyyy-MM-dd HH:mm:ss
    var dateStr = dArr[0];         // string yyyy-MM-dd
    dateArr = dateStr.split("-");
    day = dateArr[2];
    month = dateArr[1];
    year = dateArr[0];
    switch (month) {
        case 1:
            monthString = 'Jan';
            break;
        case 2:
            monthString = 'Feb';
            break;
        case 3:
            monthString = 'Mar';
            break;
        case 4:
            monthString = 'Apr';
            break;
        case 5:
            monthString = 'May';
            break;
        case 6:
            monthString = 'Jun';
            break;
        case 7:
            monthString = 'Jul';
            break;
        case 8:
            monthString = 'Aug';
            break;
        case 9:
            monthString = 'Sep';
            break;
        case 10:
            monthString = 'Oct';
            break;
        case 11:
            monthString = 'Nov';
            break;
        case 12:
            monthString = 'Dec';
            break;
        default:
            break;
    }
    return  day + " " + monthString + " " + year ;
}