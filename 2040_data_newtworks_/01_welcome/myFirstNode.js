const course = {
    name: 'Databases, Networks, and the Web',
    platform: 'Coursera',
    category: 'Computer Science'
};

function printCourseInformation(course) {
    let output = `${course.name} is a course from ${course.platform} in the ${course.category} category.`;
    console.log(output);

    let output2 = '';
    for (key in course) {
        output2 += `${key}: ${course[key]}\n`;
    }
    console.log(output2);
};

printCourseInformation(course);