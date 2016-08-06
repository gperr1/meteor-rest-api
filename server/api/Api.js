API = {
  
  authentication: function( apiKey ) {
    var getUser = APIKeys.findOne( { "key": apiKey }, { fields: { "owner": 1 } } );
    if ( getUser ) {
      return getUser.owner;
    } else {
      return false;
    }
  },

  connection: function( request ) {
    var getRequestContents = API.utility.getRequestContents( request ),
        apiKey             = getRequestContents.api_key,
        validUser          = API.authentication( apiKey );

    if ( validUser ) {
      delete getRequestContents.api_key;
      return { owner: validUser, data: getRequestContents };
    } else {
      return { error: 401, message: "Invalid API key." };
    }
  },
  
  handleRequest: function( context, resource, method ) {

    // using settings.json 
    if (Meteor.settings.private.api.allowed_resources.indexOf(resource) < 0) {
      console.log('[handleRequest] not an allowed resource');
      API.utility.response(context, 404, {
        error: 404,
        message: "Resource does not exist"
      });
      return;
    }

    var connection = API.connection( context.request );
    if ( !connection.error ) {
      API.methods[ method ](resource, context, connection );
    } else {
      API.utility.response( context, 401, connection );
    }
  },

  methods: {
    GET: function( resource, context, connection ) {

      var hasQuery = API.utility.hasData( connection.data );

      if ( hasQuery ) {
        connection.data.owner = connection.owner;
        var records = eval(resource).find(connection.data).fetch();

        if ( records.length > 0 ) {
          API.utility.response( context, 200, records );
        } else {
          API.utility.response( context, 404, { error: 404, message: "No record found, sorry." } );
        }
      } else {
        var records = eval(resource).find( { "owner": connection.owner } ).fetch();
        API.utility.response( context, 200, records );
      }
    },

    POST: function( resource, context, connection ) {
      var hasData   = API.utility.hasData( connection.data );
      
      // evaluating the configured pattern to match resource schema
      eval('var pattern='+Meteor.settings.private[resource].POSTValidationPattern);
      // validating sent data over pattern
      var validData = API.utility.validate( connection.data, pattern);

      if ( hasData && validData ) {
        connection.data.owner = connection.owner;
        connection.data.createdAt = new Date();
        var record = eval(resource).insert( connection.data );
        API.utility.response( context, 200, { "_id": record, "message": ""+resource+" successfully created!" } );
      } else {
        API.utility.response( context, 403, { error: 403, message: "POST calls must have arguments passed in the request body in the correct formats." } );
      }
    },

    PUT: function(resource, context, connection) {
      var hasQuery  = API.utility.hasData( connection.data );

      patterns = Meteor.settings.private[resource].PUTValidationPatterns;

      var validationPattern = "Match.OneOf(";
      
      patterns.forEach(function(pattern) {
                    validationPattern+=pattern+",";
                });

      // remove trailing comma + end function.
      validationPattern = validationPattern.replace(/,+$/, "")+")";
      
      var validData = API.utility.validate(connection.data, eval(validationPattern)); //API.utility.validate(connection.data, pattern);
      
      if ( hasQuery && validData ) {
        var recordId = connection.data._id;
        delete connection.data._id;

        var getRecord = eval(resource).findOne( { "_id": recordId }, { fields: { "_id": 1 } } );

        if ( getRecord ) {
          eval(resource).update( { "_id": recordId }, { $set: connection.data } );
          API.utility.response( context, 200, { "message": ""+resource+" successfully updated!" } );
        } else {
          API.utility.response( context, 404, { "message": "Can't update a non-existent "+resource+"." } );
        }
      } else {
        API.utility.response( context, 403, { error: 403, message: "PUT calls must have a "+resource+" ID and at least one property in the request body in the correct formats." } );
      }
    },

    DELETE: function( resource, context, connection ) {
      var hasQuery  = API.utility.hasData( connection.data ),
          validData = API.utility.validate( connection.data, { "_id": String } );

      if ( hasQuery && validData ) {
        var recordId  = connection.data._id;
        var getRecord = eval(resource).findOne( { "_id": recordId }, { fields: { "_id": 1 } } );

        if ( getRecord ) {
          eval(resource).remove( { "_id": recordId } );
          API.utility.response( context, 200, { "message": " "+resource+" removed!" } );
        } else {
          API.utility.response( context, 404, { "message": "Can't delete a non-existent "+resource+"." } );
        }
      } else {
        API.utility.response( context, 403, { error: 403, message: "DELETE calls must have an _id (and only an _id) in the request body in the correct format (String)." } );
      }
    }
  },
  resources: {},
  utility: {
    
    getRequestContents: function( request ) {
      switch( request.method ) {
        case "GET":
          return request.query;
        case "POST":
        case "PUT":
        case "DELETE":
          return request.body;
      }
    },
    
    hasData: function( data ) {
      return Object.keys( data ).length > 0 ? true : false;
    },
    
    response: function( context, statusCode, data ) {
      context.response.setHeader( 'Content-Type', 'application/json' );
      context.response.statusCode = statusCode;
      context.response.end( JSON.stringify( data ) );
    },

    validate: function( data, pattern ) {
      return Match.test( data, pattern );
    },
  }
};
