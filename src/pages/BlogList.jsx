import { useBlog } from "../context/BlogContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const BlogList = () => {
  const { posts } = useBlog();
  console.log(posts);

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Explore the latest articles
            </h1>
          </div>

          {posts.published.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No blog posts available.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.published.map((post) => (
                <Link
                  key={post._id}
                  to={`/post/${post._id}`}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >

                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">
                    {post.content}
                  </p>

                  <div className="mt-4 text-sm font-medium text-slate-900">
                    Read more →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogList;
