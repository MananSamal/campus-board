'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

type Notice = { id: number; title: string; body: string; category: string; author: string; created_at: string; likes: number };

const demoNotices: Notice[] = [
  { id: 1, title: 'Freshers Welcome Night', body: 'Join us Friday at 6 PM in the main auditorium. Games, music and free snacks for everyone.', category: 'Events', author: 'Student Council', created_at: '2026-09-11T10:00:00Z', likes: 24 },
  { id: 2, title: 'Library Hours Extended', body: 'The central library will stay open until midnight during the upcoming assessment period.', category: 'Academic', author: 'Library Team', created_at: '2026-09-10T12:00:00Z', likes: 18 },
  { id: 3, title: 'Lost: Blue Water Bottle', body: 'A blue insulated bottle was misplaced near Lab 3. Please message the owner if you found it.', category: 'Lost & Found', author: 'Aarav', created_at: '2026-09-09T08:00:00Z', likes: 7 },
  { id: 4, title: 'Football Team Trials', body: 'Trials are open to all students this Wednesday at the sports ground. Bring your student ID.', category: 'Sports', author: 'Sports Club', created_at: '2026-09-08T15:00:00Z', likes: 31 },
  { id: 5, title: 'Internship Workshop', body: 'Learn how to improve your CV and prepare for technical interviews with our careers team.', category: 'Opportunities', author: 'Career Cell', created_at: '2026-09-07T09:30:00Z', likes: 15 },
  { id: 6, title: 'Campus Sustainability Survey', body: 'Tell us how we can make campus greener. The survey takes less than two minutes.', category: 'Community', author: 'Green Club', created_at: '2026-09-06T11:00:00Z', likes: 11 },
];

const categories = ['All', 'Academic', 'Events', 'Sports', 'Opportunities', 'Lost & Found', 'Community'];

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>(demoNotices);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState('');
  const [modal, setModal] = useState<Notice | 'new' | null>(null);

  async function loadNotices() {
    if (!supabase) return;
    setLoading(true); setError('');
    const { data, error: dbError } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
    if (dbError) setError(dbError.message);
    else setNotices((data as Notice[]) || []);
    setLoading(false);
  }

  useEffect(() => { loadNotices(); }, []);

  const filtered = useMemo(() => notices.filter((n) => {
    const matchesSearch = `${n.title} ${n.body} ${n.author}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (category === 'All' || n.category === category);
  }), [notices, search, category]);

  async function saveNotice(data: Omit<Notice, 'id' | 'created_at' | 'likes'>) {
    if (!supabase) {
      setNotices((current) => modal !== 'new' && modal ? current.map((n) => n.id === modal.id ? { ...n, ...data } : n) : [{ ...data, id: Date.now(), created_at: new Date().toISOString(), likes: 0 }, ...current]);
      setModal(null); return;
    }
    const result = modal !== 'new' && modal
      ? await supabase.from('notices').update(data).eq('id', modal.id)
      : await supabase.from('notices').insert({ ...data, likes: 0 });
    if (result.error) setError(result.error.message); else { setModal(null); await loadNotices(); }
  }

  async function removeNotice(id: number) {
    if (!confirm('Delete this notice?')) return;
    if (!supabase) { setNotices((n) => n.filter((x) => x.id !== id)); return; }
    const { error: dbError } = await supabase.from('notices').delete().eq('id', id);
    if (dbError) setError(dbError.message); else loadNotices();
  }

  async function likeNotice(n: Notice) {
    const next = n.likes + 1;
    setNotices((items) => items.map((x) => x.id === n.id ? { ...x, likes: next } : x));
    if (supabase) await supabase.from('notices').update({ likes: next }).eq('id', n.id);
  }

  return <main className="shell">
    <nav className="nav"><div className="brand"><div className="logo">C</div>CampusBoard</div><div className="nav-actions"><button className="btn secondary">About</button><button className="btn" onClick={() => setModal('new')}>+ Post notice</button></div></nav>
    <section className="hero"><div><div className="eyebrow">The campus, in one place</div><h1>Know what&apos;s happening. Share what matters.</h1><p>A simple, collaborative notice board for your college community. Find events, opportunities, lost items and important updates without digging through group chats.</p><div className="stats"><div className="stat"><strong>{notices.length}</strong><span>notices</span></div><div className="stat"><strong>24/7</strong><span>access</span></div><div className="stat"><strong>1</strong><span>shared space</span></div></div></div><div className="hero-card"><span className="pin">📌</span><h3>Everything students need, together.</h3><p>Post an update in seconds. Discover what your campus community is talking about.</p></div></section>
    <section className="content"><div className="composer"><div><h2>Have something to share?</h2><p>Post an announcement for your campus community.</p></div><button className="btn" onClick={() => setModal('new')}>Create a notice →</button></div>
      <div className="toolbar"><div className="search"><input aria-label="Search notices" placeholder="Search notices, people, topics..." value={search} onChange={(e) => setSearch(e.target.value)} /></div><div className="filters">{categories.map((c) => <button key={c} className={`filter ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
      {error && <p className="error">Couldn&apos;t connect to the database: {error}. Check your Supabase setup.</p>}
      {loading ? <div className="empty">Loading notices...</div> : <div className="grid">{filtered.length ? filtered.map((n) => <article className="notice" key={n.id}><div className="notice-top"><span className="tag">{n.category}</span><span className="date">{new Date(n.created_at).toLocaleDateString()}</span></div><h3>{n.title}</h3><p>{n.body}</p><div className="notice-bottom"><span>By {n.author}</span><span><button className="like" onClick={() => likeNotice(n)}>♥ {n.likes}</button> · <button className="like" onClick={() => setModal(n)}>Edit</button> · <button className="like" onClick={() => removeNotice(n.id)}>Delete</button></span></div></article>) : <div className="empty">No notices match your search. Try another category or create the first one.</div>}</div>}
    </section>
    <footer className="footer">CampusBoard · Built with Next.js, React & Supabase</footer>
    {modal && <NoticeModal notice={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={saveNotice} />}
  </main>;
}

function NoticeModal({ notice, onClose, onSave }: { notice: Notice | null; onClose: () => void; onSave: (data: Omit<Notice, 'id' | 'created_at' | 'likes'>) => Promise<void> }) {
  const [title, setTitle] = useState(notice?.title || ''); const [body, setBody] = useState(notice?.body || ''); const [category, setCategory] = useState(notice?.category || 'Academic'); const [author, setAuthor] = useState(notice?.author || ''); const [saving, setSaving] = useState(false); const [validation, setValidation] = useState('');
  async function submit(e: FormEvent) { e.preventDefault(); if (title.trim().length < 4 || body.trim().length < 10 || author.trim().length < 2) { setValidation('Please complete all fields. Title needs 4+ characters and the message 10+.'); return; } setSaving(true); await onSave({ title: title.trim(), body: body.trim(), category, author: author.trim() }); setSaving(false); }
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="modal"><h2>{notice ? 'Edit notice' : 'Create a notice'}</h2><form className="form" onSubmit={submit}><label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Coding club meetup" /></label><label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.slice(1).map((c) => <option key={c}>{c}</option>)}</select></label><label>Message<textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What should your campus community know?" /></label><label>Your name / club<input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Manan or Student Council" /></label>{validation && <div className="error">{validation}</div>}<div className="form-actions"><button type="button" className="btn secondary" onClick={onClose}>Cancel</button><button className="btn" disabled={saving}>{saving ? 'Saving...' : notice ? 'Save changes' : 'Publish notice'}</button></div></form></div></div>;
}
