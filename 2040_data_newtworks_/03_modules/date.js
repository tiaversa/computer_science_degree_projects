exports.myDateTime = function () {
    return Date();
};

exports.tomorrow = function () {
    return Date(Date.now() + 24 * 60 * 60 * 1000);
};