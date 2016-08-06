// PUBLICATIONS
Meteor.publish('APIKeys', function() {
    return APIKeys.find({
      "owner": this.userId
    });

});

// METHODS
Meteor.methods({
  initApiKey: function( userId ) {
    check( userId, Match.OneOf( Meteor.userId(), String ) );

    var newKey = Random.hexString( 32 );

    try {
       var key = APIKeys.insert({
        "owner": userId,
        "key": newKey
       });
       return key;
    } catch( exception ) {
      return exception;
    }
  }, 

  regenerateApiKey: function( userId ){
    check( userId, Meteor.userId() );

    var newKey = Random.hexString( 32 );

    // if Api key doesn't exist we create it
    if(!APIKeys.findOne({ "owner": userId }))
    {
      return Meteor.call( "initApiKey", userId);      
    }

    try {

      var keyId = APIKeys.update( { "owner": userId }, {
        $set: {
          "key": newKey
        }
      });
      return keyId;
    } catch(exception) {
      return exception;
    }
  },
  
});
