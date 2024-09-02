var bar = document.getElementById("progress");
window.addEventListener("scroll", function() {
    var documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (window.scrollY / documentHeight) * 100;
    bar.style.width = scrollPercent + '%';
});

const sections = ['about', 'deexplain', 'skills', 'projects', 'volunteer', 'footer'];

sections.forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
        const rotation = (Math.random() * 2) - 1;
        element.style.transform = `rotate(${rotation}deg)`;
    }
});


var drawingBoard = document.getElementById("drawing-board");
drawingBoard.addEventListener("mousemove", function(event) {
    var dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + 'px';
    dot.style.top = (event.pageY - 4) + 'px';
    drawingBoard.appendChild(dot);
});

drawingBoard.addEventListener("touchmove", function(event) {
    for (var i = 0; i < event.touches.length; i++) {
        var fingers = event.touches[i];
        var dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (fingers.pageX - 4) + 'px';
        dot.style.top = (fingers.pageY - 4) + 'px';
        drawingBoard.appendChild(dot);
    }
    event.preventDefault();
}, { passive: false });

var header = document.getElementsByTagName("header");
if (header[0]) {
    header[0].addEventListener('mousemove', function(event) {
        const awesome = document.getElementById('awesome');
        if (awesome) {
            awesome.style.left = event.offsetX + 'px';
            awesome.style.top = event.offsetY + 'px';
            awesome.style.display = 'block';
        }
    });
    header[0].addEventListener('mouseleave', function() {
        const awesome = document.getElementById('awesome');
        if (awesome) {
            awesome.style.display = 'none';
        }
    });
}

var form = document.getElementById("form");
if (form) {
    form.addEventListener("focus", function(event) {
        event.target.style.backgroundColor = "pink";
    }, true);

    form.addEventListener("blur", function(event) {
        event.target.style.backgroundColor = "white";
    }, true);
}

var volunteerRequest = new XMLHttpRequest();
volunteerRequest.open('GET', 'https://raw.githubusercontent.com/tiaversa/computer_science_degree_projects/master/portifolioPage/scripts/volunteer.json');
volunteerRequest.onload = function() {
    if (volunteerRequest.status >= 200 && volunteerRequest.status < 400) {
        var volunteerData = JSON.parse(volunteerRequest.responseText);
        createVolunteerHTML(volunteerData);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
};

volunteerRequest.onerror = function() {
    console.log("Connection error");
};

volunteerRequest.send();

function createVolunteerHTML(volunteerData) {
    var rawTemplate = document.getElementById("volunteertemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(volunteerData);

    var volunteerContainer = document.getElementById("volunteerContainer");
    if (volunteerContainer) {
        volunteerContainer.innerHTML = ourGeneratedHTML;
    } else {
        console.log("Volunteer container not found.");
    }
}
