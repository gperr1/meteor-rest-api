Accounts.createUser({email: user.email, password: user.password}, function( error ){
  if(error){
    Bert.alert(error.reason, 'danger');
  } else {
    var userId = Meteor.userId();
    Bert.alert('Welcome!', 'success');
    Meteor.call( "initApiKey", userId );
  }
});
