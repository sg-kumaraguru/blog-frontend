import { useMemo } from "react";

const CommentsView = ({ comments, deleteComment }) => {
  const groupedComments = useMemo(() => {
    return comments.reduce((acc, comment) => {
      const postId = comment.postId;

      if (!acc[postId]) {
        acc[postId] = {
          postTitle: comment.postTitle,
          comments: [],
        };
      }

      acc[postId].comments.push(comment);

      return acc;
    }, {});
  }, [comments]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-900 mb-8">
        Comments
      </h2>

      {comments.length === 0 ? (
        <p className="text-slate-500">No comments yet.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedComments).map(
            ([postId, postData]) => (
              <div
                key={postId}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-5">
                  {postData.postTitle}
                </h3>

                <div className="space-y-4">
                  {postData.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-l-2 border-slate-300 pl-4"
                    >
                      <p className="text-slate-700 mb-2">
                        {comment.content}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">
                          {new Date(
                            comment.createdAt
                          ).toLocaleDateString()}
                        </span>

                        <button
                          onClick={() =>
                            deleteComment(comment.id)
                          }
                          className="text-red-500 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CommentsView;
