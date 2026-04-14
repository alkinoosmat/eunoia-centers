import Link from 'next/link'
import type { Post } from '@/types/blog'
import type { PublicAuthor } from '@/types/blog'

interface PostCardProps {
  post: Post
  author: PublicAuthor | null
  locale: 'en' | 'el'
}

export default function PostCard({ post, author, locale }: PostCardProps) {
  const content = post.content[locale] ?? post.content[post.fallbackLocale as 'en' | 'el' | undefined ?? 'en']
  if (!content) return null

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === 'el' ? 'el-GR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <article
      aria-label={content.title}
      className="group bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden hover:shadow-lg hover:border-[#C4D4C4] transition-all duration-300"
    >
      {/* Cover */}
      {post.coverImage ? (
        <div className="aspect-video overflow-hidden bg-[#F5F4F0]">
          <img
            src={post.coverImage}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-[#F0F4F0] to-[#E0EBE0] flex items-center justify-center">
          <span className="text-4xl text-[#C4D4C4] font-serif select-none" aria-hidden="true">✦</span>
        </div>
      )}

      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#F0F4F0] text-[#6B8F6B] font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-lg font-semibold text-[#1C1A17] mb-2 leading-snug group-hover:text-[#6B8F6B] transition-colors">
          <Link href={`/${locale}/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:underline">
            {content.title}
          </Link>
        </h2>

        {content.excerpt && (
          <p className="text-sm text-[#7A7468] leading-relaxed mb-4 line-clamp-3">
            {content.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-[#F5F4F0]">
          <div className="flex items-center gap-2.5">
            {author?.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.name} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#E0EBE0] flex items-center justify-center text-xs font-semibold text-[#6B8F6B]">
                {author?.name?.charAt(0) ?? '?'}
              </div>
            )}
            <span className="text-xs text-[#A09B8C]">{author?.name ?? 'Unknown'}</span>
          </div>
          <time dateTime={post.publishedAt} className="text-xs text-[#A09B8C]">
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  )
}
