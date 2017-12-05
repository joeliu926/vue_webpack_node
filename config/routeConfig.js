/**
 * Created by JoeLiu on 2017-10-23.
 */
function registor(app) {

    app.use(require('../security/authentication.js'));
    var requires = [
        {
            root:"/user",
            require: '../routes/users.js'
        },
        {
            root:"/customers",
            require: '../routes/customers.js'
        },
        {
            root:"/consults",
            require: '../routes/consults.js'
        },
        {
            root:"/case",
            require: '../routes/case.js'
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });

}

module.exports = registor;