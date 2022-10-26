# API

All endpoints are in `restClient` folder. They can be run with the vscode extension `REST Client`. Make sure to run the app with the correct env variables, for this you can use the command `make start/local`.

## Create a courier

To create a courier, you must send its identifier (numerical and unique) and the maximum capacity it can carry (numerical and in liters).

```http
POST http://localhost:3000/couriers HTTP/2.0
content-type: application/json

{
    "id": 123,
    "max_capacity": 45
}
```

## Delete a courier

To delete a courier, you must send your identifier on the url. You will not be able to delete the courier if he has packages to deliver.

```http
DELETE http://localhost:3000/couriers/123 HTTP/2.0
content-type: application/json
```

## Update a courier

To update a courier, you must send your identifier on the url and the maximum capacity on the body. You will not be able to update the courier if he has packages to deliver.

```http
PUT http://localhost:3000/couriers/123 HTTP/2.0
content-type: application/json

{
    "maximumCapacity": 50
}
```

## Lookup couriers

This endpoint search couriers with available space. you will only need to send the required capacity in the body. 

```http
GET http://localhost:3000/couriers/lookup HTTP/2.0
content-type: application/json

{
    "capacity_required": 15
}
```

## Update available capacity of a courier

This endpoint allows updating the available space of a courier when making a delivery or picking up a package. It will return some error if the maximum capacity is exceeded or if its available capacity is greater than its maximum capacity. 

```http
GET http://localhost:3000/couriers/lookup HTTP/2.0
content-type: application/json

{
    "capacity_required": 15
}
```
