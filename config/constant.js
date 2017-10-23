/**
 * Created by JoeLiux on 2017-10-23.
 */
module.exports = {
    remoteHost:'http://127.0.0.1',
    remotePort:'8080',
    cookie: {
        identityKey:"rky_mc_web_node",
        maxAge: 12 * 60 * 60 * 1000//24 * 60 * 60 * 1000
    },
    contentType: {
        'formData': 'multipart/form-data',
        'formUrlencoded': 'application/x-www-form-urlencoded',
        'applicationJson': 'application/json'
    },
    page: {
        //主页
        main: '/',
        //登录页
        login: '/#login',
        //欢迎页
        welcome: '/#webcome'
    },
    session: {
        /**caas登录用户ID*/
        userId: '__USER_ID__',
        /**登录用户名称*/
        userName: '__USER_NAME__',
        /**登录时间 */
        loginTime: '__LOGIN_TIME__',
        /**登录次数*/
        loginCount: '__LOGIN_COUNT__',
        accessInfo: '__AUTH_INFO__',
        /**ipa 用户信息  */
        ipaUserInfo: '__IPA_USER_INFO__',
        xAuthToken: '__X_AUTH_TOKEN__',
        resourceCode: '__RESOURCE_CODE__'
    },
    //白名单
    sessionWhiteList: [

    ],
    accessWhiteList: [

    ],
    //访问权限数组 (维护判断也在使用)
    accessArr: [
    ],
    //回数code
    code: {
        err: 8000,
        loginErr: 8001,
        sessionOut: 8002,
        accessErr: 8003,
        userInfoErr:8004,
        authErr:8005,
        chorusRoleErr:8006,
        dataErr:8100,
        //维护中
        operationStatus:8200
    }
};
