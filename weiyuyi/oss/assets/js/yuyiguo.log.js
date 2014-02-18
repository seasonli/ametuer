var ReviewModel = Backbone.Model.extend({
	initialize: function() {
		//
	},
	defaults: {
		//
	}
})

var ReviewCollection = Backbone.Collection.extend({
	model: ReviewModel
})

var ReviewView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		var html = _.template($("#reviewTpl").html(), {});
		$(".wrapper_content").append(html);
		this.actions();
	},
	actions: function() {
		if(!$(this).prop("checked")) {
			$("[name='review_ranks']").click(function() {
				$("[name='review_ranks']").parent().children("div").hide();
				$("[name='review_ranks']").parent().children("div").find("[type='checkbox']").prop("checked", false);
				$(this).parent().children("div").show();
			})
		}
	},
	events: {
		//
	},

});

var reviewView = new ReviewView({el: $(".review")[0]});
