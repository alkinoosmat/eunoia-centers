import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost } from '@/lib/posts'
import { getAuthor } from '@/lib/authors'
import AuthorBio from '@/components/blog/AuthorBio'
import SectionWrapper from '@/components/ui/SectionWrapper'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  const content = post.content[locale as 'en' | 'el'] ?? post.content[post.fallbackLocale as 'en' | 'el' | undefined ?? 'en']
  return {
    title: content?.title ?? slug,
    description: content?.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  const post = await getPost(slug)

  if (!post || post.status !== 'published') notFound()

  const content =
    post.content[locale as 'en' | 'el'] ??
    (post.fallbackLocale ? post.content[post.fallbackLocale] : undefined)

  if (!content) notFound()

  const author = await getAuthor(post.authorId)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === 'el' ? 'el-GR' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  const isUsingFallback =
    !post.content[locale as 'en' | 'el'] && !!post.fallbackLocale

  return (
    <>
      {/* Hero */}
      <div className="pt-20 bg-[#F5F4F0]">
        <SectionWrapper className="py-16 md:py-20">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm text-[#6B8F6B] hover:text-[#5A7A5A] mb-8 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {locale === 'el' ? 'Πίσω στο Blog' : 'Back to Blog'}
          </Link>

          {isUsingFallback && (
            <div className="mb-6 p-3 bg-[#F0F4F0] border border-[#C4D4C4] rounded-xl text-sm text-[#6B8F6B]">
              {locale === 'el'
                ? 'Αυτό το άρθρο είναι διαθέσιμο μόνο στα Αγγλικά.'
                : 'This article is available in English only.'}
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#E0EBE0] text-[#6B8F6B] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-light text-[#1C1A17] tracking-tight mb-5 max-w-3xl" style={{ lineHeight: 1.15 }}>
            {content.title}
          </h1>

          {content.excerpt && (
            <p className="text-lg text-[#7A7468] leading-relaxed max-w-2xl mb-6">
              {content.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3">
            {author?.avatarUrl ? (
              <img src={author.avatarUrl} alt={author.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#E0EBE0] flex items-center justify-center text-sm font-semibold text-[#6B8F6B]">
                {author?.name.charAt(0) ?? '?'}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-[#4A4540]">{author?.name}</p>
              <time dateTime={post.publishedAt} className="text-xs text-[#A09B8C]">{formattedDate}</time>
            </div>
          </div>
        </SectionWrapper>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 -mt-4">
          <img
            src={post.coverImage}
            alt={content.title}
            className="w-full aspect-video object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Body */}
      <SectionWrapper className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />

          {author && (
            <div className="mt-16">
              <AuthorBio author={author} />
            </div>
          )}
        </div>
      </SectionWrapper>
    </>
  )
}
