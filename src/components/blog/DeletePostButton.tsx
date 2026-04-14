'use client'

interface DeletePostButtonProps {
  action: () => Promise<void>
  title: string
}

export default function DeletePostButton({ action, title }: DeletePostButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm('Delete this post? This cannot be undone.')) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
        aria-label={`Delete ${title}`}
      >
        Delete
      </button>
    </form>
  )
}
