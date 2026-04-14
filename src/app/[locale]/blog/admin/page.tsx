import Link from 'next/link'
import { getSession } from '@/lib/session'
import { getAllPosts } from '@/lib/posts'
import { deletePostAction } from '@/actions/posts'
import DeletePostButton from '@/components/blog/DeletePostButton'

type Props = { params: Promise<{ locale: string }> }

export const metadata = { title: 'My Posts | Eunoia Admin' }

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params
  const session = await getSession()
  if (!session) return null

  const allPosts = await getAllPosts()
  const myPosts = allPosts.filter((p) => p.authorId === session.authorId)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-light text-[#1C1A17]">My Posts</h1>
        <Link
          href={`/${locale}/blog/admin/new`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B8F6B] text-white text-sm font-medium rounded-xl hover:bg-[#5A7A5A] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Post
        </Link>
      </div>

      {myPosts.length === 0 ? (
        <div className="text-center py-20 text-[#A09B8C]">
          <p className="mb-4">No posts yet.</p>
          <Link href={`/${locale}/blog/admin/new`} className="text-[#6B8F6B] hover:underline text-sm">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8E6E0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E6E0] bg-[#FAFAF8]">
                <th className="text-left px-5 py-3 text-xs font-medium text-[#A09B8C] uppercase tracking-wide">Title</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#A09B8C] uppercase tracking-wide hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#A09B8C] uppercase tracking-wide hidden md:table-cell">Updated</th>
                <th className="px-4 py-3 text-xs font-medium text-[#A09B8C] uppercase tracking-wide text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => {
                const title =
                  post.content[locale as 'en' | 'el']?.title ??
                  post.content.en?.title ??
                  post.content.el?.title ??
                  post.slug
                const boundDelete = deletePostAction.bind(null, locale, post.slug)

                return (
                  <tr key={post.slug} className="border-b border-[#F5F4F0] last:border-0 hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-5 py-3.5 text-[#1C1A17] font-medium">
                      <div className="flex flex-col">
                        <span className="line-clamp-1">{title}</span>
                        <span className="text-xs text-[#A09B8C] font-normal mt-0.5">{post.slug}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-[#E0EBE0] text-[#5A7A5A]' : 'bg-[#F5F4F0] text-[#A09B8C]'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#A09B8C] hidden md:table-cell">
                      {new Date(post.updatedAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#E8E6E0] text-[#7A7468] hover:bg-[#F5F4F0] transition-colors"
                          aria-label={`View ${title}`}
                        >
                          View
                        </Link>
                        <Link
                          href={`/${locale}/blog/admin/edit/${post.slug}`}
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#E8E6E0] text-[#7A7468] hover:bg-[#F5F4F0] transition-colors"
                          aria-label={`Edit ${title}`}
                        >
                          Edit
                        </Link>
                        <DeletePostButton action={boundDelete} title={title} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
