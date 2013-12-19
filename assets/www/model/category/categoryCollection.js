define(['jquery', 'underscore', 'backbone', 'model/category/categoryModel'], function($, _, Backbone, Category) {
    var Categories = Backbone.Collection.extend({
        // Category is the model of the collection
        model: Category,
        //and then dispatch customized event "fetchCompleted:Categories"
        fetch: function() {
            var self = this;
            var tmpItem;
            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: "http://api.revivalx.com/service-finder-web/get_all_categories.php",
                dataType: "json",
                //data: formToJSON(),
                success: function(data, status, xhr) {
                    $.each(data.categories, function(i, item) {
                        //create category for each item and then insert into the collection
                        tmpItem = new Category({
                            categoryId: item.categoryId,
                            name: item.name
                        });
                        self.add(tmpItem);
                    });
                    //dispatch customized event
                    self.trigger("fetchCompleted:Categories");
                },
                error: function(data) {
                    alert("error");
                }
            });

            function formToJSON() {
                return JSON.stringify({
                    "categoryId": 0,
                    "name": "",
                });
            }
        }
    });
    return Categories;
});