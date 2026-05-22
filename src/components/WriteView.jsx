import { useEffect, useState } from "react";

const WriteView = ({ handleDraft, handlePublish, post }) => {
  const [edit, setEdit] = useState({ title: "", tags: "", content: "" });

  useEffect(() => {
    if (post) {
      setEdit({
        _id: post._id,
        title: post.title || "",
        tags: post.tags?.join(", ") || "",
        content: post.content || "",
      });
    } else {
      setEdit({ title: "", tags: "", content: "" });
    }
  }, [post]);

  const handleChange = (key, value) => {
    setEdit((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-10">
        <div>
          <input type="text" placeholder="Untitled"
          className="w-full bg-transparent text-6xl font-bold tracking-tight placeholder:text-gray-300 outline-none border-none"
          value={edit.title} onChange={(e) => handleChange("title", e.target.value)} />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Tags</span>
          <input type="text" placeholder="design, productivity, startup..."
          className="flex-1 bg-transparent text-gray-700 placeholder:text-gray-300 outline-none border-none" value={edit.tags}
          onChange={(e) => handleChange("tags", e.target.value)} />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div>
          <textarea rows={18} placeholder="Write something worth reading..."
          className="w-full resize-none bg-transparent text-lg leading-9 text-gray-700 placeholder:text-gray-300 outline-none border-none"
          value={edit.content} onChange={(e) => handleChange("content", e.target.value)} />
        </div>
        <div className="flex items-center justify-between gap-3 pt-6">
          <button className="px-5 py-2 text-sm font-medium text-gray-500 transition hover:text-black"
          onClick={() => handleDraft(edit)}>Save Draft</button>
          <button className="rounded-full bg-black text-white px-6 py-2.5 text-sm font-medium tracking-wide transition hover:scale-[1.02] hover:opacity-90" onClick={() => handlePublish(edit)}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default WriteView;
