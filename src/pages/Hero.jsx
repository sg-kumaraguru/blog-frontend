import Navbar from "../components/Navbar";
import { PenLine, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom"

const Hero = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 min-h-screen flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-center">

          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-6">
            Simple. Powerful. Clean.
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            A Minimal Platform <br className="hidden md:block" />
            For Serious Writers
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Publish articles, grow your audience, and focus on what matters —
            writing. No noise. No distractions.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition active:scale-[0.98] flex items-center gap-2">
              <PenLine size={18} />
              Start Writing
            </button>

            <NavLink to='/blogs' className="border border-slate-900 px-8 py-3 rounded-lg font-medium hover:bg-slate-900 hover:text-white transition flex items-center gap-2">
              <BookOpen size={18} />
              Read Articles
            </NavLink>

          </div>

          <div className="mt-16 w-24 h-1 bg-slate-900 mx-auto rounded-full opacity-20"></div>

        </div>
      </section>
    </>
  );
};

export default Hero;
