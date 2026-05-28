import usePosts from "../hooks/usePosts"

function HomePage() {
  const { posts, loading, error } = usePosts()

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading posts...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Posts</h1>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-4 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">#{post.id}</p>
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 capitalize">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
