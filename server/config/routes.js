var appointments = require('./../controllers/appointments.js');
	module.exports = function(app){
		app.get('/appointments', function(req, res){
			appointments.show(req,res);
		})
		app.post('/addappointment', function(req, res){
			appointments.add(req,res);
		})	
		app.post('/removeappointment', function(req, res){
			appointments.remove(req.body,res);
		})	
	};