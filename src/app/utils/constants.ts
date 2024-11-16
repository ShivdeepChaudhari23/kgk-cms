export const messages = {
  title: 'KGK Content Management System',
  videoUrl: 'Enter Video URL',
  embedButton: 'Embed',
  featuredPosts: 'Featured Posts',
  noPosts: 'No Posts Available.',
  button: (isEditing: boolean) => `${isEditing ? 'Update' : 'Create'}`,
  reset: 'Reset',
};


export const ALLOWED_TAGS: string[] = [
  "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", 
  "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", 
  "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", 
  "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", 
  "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", 
  "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", 
  "link", "main", "map", "mark", "meter", "nav", "noscript", "object", 
  "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", 
  "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "small", 
  "source", "span", "strong", "sub", "summary", "sup", "table", "tbody", 
  "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", 
  "track", "u", "ul", "var", "video", "wbr"
];