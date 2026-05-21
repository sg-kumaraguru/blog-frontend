import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { blogAPI } from "../api/blogApi";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [view, setView] = useState("published");

  const [posts, setPosts] = useState({
    published: [],
    archived: [],
    drafts: [],
  });

  const views = ["published", "archived", "drafts", "comments"];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await blogAPI.getMyPosts();

        setPosts({
          published: data.published || [],
          archived: data.archived || [],
          drafts: data.drafts || [],
        });

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const renderPosts = (items, emptyText) => {
    if (!items.length) {
      return (
        <p className="text-slate-500">
          {emptyText}
        </p>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post) => (
          <div
            key={post._id}
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

            <button className="mt-4 text-sm font-medium text-slate-900 text-left cursor-pointer">
              Action
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-gray-100 min-h-screen">
      <div className="grid grid-cols-[240px_1fr] min-h-screen">

        <aside className="p-8 flex flex-col border-r border-slate-200">
          <div>
            <p className="text-lg font-bold text-slate-700 mb-8">
              Dashboard
            </p>

            <div className="flex flex-col gap-2">

              {views.map((item) => (
                <button
                  key={item}
                  onClick={() => setView(item)}
                  className={`
                    text-left px-3 py-2 rounded-lg capitalize transition
                    ${
                      view === item
                        ? "bg-white text-slate-900 font-medium"
                        : "text-slate-500 hover:text-slate-900"
                    }
                  `}
                >
                  {item}
                </button>
              ))}

            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-auto text-left text-slate-500 hover:text-red-600 transition px-3 py-2"
          >
            Logout
          </button>
        </aside>

        <main className="px-10 py-8">

          <header className="flex items-center justify-between mb-12">
              <h1 className="text-3xl font-bold text-slate-900">
                Hello, {user?.name}
              </h1>

            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">
              Write
            </button>
          </header>

          {view === "published" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Published Posts
              </h2>

              {renderPosts(
                posts.published,
                "No published posts."
              )}
            </div>
          )}

          {view === "archived" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Archived Posts
              </h2>

              {renderPosts(
                posts.archived,
                "No archived posts."
              )}
            </div>
          )}

          {view === "drafts" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Drafts
              </h2>

              {renderPosts(
                posts.drafts,
                "No drafts available."
              )}
            </div>
          )}

          {view === "comments" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Comments
              </h2>

              <p className="text-slate-500">
                No comments yet.
              </p>
            </div>
          )}

        </main>

      </div>
    </section>
  );
};

export default Dashboard;
