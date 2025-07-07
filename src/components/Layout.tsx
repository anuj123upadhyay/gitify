'use client';

import { ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Github, LogOut, Settings, Plus, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isDashboard = pathname === '/dashboard';
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = async () => {
    try {
      setShowSignOutConfirm(false);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setShowSignOutConfirm(false);
    }
  };

  const confirmSignOut = () => {
    setShowSignOutConfirm(true);
  };

  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors">
      {/* Navigation */}
      <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
            {/* Logo Section - Always Visible */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <div className="relative flex-shrink-0">
                  <img 
                    src="/icon.png" 
                    alt="Gitify" 
                    className="h-12 w-12 rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200" 
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-400/20 to-secondary-400/20 pointer-events-none"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent tracking-tight truncate">
                  Gitify
                </span>
              </Link>
            </div>

            {/* Mobile Navigation - Extra Small Screens */}
            <div className="flex xs:hidden items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-1.5">
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm" className="p-1.5">
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={confirmSignOut} className="p-1.5">
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Small Mobile Navigation */}
            <div className="hidden xs:flex sm:hidden items-center space-x-1.5">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm" className="p-2">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={confirmSignOut} className="p-2">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden sm:flex md:hidden items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="flex items-center px-2 py-1.5">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm" className="flex items-center px-2 py-1.5">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs text-secondary-600 dark:text-primary-400 font-medium max-w-[80px] truncate">
                  {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={confirmSignOut} className="flex items-center px-2 py-1.5">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="flex items-center px-3 py-2">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="ml-2 hidden lg:inline text-sm">{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </Button>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm" className="flex items-center px-3 py-2">
                  <Settings className="h-4 w-4" />
                  <span className="ml-2 hidden lg:inline text-sm">Settings</span>
                </Button>
              </Link>

              <div className="flex items-center space-x-2 lg:space-x-3">
                <span className="text-sm text-secondary-600 dark:text-primary-400 font-medium max-w-[100px] lg:max-w-[150px] xl:max-w-[200px] truncate">
                  {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={confirmSignOut} className="flex items-center px-3 py-2">
                  <LogOut className="h-4 w-4" />
                  <span className="ml-2 hidden lg:inline text-sm">Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Mobile Add Repository Button - Only on Dashboard */}
          {isDashboard && (
            <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 px-2 py-2">
              <Link href="/dashboard/add-repo">
                <Button size="sm" className="w-full flex items-center justify-center space-x-2 text-sm">
                  <Plus className="h-4 w-4" />
                  <span>Add Repository</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-primary-300 mb-2">
                Confirm Sign Out
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to sign out of Gitify?
              </p>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={cancelSignOut}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSignOut}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-2 xs:py-3 sm:py-4 md:py-6 px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8">
        {children}
      </main>
    </div>
  );
}
