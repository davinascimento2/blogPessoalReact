import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Search, Clock, ArrowRight } from 'lucide-react';

interface PostListProps {
  posts: BlogPost[];
  onSelectPost: (slug: string) => void;
}

export const PostList: React.FC<PostListProps> = ({ posts, onSelectPost }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Systems', 'Web Audio', 'IoT & Hardware'];

  const filteredPosts = posts.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="border-b border-zinc-800/80 pb-6">
        <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
          Engineering Logs & Case Studies
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
          Technical essays covering deterministic network packet routing, procedural Web Audio DSP synthesis, embedded IoT hardware, and client-side database engines.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search engineering essays..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div className="flex gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="divide-y divide-zinc-900">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            onClick={() => onSelectPost(post.slug)}
            className="py-6 group cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-zinc-500 mb-2">
              <span>{post.date}</span>
              <span>•</span>
              <span className="text-zinc-400">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTimeMinutes} min read
              </span>
            </div>

            <h3 className="text-base font-semibold text-zinc-100 group-hover:text-zinc-300 transition-colors tracking-tight mb-1">
              {post.title}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map(t => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-[10px] font-mono text-zinc-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-100 group-hover:translate-x-1 transition-all inline-flex items-center gap-1">
                <span>Read Essay</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-12 text-center text-zinc-500 text-xs font-mono">
            No engineering logs matched your search terms.
          </div>
        )}
      </div>
    </div>
  );
};
