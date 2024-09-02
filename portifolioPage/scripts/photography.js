console.log('hi');
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
    console.log(photoData);
    var rawTemplate = document.getElementById("phototemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(photoData);

    var photoGrid = document.getElementById("photoGrid");
    if (photoGrid) {
        photoGrid.innerHTML = ourGeneratedHTML;
    } else {
        console.log("Volunteer container not found.");
    }
}