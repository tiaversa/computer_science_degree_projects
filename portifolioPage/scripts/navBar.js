navHTML = `<div id="menu" class="menu-button">&#9776;</div>
<ul id="main-menu">
    <li class="nav-item"><a href="../index.html#about">ABOUT</a></li>
    <li class="nav-item"><a href="dewritings.html">DATA ENGINEERING</br>ARTICLES</a></li>
    <li class="nav-item"><a href="../index.html#skills">SKILLS</a></li>
    <li class="nav-item"><a href="projects.html">PROJECTS</a></li>
    <li class="nav-item"><a href="books.html">BOOKS</a></li>
    <li class="nav-item"><a href="../index.html#volunteer">VOLUNTEER</br>WORK</a></li>
    <li class="nav-item"><a href="photography.html">PHOTOGRAPHY</a></li>
    <li class="nav-item"><a href="../index.html#contact">CONTACT</a></li>
</ul>`
var nav = document.getElementsByTagName("nav");
console.log(nav);
if (nav) {
    nav[0].innerHTML = navHTML;
} else {
    console.log("Nav bar doesn't work.");
}