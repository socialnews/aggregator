let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let Cat = mongoose.model('Cat', { name: String });

let kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) // ...
  	console.log('meow');
  else{
  	console.log('weee');
  	Cat.find(function (err, cat) {
  	  if (err) return console.error(err);
  	  console.log(cat)
  	  mongoose.disconnect();
  	})
  }


});



