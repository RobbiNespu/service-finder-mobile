define(['jquery', 'underscore', 'backbone','model/service/serviceModel'],
       function ($, _, Backbone,Service){

        var ServiceDetails=Backbone.Collection.extend({

          // Service detail is the model of the collection
          model:Service,

          //and then dispatch customized event "fetchCompleted:ServiceDetail"
          fetch:function(serviceId){
            var self=this;
            var tmpItem;
            //fetch the data using ajax
            var jqxhr = $.getJSON("http://api.revivalx.com/service-finder-web/server.php/api/service?serviceId="+serviceId)
              .success(function(data, status, xhr) { 
			  $.each(data.services, function(i,item){
                  //create serviceDetail for each item and then insert into the collection
                  tmpItem=new Service({
					  serviceId:item.serviceId,
					  categoryId:item.categoryId,
					  headline:item.headline,
					  description:item.description,
					  name:item.name,
					  email:item.email,
					  mobileNumber:item.mobileNumber,
					  address:item.address,
					  postcode:item.postcode,
					  website:item.website
					  });
				  console.log(data);
                  self.add(tmpItem);
              });
                //dispatch customized event
                self.trigger("fetchCompleted:ServiceDetails");
              })
              .error(function() { alert("error"); })
              .complete(function() {
                    console.log("fetch complete + " + this);
					
              });
          }
  });

  return ServiceDetails;
});


