/**
 * Created by JoeLiu on 2017-10-23.
 */
function registor(app) {
    console.log("router register")
    var requires = [
        {
            root:"/user",
            require: '../routes/users.js'
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });

}

module.exports = registor;