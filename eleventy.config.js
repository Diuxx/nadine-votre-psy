
export default function(eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy('src');

  // Format a date as ISO string for datetime attributes (e.g. 2025-01-15)
  eleventyConfig.addFilter('htmlDateString', (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  // Format a date in French for human-readable display (e.g. 15 janvier 2025)
  eleventyConfig.addFilter('readableDate', (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  // Estimate reading time based on average 200 words per minute
  eleventyConfig.addFilter('readingTime', (content) => {
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  });

  // Collection: all articles sorted by date ascending
  eleventyConfig.addCollection('articles', (collectionApi) => {
    return collectionApi.getFilteredByTag('articles').sort(
      (a, b) => a.date - b.date
    );
  });
}