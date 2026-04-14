import { createPostAction } from '@/actions/posts'
import PostEditor from '@/components/blog/PostEditor'

type Props = { params: Promise<{ locale: string }> }

export const metadata = { title: 'New Post | Eunoia Admin' }

export default async function NewPostPage({ params }: Props) {
  const { locale } = await params
  const boundAction = createPostAction.bind(null, locale)

  return (
    <div>
      <h1 className="text-2xl font-light text-[#1C1A17] mb-8">New Post</h1>
      <PostEditor action={boundAction} locale={locale as 'en' | 'el'} />
    </div>
  )
}
