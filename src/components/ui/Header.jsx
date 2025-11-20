import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onLogout = () => {}, className = '' }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const path = location?.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/resident-management':
        return 'Resident Management';
      case '/household-management':
        return 'Household Management';
      case '/certificate-generation':
        return 'Certificate Generation';
      case '/user-management':
        return 'User Management';
      default:
        return 'Barangay Manager';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border ${className}`}>
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-foreground">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user?.name || 'User'}
                </span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform duration-150 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </Button>

              {isProfileOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsProfileOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-50">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role || 'Staff'}
                      </p>
                    </div>
                    <div className="p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        iconName="LogOut"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;