Template.apiKey.onCreated(function(){
  this.subscribe( "APIKeys" );
});

Template.apiKey.helpers({
  apiKey: function() {
    
    var apiKey = APIKeys.findOne({ "owner": Meteor.userId() });
    console.log(apiKey);
    if ( apiKey ) {
      return apiKey;
    }
  }
});

Template.apiKey.events({
  'click .regenerate-api-key': function( ){
     var userId              = Meteor.userId(),
         confirmRegeneration = confirm( "Are you sure? This will invalidate your current key!" );

     if ( confirmRegeneration ) {
       Meteor.call( "regenerateApiKey", userId, function( error, response ) {
         if ( error ) {
           Bert.alert( error.reason, "danger" );
         } else {
           Bert.alert( "All done! You have a new API key.", "success" );
         }
       });
     }
  }
});

