import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBlog } from "../context/BlogContext";
import { commentsAPI } from "../api/commentsApi";

import PostGrid from "../components/PostGrid";
import WriteView from "../components/WriteView";
import CommentsView from "../components/CommentsView";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const {
    posts,
    loading,
    saveDraft,
    publishPost,
    publishPostById,
    archivePost,
  } = useBlog();

  const navigate = useNavigate();

  const [view, setView] = useState("published");
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const views = ["published", "archived", "drafts", "comments", "write"];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
        console.error(e);
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setView("write");
  };

  const handleDraft = async (draftData) => {
    const saved = await saveDraft(draftData);

    setSelectedPost(saved);
    setView("drafts");
  };

  const handlePublish = async (post) => {
    await publishPost(post);

    setSelectedPost(null);
    setView("published");
  };

  const handlePublishById = async (post) => {
    await publishPostById(post);

    setSelectedPost(null);
    setView("published");
  };

  const handleViewPublishedPost = (post) => {
    navigate(`/post/${post._id}`);
  };

  const deleteComment = async (id) => {
    try {
      await commentsAPI.deleteComment(id);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.log("Failed to delete comment");
    }
  };

  useEffect(() => {
    const viewComments = async () => {
      try {
        const { data } = await commentsAPI.getMyComments();
        setComments(data);
      } catch (e) {
        console.log("failed to fetch comments");
      }
    };

    viewComments();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  if (loading)
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </section>
    );

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
                  className={`text-left px-3 py-2 rounded-lg capitalize transition ${
                    view === item
                      ? "bg-white text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
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

            <button
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
              onClick={() => {
                setSelectedPost(null);
                setView("write");
              }}
            >
              Write
            </button>
          </header>

          {view === "published" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Published Posts
              </h2>

              <PostGrid
                items={posts.published}
                emptyText="No published posts."
                actions={[
                  {
                    label: "Archive",
                    onClick: archivePost,
                  },
                  {
                    label: "View",
                    onClick: handleViewPublishedPost,
                  }
                ]}
              />
            </div>
          )}

          {view === "archived" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Archived Posts
              </h2>

              <PostGrid
                items={posts.archived}
                emptyText="No archived posts."
                actions={[
                  {
                    label: "Publish",
                    onClick: handlePublish,
                  },
                ]}
              />
            </div>
          )}

          {view === "drafts" && (
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-8">
                Drafts
              </h2>

              <PostGrid
                items={posts.drafts}
                emptyText="No drafts available."
                actions={[
                  {
                    label: "Publish",
                    onClick: handlePublishById,
                  },
                  {
                    label: "Edit",
                    onClick: handleEdit,
                  },
                ]}
              />
            </div>
          )}

          {view === "comments" && (
            <CommentsView
              comments={comments}
              deleteComment={deleteComment}
            />
          )}

          {view === "write" && (
            <WriteView
              post={selectedPost}
              handleDraft={handleDraft}
              handlePublish={handlePublish}
            />
          )}
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
