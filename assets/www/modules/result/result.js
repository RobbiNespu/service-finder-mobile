define(['jquery', 'underscore', 'backbone', 'text!modules/result/resultViewTemplate.html'],
       function ($, _, Backbone, resultViewTemplate) {
  'use strict';

  var ResultView = Backbone.View.extend({
    
    template: _.template(resultViewTemplate),
    
    update:function(categoryId){
      //set callback of the event "fetchCompleted:Result" 
      this.collection.bind('fetchCompleted:Services',this.render,this);
      this.collection.fetch(categoryId);
    },

    render: function(){
      this.$el.empty();
      //compile template using the data fetched by collection
      this.$el.append(this.template({data:this.collection.toJSON()}));
      this.trigger("renderCompleted:Services",this);
      return this;
    }
  });
  
  return ResultView;
});


