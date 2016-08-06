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
