function loadAdminPage() {
    getTotalStudents();
    getTotalDeposits();
    getTotalProductPosting();
    getTotalOrders();
    renderProductsChart();
    renderDepositChart();
    renderProductLocationChart();
}
loadAdminPage();

async function getTotalStudents() {
    const response = await axios.get('http://localhost:8080/Account/listAccount');
    students = response.data;
    var totalStudents = 0;
    for (const student of students) {
        if (student.role == ("Student")) {
            totalStudents += 1;
        }
    }
    document.getElementById("totalStudents").innerHTML = totalStudents;
}

async function getTotalDeposits() {
    const response = await axios.get('http://localhost:8080/transaction/getListTransaction');
    transactions = response.data;
    var totalDeposits = 0;
    for (const transaction of transactions) {
        if (transaction.status === "nạp tiền") {
            totalDeposits += transaction.amount * 1000;
        }
    };
    document.getElementById("totalDeposits").innerHTML = totalDeposits;
}

async function getTotalProductPosting() {
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    products = response.data;
    var totalProductPosting = 0;
    for (const product of products) {
        totalProductPosting += 1;
    }
    document.getElementById("totalProductPosting").innerHTML = totalProductPosting;
}

async function getTotalOrders(){
    const response = await axios.get('http://localhost:8080/order/getListOrder');
    orders = response.data;
    var totalOrders = 0;
    for (const order of orders) {
        totalOrders += 1;
    }
    document.getElementById("totalOrders").innerHTML = totalOrders;
}

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

async function getTotalProductsSellAt() {
    const response = await axios.get('http://localhost:8080/product/getListProduct');
    products = response.data;
    var totalProductsSellAt = [2];
    var i = 0;
    for (i = 0; i < 2; i++) {   // Gán giá trị 0 vào tất cả vị trí trong array
        totalProductsSellAt[i] = 0;
    }
    for (const product of products) {
        for (i = 0; i < 2; i++) {
            if (product.sellcampusid === 1) {
                totalProductsSellAt[0] += 1;
            }
            if (product.sellcampusid === 2) {
                totalProductsSellAt[1] += 1;
            }
        }
    }
    return totalProductsSellAt;
}

async function getTotalProductsBuyAt() {
    const response = await axios.get('http://localhost:8080/order/getListOrder');
    orders = response.data;
    var totalProductsBuyAt = [2];
    var i = 0;
    for (i = 0; i < 2; i++) {   // Gán giá trị 0 vào tất cả vị trí trong array
        totalProductsBuyAt[i] = 0;
    }
    for (const order of orders) {
        for (i = 0; i < 2; i++) {
            if (order.buycampusid === 1) {
                totalProductsBuyAt[0] += 1;
            }
            if (order.buycampusid === 2) {
                totalProductsBuyAt[1] += 1;
            }
        }
    }
    return totalProductsBuyAt;
}

async function getDepositAmount() {
    const response = await axios.get('http://localhost:8080/transaction/getListTransaction');
    transactions = response.data;
    console.log(transactions);
    var dateArr = getArrayOfDate();
    var totalDepositAmount = [];
    var i = 0;
    for (i = 0; i < dateArr.length; i++) {   // Gán giá trị 0 vào tất cả vị trí trong array
        totalDepositAmount[i] = 0;
    }
    for (const transaction of transactions) {
        if (transaction.status === "nạp tiền" && transaction.transaction_datetime != null) {
            for (i = 0; i < dateArr.length; i++) {
                if (reformatDate(transaction.transaction_datetime) == dateArr[i]) {
                    amount = transaction.amount * 1000;
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

        dateArr[i] = day + " " + monthString + " " + year;

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
            height: 350,
        },
        stroke: {
            colors: ['#fff']
        },
        title: {
            text: 'Số lượng sản phẩm theo phân loại',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
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
            name: 'Tiền nạp vào hệ thống',
            data: depositAmount
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: dateArr,
        },
        title: {
            text: 'Số tiền nạp vào hệ thống gần đây',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        fill: {
            opacity: 1
        }
    };

    var chart = new ApexCharts(document.querySelector("#productLocationChart"), options);
    chart.render();
}

async function renderProductLocationChart() {
    var totalProductsSellAt = await getTotalProductsSellAt();
    var totalProductsBuyAt = await getTotalProductsBuyAt();
    campus = ["Xavalo", "NVH Sinh viên"];
    var options = {
        series: [{
            name: 'Sản phẩm được mua',
            data: totalProductsBuyAt
        }, {
            name: 'Sản phẩm được bán',
            data: totalProductsSellAt
        }],
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: campus,
        },
        title: {
            text: 'Số lượng sản phẩm được mua và bán',
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                fontFamily: undefined,
                color: '#263238'
            },
        },
        fill: {
            opacity: 1
        }
    };

    var chart = new ApexCharts(document.querySelector("#productLocationChart"), options);
    chart.render();
}

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
    return day + " " + monthString + " " + year;
}