# aggregator

## API Endpoints:
Data store of all urls being shared, includes timestamp data of which users shared it and can answer questions like
* POST /shares {provider: 'twitter', link: 'some-url', editor: 'username', shared_at: timestamp} #add share to store
* GET /article?url=some-urlencoded-url #returns time series of editor details
* GET /shares?editor=some-username #all the shares from an editor  

## Start the server:
```bash
$ npm start <port>
```

## Testing:
```bash
$ npm test
```
Use 'npm test' to run all the tests. This makes sure each test file runs sequentially. Running 'mocha' runs all the tests at once which causes issues with one test closing the db connection while another test is still running. 
