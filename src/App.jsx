import React, { useState, useEffect } from 'react';
import { 
  Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, 
  MoreHorizontal, Verified, Volume2, VolumeX, Bookmark, Share2, 
  MessageSquare, User, Settings, Grid, Monitor, Tag, Image as ImageIcon,
  Send, Camera, Info, CheckCircle2, Moon, Sun, ArrowLeft, Play, Pause
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
    className={`nav-item group transition-all duration-200 ${active ? 'font-bold active-nav-item' : 'font-normal opacity-80 hover:opacity-100'}`}
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
          <div className={`relative ${story.unseen ? 'story-ring' : 'p-[2px] bg-zinc-300 dark:bg-zinc-600 rounded-full'}`}>
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
    <div className="post-card-wrapper mb-4 max-w-[470px] mx-auto p-[1px] rounded-[12px] transition-all duration-300 group">
      <div className="card border-none bg-[var(--bg-card)] rounded-[11px] overflow-hidden w-full h-full transition-colors duration-300">
        <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
            <img src={post.user.avatar} className="w-full h-full object-cover" style={{ objectPosition: post.user.pos || 'center' }} />
          </div>
          <span className="font-semibold text-sm">{post.user.username} {post.user.verified && <Verified className="inline w-3 h-3 text-blue-500" />}</span>
          <span className="text-zinc-500 text-sm">• {post.timestamp}</span>
        </div>
        <MoreHorizontal className="w-5 h-5 cursor-pointer" />
      </div>
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        <img src={post.image} className="w-full h-full object-cover"  style={{ objectPosition: post.imagePos || 'center' }} />
      </div>
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Heart className={`w-7 h-7 cursor-pointer hover:scale-110 transition-transform ${isLiked ? 'text-red-500 fill-red-500' : ''}`} onClick={() => setIsLiked(!isLiked)} />
            <MessageCircle className="w-7 h-7 cursor-pointer" />
            <Send className="w-7 h-7 cursor-pointer" />
          </div>
          <Bookmark className="w-7 h-7 cursor-pointer" />
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-1">{post.likes} likes</p>
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span className={showMore ? "" : "line-clamp-1"}>{post.caption}</span>
          {!showMore && <button onClick={() => setShowMore(true)} className="text-zinc-500 text-xs ml-1 hover:underline">more</button>}
        </div>
        <input type="text" placeholder="Add a comment..." className="w-full bg-transparent border-t border-zinc-100 dark:border-zinc-800 pt-2 outline-none text-sm placeholder:text-zinc-500" />
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
      <div className="max-w-[935px] mx-auto pt-8 px-4">
        <button onClick={() => setSelectedUser(null)} className="mb-6 flex items-center gap-2 font-semibold hover:text-zinc-500 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-10">
          <img src={`https://i.pravatar.cc/150?u=${selectedUser.username}`} className="w-32 h-32 rounded-full border border-zinc-200 dark:border-zinc-800" />
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center gap-4">
               <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
               <button className="btn-secondary">Follow</button>
            </div>
            <div className="flex gap-8 justify-center md:justify-start">
               <div><span className="font-bold">{selectedUser.posts}</span> posts</div>
               <div><span className="font-bold">{selectedUser.followers}</span> followers</div>
               <div><span className="font-bold">{selectedUser.following}</span> following</div>
            </div>
            <p className="font-semibold">{selectedUser.bio}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 md:gap-6 pb-20">
          {[1,2,3].map(n => (
            <div key={n} className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-sm overflow-hidden">
               <img src={`https://picsum.photos/300/300?random=${n + 50}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto pt-8 px-4 w-full h-screen flex flex-col">
      <div className="relative mb-6">
        <input 
          type="text" 
          placeholder="Search" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg py-2.5 pl-4 pr-10 outline-none focus:ring-1 focus:ring-zinc-400"
        />
        {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs bg-zinc-200 dark:bg-zinc-700 rounded-full px-1.5 py-0.5">X</button>}
      </div>

      <div className="flex-grow overflow-y-auto no-scrollbar pb-10">
        {!query ? (
          <div className="grid grid-cols-3 gap-1">
            {[...Array(12)].map((_, i) => (
               <div key={i} className="aspect-square overflow-hidden cursor-pointer group">
                 <img src={`https://picsum.photos/300/300?random=${i + 100}`} className="w-full h-full object-cover group-hover:brightness-90" />
               </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredUsers.length > 0 ? filteredUsers.map(user => (
              <div 
                key={user.username} 
                className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                   <img src={`https://i.pravatar.cc/150?u=${user.username}`} className="w-12 h-12 rounded-full border border-zinc-200 dark:border-zinc-700" />
                   <div>
                     <div className="font-semibold text-sm">{user.username}</div>
                     <div className="text-zinc-500 text-xs">{user.bio}</div>
                     <div className="text-zinc-400 text-[10px] mt-0.5">{user.followers} followers • {user.posts} posts</div>
                   </div>
                </div>
                <FollowButton />
              </div>
            )) : (
              <div className="text-center py-20 text-zinc-500">No users found for "{query}"</div>
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
            className={`${following ? 'btn-secondary' : 'btn-follow'} !px-3 !py-1 !text-xs`}
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
      <img src={`https://picsum.photos/400/800?random=${index + 200}`} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {!isPlaying && <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white/50" />}

      <div className="relative z-10 flex items-end justify-between w-full h-full max-w-[500px] mx-auto pb-4">
         <div className="flex flex-col gap-2 p-4 text-white">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                 <img src={`https://i.pravatar.cc/50?u=${index}`} className="w-full h-full object-cover" />
               </div>
               <span className="font-bold text-sm">user_{index + 100}</span>
               <button className="border border-white/50 px-2 py-0.5 rounded-md text-xs hover:bg-white/10 transition-colors">Follow</button>
            </div>
            <p className="text-sm line-clamp-2">Awesome vibes today! 🌅✨ #nature #vibe #reel #trending</p>
            <div className="flex items-center gap-2 text-xs opacity-90"><Monitor className="w-3 h-3" /> Original Audio - trending_waves</div>
         </div>

         <div className="flex flex-col items-center gap-6 p-4">
            <div className="flex flex-col items-center gap-1">
               <Heart className={`w-8 h-8 cursor-pointer transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'}`} onClick={(e) => { e.stopPropagation(); setLiked(!liked); }} />
               <span className="text-xs text-white font-semibold">{liked ? '4.9k' : '4.8k'}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
               <MessageSquare className="w-8 h-8 text-white cursor-pointer hover:opacity-70" />
               <span className="text-xs text-white font-semibold">124</span>
            </div>
            <div className="flex flex-col items-center gap-1">
               <Send className="w-8 h-8 text-white cursor-pointer hover:opacity-70" />
               <span className="text-xs text-white font-semibold">89</span>
            </div>
            <MoreHorizontal className="w-6 h-6 text-white cursor-pointer" />
            <div className="w-8 h-8 rounded-md border-2 border-white overflow-hidden">
                <img src={`https://picsum.photos/50/50?random=${index}`} className="w-full h-full object-cover" />
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
      case 'home': return <HomeFeed isDark={isDark} />;
      case 'search': return <SearchPage />;
      case 'explore': return <ExplorePage />;
      case 'reels': return <ReelsPage />;
      case 'messages': return <MessagesPage />;
      case 'notifications': return <NotificationsPage />;
      case 'create': return <CreatePage />;
      case 'profile': return <ProfilePage />;
      default: return <HomeFeed isDark={isDark} />;
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-[72px] xl:w-[245px] border-r border-[var(--border)] flex flex-col p-3 z-50 bg-[var(--bg-primary)] transition-all">
          <div className="xl:px-3 mb-10 py-8">
            <h1 
              className="hidden xl:block text-3xl font-bold tracking-tighter cursor-pointer select-none" 
              style={{ 
                fontFamily: "'Pacifico', cursive", 
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent", 
                filter: "drop-shadow(0 0 8px rgba(225, 48, 108, 0.4))" 
              }} 
              onClick={() => setActivePage('home')}
            >
              Instagram
            </h1>
            <div className="xl:hidden flex justify-center cursor-pointer" onClick={() => setActivePage('home')}>
               <div className="w-7 h-7 bg-[var(--text-primary)] rounded-md"></div>
            </div>
          </div>

          <nav className="flex-grow space-y-1">
            <SideNavItem icon={Home} label="Home" active={activePage === 'home'} onClick={() => setActivePage('home')} />
            <SideNavItem icon={Search} label="Search" active={activePage === 'search'} onClick={() => setActivePage('search')} />
            <SideNavItem icon={Compass} label="Explore" active={activePage === 'explore'} onClick={() => setActivePage('explore')} />
            <SideNavItem icon={Film} label="Reels" active={activePage === 'reels'} onClick={() => setActivePage('reels')} />
            <SideNavItem icon={MessageCircle} label="Messages" active={activePage === 'messages'} onClick={() => setActivePage('messages')} />
            <SideNavItem icon={Heart} label="Notifications" active={activePage === 'notifications'} onClick={() => setActivePage('notifications')} />
            <SideNavItem icon={PlusSquare} label="Create" active={activePage === 'create'} onClick={() => setActivePage('create')} />
            <div onClick={() => setActivePage('profile')} className={`nav-item group cursor-pointer ${activePage === 'profile' ? 'font-bold' : ''}`}>
               <div className={`w-6 h-6 rounded-full overflow-hidden border ${activePage === 'profile' ? 'border-[var(--text-primary)] border-2' : 'border-zinc-500'} transition-all`}>
                 <img src={USER_PIC} className="w-full h-full object-cover" />
               </div>
               <span className="hidden xl:block">Profile</span>
            </div>
          </nav>

          <div className="mt-auto space-y-2">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="nav-item w-full flex items-center gap-4 hover:bg-zinc-500/10 transition-colors"
            >
              {isDark ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-indigo-600" />}
              <span className="hidden xl:block">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <SideNavItem icon={MoreHorizontal} label="More" active={false} />
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
              <aside className="hidden lg:block w-[320px] pt-12 px-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <img src={USER_PIC} className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800" />
                    <div className="text-sm">
                      <p className="font-semibold">itsamreshanand</p>
                      <p className="text-zinc-500">newton schol of technology</p>
                    </div>
                  </div>
                  <button className="text-link">Switch</button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-500 font-semibold text-sm">Suggested for you</span>
                  <button className="text-[var(--text-primary)] text-xs font-semibold">See All</button>
                </div>

                <div className="space-y-4 mb-10">
                  {SUGGESTIONS.map(s => (
                    <div key={s.id} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <img src={s.avatar} className="w-8 h-8 rounded-full" style={{ objectPosition: s.pos || 'center' }} />
                          <div className="text-xs">
                             <p className="font-semibold">{s.username}</p>
                             <p className="text-zinc-500 truncate w-32">{s.mutual}</p>
                          </div>
                       </div>
                       <button className="text-link text-xs">Follow</button>
                    </div>
                  ))}
                </div>

                <footer className="text-[11px] text-zinc-500 space-y-4">
                   <p className="flex flex-wrap gap-x-1 uppercase">About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified</p>
                   <p className="uppercase tracking-widest">© 2026 INSTAGRAM FROM META</p>
                </footer>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
