import React, { useState, useEffect } from 'react';
import { 
  PenSquare, 
  Search, 
  Library, 
  Plus,
  Settings,
  ChevronDown,
  ExternalLink,
  PanelLeftClose,
  PanelLeft,
  Compass,
  MessageSquare,
  HelpCircle,
  LinkIcon,
  Loader2
} from 'lucide-react';
import { User } from 'firebase/auth';
import { fetchUserTasks, createTask } from '../../firebase';

// Barbaros Logo Text Component
const BarbarosLogo = () => (
  <span 
    className="text-white font-bold text-xl tracking-wide"
    style={{ fontFamily: 'Georgia, serif' }}
  >
    Barbaros
  </span>
);

interface Task {
  id: string;
  title: string;
  instructions?: string;
  status?: string;
  createdAt?: any;
}

interface MainSidebarProps {
  user?: User | null;
  tasks?: Task[];
  onNewTask?: () => void;
  onSearch?: () => void;
  onLibrary?: () => void;
  onNewProject?: () => void;
  onTaskClick?: (task: Task) => void;
  onOpenSettings?: () => void;
  activeTaskId?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const defaultTasks: Task[] = [];

export const MainSidebar: React.FC<MainSidebarProps> = ({
  user,
  tasks: propTasks,
  onNewTask,
  onSearch,
  onLibrary,
  onNewProject,
  onTaskClick,
  onOpenSettings,
  activeTaskId,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [tasks, setTasks] = useState<Task[]>(propTasks || defaultTasks);
  const [loading, setLoading] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // جلب المهام من Firebase عند تسجيل الدخول
  useEffect(() => {
    const loadTasks = async () => {
      if (user?.uid) {
        setLoading(true);
        try {
          const userTasks = await fetchUserTasks(user.uid);
          setTasks(userTasks as Task[]);
        } catch (error) {
          console.error('Error loading tasks:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setTasks([]);
      }
    };
    loadTasks();
  }, [user?.uid]);

  // إنشاء مهمة جديدة
  const handleNewTask = async () => {
    if (onNewTask) {
      onNewTask();
    } else if (user?.uid) {
      const title = `New Task - ${new Date().toLocaleDateString()}`;
      const result = await createTask(user.uid, title);
      if (result.success) {
        // إعادة تحميل المهام
        const userTasks = await fetchUserTasks(user.uid);
        setTasks(userTasks as Task[]);
      }
    }
  };

  // فتح البحث
  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    } else {
      setSearchOpen(!searchOpen);
    }
  };

  // تصفية المهام حسب البحث
  const filteredTasks = searchQuery 
    ? tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : tasks;
  return (
    <div 
      className={`
        h-screen bg-[#2b2b2b] flex flex-col border-r border-[#353535]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-[260px]'}
      `}
    >
      {/* Header - Logo & Collapse Button */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-3 py-4`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <BarbarosLogo />
          </div>
        )}
        <button 
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-[#353535] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <PanelLeft className="w-5 h-5 text-white" />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="px-2 space-y-1">
        {/* New Task */}
        <button
          onClick={handleNewTask}
          className={`
            w-full flex items-center gap-3 py-2.5 bg-[#333333] hover:bg-[#404040] 
            border border-[#454545] rounded-xl text-white text-[14px] transition-colors
            ${isCollapsed ? 'px-2 justify-center' : 'px-3'}
          `}
          title="New Task"
        >
          <PenSquare className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span>New Task</span>
              <ExternalLink className="w-4 h-4 ml-auto text-[#808080]" />
            </>
          )}
        </button>

        {/* Search */}
        <button
          onClick={handleSearch}
          className={`
            w-full flex items-center gap-3 py-2.5 hover:bg-[#353535] 
            rounded-xl text-white text-[14px] transition-colors
            ${isCollapsed ? 'px-2 justify-center' : 'px-3'}
            ${searchOpen ? 'bg-[#353535]' : ''}
          `}
          title="Search"
        >
          <Search className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span>Search</span>}
        </button>

        {/* Search Input - Visible when searchOpen */}
        {!isCollapsed && searchOpen && (
          <div className="px-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#454545] rounded-lg text-white text-sm placeholder-[#808080] focus:outline-none focus:border-[#606060]"
              autoFocus
            />
          </div>
        )}

        {/* Library */}
        <button
          onClick={onLibrary}
          className={`
            w-full flex items-center gap-3 py-2.5 hover:bg-[#353535] 
            rounded-xl text-white text-[14px] transition-colors
            ${isCollapsed ? 'px-2 justify-center' : 'px-3'}
          `}
          title="Library"
        >
          <Library className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span>Library</span>}
        </button>

        {/* Explore */}
        <button
          className={`
            w-full flex items-center gap-3 py-2.5 hover:bg-[#353535] 
            rounded-xl text-white text-[14px] transition-colors
            ${isCollapsed ? 'px-2 justify-center' : 'px-3'}
          `}
          title="Explore"
        >
          <Compass className="w-[18px] h-[18px] flex-shrink-0" />
          {!isCollapsed && <span>Explore</span>}
        </button>
      </div>

      {/* Projects Section - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="px-3 mt-6">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[#808080] text-[13px]">Projects</span>
            <button 
              onClick={onNewProject}
              className="p-1 rounded hover:bg-[#353535] transition-colors"
            >
              <Plus className="w-4 h-4 text-[#808080]" />
            </button>
          </div>
          
          {/* New Project Button */}
          <button
            onClick={onNewProject}
            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#353535] rounded-xl text-white text-[14px] transition-colors"
          >
            <div className="w-[18px] h-[18px] rounded border border-[#808080] flex items-center justify-center">
              <Plus className="w-3 h-3 text-[#808080]" />
            </div>
            <span>New Project</span>
          </button>
        </div>
      )}

      {/* Tasks Section - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex-1 px-3 mt-4 overflow-y-auto">
          <div className="flex items-center gap-2 px-3 py-2">
            <ChevronDown className="w-4 h-4 text-[#808080]" />
            <span className="text-[#808080] text-[13px]">All Tasks ({filteredTasks.length})</span>
          </div>
          
          {/* Task List */}
          <div className="space-y-0.5">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 text-[#808080] animate-spin" />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-8 h-8 text-[#505050] mx-auto mb-2" />
                <p className="text-[#808080] text-sm">
                  {searchQuery ? 'No tasks found' : 'No tasks yet'}
                </p>
                {!searchQuery && user && (
                  <button
                    onClick={handleNewTask}
                    className="mt-2 text-[#7c8aff] text-sm hover:underline"
                  >
                    Create your first task
                  </button>
                )}
              </div>
            ) : (
              filteredTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => onTaskClick?.(task)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors
                    ${activeTaskId === task.id 
                      ? 'bg-[#353535] text-white' 
                      : 'text-white hover:bg-[#353535]'
                    }
                  `}
                >
                  <MessageSquare className="w-4 h-4 text-[#808080] flex-shrink-0" />
                  <span className="text-[14px] truncate">{task.title}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Spacer when collapsed */}
      {isCollapsed && <div className="flex-1" />}

      {/* Bottom Bar */}
      <div className={`px-2 py-3 border-t border-[#353535] ${isCollapsed ? 'space-y-2' : ''}`}>
        <div className={`flex ${isCollapsed ? 'flex-col' : ''} items-center ${isCollapsed ? 'gap-2' : 'justify-between'}`}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-[#353535] transition-colors" title="Help">
                  <HelpCircle className="w-5 h-5 text-[#808080]" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[#353535] transition-colors" title="Integrations">
                  <LinkIcon className="w-5 h-5 text-[#808080]" />
                </button>
              </div>
              <button 
                onClick={onOpenSettings}
                className="p-2 rounded-lg hover:bg-[#353535] transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </>
          ) : (
            <>
              <button className="p-2 rounded-lg hover:bg-[#353535] transition-colors" title="Help">
                <HelpCircle className="w-5 h-5 text-[#808080]" />
              </button>
              <button className="p-2 rounded-lg hover:bg-[#353535] transition-colors" title="Integrations">
                <LinkIcon className="w-5 h-5 text-[#808080]" />
              </button>
              <button 
                onClick={onOpenSettings}
                className="p-2 rounded-lg hover:bg-[#353535] transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
