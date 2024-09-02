var photoRequest = new XMLHttpRequest();
photoRequest.open('GET', 'https://raw.githubusercontent.com/tiaversa/computer_science_degree_projects/master/portifolioPage/scripts/photography.json');
photoRequest.onload = function() {
    if (photoRequest.status >= 200 && photoRequest.status < 400) {
        var photoData = JSON.parse(photoRequest.responseText);
        createPhotoHTML(photoData);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
};

photoRequest.onerror = function() {
    console.log("Connection error");
};

photoRequest.send();

function createPhotoHTML(photoData) {
    var rawTemplate = document.getElementById("phototemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(photoData);

    var photoGrid = document.getElementById("photoGrid");
    if (photoGrid) {
        photoGrid.innerHTML = ourGeneratedHTML;

        var overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        document.querySelectorAll('.photo-item').forEach(function(item) {
            item.addEventListener('mouseover', function() {
                overlay.classList.add('active');
            });
            item.addEventListener('mouseout', function() {
                overlay.classList.remove('active');
            });
        });
    } else {
        console.log("Photo grid container not found.");
    }
};


