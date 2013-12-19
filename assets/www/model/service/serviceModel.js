define(function(){

	var Service=Backbone.Model.extend({
    //default attributes 
		defaults:{
			serviceId:'',
			categoryId:'',
			headline:'',
			description:'',
			name:'',
			email:'',
			mobileNumber:'',
			address:'',
			postcode:'',
			wesbite:'http://google.com.my',
		}
	});

	return Service;
});

