const sections = ['about', 'deexplain', 'skills', 'projects', 'volunteer', 'footer'];

sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
        const rotation = (Math.random() * 2) - 1;
        element.style.transform = `rotate(${rotation}deg)`;
    }
});

var bar = document.getElementById("progress");
window.addEventListener("scroll", function() {
    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (window.scrollY / documentHeight) * 100;
    bar.style.width = (window.scrollY / documentHeight) * 100 + '%';
});

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

var drawingBoard = document.getElementById("drawing-board");
drawingBoard.addEventListener("mousemove", function(event){
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + 'px';
    dot.style.top = (event.pageY - 4) + 'px';
    drawingBoard.appendChild(dot);
});

drawingBoard.addEventListener("touchmove", function(event){
    for (var i = 0; i < event.touches.length; i++){
        var fingers = event.touches[i];
        var dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (fingers.pageX - 4) + 'px';
        dot.style.top = (fingers.pageY - 4) + 'px';
        drawingBoard.appendChild(dot);
    }
    event.preventDefault();
}, {passive: false});


var header = document.getElementsByTagName("header");
header[0].addEventListener('mousemove', function(event){
    document.getElementById('awesome').style.left = event.offsetX + 'px';
    document.getElementById('awesome').style.top = event.offsetY + 'px';
    document.getElementById('awesome').style.display = 'block';
});
header[0].addEventListener('mouseleave', function(){
    document.getElementById('awesome').style.display = 'none';
});

var form = document.getElementById("form");
form.addEventListener("focus", function(event){
    event.target.style.backgroundColor = "pink";
}, true);

form.addEventListener("blur", function(event){
    event.target.style.backgroundColor = "white";
}, true);

console.log('hi');
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://raw.githubusercontent.com/tiaversa/computer_science_degree_projects/master/.vscode/tasks.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    // This is where we'll do something with the retrieved data
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function createHTML(data) {
    console.log(data);
}