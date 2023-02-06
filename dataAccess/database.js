var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

module.exports = function(){
	if(mongoose.connection.readyState == 0){
		// Get these from config
		var uri = 'mongodb://127.0.0.1:27017/coursesDemo';
		var options = {
			db: { native_parser: true },
			server: { poolSize: 5 },
			replset: { rs_name: 'myReplicaSetName' },
			user: 'myUserName',
			pass: 'myPassword'
		}

		//mongoose.connect(uri, options);
		mongoose.connect(uri);
	}
	return mongoose;
};
