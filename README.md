# ndjson-url

Retrieve a json object from a url from a stream of ndjson coming in

## CLI Usage

    npm i ndjson-url -g

I use this as a ndjson toolbelt. It makes it easy to get a json result from a chain of pipes.

```
http "http://somewhere:5984/gabby-contacts/_design/temp2/_view/conversations?include_docs=true" | jsonfilter "rows.*" --match="this.doc === null" | jsonmap "return {_id : this.id}" | ndjson-url 'http://sofa.rmcloud.com:5984/gabby-contacts/<%=_id%>'  | jsonmap "this._deleted = true; return this" | ndjson-to-couchdb http://sofa.rmcloud.com:5984/gabby-contacts
```    

the format of the url is using lodash template syntax


## Copy option

Sometimes you want to copy fields, you can add 

```
cat data.ndjson | ndjson-url "http://place.com/<%=_id%>" 
--copy="name,address"

```

## License

MIT
