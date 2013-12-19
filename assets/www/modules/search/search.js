define(['jquery', 'underscore', 'backbone', 'text!modules/search/searchViewTemplate.html'], function($, _, Backbone, searchViewTemplate) {
    'use strict';
    var SearchView = Backbone.View.extend({
        template: _.template(searchViewTemplate),
        events: {
            "click #searchButton": "searchs",
        },
        searchs: function(event) {
            event.preventDefault();
            if ($("#categoryId").val() != '--Please select--') {
                sessionStorage.categoryId = $("#categoryId").val();
                window.location.replace("#result/" + sessionStorage.categoryId);
            } else {
                alert("Please select category");
            }
            return false;
        },
        update: function() {
            //set callback of the event "fetchCompleted:Service" 
            this.collection.bind('fetchCompleted:Categories', this.render, this);
            this.collection.fetch();
        },
        render: function() {
            this.$el.empty();
            //compile template using the data fetched by collection
            this.$el.append(this.template({
                data: this.collection.toJSON()
            }));
            this.trigger("renderCompleted:Categories", this);
            console.log(this.collection.toJSON());
            return this;
        }
    });
    return SearchView;
});