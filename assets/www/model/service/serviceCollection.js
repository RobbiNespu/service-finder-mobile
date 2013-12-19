define(['jquery', 'underscore', 'backbone','model/service/serviceModel'],
       function ($, _, Backbone,Service){

        var Services=Backbone.Collection.extend({

          // Service is the model of the collection
          model:Service,

          //and then dispatch customized event "fetchCompleted:Services"
          fetch:function(categoryId){
            var self=this;
            var tmpItem;
            //fetch the data using ajax
            var jqxhr = $.getJSON("http://api.revivalx.com/service-finder-web/server.php/api/service?categoryId="+categoryId)
              .success(function(data, status, xhr) { 
                $.each(data.services, function(i,item){
                  //create service for each item and then insert into the collection
                  tmpItem=new Service({
					  serviceId:item.serviceId,
					  categoryId:categoryId,
					  headline:item.headline
				});
                  self.add(tmpItem);
                });
                //dispatch customized event
                self.trigger("fetchCompleted:Services");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
					
              });
          }
  });

  return Services;
});


