define(['jquery', 'underscore', 'backbone', 'text!modules/detail/serviceDetailViewTemplate.html'],
       function ($, _, Backbone, serviceDetailViewTemplate) {
  'use strict';

  var ServiceDetailView = Backbone.View.extend({
    
    template: _.template(serviceDetailViewTemplate),
    
    update:function(serviceId){
      //set callback of the event "fetchCompleted:ServiceDetail" 
      this.collection.bind('fetchCompleted:ServiceDetails',this.render,this);
      this.collection.fetch(serviceId);
    },

    render: function(){
      this.$el.empty();
      //compile template using the data fetched by collection
      this.$el.append(this.template({data:this.collection.toJSON()}));
      this.trigger("renderCompleted:ServiceDetails",this);
      return this;
    }
  });
  
  return ServiceDetailView;
});


