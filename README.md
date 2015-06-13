# aggregator

## API Endpoints:
Data store of all urls being shared, includes timestamp data of which users shared it and can answer questions like
* POST /shares {provider: 'twitter', link: 'some-url', providerUserID: 'providerUserID', shared_at: timestamp} #add share to store
* GET /article?url=some-urlencoded-url #returns time series of user details
* GET /shares?providerUserID=some-userID #all the shares from a user  

## Start the server:
```bash
$ npm start <port>
```

## Testing:
```bash
$ npm test
```
Use 'npm test' to run all the tests. This makes sure each test file runs sequentially. Running 'mocha' runs all the tests at once which causes issues with one test closing the db connection while another test is still running. 

## Schema
``` javascript
var ShareSchema = new Schema({
	schemaVersion: String,

	providerUserID: {
		type: String,
		required: 'Must have a provider ID'
	},
	provider: {
		type: String,
		required: 'Provider must not be blank'
	},
	link: {
		type: String,
		required: 'links must not be blank'
	},
	created_at: {
		type: Date,
		required: 'created_at must not be blank'
	}

});
```
