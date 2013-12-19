define(['jquery', 'underscore', 'backbone','modules/main/main',
            'model/service/serviceCollection',
			'model/category/categoryCollection',
			'model/service/serviceDetailCollection',
			'modules/nearby/nearby',
			'modules/search/search',
            'modules/result/result','modules/map/map',
			'modules/detail/serviceDetail',
			'modules/about/about',       
            'jqm'], 
	function($, _, Backbone,MainView,ServiceCollection,CategoryCollection,ServiceDetailCollection,NearbyView, SearchView,ResultView,MapView,ServiceDetailView,AboutView) {

    'use strict';
    var Router = Backbone.Router.extend({
    //define routes and mapping route to the function
        routes: {
        	'':    'showMain',           //home view
        	'main': 'showMain', 		 //home view as well
			'nearby': 'showNearby',
			'search': 'showSearch',
            'result/:categoryId' : 'showResult',
			'map': 'showMap',
			'detail/:serviceId' : 'showDetail',
			'about': 'showAbout',
            '*actions': 'defaultAction' //default action,mapping "/#anything"       	
        },

	    defaultAction: function(actions){
	    	this.showMain();
			
	    },

	    showMain:function(actions){
	    	var mainView=new MainView();
	    	mainView.render();
	    	this.changePage(mainView);
	    },

        init:true,
		
		showNearby:function(actions){
	    	var nearbyView=new NearbyView();
	    	nearbyView.render();
	    	this.changePage(nearbyView);
	    },
		
		showSearch:function(actions){
            //create a collection
            var categories=new CategoryCollection();
            //create book list view and pass bookList as the collection of the view
            var searchView=new SearchView({collection:categories});
            //need to pass this as context 
            searchView.bind('renderCompleted:Categories',this.changePage,this);
			//update view
            searchView.update();
        },
		
        showResult:function(categoryId){
            //create a collection
            var services=new ServiceCollection();
            //create book list view and pass bookList as the collection of the view
            var resultView=new ResultView({collection:services});
            //need to pass this as context 
            resultView.bind('renderCompleted:Services',this.changePage,this);
            //update view
            resultView.update(categoryId);
        },
		
		showMap:function(actions){
	    	var mapView=new MapView();
	    	mapView.render();
	    	this.changePage(mapView);
	    },
		
		showDetail:function(serviceId){
            //create a collection
            var serviceDetails=new ServiceDetailCollection();
            //create book list view and pass bookList as the collection of the view
            var serviceDetailView=new ServiceDetailView({collection:serviceDetails});
            //need to pass this as context 
            serviceDetailView.bind('renderCompleted:ServiceDetails',this.changePage,this);
            //update view
            serviceDetailView.update(serviceId);
        },
		
		showAbout:function(actions){
	    	var aboutView=new AboutView();
	    	aboutView.render();
	    	this.changePage(aboutView);
	    },

        //1. changePage will insert view into DOM and then call changePage to enhance and transition
        //2. for the first page, jQuery mobile will present and enhance automatically
        //3. for the other page, we will call $.mobile.changePage() to enhance page and make transition
        //4. argument 'view' is passed from event trigger
        changePage:function (view) {
        	//add the attribute 'data-role="page" ' for each view's div
    		view.$el.attr('data-role', 'page');   
            //append to dom
        	$('body').append(view.$el);  

            if(!this.init){   
                $.mobile.changePage($(view.el), {changeHash:false});
            }else{   
                this.init = false;
            }            
    	}       

    });

    return Router;
});




