/*
 * Usually this config.js file would NEVER be commited to github repo
 * @flow
*/

export default {
    showDevScreens: __DEV__,
    useFixtures: false,
    ezLogin: false,
    yellowBox: __DEV__,
    reduxLogging: __DEV__,
    includeExamples: __DEV__,
    useReactotron: __DEV__,
    // BASE_URL : "http://192.168.1.53/ci-safety/api",
    BASE_URL : 'https://www.lamoga.de/api/',
    AJAX_URL : 'https://www.lamoga.de/wp-admin/admin-ajax.php',
    ROUTE_LOGIN : 'user/generate_auth_cookie/',
    Authorization:'Basic ZGVtbzpkZW1v'
  };
