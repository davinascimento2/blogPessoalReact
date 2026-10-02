import React from 'react';
import { BlogPost } from '../types';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';

interface PostReaderProps {
  post: BlogPost;
  onBack: () => void;
}

export const PostReader: React.FC<PostReaderProps> = ({ post, onBack }) => {
  return (
    <article className="max-w-3xl mx-auto space-y-8">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all essays</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-1 text-zinc-400">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-zinc-400">
            <Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read
          </span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300">
            {post.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-zinc-400 leading-relaxed font-sans">
          {post.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Content Prose */}
      <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4">
        <div className="whitespace-pre-line font-sans">
          {post.content}
        </div>
      </div>

      {/* Footer Author Bio */}
      <div className="border-t border-zinc-800 pt-6 mt-12 flex items-center justify-between text-xs font-mono text-zinc-500">
        <div>
          <p className="text-zinc-200 font-semibold font-sans">Written by Davi Nascimento</p>
          <p className="text-[11px] text-zinc-500">Systems, Networks & Web Audio Specialist</p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Article URL copied to clipboard!');
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>
    </article>
  );
};
