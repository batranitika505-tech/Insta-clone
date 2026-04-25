import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, 
  MoreHorizontal, Verified, Volume2, VolumeX, Bookmark, Share2, 
  MessageSquare, User, Settings, Grid, Monitor, Tag, Image as ImageIcon,
  Send, Camera, Info, CheckCircle2, Moon, Sun, ArrowLeft, Play, Pause,
  Instagram, LayoutGrid
} from 'lucide-react';

// --- MOCK DATA ---
const USER_PIC = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
const COLLAGE = "/social_avatars_collage_1777122715028.png";
const POST_1 = "/scenic_post_1_1777122562301.png";
const POST_2 = "/urban_post_2_1777122580337.png";
const FOOD_DOG = "/food_dog_posts_1777122743264.png";
const AVATAR_1 = "/avatar_1_1777122828048.png";

const STORIES = [
  { id: 1, username: 'your_story', img: USER_PIC, isUser: true },
  { id: 2, username: 'elara_sky', img: AVATAR_1, unseen: true },
  { id: 3, username: 'm_lucas', img: COLLAGE, unseen: true, pos: 'left top' },
  { id: 4, username: 'nina.styles', img: COLLAGE, unseen: true, pos: 'right top' },
  { id: 5, username: 'alex_vibe', img: COLLAGE, unseen: true, pos: 'center center' },
  { id: 6, username: 'sophie.q', img: COLLAGE, unseen: false, pos: 'left bottom' },
];

const POSTS = [
  {
    id: 1,
    user: { username: 'traveler.joe', avatar: COLLAGE, verified: true, pos: 'left top' },
    image: POST_1,
    likes: '1,234',
    timestamp: '2h',
    caption: 'Chasing sunsets and making memories. This place is absolute magic! ✨ #travel #sunset #vibes',
    comments: '42'
  },
  {
    id: 2,
    user: { username: 'architect_daily', avatar: COLLAGE, verified: true, pos: 'right top' },
    image: POST_2,
    likes: '856',
    timestamp: '5h',
    caption: 'Symmetry is a language of its own. Exploring some minimalist gems today. 🏛️ #design #minimalism',
    comments: '18'
  },
  {
    id: 3,
    user: { username: 'foodie_life', avatar: COLLAGE, verified: false, pos: 'center top' },
    image: FOOD_DOG,
    likes: '2,903',
    timestamp: '8h',
    caption: 'Weekend brunch done right. This avocado toast is a work of art! 🥑☕ #brunch #foodporn',
    comments: '124',
    isSplit: true
  },
  {
    id: 4,
    user: { username: 'puppy_world', avatar: AVATAR_1, verified: true },
    video: true,
    image: FOOD_DOG,
    imagePos: 'right',
    likes: '10.5K',
    timestamp: '1d',
    caption: 'Met a new friend today! Isn\'t he the cutest? 🐕❤️ #puppy #doglovers #cute',
    comments: '562'
  }
];

const MOCK_USERS = [
  { username: 'nitika', bio: 'Photography lover 📸', posts: '240', followers: '12.4k', following: '540' },
  { username: 'amresh', bio: 'Coder by day 💻', posts: '85', followers: '4.2k', following: '210' },
  { username: 'shravani', bio: 'Dance is life 💃', posts: '310', followers: '28k', following: '1.2k' },
  { username: 'alex_vibe', bio: 'Traveler ✈️', posts: '190', followers: '9.1k', following: '890' },
  { username: 'sophie.q', bio: 'Art & design 🎨', posts: '420', followers: '51k', following: '2k' },
  { username: 'mayuri', bio: 'Fashion & Lifestyle ✨', posts: '150', followers: '15k', following: '300' },
  { username: 'rahul', bio: 'Fitness freak 💪', posts: '200', followers: '8k', following: '450' },
  { username: 'laxman', bio: 'Traveler & Explorer 🌍', posts: '120', followers: '5k', following: '600' },
  { username: 'zeeshan', bio: 'Tech enthusiast 🚀', posts: '90', followers: '3.5k', following: '200' },
  { username: 'nidhi', bio: 'Foodie & Chef 🍳', posts: '250', followers: '20k', following: '1k' },
];

const SUGGESTIONS = [
  { id: 1, username: 'cristiano', avatar: COLLAGE, mutual: 'Followed by leomessi + 2 more', pos: 'left center' },
  { id: 2, username: 'the_rock', avatar: COLLAGE, mutual: 'Followed by kevinhart + 5 more', pos: 'right center' },
  { id: 3, username: 'zendaya', avatar: COLLAGE, mutual: 'Followed by tomholland + 1 more', pos: 'center center' },
  { id: 4, username: 'natgeo', avatar: COLLAGE, mutual: 'Followed by earth + 12 more', pos: 'left bottom' },
];

const CHATS = [
  { id: 1, name: 'elara_sky', lastMsg: 'See you there! 👋', time: '2h', avatar: AVATAR_1 },
  { id: 2, name: 'm_lucas', lastMsg: 'Sent a photo', time: '5h', avatar: COLLAGE, pos: 'left top' },
  { id: 3, name: 'nina.styles', lastMsg: 'The project looks great!', time: '12h', avatar: COLLAGE, pos: 'right top' },
];

// --- REUSABLE COMPONENTS ---

const SideNavItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`nav-item group transition-all duration-200 ${active ? 'font-bold' : 'font-normal opacity-80 hover:opacity-100'}`}
  >
    <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${active ? 'stroke-[3px]' : 'stroke-[2px]'}`} />
    <span className="hidden xl:block text-[16px]">{label}</span>
  </div>
);

// --- PAGES ---

const HomeFeed = ({ isDark }) => (
  <section className="flex-grow max-w-[630px] pt-8 px-4 pb-10 mx-auto">
    <div className="flex gap-4 mb-8 overflow-x-auto no-scrollbar py-2">
      {STORIES.map(story => (
        <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
          <div className={`relative ${story.unseen ? 'story-ring' : 'p-[1px] border border-zinc-500 rounded-full'}`}>
            <div className="w-[66px] h-[66px] rounded-full border-2 border-[var(--bg-primary)] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
              <img src={story.img} alt={story.username} className="w-full h-full object-cover" style={{ objectPosition: story.pos || 'center' }} />
            </div>
            {story.isUser && (
              <div className="absolute bottom-0 right-0 bg-blue-500 border-2 border-[var(--bg-primary)] rounded-full p-0.5 translate-x-1 translate-y-1">
                <PlusSquare className="w-4 h-4 text-white fill-white" />
              </div>
            )}
          </div>
          <span className="text-[12px] truncate w-20 text-center text-zinc-500 dark:text-zinc-400">{story.username}</span>
        </div>
      ))}
    </div>
    <div className="flex flex-col gap-4">
      {POSTS.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  </section>
);

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="card mb-6 max-w-[470px] mx-auto transition-all duration-500 hover:scale-[1.01]">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-transparent group-hover:border-ig-blue transition-all p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden">
               <img src={post.user.avatar} className="w-full h-full object-cover" style={{ objectPosition: post.user.pos || 'center' }} />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight">{post.user.username} {post.user.verified && <Verified className="inline w-3 h-3 text-ig-blue ml-0.5" />}</span>
            <span className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">{post.timestamp} ago</span>
          </div>
        </div>
        <button className="p-2 hover:bg-zinc-500/10 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-zinc-500" />
        </button>
      </div>
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative group">
        <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"  style={{ objectPosition: post.imagePos || 'center' }} />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Heart className={`w-7 h-7 cursor-pointer hover:scale-125 transition-all ${isLiked ? 'text-instagram-red fill-instagram-red animate-bounce' : 'hover:text-zinc-400'}`} onClick={() => setIsLiked(!isLiked)} />
            <MessageCircle className="w-7 h-7 cursor-pointer hover:scale-110 hover:text-zinc-400 transition-all" />
            <Send className="w-7 h-7 cursor-pointer hover:scale-110 hover:text-zinc-400 transition-all" />
          </div>
          <Bookmark className="w-7 h-7 cursor-pointer hover:scale-110 hover:text-zinc-400 transition-all" />
        </div>
        <div className="text-sm space-y-1">
          <p className="font-black tracking-tight">{post.likes} likes</p>
          <div className="flex gap-2">
            <span className="font-black">{post.user.username}</span>
            <span className={`${showMore ? "" : "line-clamp-2"} text-zinc-700 dark:text-zinc-300`}>{post.caption}</span>
          </div>
          {!showMore && <button onClick={() => setShowMore(true)} className="text-zinc-500 text-xs font-bold hover:underline py-1">view all comments</button>}
        </div>
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full overflow-hidden opacity-50">
             <img src={USER_PIC} className="w-full h-full object-cover" />
          </div>
          <input type="text" placeholder="Add a comment..." className="flex-grow bg-transparent outline-none text-sm placeholder:text-zinc-500 placeholder:font-medium" />
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = MOCK_USERS.filter(u => u.username.toLowerCase().includes(query.toLowerCase()));

  if (selectedUser) {
    return (
      <div className="max-w-[935px] mx-auto pt-10 px-4 animate-fade-in">
        <button onClick={() => setSelectedUser(null)} className="mb-8 flex items-center gap-3 font-bold text-sm tracking-widest uppercase hover:text-ig-blue transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Search
        </button>
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="relative">
            <img src={`https://i.pravatar.cc/150?u=${selectedUser.username}`} className="w-36 h-36 rounded-full border-4 border-[var(--bg-primary)] shadow-2xl" />
            <div className="absolute inset-0 rounded-full border border-black/5 dark:border-white/5 pointer-events-none"></div>
          </div>
          <div className="space-y-6 text-center md:text-left flex-grow">
            <div className="flex flex-col md:flex-row items-center gap-6">
               <h2 className="text-3xl font-black italic tracking-tighter">{selectedUser.username}</h2>
               <div className="flex gap-2">
                 <button className="btn-follow px-8">Follow</button>
                 <button className="btn-secondary px-6">Message</button>
               </div>
            </div>
            <div className="flex gap-10 justify-center md:justify-start">
               <div className="flex flex-col items-center md:items-start"><span className="font-black text-xl">{selectedUser.posts}</span> <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">posts</span></div>
               <div className="flex flex-col items-center md:items-start"><span className="font-black text-xl">{selectedUser.followers}</span> <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">followers</span></div>
               <div className="flex flex-col items-center md:items-start"><span className="font-black text-xl">{selectedUser.following}</span> <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">following</span></div>
            </div>
            <div className="max-w-md">
              <p className="font-bold text-lg mb-1">{selectedUser.username}</p>
              <p className="text-zinc-500 font-medium leading-relaxed">{selectedUser.bio}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-8 pb-20">
          {[1,2,3,4,5,6].map(n => (
            <div key={n} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden group relative shadow-lg">
               <img src={`https://picsum.photos/400/400?random=${n + 50}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                  <div className="flex items-center gap-2"><Heart className="w-6 h-6 fill-white" /> 84</div>
                  <div className="flex items-center gap-2"><MessageCircle className="w-6 h-6 fill-white" /> 15</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto pt-10 px-4 w-full flex flex-col">
      <div className="relative mb-10 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-ig-blue transition-colors" />
        <input 
          type="text" 
          placeholder="Search creators, photos, styles..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-100 dark:bg-zinc-900 border-2 border-transparent focus:border-ig-blue/20 rounded-2xl py-4 pl-14 pr-12 outline-none shadow-sm focus:shadow-xl focus:shadow-ig-blue/5 transition-all text-lg font-medium"
        />
        {query && <button onClick={() => setQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 bg-zinc-200 dark:bg-zinc-800 rounded-full p-1 transition-colors"><PlusSquare className="w-4 h-4 rotate-45" /></button>}
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
        {!query ? (
          <div className="grid grid-cols-3 gap-3">
            {[...Array(15)].map((_, i) => (
               <div key={i} className="aspect-square overflow-hidden cursor-pointer group rounded-2xl shadow-md">
                 <img src={`https://picsum.photos/400/400?random=${i + 100}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
                 <div className="absolute inset-0 bg-ig-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <div 
                key={user.username} 
                className="flex items-center justify-between p-5 bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-100 dark:border-zinc-800/50 cursor-pointer hover:shadow-2xl hover:shadow-ig-blue/10 transition-all group"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                   <div className="relative">
                     <img src={`https://i.pravatar.cc/150?u=${user.username}`} className="w-14 h-14 rounded-full border-2 border-zinc-50 dark:border-zinc-800 group-hover:border-ig-blue transition-colors" />
                     <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-ig-blue/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <CheckCircle2 className="w-3 h-3 text-ig-blue" />
                     </div>
                   </div>
                   <div>
                     <div className="font-black tracking-tight text-sm group-hover:text-ig-blue transition-colors">{user.username}</div>
                     <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">{user.followers} followers</div>
                   </div>
                </div>
                <FollowButton />
              </div>
            )) : (
              <div className="col-span-full text-center py-20">
                <Search className="w-16 h-16 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">No creators matching "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const FollowButton = () => {
    const [following, setFollowing] = useState(false);
    return (
        <button 
            onClick={(e) => { e.stopPropagation(); setFollowing(!following); }} 
            className={`${following ? 'btn-secondary' : 'btn-follow'} !px-4 !py-1.5 !text-[11px] !rounded-xl !uppercase !tracking-widest`}
        >
            {following ? 'Following' : 'Follow'}
        </button>
    );
};

const ReelsPage = () => (
  <div className="snap-y-container no-scrollbar bg-black h-screen">
    {[...Array(6)].map((_, i) => <ReelItem key={i} index={i} />)}
  </div>
);

const ReelItem = ({ index }) => {
  const [liked, setLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="reel-container" onClick={() => setIsPlaying(!isPlaying)}>
      <img src={`https://picsum.photos/600/1200?random=${index + 200}`} className="absolute inset-0 w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Play className="w-20 h-20 text-white/40 drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-end justify-between w-full h-full max-w-[500px] mx-auto pb-10 px-4">
         <div className="flex flex-col gap-4 p-4 text-white animate-fade-in">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border-2 border-white/50 p-0.5 group cursor-pointer hover:border-white transition-all overflow-hidden">
                 <img src={`https://i.pravatar.cc/100?u=${index}`} className="w-full h-full rounded-full object-cover" />
               </div>
               <span className="font-black text-sm tracking-tight shadow-sm">user_{index + 100}</span>
               <button className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all">Follow</button>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-90 drop-shadow-lg">Cinematic vibes on the horizon. Explorations in minimalist motion. 🎥🎬 #motion #design #vibe</p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-70 bg-black/20 backdrop-blur-sm self-start px-3 py-1.5 rounded-full">
              <Monitor className="w-3 h-3" /> Original Audio_HQ
            </div>
         </div>

         <div className="flex flex-col items-center gap-8 p-4 mb-2">
            <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-all cursor-pointer">
                <Heart className={`w-7 h-7 transition-all ${liked ? 'text-instagram-red fill-instagram-red scale-110' : 'text-white hover:text-instagram-red'}`} onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} />
               </div>
               <span className="text-[10px] text-white font-black">{liked ? '12.5k' : '12.4k'}</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-all cursor-pointer">
                <MessageSquare className="w-7 h-7 text-white" />
               </div>
               <span className="text-[10px] text-white font-black">482</span>
            </div>
            <div className="flex flex-col items-center gap-2 group">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-all cursor-pointer">
                <Send className="w-7 h-7 text-white" />
               </div>
               <span className="text-[10px] text-white font-black">2.1k</span>
            </div>
            <div className="w-10 h-10 rounded-xl border-2 border-white/30 overflow-hidden shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                <img src={`https://picsum.photos/100/100?random=${index}`} className="w-full h-full object-cover" />
            </div>
         </div>
      </div>
    </div>
  );
};

// ... Rest of the pages remain similar but with theme variables ...
const ExplorePage = () => (
  <div className="max-w-[935px] mx-auto pt-8 px-4 pb-20">
    <div className="columns-2 md:columns-3 gap-1 space-y-1">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="overflow-hidden cursor-pointer group">
          <img src={`https://picsum.photos/300/${300 + (i%3)*50}?random=${i + 300}`} className="w-full h-auto object-cover hover:brightness-90 transition-all" />
        </div>
      ))}
    </div>
  </div>
);

const MessagesPage = () => (
    <div className="max-w-[935px] mx-auto h-[calc(100vh-20px)] mt-4 border border-zinc-200 dark:border-zinc-800 rounded-lg flex overflow-hidden bg-[var(--bg-primary)]">
      <div className="w-full md:w-[350px] border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        <div className="p-5 font-bold text-lg border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
           <span>itsamreshanand</span>
           <EditSquare className="w-5 h-5" />
        </div>
        <div className="p-4 space-y-4">
           {CHATS.map(c => (
               <div key={c.id} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg">
                  <img src={c.avatar} className="w-14 h-14 rounded-full border border-zinc-200 dark:border-zinc-800" />
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <p className="text-xs text-zinc-500">{c.lastMsg} • {c.time}</p>
                  </div>
               </div>
           ))}
        </div>
      </div>
      <div className="hidden md:flex flex-grow flex-col items-center justify-center p-10 text-center gap-4">
         <div className="w-24 h-24 rounded-full border-2 border-[var(--text-primary)] flex items-center justify-center">
            <MessageCircle className="w-12 h-12" />
         </div>
         <h2 className="text-xl font-semibold">Your Messages</h2>
         <p className="text-zinc-500 text-sm">Send private photos and messages to a friend or group.</p>
         <button className="btn-follow">Send Message</button>
      </div>
    </div>
);

const EditSquare = (props) => <div {...props} className="w-5 h-5 border-2 border-current rounded-md relative flex items-center justify-center"><div className="w-3 h-0.5 bg-current rotate-45 transform translate-y-[-1px]"></div></div>;

const NotificationsPage = () => (
  <div className="max-w-[600px] mx-auto pt-8 px-4 space-y-6">
    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-lg px-2 transition-colors">
        <img src={`https://i.pravatar.cc/50?u=${i + 400}`} className="w-11 h-11 rounded-full flex-shrink-0" />
        <div className="flex-grow text-sm">
           <span className="font-bold">user_{i+5}</span> commented on your photo. <span className="text-zinc-500">2h</span>
        </div>
        <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
      </div>
    ))}
  </div>
);

const CreatePage = () => (
  <div className="max-w-[600px] mx-auto h-[calc(100vh-100px)] flex items-center justify-center">
    <div className="card w-full max-w-[500px] aspect-square flex flex-col items-center justify-center gap-4 p-10 border-dashed border-2 border-zinc-300 dark:border-zinc-700">
       <ImageIcon className="w-20 h-20 text-zinc-300 dark:text-zinc-600" />
       <p className="text-xl font-semibold">Drag photos and videos here</p>
       <button className="btn-follow">Select from computer</button>
    </div>
  </div>
);

const ProfilePage = () => (
  <div className="max-w-[935px] mx-auto pt-8 px-4 pb-20">
    <header className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-12">
      <img src={USER_PIC} className="w-36 h-36 rounded-full border border-zinc-200 dark:border-zinc-800 p-1" />
      <div className="space-y-4">
        <div className="flex items-center gap-5">
           <h1 className="text-xl">itsamreshanand</h1>
           <button className="btn-secondary">Edit Profile</button>
           <Settings className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex gap-10 font-semibold">
           <div>42 posts</div>
           <div>1.2k followers</div>
           <div>840 following</div>
        </div>
        <p className="font-bold">newton schol of technology</p>
        <p className="text-sm">Building the future of social creative experiences. 🚀✨</p>
      </div>
    </header>
    <div className="border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-1 md:gap-6 pt-6">
       {[...Array(9)].map((_, i) => (
         <div key={i} className="aspect-square bg-zinc-100 dark:bg-zinc-900 group relative">
            <img src={`https://picsum.photos/300/300?random=${i + 500}`} className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
            <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 text-white font-bold transition-opacity">
               <div className="flex items-center gap-1"><Heart className="w-5 h-5 fill-white" /> 124</div>
               <div className="flex items-center gap-1"><MessageCircle className="w-5 h-5 fill-white" /> 12</div>
            </div>
         </div>
       ))}
    </div>
  </div>
);

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
        <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[245px] border-r border-[var(--border)] flex flex-col p-4 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl transition-all duration-500">
          <div className="xl:px-4 mb-10 py-8">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActivePage('home')}>
                <Instagram className="w-8 h-8 text-white p-1.5 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg group-hover:scale-110 transition-transform" />
                <h1 className="hidden xl:block text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] group-hover:opacity-80 transition-opacity">
                  Instagram
                </h1>
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
               <span className={`hidden xl:block ${activePage === 'profile' ? 'font-bold' : ''}`}>Profile</span>
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
                  <button className="text-ig-blue text-xs font-bold hover:text-blue-700 transition-colors">Switch</button>
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
                             <p className="font-bold group-hover:text-ig-blue transition-colors">{s.username}</p>
                             <p className="text-zinc-500 truncate w-32 font-medium">{s.mutual}</p>
                          </div>
                       </div>
                       <button className="text-ig-blue text-xs font-bold hover:text-blue-700">Follow</button>
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
