import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts'
import { getSession } from '@/lib/session'
import { updatePostAction } from '@/actions/posts'
import PostEditor from '@/components/blog/PostEditor'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const metadata = { title: 'Edit Post | Eunoia Admin' }

export default async function EditPostPage({ params }: Props) {
  const { locale, slug } = await params
  const session = await getSession()
  if (!session) return null

  const post = await getPost(slug)
  if (!post) notFound()
  if (post.authorId !== session.authorId) notFound()

  const boundAction = updatePostAction.bind(null, locale, slug)

  return (
    <div>
      <h1 className="text-2xl font-light text-[#1C1A17] mb-8">Edit Post</h1>
      <PostEditor
        action={boundAction}
        initialPost={post}
        locale={locale as 'en' | 'el'}
      />
    </div>
  )
}
