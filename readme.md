Launch with :
---

```
meteor --settings settings.json
```


get example :
---

```
http://localhost:3000/api/v1/Test?api_key=32514f8008f9cdc7d937cc9a03b76544
```
post example : 
---
```
curl -H "Content-Type: application/json" -X POST -d '{"api_key":"32514f8008f9cdc7d937cc9a03b76544", "test":"xyz","roger":"estUnAbruti"}' http://localhost:3000/api/v1/Test
```

post example : 
---
```
curl -H "Content-Type: application/json" -X PUT -d '{"api_key":"32514f8008f9cdc7d937cc9a03b76544", "_id":"PZm5ZQZDzxX3Kphas","test":"maiheu"}' http://localhost:3000/api/v1/Test
```
