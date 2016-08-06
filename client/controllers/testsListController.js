Template.testsList.onCreated(function(){
  this.subscribe( "Test" );
});

Template.testsList.helpers({
  tests: function() {
    var test = Test.find();

    if ( test ) {
      return test;
    }
  }
});
