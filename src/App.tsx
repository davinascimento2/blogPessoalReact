import { useState } from 'react';
import { BLOG_POSTS } from './data/posts';
import { Navbar } from './components/Navbar';
import { PostList } from './components/PostList';
import { PostReader } from './components/PostReader';

export function App() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const currentPost = selectedSlug
    ? BLOG_POSTS.find(p => p.slug === selectedSlug) || null
    : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-100 selection:text-zinc-950">
      {/* Top Navbar */}
      <Navbar
        currentSlug={selectedSlug}
        onNavigateHome={() => setSelectedSlug(null)}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        {currentPost ? (
          <PostReader
            post={currentPost}
            onBack={() => setSelectedSlug(null)}
          />
        ) : (
          <PostList
            posts={BLOG_POSTS}
            onSelectPost={(slug) => setSelectedSlug(slug)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>Davi Nascimento • Systems Architecture & Technical Journal</span>
          <span>Open-source on <a href="https://github.com/davinascimento2" target="_blank" rel="noreferrer" className="text-zinc-300 hover:underline">GitHub</a></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
