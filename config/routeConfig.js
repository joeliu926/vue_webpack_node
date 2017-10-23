/**
 * Created by JoeLiu on 2017-10-23.
 */
function registor(app) {
    console.log("router register")
    var requires = [
        '../routes/users.js'
    ];

    requires.forEach(function(item, index) {
        app.use('/', require(item));
    });

}

module.exports = registor;