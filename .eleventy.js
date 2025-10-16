// .eleventy.js  —— ES Module
export default function (eleventyConfig) {
	// 1) 静态资源直拷：/source/assets -> /_site/assets
	eleventyConfig.addPassthroughCopy({
	  "source/assets": "assets"
	});
  
	// 2) 自定义 money 过滤器（模板里可用：{{ price | money(currency) }})
	eleventyConfig.addFilter(
	  "money",
	  (amount, currency = "USD", opts = {}) => {
		const n = Number(String(amount ?? "").replace(/[^\d.\-]/g, ""));
		if (isNaN(n)) return "";
  
		const cents = typeof opts.cents === "boolean" ? opts.cents : false;
		try {
		  return new Intl.NumberFormat(
			"en-US",
			{
			  style: "currency",
			  currency,
			  minimumFractionDigits: cents ? 2 : 0,
			  maximumFractionDigits: cents ? 2 : 0
			}
		  ).format(n);
		} catch {
		  const rounded = cents ? n.toFixed(2) : Math.round(n).toString();
		  return `$${rounded} ${currency}`;
		}
	  }
	);
  
	// 3) 目录与模板引擎
	return {
	  dir: {
		input: "source",
		includes: "_includes"
	  },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk"
	};
  }
  