// Karma configuration
// Generated on Mon Jan 23 2017 18:51:51 GMT+0100 (Central Europe Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'assets/js/modernizr-2.6.2.min.js',
        'assets/js/angular/angular.js',
         'assets/js/angular-ui-router/release/angular-ui-router.js',
        'assets/js/angular-scroll/angular-scroll.js',
        'assets/js/angular-scroll-animate/dist/angular-scroll-animate.js',
         'assets/js/angular-bootstrap/ui-bootstrap.js',
        'assets/js/angular-bootstrap/ui-bootstrap-tpls.js',
        'assets/js/angular-animate/angular-animate.js',
        'assets/js/lodash/lodash.js',
        'assets/js/restangular/src/restangular.js',
        'assets/js/angularjs-datepicker/src/js/angular-datepicker.js',
        'assets/js/angular-translate/angular-translate.js',
        'assets/js/angular-sanitize/angular-sanitize.js',
        'assets/js/angular-fancy-modal/dist/angular-fancy-modal.js',
        'assets/js/angular-local-storage/dist/angular-local-storage.js',
        'assets/js/angular-cryptography/mdo-angular-cryptography.js',
        'assets/js/jquery-1.11.0.min.js',
        'assets/js/bootstrap.min.js',
        'assets/js/waypoints.min.js',
        'assets/js/owl.carousel.min.js',
        'assets/js/jquery.scrollTo.min.js',
        'assets/js/front.js',
        'assets/js/angular-mocks/angular-mocks.js',
        'app/app.module.js',
'app/components/core/core.module.js',
'app/components/core/core.route.js',
'app/components/core/core.init.js',
'app/components/core/core.controller.js',
'app/components/core/comment-modal/comment-modal.module.js',
'app/components/core/comment-modal/comment-modal.controller.js',
'app/components/core/comment-modal/comment-modal.factory.js',
 'app/components/insurance/insurance.module.js',
'app/components/insurance/insurance.controller.js',
'app/components/insurance/insurance.route.js',
'app/components/insurance/insurance.service.js',
//'app/components/insurance/insurance.service.spec.js',
//'app/components/insurance/insurance.controller.spec.js',
'app/components/insurance/user-modal/user-modal.module.js',
'app/components/insurance/user-modal/user-modal.factory.js',
//'app/components/insurance/user-modal/user-modal.factory.spec.js',
'app/components/insurance/user-modal/user-modal.controller.js',
//'app/components/insurance/user-modal/user-modal.controller.spec.js',
'app/components/insurance/user-modal/user-modal.service.js',
'app/components/insurance/home-modal/home-modal.module.js',
'app/components/insurance/home-modal/home-modal.factory.js',
'app/components/insurance/home-modal/home-modal.controller.js',
'app/components/insurance/home-modal/home-modal.controller.spec.js',
'app/components/insurance/home-modal/home-modal.service.js',
'app/components/insurance/vehicle-modal/vehicle-modal.module.js',
'app/components/insurance/vehicle-modal/vehicle-modal.factory.js',
'app/components/insurance/vehicle-modal/vehicle-modal.controller.js',
//'app/components/insurance/vehicle-modal/vehicle-modal.controller.spec.js',
'app/components/insurance/vehicle-modal/vehicle-modal.service.js',
'app/components/insurance/total-price/total-price.module.js',
'app/components/insurance/total-price/total-price.controller.js',
//'app/components/insurance/total-price/total-price.controller.spec.js',
'app/components/insurance/insurance-users/insurance-users.module.js',
'app/components/insurance/insurance-users/insurance-users.controller.js',
'app/components/insurance/insurance-users/insurance-users.controller.spec.js',
'app/components/insurance/payment-response/payment-response.module.js',
'app/components/insurance/payment-response/payment-response.controller.js',
'app/components/insurance/payment/payment.module.js',
'app/components/insurance/payment/payment.controller.js',
'app/components/insurance/payment/payment.controller.spec.js',
'app/shared/i18n/i18n.module.js',
'app/shared/i18n/i18n.config.js',
'app/shared/paypal/paypal-button.directive.js',
//'app/shared/paypal/paypal-button.directive.spec.js',
'app/shared/progress-bar/progress-bar.directive.js',
//'app/shared/progress-bar/progress-bar.directive.spec.js',
'app/shared/progress-bar/progress-bar.service.js',
//'app/shared/progress-bar/progress-bar.service.spec.js',
'app/shared/tests/mock-generator.service.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],
    specReporter: {
        maxLogLines: 5,         // limit number of lines logged per test 
        suppressErrorSummary: true,  // do not print error summary 
        suppressFailed: false,  // do not print information about failed tests 
        suppressPassed: false,  // do not print information about passed tests 
        suppressSkipped: false,  // do not print information about skipped tests 
        showSpecTiming: true // print the time elapsed for each spec 
      },
      plugins: [ "karma-chrome-launcher","karma-jasmine","karma-spec-reporter"],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
