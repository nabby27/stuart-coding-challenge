# DUBTS

I've assumed from the examples in the statement that the api couldn't break it. For that reason I have assumed certain things that I think could be changed

## Numeric id

It seems right to me that the id comes from outside the api to decouple from the infrastructure and be able to carry out strategies such as optimitic ui from the client. The question that arises is... why is the id a number? To ensure that there is no collision, it should be a unique string generated with a library such as uuid or nanoid

## HTTP GET with body

Another question I have is, why send data in the body when the http request is of type get? It could have been an optional parameter in the url. I think it is to give flexibility in case there are many parameters and thus not reach the length limit in the url.
