let mongoose = require('mongoose');
// var timestamps = require('mongoose-timestamp');
let BBPromise = require('bluebird');

let Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

let ShareSchema = new Schema({
	schemaVersion: String,

	editor: {
		type: String,
		required: 'Editors must have a name'
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
		type: String,
		required: 'created_at must not be blank'
	},

})


let Share = mongoose.model('Share', ShareSchema);

let share = new Share({ name: 'Zildjian' });
share.save(function (err) {
  if (err){} // ...

  else{
  	Share.find(function (err, share) {
  	  if (err) return console.error(err);
  	  console.log(share)
  	  mongoose.disconnect();
  	})
  }
});

let Share = mongoose.model('Share');
BBPromise.promisifyAll(Share);
BBPromise.promisifyAll(Share.prototype);
exports.name = 'Share';
exports.model = Share;


