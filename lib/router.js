Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {name: 'home'});
Router.route('/apikey', {name: 'apiKey'});
Router.route('/tests', {name: 'testsList'});