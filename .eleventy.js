// .eleventy.js (ES Module)
export default function (eleventyConfig) {
	// 直接拷贝静态资源：/source/assets -> /_site/assets
	eleventyConfig.addPassthroughCopy({ "source/assets": "assets" });
  
	/**
	 * 1) price：把数字格式化为货币
	 * 用法：{{ price | price('USD','en-US') }}  -> $120
	 *      {{ price | price('CNY','zh-CN',2) }} -> ￥120.00
	 */
	eleventyConfig.addFilter("price", (value, currency = "USD", locale = "en-US", fractionDigits = 0) => {
	  const n = Number(value);
	  const safe = Number.isFinite(n) ? n : 0;
	  return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	  }).format(safe);
	});
  
	/**
	 * 2) priceTier：把价格分档（你可以改阈值&命名）
	 * 用法：{{ item.data.price | priceTier }}  -> 'budget' / 'standard' / 'premium' / 'luxury'
	 */
	eleventyConfig.addFilter("priceTier", (value) => {
	  const n = Number(value);
	  if (!Number.isFinite(n)) return "unknown";
	  if (n < 20) return "budget";
	  if (n < 100) return "standard";
	  if (n < 300) return "premium";
	  return "luxury";
	});
  
	/**
	 * 3) inPriceRange：在模板里筛选集合的价格区间
	 * 用法：
	 *   {% set cheap = collections.entry | inPriceRange(0, 50) %}
	 *   {% for item in cheap %} ... {% endfor %}
	 */
	eleventyConfig.addFilter("inPriceRange", (items, min = null, max = null) => {
	  if (!Array.isArray(items)) return [];
	  return items.filter((it) => {
		const p = Number(it?.data?.price);
		if (!Number.isFinite(p)) return false;
		if (min !== null && p < min) return false;
		if (max !== null && p > max) return false;
		return true;
	  });
	});
  
	return {
	  dir: {
		input: "source",
		includes: "_includes"
		// output 默认为 _site；如果你改了，记得同步 Actions 里的 artifact 路径
	  },
	  htmlTemplateEngine: "njk",
	  markdownTemplateEngine: "njk"
	};
  }
  