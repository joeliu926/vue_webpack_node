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
        },{
            root:"/caseheader",
            require: '../routes/caseHeader.js'
        },{
            root:"/source",
            require: '../routes/source.js'
        },{
            root:"/event",
            require: '../routes/event.js'
        },{
            root:"/clue",
            require: '../routes/clue.js'
        },{
            root:"/admin/userrole",
            require: '../routes/admin/user_role.js'

        },{
            root:"/admin/clinic",
            require: '../routes/admin/clinic.js'
        }
        ,{
            root:"/admin/doctor",
            require: '../routes/admin/doctor.js'
        },
        {
            root:"/admin/product",
            require: '../routes/admin/product.js'
        },{
            root:"/admin/backcase",
            require: '../routes/admin/backcase.js'
        },{
            root:"/admin/common",
            require: '../routes/admin/common.js'
        },{
            root:"/admin/postercategory",
            require: '../routes/admin/postercategory.js'
        },{
            root:"/admin/posterinfo",
            require: '../routes/admin/posterinfo.js'
        },{
            root:"/admin/posterformat",
            require: '../routes/admin/posterformat.js'
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });

}

module.exports = registor;
