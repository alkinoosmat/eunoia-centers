import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/posts'
import { getAuthor } from '@/lib/authors'
import PostCard from '@/components/blog/PostCard'
import SectionWrapper from '@/components/ui/SectionWrapper'
import type { Metadata } from 'next'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('listingTitle'),
    description: t('listingDescription'),
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = (await getAllPosts(locale as 'en' | 'el')).filter(
    (p) => p.status === 'published'
  )

  const authorsMap = new Map(
    await Promise.all(
      [...new Set(posts.map((p) => p.authorId))].map(async (id) => {
        const a = await getAuthor(id)
        return [id, a] as const
      })
    )
  )

  return (
    <SectionWrapper id="blog" className="min-h-screen pt-28">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="block text-xs tracking-[0.22em] uppercase text-[#6B8F6B] font-medium mb-4">
          Blog
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-[#1C1A17] tracking-tight mb-5">
          {t('listingHeading')}
        </h1>
        <p className="text-[#A09B8C] leading-relaxed">{t('listingSubheading')}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-[#A09B8C] py-16">{t('noPosts')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              author={authorsMap.get(post.authorId) ?? null}
              locale={locale as 'en' | 'el'}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
