/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  User, 
  Hammer, 
  MessageCircle, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Trash2, 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock,
  Send,
  Phone,
  Mail,
  MapPin,
  Filter,
  ArrowLeft,
  Bot
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- Types & Mock Data ---

type UserRole = 'guest' | 'customer' | 'artisan' | 'admin';
type View = 'landing' | 'auth' | 'dashboard' | 'profile' | 'chat' | 'notifications' | 'settings' | 'admin_stats' | 'admin_users' | 'admin_verify' | 'forgot_password';

const STATS_DATA = [
  { name: 'Jan', users: 400, services: 240 },
  { name: 'Feb', users: 600, services: 380 },
  { name: 'Mar', users: 800, services: 520 },
  { name: 'Apr', users: 1100, services: 700 },
];

const ARTISANS = [
  { id: 1, name: 'أحمد النجار', craft: 'نجارة', region: 'الجزائر العاصمة', rating: 4.8, verified: true, image: 'https://picsum.photos/seed/carpenter/200' },
  { id: 2, name: 'محمد السباك', craft: 'سباكة', region: 'وهران', rating: 4.5, verified: false, image: 'https://picsum.photos/seed/plumber/200' },
  { id: 3, name: 'ياسين الكهربائي', craft: 'كهرباء', region: 'قسنطينة', rating: 4.9, verified: true, image: 'https://picsum.photos/seed/electrician/200' },
];

// --- Components ---

const Logo = ({ className = "w-8 h-8" }) => (
  <div className="flex items-center gap-2">
    <div className={`bg-orange-600 rounded-lg flex items-center justify-center ${className}`}>
      <Hammer className="text-white w-2/3 h-2/3" />
    </div>
    <span className="text-xl font-bold tracking-tighter text-orange-600">الحرفي</span>
  </div>
);

export default function App() {
  const [role, setRole] = useState<UserRole>('guest');
  const [view, setView] = useState<View>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [signupType, setSignupType] = useState<'customer' | 'artisan'>('customer');
  const [selectedArtisan, setSelectedArtisan] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Views ---

  const LandingPage = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <Logo className="w-16 h-16 mb-8" />
      <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900">مرحباً بك في منصة الحرفي</h1>
      <p className="text-gray-500 text-lg max-w-2xl mb-10">المنصة الأولى لربط أفضل الحرفيين في منطقتك بالزبائن بكل سهولة وأمان.</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={() => { setAuthMode('login'); setView('auth'); }}
          className="flex-1 bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200"
        >
          تسجيل الدخول
        </button>
        <button 
          onClick={() => { setAuthMode('signup'); setView('auth'); }}
          className="flex-1 bg-white border-2 border-gray-200 text-gray-900 py-4 rounded-2xl font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all"
        >
          إنشاء حساب جديد
        </button>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
        <div className="p-6 bg-orange-50 rounded-3xl">
          <ShieldCheck className="w-10 h-10 text-orange-600 mb-4 mx-auto" />
          <h3 className="font-bold text-xl mb-2">حرفيون موثقون</h3>
          <p className="text-gray-500 text-sm">نقوم بالتحقق من هوية الحرفيين لضمان أفضل جودة.</p>
        </div>
        <div className="p-6 bg-orange-50 rounded-3xl">
          <MessageCircle className="w-10 h-10 text-orange-600 mb-4 mx-auto" />
          <h3 className="font-bold text-xl mb-2">تواصل مباشر</h3>
          <p className="text-gray-500 text-sm">دردشة فورية داخل المنصة أو عبر وسائل التواصل.</p>
        </div>
        <div className="p-6 bg-orange-50 rounded-3xl">
          <Bot className="w-10 h-10 text-orange-600 mb-4 mx-auto" />
          <h3 className="font-bold text-xl mb-2">مساعد ذكي</h3>
          <p className="text-gray-500 text-sm">ذكاء اصطناعي يساعدك في اختيار الحرفي المناسب.</p>
        </div>
      </div>
    </div>
  );

  const AuthPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => setView('landing')} className="p-2 hover:bg-gray-100 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <Logo className="w-8 h-8" />
        </div>

        {authMode === 'signup' && (
          <div className="flex bg-gray-100 p-1 rounded-2xl mb-8">
            <button 
              onClick={() => setSignupType('customer')}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${signupType === 'customer' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500'}`}
            >
              زبون
            </button>
            <button 
              onClick={() => setSignupType('artisan')}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all ${signupType === 'artisan' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500'}`}
            >
              حرفي
            </button>
          </div>
        )}

        <h2 className="text-3xl font-black mb-2">{authMode === 'login' ? 'مرحباً بعودتك' : 'إنشاء حساب'}</h2>
        <p className="text-gray-500 mb-8">{authMode === 'login' ? 'سجل دخولك لمتابعة أعمالك' : 'انضم إلينا اليوم كـ ' + (signupType === 'customer' ? 'زبون' : 'حرفي')}</p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setRole(signupType === 'artisan' ? 'artisan' : 'customer'); setView('dashboard'); }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 mr-1">البريد الإلكتروني أو الهاتف</label>
            <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="example@mail.com" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 mr-1">كلمة السر</label>
            <input type="password" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" placeholder="••••••••" required />
          </div>

          {authMode === 'signup' && signupType === 'artisan' && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-1">الحرفة</label>
                <select className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none">
                  <option>نجارة</option>
                  <option>سباكة</option>
                  <option>كهرباء</option>
                  <option>بناء</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 mr-1">المنطقة</label>
                <input type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" placeholder="الولاية، المدينة" />
              </div>
            </>
          )}

          {authMode === 'login' && (
            <button type="button" onClick={() => setView('forgot_password')} className="text-sm font-bold text-orange-600 hover:underline">نسيت كلمة السر؟</button>
          )}

          <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all mt-4">
            {authMode === 'login' ? 'دخول' : 'إنشاء حساب'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            {authMode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button 
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="text-orange-600 font-bold mr-1 hover:underline"
            >
              {authMode === 'login' ? 'سجل الآن' : 'سجل دخولك'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );

  const Sidebar = () => (
    <aside className={`fixed inset-y-0 right-0 bg-white border-l border-gray-100 transition-all duration-300 z-40 ${isSidebarOpen ? 'w-72' : 'w-0 overflow-hidden md:w-20'} ${isMobileMenuOpen ? 'w-72 translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
      <div className="h-full flex flex-col p-6">
        <div className="mb-10 flex items-center justify-between">
          <Logo className="w-8 h-8" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden"><X /></button>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', icon: <BarChart3 />, label: 'الرئيسية' },
            { id: 'chat', icon: <MessageCircle />, label: 'الرسائل' },
            { id: 'notifications', icon: <Bell />, label: 'الإشعارات' },
            { id: 'settings', icon: <Settings />, label: 'الإعدادات' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setView(item.id as View); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${view === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span className={`font-bold ${!isSidebarOpen && 'md:hidden'}`}>{item.label}</span>
            </button>
          ))}
          
          {role === 'admin' && (
            <div className="pt-6 mt-6 border-t border-gray-100 space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4 mb-2">لوحة الإدارة</p>
              {[
                { id: 'admin_stats', icon: <BarChart3 />, label: 'الإحصائيات' },
                { id: 'admin_users', icon: <Users />, label: 'المستخدمين' },
                { id: 'admin_verify', icon: <ShieldCheck />, label: 'التوثيق' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setView(item.id as View); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${view === item.id ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {item.icon}
                  <span className={`font-bold ${!isSidebarOpen && 'md:hidden'}`}>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </nav>

        <button 
          onClick={() => { setRole('guest'); setView('landing'); }}
          className="flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all mt-auto"
        >
          <LogOut />
          <span className={`font-bold ${!isSidebarOpen && 'md:hidden'}`}>خروج</span>
        </button>
      </div>
    </aside>
  );

  const CustomerDashboard = () => (
    <div className="space-y-10">
      {/* Search Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h2 className="text-3xl font-black mb-6">ابحث عن حرفي</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="ابحث بالاسم أو الحرفة..." className="w-full pr-12 pl-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-4 bg-gray-50 rounded-2xl flex items-center gap-2 font-bold text-gray-600 hover:bg-gray-100 transition-all">
              <MapPin className="w-5 h-5" /> المنطقة
            </button>
            <button className="px-6 py-4 bg-gray-50 rounded-2xl flex items-center gap-2 font-bold text-gray-600 hover:bg-gray-100 transition-all">
              <Filter className="w-5 h-5" /> تصفية
            </button>
          </div>
        </div>
      </div>

      {/* Featured Artisans */}
      <div>
        <div className="flex justify-between items-center mb-8 px-4">
          <h3 className="text-2xl font-black">أبرز الحرفيين</h3>
          <button className="text-orange-600 font-bold">عرض الكل</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTISANS.map((a) => (
            <motion.div 
              key={a.id}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 group"
            >
              <div className="relative mb-6">
                <img src={a.image} className="w-full aspect-square object-cover rounded-2xl" alt={a.name} referrerPolicy="no-referrer" />
                {a.verified && (
                  <div className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-lg">
                    <ShieldCheck className="text-orange-600 w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-black text-xl mb-1">{a.name}</h4>
                  <p className="text-gray-500 text-sm font-bold">{a.craft} • {a.region}</p>
                </div>
                <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                  <span className="text-orange-600 font-bold text-sm">{a.rating}</span>
                </div>
              </div>
              <button 
                onClick={() => { setSelectedArtisan(a); setShowServiceModal(true); }}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all"
              >
                طلب خدمة
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const AdminStats = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي المستخدمين', value: '12,450', icon: <Users />, color: 'bg-blue-500' },
          { label: 'طلبات مكتملة', value: '8,200', icon: <CheckCircle2 />, color: 'bg-green-500' },
          { label: 'قيد العمل', value: '450', icon: <Clock />, color: 'bg-orange-500' },
          { label: 'بلاغات', value: '12', icon: <Trash2 />, color: 'bg-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className={`${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4`}>
              {stat.icon}
            </div>
            <p className="text-gray-500 text-sm font-bold mb-1">{stat.label}</p>
            <h4 className="text-3xl font-black">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-black mb-8">نمو المنصة</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={STATS_DATA}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="users" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const ServiceModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setShowServiceModal(false)}
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 relative z-10 shadow-2xl"
      >
        <h3 className="text-2xl font-black mb-2">طلب خدمة من {selectedArtisan?.name}</h3>
        <p className="text-gray-500 mb-8 text-sm">سيصل طلبك مباشرة إلى بريد الحرفي للموافقة.</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowServiceModal(false); alert('تم إرسال الطلب بنجاح!'); }}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">وصف المشكلة / الخدمة</label>
            <textarea className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none min-h-[120px]" placeholder="مثال: أحتاج لإصلاح باب خشبي مكسور..." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">التاريخ المفضل</label>
              <input type="date" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">الميزانية التقريبية</label>
              <input type="number" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" placeholder="DA" />
            </div>
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all mt-4">
            إرسال الطلب
          </button>
        </form>
      </motion.div>
    </div>
  );

  const AIChat = () => (
    <AnimatePresence>
      {showAIChat && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-6 w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl border border-gray-100 z-[60] overflow-hidden flex flex-col h-[500px]"
        >
          <div className="bg-orange-600 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <span className="font-bold">مساعد الحرفي الذكي</span>
            </div>
            <button onClick={() => setShowAIChat(false)}><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
            <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm text-sm">
              مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك في العثور على الحرفي المناسب اليوم؟
            </div>
            <div className="bg-orange-100 p-4 rounded-2xl rounded-bl-none shadow-sm text-sm self-end ml-auto">
              أبحث عن نجار في العاصمة لإصلاح خزانة.
            </div>
          </div>
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input type="text" placeholder="اكتب سؤالك هنا..." className="flex-1 bg-gray-50 px-4 py-2 rounded-xl outline-none text-sm" />
            <button className="bg-orange-600 text-white p-2 rounded-xl"><Send className="w-5 h-5" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- Main Render Logic ---

  if (view === 'landing') return <LandingPage />;
  if (view === 'auth') return <AuthPage />;
  if (view === 'forgot_password') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl w-full max-w-md text-center">
        <Logo className="w-12 h-12 mx-auto mb-6" />
        <h2 className="text-2xl font-black mb-4">استعادة كلمة السر</h2>
        <p className="text-gray-500 mb-8">أدخل بريدك الإلكتروني وسنرسل لك رابط الاستعادة.</p>
        <input type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl mb-4 outline-none" placeholder="email@example.com" />
        <button onClick={() => setView('auth')} className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold mb-4">إرسال الرابط</button>
        <button onClick={() => setView('auth')} className="text-gray-500 font-bold hover:text-orange-600">العودة للخلف</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:mr-72' : 'md:mr-20'}`}>
        {/* Top Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-100 rounded-xl"><Menu /></button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:p-2 hover:bg-gray-100 rounded-xl"><Menu /></button>
            <h1 className="text-xl font-black">
              {view === 'dashboard' && 'لوحة التحكم'}
              {view === 'chat' && 'الرسائل'}
              {view === 'admin_stats' && 'إحصائيات النظام'}
              {view === 'settings' && 'الإعدادات'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="font-bold text-sm">جمال الدين</span>
              <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{role === 'artisan' ? 'حرفي موثق' : 'زبون'}</span>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold">
              ج
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {view === 'dashboard' && role === 'customer' && <CustomerDashboard />}
          {view === 'dashboard' && role === 'artisan' && (
            <div className="space-y-10">
              <div className="bg-orange-600 p-10 rounded-[3rem] text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-2">أهلاً بك يا أحمد!</h2>
                  <p className="opacity-80 mb-6">لديك 3 طلبات جديدة بانتظار موافقتك.</p>
                  <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-black hover:text-white transition-all">مراجعة الطلبات</button>
                </div>
                <Hammer className="absolute -bottom-10 -left-10 w-64 h-64 opacity-10 rotate-12" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-xl font-black mb-6">الطلبات الحالية</h3>
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full" />
                          <div>
                            <p className="font-bold text-sm">زبون #{i}</p>
                            <p className="text-[10px] text-gray-400">إصلاح خزانة • منذ ساعتين</p>
                          </div>
                        </div>
                        <button className="text-orange-600 font-bold text-sm">تفاصيل</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100">
                  <h3 className="text-xl font-black mb-6">إحصائياتك</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-2xl text-center">
                      <p className="text-2xl font-black text-blue-600">4.9</p>
                      <p className="text-[10px] font-bold text-blue-400">التقييم</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-2xl text-center">
                      <p className="text-2xl font-black text-green-600">120</p>
                      <p className="text-[10px] font-bold text-green-400">خدمة منجزة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {view === 'admin_stats' && <AdminStats />}
          {view === 'admin_users' && (
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100">
              <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 font-black text-sm">المستخدم</th>
                    <th className="p-6 font-black text-sm">النوع</th>
                    <th className="p-6 font-black text-sm">الحالة</th>
                    <th className="p-6 font-black text-sm">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3, 4].map(i => (
                    <tr key={i} className="hover:bg-gray-50 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                          <div>
                            <p className="font-bold text-sm">مستخدم #{i}</p>
                            <p className="text-[10px] text-gray-400">user{i}@mail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-sm font-bold">{i % 2 === 0 ? 'حرفي' : 'زبون'}</td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">نشط</span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-2">
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Settings className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {view === 'settings' && (
            <div className="max-w-2xl bg-white p-10 rounded-[3rem] border border-gray-100">
              <h3 className="text-2xl font-black mb-8">إعدادات الحساب</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-24 h-24 bg-orange-100 rounded-[2rem] flex items-center justify-center text-3xl font-black text-orange-600">ج</div>
                  <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-bold">تغيير الصورة</button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">الاسم الكامل</label>
                    <input type="text" defaultValue="جمال الدين" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">رقم الهاتف</label>
                    <input type="text" defaultValue="0555 00 00 00" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">البريد الإلكتروني</label>
                  <input type="email" defaultValue="jamal@mail.com" className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg mt-6 shadow-lg shadow-orange-100">حفظ التعديلات</button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating AI Bot Button */}
      <button 
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-6 left-6 w-16 h-16 bg-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 animate-bounce"
      >
        <Bot className="w-8 h-8" />
      </button>

      <AIChat />
      {showServiceModal && <ServiceModal />}
    </div>
  );
}
