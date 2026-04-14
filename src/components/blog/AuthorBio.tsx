import type { PublicAuthor } from '@/types/blog'

export default function AuthorBio({ author }: { author: PublicAuthor }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#F5F4F0] border border-[#E8E6E0]">
      {author.avatarUrl ? (
        <img
          src={author.avatarUrl}
          alt={author.name}
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-[#E0EBE0] flex items-center justify-center text-xl font-semibold text-[#6B8F6B] shrink-0">
          {author.name.charAt(0)}
        </div>
      )}
      <div>
        <p className="text-xs tracking-[0.15em] uppercase text-[#A09B8C] mb-0.5">Written by</p>
        <p className="font-semibold text-[#1C1A17] mb-1">{author.name}</p>
        <p className="text-sm text-[#7A7468] leading-relaxed">{author.bio}</p>
      </div>
    </div>
  )
}
