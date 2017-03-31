(function() {
  var myApp;

  myApp = angular.module('ngApp', ['ui.router']);

  myApp.config(function($stateProvider, $urlRouterProvider) {

    /*
    helloState = 
      name: 'hello'
      url: '/hello'
      templateUrl: './views/book.html'
    aboutState = 
      name: 'about'
      url: '/about'
      templateUrl: "./views/contan_us.html"
    $stateProvider.state helloState
    $stateProvider.state aboutState
     */
    $urlRouterProvider.otherwise('idxmain');
    return $stateProvider.state('idxmain', {
      name: 'idxmain',
      url: '/idxmain',
      templateUrl: "./views/idxmain.html"
    }).state('about_slkLine', {
      name: 'about_slkLine',
      url: '/about_slkLine',
      templateUrl: "./views/about_slkLine.html"
    }).state('slkline_source', {
      name: 'slkline_source',
      url: '/slkline_source',
      templateUrl: "./views/slkline_source.html"
    }).state('slkline_kids', {
      name: 'slkline_kids',
      url: '/slkline_kids',
      templateUrl: "./views/slkline_kids.html"
    }).state('slkline_tools', {
      name: 'slkline_tools',
      url: '/slkline_tools',
      templateUrl: "./views/slkline_tools.html"
    }).state('slkline_effect', {
      name: 'slkline_effect',
      url: '/slkline_effect',
      templateUrl: "./views/slkline_effect.html"
    }).state('about_us', {
      name: 'about_us',
      url: '/about_us',
      templateUrl: "./views/about_us.html"
    }).state('about_linekids', {
      name: 'about_linekids',
      url: '/about_linekids',
      templateUrl: "./views/about_linekids.html"
    }).state('about_team', {
      name: 'about_team',
      url: '/about_team',
      templateUrl: "./views/about_team.html"
    }).state('contan_us', {
      name: 'contan_us',
      url: '/contan_us',
      templateUrl: "./views/contan_us.html"
    }).state('trial_course', {
      name: 'trial_course',
      url: '/trial_course',
      templateUrl: "./views/trial_course.html"
    }).state('basic_course', {
      name: 'basic_course',
      url: '/basic_course',
      templateUrl: "./views/basic_course.html"
    }).state('advance_course', {
      name: 'advance_course',
      url: '/advance_course',
      templateUrl: "./views/advance_course.html"
    }).state('coaching_course', {
      name: 'coaching_course',
      url: '/coaching_course',
      templateUrl: "./views/coaching_course.html"
    }).state('certificate_course', {
      name: 'certificate_course',
      url: '/certificate_course',
      templateUrl: "./views/certificate_course.html"
    }).state('slkline_news', {
      name: 'slkline_news',
      url: '/slkline_news',
      templateUrl: "./views/slkline_news.html"
    }).state('ablum', {
      name: 'ablum',
      url: '/ablum',
      templateUrl: "./views/ablum.html"
    }).state('qa', {
      name: 'qa',
      url: '/qa',
      templateUrl: "./views/qa.html"
    });
  });

  myApp.controller('LayoutController', function($scope, $http) {
    console.log("_.isNull(null)", _.isNull(null));
    $scope.templates = '';
    $scope.about = '';
    $http.get('./data/header.json').then(function(response) {
      return $scope.templates = response.data;
    });
    $scope.template = {
      'url': './views/idxmain.html'
    };
    $scope.templateLayout = function(tpldata) {
      $scope.template = tpldata;
      return console.log('tpldata', $scope.template);
    };
    $http.get('./data/aboutus.json').then(function(response) {
      var i, j, len, obj, ref;
      obj = [];
      ref = response.data.teams;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i.name !== '') {
          obj.push(i);
        }
      }
      return $scope.about = obj;
    });
    return $scope.footerLayout = function() {
      return 'footer.html';
    };
  });

}).call(this);
