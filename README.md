# ndjson-url

Retrieve a json object from a url from a stream of ndjson coming in

## CLI Usage

    npm i ndjson-url -g

I use this as a ndjson toolbelt. It makes it easy to get a json result from a chain of pipes.

```
http 'http://somewhere:5984/gabby-contacts/_design/temp2/_view/conversations?include_docs=true' | jsonfilter 'rows.*' | ndjson-url 'http://sofa.rmcloud.com:5984/gabby-contacts/${_id}'  | jsonmap 'this._deleted = true; return this' | ndjson-to-couchdb http://sofa.rmcloud.com:5984/gabby-contacts
```    

The template url you provide can follow the template literal syntax of es6.


## Copy option

Sometimes you want to copy fields, you can add

```
cat data.ndjson | ndjson-url "http://place.com/${_id}" --copy='name,address'

```

This will copy the name and address fields from the incoming json rows in data.ndjson
 to the response from the ndjson url


## Method option

Sometimes you want to issue a delete to the url. That can be done with

```
cat data.ndjson | ndjson-url --method=delete "http://place.com/${_id}?rev=${rev}"

```




## License

MIT
