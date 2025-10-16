// .eleventy.js (ESM)
export default function (eleventyConfig) {
	// 复制静态资源：source/assets → _site/assets
	eleventyConfig.addPassthroughCopy({ "source/assets": "assets" });
  
	// date 过滤器
	eleventyConfig.addFilter("date", (value, format = "yyyy-MM-dd") => {
	  const d = value instanceof Date ? value : new Date(value);
	  const yyyy = String(d.getFullYear());
	  const mm = String(d.getMonth() + 1).padStart(2, "0");
	  const dd = String(d.getDate()).padStart(2, "0");
	  if (format === "yyyy-MM-dd") return `${yyyy}-${mm}-${dd}`;
	  return d.toISOString();
	});
  
	// 生产环境（GitHub Actions/Pages）才加子路径前缀
	const isProd = process.env.NODE_ENV === "production" || process.env.GITHUB_ACTIONS;
  
	return {
	  dir: {
		input: "source",
		includes: "_includes",
		output: "_site",
	  },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk",
	  pathPrefix: isProd ? "/3101-Project-2/" : "/", // 关键！
	};
  }
  