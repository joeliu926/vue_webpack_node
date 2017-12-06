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

            root:"/case_base",
            require: '../routes/case_base.js'
        },
        {
            root:"/triage",
            require: '../routes/triage.js'
        },{
            root:"/faceDiagnose",//faceDiagnose
            require: '../routes/faceDiagnose.js'

        },{
            root:"/product",
            require: '../routes/product.js'
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });

}

module.exports = registor;
