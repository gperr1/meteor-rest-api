
// PUBLICATIONS
Meteor.publish( 'Test', function(){
  var data = Test.find();
  if ( data ) {
    return data;
  }
  return this.ready();
});