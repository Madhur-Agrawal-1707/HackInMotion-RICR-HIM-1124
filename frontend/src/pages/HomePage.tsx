import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/auth.store';
import { 
  FileText, 
  MonitorPlay, 
  MessageSquare, 
  Map, 
  Building2,
  ChevronRight,
  Sparkles,
  Bot,
  Brain
} from 'lucide-react';
import Dashboard from './Dashboard';

const HomePage: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const featureDetails = [
    {
      id: 'resume',
      title: 'Resume Intelligence',
      shortDesc: 'AI-powered resume analysis and optimization.',
      description: 'Your resume is your first impression. Our advanced AI scans your resume against industry standards and ATS (Applicant Tracking System) criteria to provide line-by-line feedback. Identify missing keywords, fix formatting issues, and craft a compelling narrative that guarantees you stand out to top recruiters.',
      icon: FileText,
      colorClass: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      bgGlow: 'bg-purple-500/20',
      link: '/resume',
    },
    {
      id: 'interviews',
      title: 'Live AI Interviews',
      shortDesc: 'Practice in realistic, high-pressure environments.',
      description: 'Don\'t let nerves ruin your chances. Engage in realistic voice and text-based mock interviews with our conversational AI. Featuring a built-in code editor for technical rounds, you can practice algorithmic problem-solving while explaining your thought process to an AI interviewer that adapts dynamically to your answers.',
      icon: MonitorPlay,
      colorClass: 'from-fuchsia-500 to-pink-500',
      textColor: 'text-fuchsia-400',
      bgGlow: 'bg-fuchsia-500/20',
      link: '/interviews/setup',
    },
    {
      id: 'feedback',
      title: 'Actionable Feedback',
      shortDesc: 'Deep insights saved to your personal history.',
      description: 'Immediate, objective, and deeply analytical. After every mock interview, receive a comprehensive breakdown of your performance. We analyze your technical accuracy, communication clarity, and problem-solving speed, saving all feedback to your personal history dashboard so you can track your growth over time.',
      icon: MessageSquare,
      colorClass: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400',
      bgGlow: 'bg-pink-500/20',
      link: '/interviews',
    },
    {
      id: 'roadmap',
      title: 'Custom Roadmaps',
      shortDesc: 'Personalized career paths based on your skills.',
      description: 'Stop guessing what to learn next. Based on your resume analysis and interview feedback, our AI generates step-by-step career roadmaps tailored to your target role. Track your progress through curated learning phases, milestones, and specific skill acquisition targets designed to close your knowledge gaps.',
      icon: Map,
      colorClass: 'from-indigo-500 to-blue-500',
      textColor: 'text-indigo-400',
      bgGlow: 'bg-indigo-500/20',
      link: '/roadmap',
    },
    {
      id: 'companies',
      title: 'Company Insights',
      shortDesc: 'Curated question banks for top tech companies.',
      description: 'Walk into your interview knowing exactly what to expect. Access our meticulously curated database of company-specific insights, including recent interview questions, compensation data, and hiring patterns for top tier tech companies. Tailor your preparation precisely to the company you are applying to.',
      icon: Building2,
      colorClass: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-400',
      bgGlow: 'bg-blue-500/20',
      link: '/companies',
    }
  ];

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              HackInMotion
            </span>
          </div>
          <div className="flex gap-4 sm:gap-6 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/interviews" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden md:block">History</Link>
                <Link to="/roadmap" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden md:block">Roadmaps</Link>
                <Link to="/companies" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden md:block">Companies</Link>
                <Link to="/profile" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  {user?.name || 'Profile'}
                </Link>
                <button onClick={logout} className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors">Logout</button>
              </>
            ) : (
              <Link to="/login" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-sm font-medium backdrop-blur-md hover:scale-105 active:scale-95 text-white">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* SECTION 1: Hero */}
      <section className="relative pt-40 pb-20 px-6 min-h-[90vh] flex items-center justify-center">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none translate-x-20"></div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>The Ultimate Career Acceleration Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            {isAuthenticated ? (
              <>Welcome back, <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500">{user?.name}</span></>
            ) : (
              <>Master your tech <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500">
                interviews with AI
              </span></>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            An all-in-one platform integrating intelligent resume analysis, real-time AI mock interviews, and hyper-personalized career roadmaps.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register" className="group px-8 py-4 rounded-full bg-white text-slate-950 font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Start Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Project Description */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Your Personal AI Career Coach</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                HackInMotion is not just another interview prep tool. It is a comprehensive, multi-agent platform designed to evaluate your current standing, simulate extreme technical pressure, and guide you to your dream job. 
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                By combining state-of-the-art Natural Language Processing with deep industry data, our AI acts as a relentless, intelligent agent that helps you optimize your resume, conducts highly technical interviews, and builds a roadmap specifically for you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Bot className="w-10 h-10 text-purple-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Smart Agents</h4>
                <p className="text-sm text-slate-500">Dynamic AI agents that adapt to your skill level.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm mt-8">
                <Brain className="w-10 h-10 text-pink-400 mb-4" />
                <h4 className="text-lg font-bold mb-2">Deep Analytics</h4>
                <p className="text-sm text-slate-500">Actionable insights from every interview.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* SECTION 3: Features Grid */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Platform Modules</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Select any of the modules below to begin. If you aren't logged in, you'll be prompted to authenticate before accessing our powerful tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureDetails.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link 
                  key={feature.id}
                  to={feature.link} 
                  className={`p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-lg hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 group block relative overflow-hidden ${index === 3 ? 'lg:col-start-1 lg:ml-auto w-full' : ''}`}
                >
                  {/* Subtle hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl ${feature.bgGlow} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-8 h-8 ${feature.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-base">{feature.shortDesc}</p>
                  
                  <div className={`mt-8 inline-flex items-center gap-2 ${feature.textColor} font-medium text-sm group-hover:gap-3 transition-all`}>
                    Launch Module <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTIONS 4-8: Detailed Feature Breakdowns */}
      <div className="bg-slate-950">
        {featureDetails.map((feature, index) => {
          const isEven = index % 2 === 0;
          const Icon = feature.icon;
          
          return (
            <section key={`detail-${feature.id}`} className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
              {/* Background ambient light */}
              <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} -translate-y-1/2 w-[600px] h-[600px] ${feature.bgGlow} rounded-full blur-[150px] pointer-events-none opacity-50`}></div>
              
              <div className={`container mx-auto max-w-6xl flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center relative z-10`}>
                
                {/* Visual Side */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-square rounded-[3rem] bg-white/[0.03] border border-white/10 p-8 flex flex-col items-center justify-center relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.colorClass} opacity-10 rounded-[3rem] group-hover:opacity-20 transition-opacity duration-700`}></div>
                    <div className={`w-32 h-32 rounded-full ${feature.bgGlow} flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(0,0,0,0.3)] backdrop-blur-xl`}>
                      <Icon className={`w-16 h-16 ${feature.textColor}`} />
                    </div>
                    <h3 className="text-3xl font-bold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">{feature.title}</h3>
                  </div>
                </div>
                
                {/* Text Side */}
                <div className="w-full md:w-1/2">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${feature.bgGlow} border border-white/5 ${feature.textColor} text-sm font-medium mb-6`}>
                    Module 0{index + 1}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{feature.title}</h2>
                  <p className="text-xl text-slate-400 leading-relaxed font-light mb-10">
                    {feature.description}
                  </p>
                  <Link 
                    to={feature.link}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${feature.colorClass} font-bold text-white shadow-lg hover:scale-105 transition-all duration-300`}
                  >
                    Experience {feature.title}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
                
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8">
            Ready to upgrade your career?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Join thousands of professionals who have already mastered their interviews and landed their dream roles using HackInMotion.
          </p>
          <Link 
            to={isAuthenticated ? "/profile" : "/login"} 
            className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Log In to Get Started'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 pt-16 pb-8 px-6 backdrop-blur-lg">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-2xl font-bold text-white">HackInMotion</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Empowering tech professionals to achieve their maximum potential through AI-driven insights and realistic interview simulations.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Features</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><Link to="/resume" className="hover:text-purple-400 transition-colors">Resume Intelligence</Link></li>
                <li><Link to="/interviews/setup" className="hover:text-fuchsia-400 transition-colors">Live Interviews</Link></li>
                <li><Link to="/roadmap" className="hover:text-indigo-400 transition-colors">Career Roadmaps</Link></li>
                <li><Link to="/companies" className="hover:text-blue-400 transition-colors">Company Insights</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} HackInMotion. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Designed for the future of tech hiring.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
