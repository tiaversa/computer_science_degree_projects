var menuButton = document.getElementById("menu");
menuButton.addEventListener("click", function() {
    if (menuButton.style.backgroundColor === 'rgb(255, 255, 255)') {
        menuButton.style.backgroundColor = '#000';
        menuButton.style.color = '#fff';
        document.getElementById("main-menu").style.display = 'table-row';
    } else {
        menuButton.style.backgroundColor = '#fff';
        menuButton.style.color = '#000';
        document.getElementById("main-menu").style.display = 'none';
    }
});
