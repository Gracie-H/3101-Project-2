// .eleventy.js  —— ES Module 写法
export default function (eleventyConfig) {
	// 静态资源直拷：/source/assets -> /_site/assets
	eleventyConfig.addPassthroughCopy({
	  "source/assets": "assets"
	});
  
	// 自定义 date 过滤器（支持 {{ date | date("yyyy-MM-dd") }})
	eleventyConfig.addFilter("date", (value, format = "yyyy-MM-dd") => {
	  const d = value instanceof Date ? value : new Date(value);
	  const yyyy = String(d.getFullYear());
	  const mm = String(d.getMonth() + 1).padStart(2, "0");
	  const dd = String(d.getDate()).padStart(2, "0");
  
	  // 目前只需要 yyyy-MM-dd，如需更多格式再扩展
	  if (format === "yyyy-MM-dd") return `${yyyy}-${mm}-${dd}`;
  
	  // 兜底：ISO 字符串
	  return d.toISOString();
	});
  
	return {
	  dir: {
		input: "source",
		includes: "_includes"
	  },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk"
	};
  }
  