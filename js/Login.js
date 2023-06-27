function goToUSerPage() {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    var isLoggedIn = true; // Thay đổi giá trị này tùy thuộc vào trạng thái đăng nhập

    // Thay đổi giao diện dựa trên trạng thái đăng nhập
    if (isLoggedIn) {
        document.getElementById('btnLogin').style.display = 'none';
        document.getElementById('navbar-user').style.display = 'block';
    } else {
        document.getElementById('btnLogin').style.display = 'block';
        document.getElementById('navbar-user').style.display = 'none';
    }
}