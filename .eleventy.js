import { HtmlBasePlugin } from "@11ty/eleventy";

// .eleventy.js (只展示新增/修改部分)
export default function (eleventyConfig) {
	eleventyConfig.addPlugin(HtmlBasePlugin);
	// ...你现有的配置保持不变
  
	// 价格格式化：{{ 80 | money }} -> $80
	eleventyConfig.addFilter("money", (n, symbol = "$") => {
	  const num = Number(n);
	  if (Number.isNaN(num)) return n;
	  return symbol + (num % 1 === 0 ? num.toFixed(0) : num.toFixed(2));
	});
	
	eleventyConfig.addPassthroughCopy({ "source/assets": "assets" });

	// 按价格升序
	eleventyConfig.addCollection("entryByPriceAsc", (api) => {
	  return api.getFilteredByTag("entry").sort((a, b) => {
		const pa = Number(a.data.price ?? Infinity);
		const pb = Number(b.data.price ?? Infinity);
		return pa - pb;
	  });
	});
  
	// 按价格降序（可选）
	eleventyConfig.addCollection("entryByPriceDesc", (api) => {
	  return api.getFilteredByTag("entry").sort((a, b) => {
		const pa = Number(a.data.price ?? -Infinity);
		const pb = Number(b.data.price ?? -Infinity);
		return pb - pa;
	  });
	});
  
	return {
	  // 你的返回对象保持不变
	  dir: { input: "source", includes: "_includes", output: "_site" },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk",
	  pathPrefix: (process.env.NODE_ENV === "production" || process.env.GITHUB_ACTIONS) ? "/3101-Project-2/" : "/",
	};
  }
  