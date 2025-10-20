import { HtmlBasePlugin } from "@11ty/eleventy";


export default function (eleventyConfig) {
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPassthroughCopy("source/assets");
	//add


	eleventyConfig.addFilter("money", (n, symbol = "$") => {
	  const num = Number(n);
	  if (Number.isNaN(num)) return n;
	  return symbol + (num % 1 === 0 ? num.toFixed(0) : num.toFixed(2));
	});
	
	eleventyConfig.addPassthroughCopy({ "source/assets": "assets" });

	// price
	eleventyConfig.addCollection("entryByPriceAsc", (api) => {
	  return api.getFilteredByTag("entry").sort((a, b) => {
		const pa = Number(a.data.price ?? Infinity);
		const pb = Number(b.data.price ?? Infinity);
		return pa - pb;
	  });
	});
  

  
	return {
		dir: { input: "source", includes: "_includes", output: "_site" },

		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",

		templateFormats: ["html", "njk", "md"],

		pathPrefix: (process.env.NODE_ENV === "production" || process.env.GITHUB_ACTIONS)
		  ? "/3101-Project-2/"
		  : "/",
	  };
	  
  }
  