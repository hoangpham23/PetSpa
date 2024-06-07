// Đảm bảo DOM đã được tải trước khi thực thi JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả các service-container
    var serviceContainers = document.querySelectorAll('.service-container');

    // Duyệt qua từng service-container
    serviceContainers.forEach(function(container) {
        // Lắng nghe sự kiện khi di chuột vào
        container.addEventListener('mouseenter', function() {
            // Hiển thị feedback-div tương ứng
            this.querySelector('.feedback-div').style.display = 'block';
        });

        // Lắng nghe sự kiện khi di chuột ra
        container.addEventListener('mouseleave', function() {
            // Ẩn feedback-div khi di chuột rời khỏi
            this.querySelector('.feedback-div').style.display = 'none';
        });
    });
});
