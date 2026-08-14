import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/auth.store';
import { useAuth } from '../features/auth/hooks/useAuth';
import { 
  FileText, 
  MonitorPlay, 
  MessageSquare, 
  Map, 
  Building2,
  ChevronRight,
  Sparkles,
  LogOut,
  User,
  Settings,
  Activity,
  Calendar,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  const quickActions = [
    {
      id: 'resume',
      title: 'Resume Builder',
      desc: 'Optimize your resume for ATS.',
      icon: FileText,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      link: '/resume'
    },
    {
      id: 'interview',
      title: 'Mock Interview',
      desc: 'Start a live AI interview session.',
      icon: MonitorPlay,
      color: 'text-fuchsia-400',
      bg: 'bg-fuchsia-500/20',
      link: '/interviews/setup'
    },
    {
      id: 'feedback',
      title: 'Past Feedback',
      desc: 'Review your recent performance.',
      icon: MessageSquare,
      color: 'text-pink-400',
      bg: 'bg-pink-500/20',
      link: '/feedback'
    },
    {
      id: 'roadmap',
      title: 'Career Roadmap',
      desc: 'View your customized learning path.',
      icon: Map,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/20',
      link: '/roadmap'
    },
    {
      id: 'company',
      title: 'Company Data',
      desc: 'Prepare for specific companies.',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20',
      link: '/companies'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'interview',
      title: 'Google SDE II Mock Interview',
      date: '2 days ago',
      score: '85/100',
      icon: MonitorPlay,
      color: 'text-fuchsia-400'
    },
    {
      id: 2,
      type: 'resume',
      title: 'Resume ATS Score Improved',
      date: '3 days ago',
      score: '92/100',
      icon: FileText,
      color: 'text-purple-400'
    },
    {
      id: 3,
      type: 'roadmap',
      title: 'Completed System Design Phase',
      date: '1 week ago',
      score: '100%',
      icon: Map,
      color: 'text-indigo-400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/80 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            HackInMotion
          </span>
        </div>
        
        <div className="px-4 py-6 flex-1">
          <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Modules</h3>
          <nav className="space-y-2">
            {quickActions.map(action => (
              <Link 
                key={action.id} 
                to={action.link}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <action.icon className={`w-5 h-5 ${action.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                <span className="font-medium text-sm text-slate-400 group-hover:text-white transition-colors">{action.title}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <User className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-slate-400 hover:text-white">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm text-slate-400 mt-1">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <header className="md:hidden border-b border-white/5 p-4 flex items-center justify-between bg-slate-950/80 sticky top-0 z-50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-bold text-white">HackInMotion</span>
          </div>
          <button onClick={() => logout()} className="text-sm text-slate-400">Logout</button>
        </header>

        <div className="max-w-6xl mx-auto p-6 lg:p-10">
          
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-slate-400">Ready to crush your next interview? Here's an overview of your progress.</p>
          </div>

          {/* Quick Stats Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Interviews</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg. Score</p>
                <p className="text-2xl font-bold text-white">88%</p>
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Streak</p>
                <p className="text-2xl font-bold text-white">4 Days</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map(action => (
                <Link key={action.id} to={action.link} className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-[2rem] p-6 hover:-translate-y-1 transition-all group block">
                  <div className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center mb-4`}>
                    <action.icon className={`w-6 h-6 ${action.color}`} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{action.title}</h3>
                  <p className="text-sm text-slate-400">{action.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <Link to="/interviews" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className={`p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-colors ${index !== recentActivity.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color.replace('text', 'bg').replace('400', '500/20')}`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{activity.title}</h4>
                    <p className="text-sm text-slate-500">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white border border-white/10">
                      {activity.score}
                    </span>
                  </div>
                  <div>
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
