import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useBlog } from "../context/BlogContext";
import Navbar from "../components/Navbar";
import { blogAPI } from "../api/blogApi";

const BlogContent = () => {
  const { id } = useParams();
  const { posts } = useBlog();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingPost = posts.published?.find((p) => p._id === id);

    if (existingPost) {
      setPost(existingPost);
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data } = await blogAPI.getPostById(id);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, posts]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Post not found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6">
            <span>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article className="text-sm sm:text-base leading-7 text-gray-800 whitespace-pre-line">
            {post.content}
          </article>

          <div className="my-10 border-t" />

          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-6">
              Comments ({post.comments?.length || 0})
            </h2>

            {post.comments?.length === 0 && (
              <p className="text-gray-500 text-sm">No comments yet.</p>
            )}

            <div className="space-y-5">
              {post.comments?.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                    {comment.author?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {comment.author?.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default BlogContent;
