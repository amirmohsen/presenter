Polymer({
	addSlides: function(slides) {
		this.allSlides = slides;
		this.listen();
	},
	listen: function() {
		var self = this;
		$(document).on("new-slide", function(event, index){
			self.setCurrentSlide(index);
		});
	},
	setCurrentSlide: function(index) {
		var slide = this.allSlides.querySelector(
						"presenter-slide:nth-child("+index+")");
		if(!slide)
			return;

		var clone = document.importNode(slide, true);
		$(this).html(clone);
	}
});