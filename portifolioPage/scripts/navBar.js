navHTML = `<div id="menu" class="menu-button">&#9776;</div>
<ul id="main-menu">
    <li class="nav-item"><a href="../index.html">HOME</a></li>
    <li class="nav-item"><a href="../index.html#about">ABOUT</a></li>
    <li class="nav-item"><a href="dewritings.html">DATA ENGINEERING</br>ARTICLES</a></li>
    <li class="nav-item"><a href="../index.html#skills">SKILLS</a></li>
    <li class="nav-item"><a href="projects.html">PROJECTS</a></li>
    <li class="nav-item"><a href="books.html">BOOKS</a></li>
    <li class="nav-item"><a href="../index.html#volunteer">VOLUNTEER</br>WORK</a></li>
    <li class="nav-item"><a href="photography.html">PHOTOGRAPHY</a></li>
    <li class="nav-item"><a href="../index.html#contact">CONTACT</a></li>
    <li class="nav-item"><a href="report.html">REPORT</a></li>
</ul>`
var nav = document.getElementsByTagName("nav");
console.log(nav);
if (nav) {
    nav[0].innerHTML = navHTML;
} else {
    console.log("Nav bar doesn't work.");
}


footerHTML = `<section id="contact">
<h2 class="section-title">GET IN TOUCH</h2>
<form id="form">
    <input type="email" placeholder="Your email">
    <textarea placeholder="Your message"></textarea>
    <button type="submit">SEND</button>
</form>
</section>
<div class="social-icons">
<div class="icon" style="background-image: url('../images/smIcons/icons8-follow-100.png');"><a href="https://tiaversa.github.io/tiaversa/" class="fill-div"></a></div>
<div class="icon" style="background-image: url('../images/smIcons/icons8-facebook-100.png');"><a href="https://www.facebook.com/"  class="fill-div"></a></div>
<div class="icon"  style="background-image: url('../images/smIcons/icons8-instagram-100.png');"><a href="https://www.instagram.com/" class="fill-div"></a></div>
<div class="icon" style="background-image: url('../images/smIcons/icons8-github-100.png');"><a href="https://github.com/tiaversa" class="fill-div"></a></div>
<div class="icon" style="background-image: url('../images/smIcons/icons8-medium-100.png');"><a href="https://www.instagram.com/" class="fill-div"></a></div>
<div class="icon" style="background-image: url('../images/smIcons/icons8-tumblr-100.png');"><a href="https://www.tumblr.com/" class="fill-div"></a></div>
<div class="icon" style="background-image: url('../images/smIcons/icons8-youtube-100.png');"><a href="https://www.youtube.com/@PyLadiesBerlin" class="fill-div"></a></div>
    <br>
    <p id="recognition">Recognition of link images:
    <a target="_blank" href="https://icons8.com/icon/QOACCnLJXMkg/github">GitHub</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/9LB6bUNyP4yj/medium">Medium</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/WstlpRjF3VCm/tumblr">Tumblr</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/uZIMz8rZqfcW/youtube">YouTube</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/QU5mfsH8tIqo/facebook">Facebook</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/yc2dJ0jTSu8L/instagram">Instagram</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>,
    <a target="_blank" href="https://icons8.com/icon/Uee1q1O0scBI/follow">Follow</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a></p>
</div>`
var footer = document.getElementsByTagName("footer");
console.log(footer);
if (footer) {
    footer[0].innerHTML = footerHTML;
} else {
    console.log("footer doesn't work.");
}