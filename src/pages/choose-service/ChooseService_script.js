document.querySelectorAll('.service_img img').forEach(img => {
    img.addEventListener('click', function() {
        const checkbox = this.closest('.service_container').querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    });
});
