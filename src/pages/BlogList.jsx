import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { blogAPI } from "../api/blogApi";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("desc");
  const limit = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const { data } = await blogAPI.getAllPosts({ page, limit, sort });

        setPosts(data.data);
        setTotalPages(
          data.totalPages
        );
      } catch (error) {
        console.error( "Failed to fetch posts", error );
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, sort]);

  return (
    <>
      <Navbar />

      <section className="bg-gray-100 min-h-screen px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">

            <h1 className="text-3xl font-bold text-gray-900">
              Explore the latest articles
            </h1>

            <select
              value={sort}
              onChange={(e) => {
                setPage(1);
                setSort(e.target.value);
              }}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="desc">
                Latest First
              </option>

              <option value="asc">
                Oldest First
              </option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No blog posts available.
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    to={`/post/${post._id}`}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
                  >
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h2>

                    {post.tags &&
                      post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map(
                            (tag, index) => (
                              <span
                                key={index}
                                className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            )
                          )}
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

              <div className="flex items-center justify-center gap-3 mt-10">

                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                  className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm font-medium">
                  Page {page} of{" "}
                  {totalPages}
                </span>

                <button
                  disabled={
                    page === totalPages
                  }
                  onClick={() =>
                    setPage((prev) => prev + 1)
                  }
                  className="px-4 py-2 rounded-lg border bg-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogList;
