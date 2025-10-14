module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
	  "source/assets": "assets"
	});
  
	return {
	  dir: {
		input: "source",
		includes: "_includes"
	  },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk"
	};
  };
  