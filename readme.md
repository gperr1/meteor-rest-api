Notes
---
Easily expose your collections  : 
1. declare your collection in lib/collections.js
2. allow collection to be exposed via service adding the collection name in the list of allowed resources in settings.json
3. define validation patterns for your collection in settings.json

To get an api key
---
1. go on the webapp
2. setup authentication (should work via google auth)
3. sign in
4. go to the API KEY menu and click on the icon to generate your API key.

Further thoughts : 
- plan to move collection declaration to settings.json... one file to edit and you're set up that would be great
- plan to use it in a docker container to be able to scale easily
- plan to add an API management tool on top of it like https://getkong.org/ to manage users, logs, documentation, rate limits,...

Launch with :
---

```
meteor --settings settings.json
```


GET example :
---

```
http://localhost:3000/api/v1/Test?api_key=32514f8008f9cdc7d937cc9a03b76544&key="value"
```
POST example : 
---
```
curl -H "Content-Type: application/json" -X POST -d '{"api_key":"32514f8008f9cdc7d937cc9a03b76544", "test":"xyz","key":"value"}' http://localhost:3000/api/v1/Test
```

PUT example : 
---
```
curl -H "Content-Type: application/json" -X PUT -d '{"api_key":"32514f8008f9cdc7d937cc9a03b76544", "_id":"PZm5ZQZDzxX3Kphas","test":"maiheu"}' http://localhost:3000/api/v1/Test
```
DELETE example : 
---
```
curl -H "Content-Type: application/json" -X DELETE -d '{"api_key":"32514f8008f9cdc7d937cc9a03b76544", "_id":"PZm5ZQZDzxX3Kphas"}' http://localhost:3000/api/v1/Test
```
