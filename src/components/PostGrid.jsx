const PostGrid = ({ items, emptyText, actions = [] }) => {
  if (!items.length) {
    return <p className="text-slate-500">{emptyText}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-xs font-medium bg-slate-100 text-slate-800 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          )}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow">{post.content}</p>
          <div className="flex items-center gap-3 mt-5">
            {actions.map((action, index) => (
              <button key={index} onClick={() => action.onClick(post)}
              className={`text-sm font-medium transition ${action.variant === "danger" ? "text-red-600 hover:text-red-700" : "text-slate-900 hover:text-slate-700"}`}>{action.label}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
