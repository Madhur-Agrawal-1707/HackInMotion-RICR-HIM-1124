import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAuthStore } from '../../auth/store/auth.store';
import { useUser } from '../hooks/useUser';
import { Button } from '../../../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/card';
import { LogOut, Settings, User } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const { profile } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeUser = profile || user;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <header className="border-b border-border bg-background px-6 py-4 flex items-center justify-between shadow-xs">
        <h1 className="text-xl font-bold tracking-tight">AI Interview Platform</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex items-center gap-4 flex-row">
            <div className="h-20 w-20 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden">
              {activeUser?.avatar ? (
                <img
                  src={activeUser.avatar}
                  alt={activeUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{activeUser?.name}</CardTitle>
              <CardDescription>{activeUser?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</p>
                <p className="text-sm font-medium mt-1">{activeUser?.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Login Method</p>
                <p className="text-sm font-medium mt-1">{activeUser?.provider}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-border pt-6">
            <p className="text-xs text-muted-foreground">Account Status: Active</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
