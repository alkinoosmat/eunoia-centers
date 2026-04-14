import sanitizeHtml from 'sanitize-html'

const ALLOWED_TAGS = [
  'p','br','strong','em','u','s',
  'h2','h3','h4',
  'ul','ol','li',
  'blockquote','code','pre',
  'a','hr',
]

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel'],
}

export function sanitize(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => {
        const newAttribs: Record<string, string> = { ...attribs, rel: 'noopener noreferrer' }
        if (attribs.href?.startsWith('http')) newAttribs.target = '_blank'
        return { tagName, attribs: newAttribs }
      },
    },
  })
}
