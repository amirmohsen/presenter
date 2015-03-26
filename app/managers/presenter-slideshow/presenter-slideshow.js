Polymer({

	created: function() {
		this.metadata = {
			title: "",
			author: ""
		};
		this.slides = [];
	},

	domReady: function() {
		this.loadSlides();
		this.watchHeight();
	},

	updateTitle: function() {
		$("title").text(this.metadata.title);
	},

	watchHeight: function() {
		this.$.frame.adjustHeight(this.topbarHeight());
		this.$.sidebar.adjustHeight(this.topbarHeight());
		var self = this;
		$(window).on("resize", function(){
			self.$.frame.adjustHeight(self.topbarHeight());
			self.$.sidebar.adjustHeight(self.topbarHeight());
		});
	},

	topbarHeight: function() {
		return $(this.$.topbar).outerHeight();
	},

	loadSlides: function() {
		var self = this;
		$.getJSON("./slides/slides.json", function(json){
			self.metadata.title = json.title;
			self.metadata.author = json.author;
			self.slides = json.slides;
			self.updateTitle();
			Polymer.import(["./slides/"+json.output], function(){
				var content = document
					.querySelector('link[rel="import"][href="./slides/'+
						json.output+'"]').import;

				var template = content.querySelector("template#slide-repo");
				self.$.frame.addSlides(template.content);
				self.$.frame.setCurrentSlide(1);
				self.$.sidebar.generateItems(template.content);
			});
			// self.addStyles(json.styles);
		});
	},

	addStyles: function(styles) {
		styles.forEach(function(style) {
			var $link = $("<link>").attr({rel: "stylesheet", href: "./slides/"+style});
			$("head").append($link);
		});		
	}
});