Polymer({
	generateItems: function(slides) {
		var self = this;
		$(slides).find("presenter-slide").each(function(index, element){
			var $element = $(element),
				header = $element.attr("header"),
				id = $element.attr("id"),
				$listItem = $("<a>").attr({href:"#"+id})
							.addClass("list-group-item")
							.text(header);
				
				if(index === 0)
					$listItem.addClass("active");

			$(self.$.items).append($listItem);
		});

		this.listen();

		if(window.location.hash) {
			var hash = window.location.hash;
			$(this.$.items).find('a[href="'+hash+'"]').click();
		}
	},
	listen: function() {
		var self = this;

		$(this.$.items).on("click", "a.list-group-item", function(event){
			var $element = $(event.target),
				index = $element.index() + 1;

			$(document).trigger("new-slide", index);

			$element.addClass("active");
			$element.siblings("a.list-group-item.active")
					.removeClass("active");
		});

		Mousetrap.bind("left", function() { 
			var $currentItem = 
					$(self.$.items).find("a.list-group-item.active");

			if($currentItem.index() === 0)
				return false;

			$(self.$.items).find("a.list-group-item")
							.get($currentItem.index()-1)
							.click();

			return false;
		});

		Mousetrap.bind("right", function() {

			var count = $(self.$.items)
							.find("a.list-group-item").length,
				$currentItem = $(self.$.items)
							.find("a.list-group-item.active");

			if($currentItem.index() === count - 1)
				return false;

			$(self.$.items).find("a.list-group-item")
							.get($currentItem.index()+1)
							.click();
			
			return false;
		});
	}
});