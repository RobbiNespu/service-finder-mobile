define(function(){

	var Category=Backbone.Model.extend({
    //default attributes 
		defaults:{
			categoryId:"",
			name:''
		}
	});

	return Category;
});

