import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, 
  MoreHorizontal, Verified, Volume2, VolumeX, Bookmark, Share2, 
  MessageSquare, User, Settings, Grid, Monitor, Tag, Image as ImageIcon,
  Send, Camera, Info, CheckCircle2, Moon, Sun, ArrowLeft, Play, Pause,
  Instagram, LayoutGrid, CheckCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- MOCK DATA ---
const USER_PIC = "https://avatars.githubusercontent.com/u/108920197?v=4";

const STORIES = [
  { id: 1, username: "Your Story", img: USER_PIC, unseen: true, isUser: true },
  { id: 2, username: "nasa", img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=200", unseen: true },
  { id: 3, username: "nature", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=200", unseen: true },
  { id: 4, username: "tech_insider", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200", unseen: false },
  { id: 5, username: "explore_more", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=200", unseen: true },
  { id: 6, username: "artist_hub", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=200", unseen: false },
  { id: 7, username: "fitness_pro", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200", unseen: true },
];

const POSTS = [
  {
    id: 1,
    user: { username: "nasa", avatar: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=100", verified: true },
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=100&w=1080",
    likes: "124,532",
    caption: "A breathtaking view of our home planet from the International Space Station. Darkness and light dance across the globe. 🌍✨",
    timestamp: "2h",
    ratio: "aspect-[4/5]"
  },
  {
    id: 2,
    user: { username: "nature", avatar: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=100" },
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=100&w=1080",
    likes: "85,210",
    caption: "The morning mist rolling over the mountains is a sight to behold. Mother nature never ceases to amaze. 🏔️💨",
    timestamp: "4h",
    ratio: "aspect-square"
  },
  {
    id: 3,
    user: { username: "explore_more", avatar: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=100" },
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=100&w=1080",
    likes: "42,105",
    caption: "Wanderlust is a powerful thing. There's so much beauty in the world waiting to be discovered. 🌲✨",
    timestamp: "6h",
    ratio: "aspect-[4/5]"
  },
  {
    id: 4,
    user: { username: "tech_insider", avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=100" },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=100&w=1080",
    likes: "18,942",
    caption: "The future is build one line of code at a time. Minimalist workstation vibes. 💻⚡",
    timestamp: "8h",
    ratio: "aspect-square"
  },
  {
    id: 5,
    user: { username: "artist_hub", avatar: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=100" },
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=100&w=1080",
    likes: "31,200",
    caption: "Abstract thoughts captured in vibrant colors. Art is the language of the soul. 🎨💫",
    timestamp: "12h",
    ratio: "aspect-[4/5]"
  }
];

const SUGGESTIONS = [
  { id: 1, username: "cristiano", avatar: "https://i.pravatar.cc/100?u=cr7", mutual: "Followed by nasa + 12 others", pos: "top" },
  { id: 2, username: "leomessi", avatar: "https://i.pravatar.cc/100?u=messi", mutual: "Followed by nature + 5 others" },
  { id: 3, username: "natgeo", avatar: "https://i.pravatar.cc/100?u=natgeo", mutual: "Suggestions for you" },
  { id: 4, username: "apple", avatar: "https://i.pravatar.cc/100?u=apple", mutual: "Followed by tech_insider" },
];

const CHATS = [
  { id: 1, name: "nasa", avatar: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=100", lastMsg: "See you at the moon launch!", time: "1h" },
  { id: 2, name: "nature", avatar: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100", lastMsg: "Did you see that sunset?", time: "3h" },
  { id: 3, name: "tech_insider", avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100", lastMsg: "Check out the new SDK", time: "5h" },
];

// --- COMPONENTS ---

const SideNavItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`nav-item group ${active ? 'bg-zinc-500/5' : ''}`}
  >
    <div className="relative">
      <Icon className={`w-7 h-7 transition-all duration-300 ${active ? 'scale-110 text-instagram-blue' : 'group-hover:scale-110 group-active:scale-95'}`} />
      {label === 'Notifications' && <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-instagram-red rounded-full border-2 border-[var(--bg-primary)]"></div>}
      {label === 'Messages' && <div className="absolute -top-1 -right-1 bg-instagram-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</div>}
    </div>
    <span className={`hidden xl:block ${active ? 'font-black' : 'font-medium opacity-70 group-hover:opacity-100'}`}>{label}</span>
  </div>
);

const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
           onClose();
           return 100;
        }
        return prev + 1.2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      <div className="absolute top-8 left-8 right-8 flex gap-1 z-10">
        <div className="flex-grow h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>
      
      <div className="absolute top-12 left-8 flex items-center gap-4 z-10 text-white">
        <img src={story.img} className="w-10 h-10 rounded-full border border-white/20" />
        <span className="font-bold tracking-tight text-sm shadow-sm">{story.username}</span>
        <span className="text-white/50 text-xs font-medium">4h</span>
      </div>

      <motion.div 
         initial={{ scale: 0.9, opacity: 0 }} 
         animate={{ scale: 1, opacity: 1 }}
         className="max-w-[450px] w-full aspect-[9/16] relative rounded-3xl overflow-hidden shadow-2xl shadow-white/5 bg-zinc-900"
      >
         <img src={story.img} className="w-full h-full object-cover"  style={{ objectPosition: story.pos || 'center' }} />
         <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
         <div className="absolute bottom-10 left-0 right-0 p-8 flex items-center gap-4">
            <input 
              type="text" 
              placeholder={`Reply to ${story.username}...`} 
              className="flex-grow bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-white/60 outline-none focus:bg-white/20 transition-all font-medium"
              onClick={(e) => e.stopPropagation()}
            />
            <Send className="text-white w-6 h-6 hover:scale-110 transition-transform" />
         </div>
      </motion.div>

      <button className="absolute top-12 right-8 text-white/50 hover:text-white transition-colors" onClick={onClose}>
        <PlusSquare className="w-10 h-10 rotate-45" />
      </button>
    </motion.div>
  );
};

// --- PAGES ---

const HomeFeed = ({ isDark }) => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <section className="flex-grow max-w-[630px] pt-8 px-4 pb-10 mx-auto">
      <AnimatePresence>
        {selectedStory && <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />}
      </AnimatePresence>

      <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar py-2">
        {STORIES.map(story => (
          <div key={story.id} className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0 group" onClick={() => setSelectedStory(story)}>
            <div className={`relative ${story.unseen ? 'story-ring' : 'p-[2px] border border-zinc-200 dark:border-zinc-800 rounded-full'} transition-transform group-hover:scale-105 active:scale-95 duration-300`}>
              <div className="w-[66px] h-[66px] rounded-full border-2 border-[var(--bg-primary)] overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-lg group-hover:shadow-instagram-blue/20">
                <img src={story.img} alt={story.username} className="w-full h-full object-cover" style={{ objectPosition: story.pos || 'center' }} />
              </div>
              {story.isUser && (
                <div className="absolute bottom-0.5 right-0.5 bg-instagram-blue border-2 border-[var(--bg-primary)] rounded-full p-1 shadow-xl">
                  <PlusSquare className="w-3.5 h-3.5 text-white fill-white" />
                </div>
              )}
            </div>
            <span className={`text-[11px] font-black uppercase tracking-widest truncate w-[70px] text-center ${story.unseen ? 'text-[var(--text-primary)]' : 'text-zinc-500 opacity-60'}`}>
              {story.username.slice(0, 8)}..
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-10">
        {POSTS.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  );
};

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="card mb-6 max-w-[475px] mx-auto transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] group/card">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/5">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-instagram-blue transition-all p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
               <img src={post.user.avatar} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-tight flex items-center gap-1.5">{post.user.username} {post.user.verified && <Verified className="w-3.5 h-3.5 text-instagram-blue fill-instagram-blue p-0.5 bg-white rounded-full" />}</span>
            <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-none mt-0.5">{post.timestamp} ago</span>
          </div>
        </div>
        <button className="p-2 hover:bg-zinc-500/10 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-zinc-500" />
        </button>
      </div>
      
      <div className={`relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${post.ratio || 'aspect-square'}`}>
        {!imgLoaded && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-200/20 to-transparent animate-scanning" />}
        <img 
          src={post.image} 
          className={`w-full h-full object-cover transition-all duration-1000 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} group-hover/card:scale-105`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 pointer-events-none border-[12px] border-white/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
      </div>

      <div className="px-6 py-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.button whileTap={{ scale: 1.5 }} onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-7 h-7 transition-all ${isLiked ? 'text-instagram-red fill-instagram-red' : 'hover:scale-110 active:scale-95'}`} />
            </motion.button>
            <MessageCircle className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" />
            <Send className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <Bookmark className="w-7 h-7 hover:scale-110 transition-transform cursor-pointer" />
        </div>
        <div className="text-sm space-y-2">
          <p className="font-black tracking-tight text-base italic">{post.likes} likes</p>
          <div className="flex gap-2 leading-relaxed">
            <span className="font-black italic">{post.user.username}</span>
            <span className={`${showMore ? "" : "line-clamp-2"} text-zinc-700 dark:text-zinc-300 font-bold opacity-90`}>{post.caption}</span>
          </div>
          {!showMore && <button onClick={() => setShowMore(true)} className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-instagram-blue py-1 transition-colors">Read Full Description</button>}
        </div>
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/30 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden opacity-40 hover:opacity-100 transition-opacity">
             <img src={USER_PIC} className="w-full h-full object-cover" />
          </div>
          <input type="text" placeholder="WRITE A THOUGHT..." className="flex-grow bg-transparent outline-none text-[10px] font-black uppercase tracking-[0.2em] placeholder:text-zinc-400" />
          <button className="text-instagram-blue text-[10px] font-black uppercase tracking-[0.2em] opacity-30 hover:opacity-100 transition-opacity pr-2">Share</button>
        </div>
      </div>
    </div>
  );
};

const ExplorePage = () => (
  <div className="max-w-[1000px] mx-auto pt-10 px-4 animate-fade-in pb-20">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-8">
      {[...Array(18)].map((_, i) => (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.02 }}
          key={i} 
          className={`overflow-hidden group relative cursor-pointer rounded-2xl shadow-xl ${i % 5 === 0 ? 'row-span-2' : 'aspect-square'}`}
        >
          <img src={`https://picsum.photos/600/${i % 5 === 0 ? 1200 : 600}?random=${i + 300}`} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px]">
               <div className="absolute bottom-6 left-6 text-white flex items-center gap-6">
                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><Heart className="w-5 h-5 fill-white" /> {Math.floor(Math.random() * 900)}k</div>
                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest"><MessageCircle className="w-5 h-5 fill-white" /> {Math.floor(Math.random() * 100)}</div>
               </div>
          </div>
          {i % 5 === 0 && <Film className="absolute top-6 right-6 w-6 h-6 text-white drop-shadow-2xl" />}
        </motion.div>
      ))}
    </div>
  </div>
);

const SearchPage = () => {
    const [query, setQuery] = useState('');
    return (
        <div className="max-w-[700px] mx-auto pt-10 px-4 w-full flex flex-col min-h-screen">
            <div className="relative mb-12 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-instagram-blue transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search creators, photos, styles..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-900/50 border-2 border-transparent focus:border-instagram-blue/20 rounded-3xl py-4.5 pl-16 pr-12 outline-none shadow-sm focus:shadow-2xl focus:shadow-instagram-blue/5 transition-all text-lg font-bold"
                />
            </div>
            {!query ? (
                <div className="grid grid-cols-3 gap-3">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg">
                            <img src={`https://picsum.photos/400/400?random=${i + 150}`} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center space-y-4 opacity-50">
                    <Search className="w-16 h-16 mx-auto mb-4" />
                    <p className="font-black uppercase tracking-[0.2em] text-xs">Exploring "{query}" ...</p>
                </div>
            )}
        </div>
    );
};

const ReelsPage = () => (
    <div className="snap-y-container no-scrollbar bg-black h-screen overflow-y-scroll">
      {[...Array(12)].map((_, i) => (
          <div key={i} className="h-screen w-full snap-start relative flex flex-col justify-end p-8 bg-zinc-900 border-b border-white/5">
              <img src={`https://picsum.photos/600/1200?random=${i + 850}`} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="relative z-10 flex items-end justify-between max-w-[500px] mx-auto w-full pb-10">
                  <div className="space-y-4 text-white animate-fade-in pr-10">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border border-white/20" />
                        <span className="font-black text-sm tracking-tight text-white shadow-sm">user_{i+100}</span>
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/20">Follow</button>
                      </div>
                      <p className="text-sm font-medium leading-relaxed drop-shadow-md">New cinematic drops every Friday. The future of motion is here. 🎞️🎥 #vibe #motion #creative</p>
                      <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md self-start px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">
                          <Monitor className="w-3.5 h-3.5" /> Original Audio_HQ
                      </div>
                  </div>
                  <div className="flex flex-col gap-8 mb-2">
                       <div className="flex flex-col items-center gap-1.5 group">
                           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all cursor-pointer"><Heart className="w-6 h-6" /></div>
                           <span className="text-[10px] font-black">12.4k</span>
                       </div>
                       <div className="flex flex-col items-center gap-1.5 group">
                           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all cursor-pointer"><MessageSquare className="w-6 h-6" /></div>
                           <span className="text-[10px] font-black">482</span>
                       </div>
                       <div className="flex flex-col items-center gap-1.5 group">
                           <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all cursor-pointer"><Send className="w-6 h-6" /></div>
                           <span className="text-[10px] font-black">2.1k</span>
                       </div>
                  </div>
              </div>
          </div>
      ))}
    </div>
);

const MessagesPage = () => (
    <div className="max-w-[935px] mx-auto h-[calc(100vh-20px)] mt-4 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex overflow-hidden bg-[var(--bg-primary)]/50 backdrop-blur-3xl m-4">
      <div className="w-full md:w-[350px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
          <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
             <h2 className="text-xl font-black italic tracking-tighter">itsamreshanand</h2>
             <Send className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-2">
             {CHATS.map(chat => (
                 <div key={chat.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-zinc-500/5 transition-all cursor-pointer group">
                    <img src={chat.avatar} className="w-14 h-14 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800" />
                    <div>
                        <p className="font-black text-sm tracking-tight group-hover:text-instagram-blue">{chat.name}</p>
                        <p className="text-[11px] text-zinc-500 font-bold opacity-60">{chat.lastMsg} • {chat.time}</p>
                    </div>
                 </div>
             ))}
          </div>
      </div>
      <div className="hidden md:flex flex-grow flex-col items-center justify-center gap-8 bg-zinc-500/5">
          <div className="w-24 h-24 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center p-6 opacity-30 shadow-2xl">
             <MessageCircle className="w-full h-full" />
          </div>
          <div className="text-center space-y-3">
             <h2 className="text-2xl font-black italic tracking-tighter">Your Messages</h2>
             <p className="text-zinc-500 font-medium max-w-xs mx-auto">Send secure private photos and messages to a friend or group.</p>
             <button className="btn-follow !px-10 !py-3">Send Message</button>
          </div>
      </div>
    </div>
);

const NotificationsPage = () => (
    <div className="max-w-[600px] mx-auto pt-12 px-6 animate-fade-in pb-20">
        <h1 className="text-3xl font-black italic tracking-tighter mb-10">Notifications</h1>
        <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 opacity-50 px-2">This Month</p>
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-5">
                       <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-12 h-12 rounded-full border-2 border-[var(--bg-primary)] shadow-md" />
                       <p className="text-sm">
                          <span className="font-black italic">user_{i+400}</span>
                          <span className="text-zinc-500 ml-4 font-medium">shared a post with you.</span>
                       </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800"></div>
                </div>
            ))}
        </div>
    </div>
);

const CreatePage = () => (
    <div className="max-w-[700px] mx-auto h-[calc(100vh-100px)] flex items-center justify-center animate-fade-in">
        <div className="card w-full p-20 text-center flex flex-col items-center gap-10 border-dashed border-4 border-zinc-200 dark:border-zinc-800">
            <div className="w-24 h-24 rounded-full bg-instagram-blue/5 flex items-center justify-center shadow-inner"><ImageIcon className="w-12 h-12 text-instagram-blue/40" /></div>
            <h2 className="text-2xl font-black italic tracking-tighter">Upload photos and videos</h2>
            <button className="btn-follow !px-12 !py-4">Select from device</button>
        </div>
    </div>
);

const ProfilePage = () => {
  const [tab, setTab] = useState('posts');
  return (
    <div className="max-w-[935px] mx-auto pt-12 px-4 animate-fade-in pb-20">
        <header className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-20">
            <div className="relative group cursor-pointer">
               <div className="w-[160px] h-[160px] rounded-full p-1.5 shadow-[0_0_50px_rgba(220,39,67,0.1)] hover:shadow-instagram-blue/20 transition-all duration-700">
                  <img src={USER_PIC} className="w-full h-full rounded-full object-cover border-2 border-white/10" />
               </div>
            </div>
            <div className="space-y-8 flex-grow">
               <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  <h1 className="text-3xl font-black italic tracking-tighter">itsamreshanand</h1>
                  <div className="flex gap-3">
                      <button className="btn-secondary !bg-zinc-100 dark:!bg-zinc-900 border border-border/10">Edit profile</button>
                      <button className="btn-secondary !bg-zinc-100 dark:!bg-zinc-900 border border-border/10">View archive</button>
                      <Settings className="w-7 h-7 cursor-pointer hover:bg-border/10 p-1 rounded-full" />
                  </div>
               </div>
               <div className="flex gap-12 font-black italic opacity-80">
                  <div>214 <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 not-italic ml-1">posts</span></div>
                  <div>1.2k <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 not-italic ml-1">followers</span></div>
                  <div>842 <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 not-italic ml-1">following</span></div>
               </div>
               <div className="max-w-md">
                   <p className="font-black text-xl mb-2 italic">Amresh Anand</p>
                   <p className="text-zinc-500 font-medium leading-relaxed mb-6">Building technical art for the decentralized web. 🎨🚀 Creative Engineering at InstaClone.</p>
                   <div className="inline-flex items-center gap-2 bg-instagram-blue/10 text-instagram-blue px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-instagram-blue/20 cursor-pointer hover:bg-instagram-blue/20 transition-all">
                      <Monitor className="w-4 h-4" /> Threads
                   </div>
               </div>
            </div>
        </header>

        <div className="flex justify-center gap-16 border-t border-zinc-100 dark:border-zinc-800/50">
            <button onClick={() => setTab('posts')} className={`flex items-center gap-2 py-4 border-t-2 font-black uppercase tracking-widest text-[10px] transition-all ${tab === 'posts' ? 'border-[var(--text-primary)] opacity-100' : 'border-transparent opacity-30 hover:opacity-100'}`}>
                <Grid className="w-4 h-4" /> Posts
            </button>
            <button onClick={() => setTab('reels')} className={`flex items-center gap-2 py-4 border-t-2 font-black uppercase tracking-widest text-[10px] transition-all ${tab === 'reels' ? 'border-[var(--text-primary)] opacity-100' : 'border-transparent opacity-30 hover:opacity-100'}`}>
                <Film className="w-4 h-4" /> Reels
            </button>
            <button onClick={() => setTab('tagged')} className={`flex items-center gap-2 py-4 border-t-2 font-black uppercase tracking-widest text-[10px] transition-all ${tab === 'tagged' ? 'border-[var(--text-primary)] opacity-100' : 'border-transparent opacity-30 hover:opacity-100'}`}>
                <Tag className="w-4 h-4" /> Tagged
            </button>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-8 pt-10">
           {[...Array(9)].map((_, i) => (
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.05 }} key={i} className="aspect-square rounded-3xl overflow-hidden group relative shadow-2xl">
                   <img src={`https://picsum.photos/500/500?random=${i + 600}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm flex items-center justify-center gap-8 text-white font-black">
                       <div className="flex items-center gap-2"><Heart className="w-7 h-7 fill-white" /> 164</div>
                       <div className="flex items-center gap-2"><MessageCircle className="w-7 h-7 fill-white" /> 24</div>
                   </div>
               </motion.div>
           ))}
        </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isDark, setIsDark] = useState(true);

  const renderContent = () => {
    switch(activePage) {
      case 'home': return <div className="animate-fade-in"><HomeFeed isDark={isDark} /></div>;
      case 'search': return <div className="animate-fade-in"><SearchPage /></div>;
      case 'explore': return <div className="animate-fade-in"><ExplorePage /></div>;
      case 'reels': return <div className="animate-fade-in"><ReelsPage /></div>;
      case 'messages': return <div className="animate-fade-in"><MessagesPage /></div>;
      case 'notifications': return <div className="animate-fade-in"><NotificationsPage /></div>;
      case 'create': return <div className="animate-fade-in"><CreatePage /></div>;
      case 'profile': return <div className="animate-fade-in"><ProfilePage /></div>;
      default: return <div className="animate-fade-in"><HomeFeed isDark={isDark} /></div>;
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''} selection:bg-instagram-blue/30`}>
      <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-700">
        
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[245px] border-r border-[var(--border)] flex flex-col p-3 z-50 bg-[var(--bg-primary)] transition-all">
          <div className="xl:px-3 mb-10 py-8">
            <div 
              className="hidden xl:flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => setActivePage('home')}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-[var(--bg-primary)] p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                   <Camera className="w-7 h-7 text-[#dc2743]" />
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter cool-logo mt-1">Instagram</h1>
            </div>
            <div className="xl:hidden flex justify-center cursor-pointer group relative" onClick={() => setActivePage('home')}>
               <div className="absolute -inset-1 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
               <div className="relative bg-[var(--bg-primary)] p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <Camera className="w-6 h-6 text-[#dc2743]" />
               </div>
            </div>
          </div>

          <nav className="flex-grow space-y-2">
            <SideNavItem icon={Home} label="Home" active={activePage === 'home'} onClick={() => setActivePage('home')} />
            <SideNavItem icon={Search} label="Search" active={activePage === 'search'} onClick={() => setActivePage('search')} />
            <SideNavItem icon={Compass} label="Explore" active={activePage === 'explore'} onClick={() => setActivePage('explore')} />
            <SideNavItem icon={Film} label="Reels" active={activePage === 'reels'} onClick={() => setActivePage('reels')} />
            <SideNavItem icon={MessageCircle} label="Messages" active={activePage === 'messages'} onClick={() => setActivePage('messages')} />
            <SideNavItem icon={Heart} label="Notifications" active={activePage === 'notifications'} onClick={() => setActivePage('notifications')} />
            <SideNavItem icon={PlusSquare} label="Create" active={activePage === 'create'} onClick={() => setActivePage('create')} />
            <div onClick={() => setActivePage('profile')} className={`nav-item group cursor-pointer ${activePage === 'profile' ? 'bg-zinc-500/5' : ''}`}>
               <div className={`w-6 h-6 rounded-full overflow-hidden border-2 ${activePage === 'profile' ? 'border-instagram-blue shadow-[0_0_10px_rgba(0,149,246,0.5)]' : 'border-transparent'} transition-all duration-300 group-hover:scale-110`}>
                 <img src={USER_PIC} className="w-full h-full object-cover" />
               </div>
               <span className={`hidden xl:block ${activePage === 'profile' ? 'font-black' : ''}`}>Profile</span>
            </div>
          </nav>

          <div className="mt-auto space-y-2 pt-4 border-t border-[var(--border)]">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="nav-item w-full flex items-center gap-4 hover:bg-zinc-500/10 transition-all group"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isDark ? 
                  <Sun className="w-6 h-6 text-yellow-400 animate-pulse group-hover:rotate-45 transition-transform" /> : 
                  <Moon className="w-6 h-6 text-indigo-500 animate-pulse group-hover:-rotate-12 transition-transform" />
                }
              </div>
              <span className="hidden xl:block font-medium">{isDark ? 'Light Appearance' : 'Dark Appearance'}</span>
            </button>
            <SideNavItem icon={MoreHorizontal} label="More Settings" active={false} />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-grow flex justify-center ml-[72px] xl:ml-[245px]`}>
          <div className={`flex w-full ${activePage === 'home' ? 'max-w-[1000px]' : (activePage === 'reels' ? 'max-w-full' : 'max-w-[1000px]')}`}>
            
            <section className="flex-grow min-w-0">
               {renderContent()}
            </section>

            {/* Right Sidebar - Only on Home */}
            {activePage === 'home' && (
              <aside className="hidden lg:block w-[320px] pt-12 px-8">
                <div className="flex items-center justify-between mb-8 p-3 rounded-2xl hover:bg-zinc-500/5 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={USER_PIC} className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-800 p-0.5" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[var(--bg-primary)] rounded-full"></div>
                    </div>
                    <div className="text-sm">
                      <p className="font-bold tracking-tight">itsamreshanand</p>
                      <p className="text-zinc-500 text-xs font-medium">Newton School of Tech</p>
                    </div>
                  </div>
                  <button className="text-instagram-blue text-xs font-bold hover:text-blue-700 transition-colors">Switch</button>
                </div>

                <div className="flex items-center justify-between mb-6 px-3">
                  <span className="text-zinc-500 font-bold text-sm tracking-tight">Suggested for you</span>
                  <button className="text-[var(--text-primary)] text-xs font-bold hover:opacity-70 transition-opacity">See All</button>
                </div>

                <div className="space-y-2 mb-10">
                  {SUGGESTIONS.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-500/5 transition-all group">
                       <div className="flex items-center gap-4">
                          <img src={s.avatar} className="w-9 h-9 rounded-full border border-zinc-100 dark:border-zinc-800" style={{ objectPosition: s.pos || 'center' }} />
                          <div className="text-xs">
                             <p className="font-bold group-hover:text-instagram-blue transition-colors">{s.username}</p>
                             <p className="text-zinc-500 truncate w-32 font-medium">{s.mutual}</p>
                          </div>
                       </div>
                       <button className="text-instagram-blue text-xs font-bold hover:text-blue-700">Follow</button>
                    </div>
                  ))}
                </div>

                <footer className="px-3">
                   <div className="text-[11px] text-zinc-500/60 uppercase tracking-widest font-bold leading-relaxed">
                      About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
                   </div>
                   <p className="text-[10px] text-zinc-500/40 uppercase tracking-[0.2em] mt-6 font-black">© 2026 INSTAGRAM FROM META</p>
                </footer>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
