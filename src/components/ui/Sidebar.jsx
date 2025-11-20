import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ 
  isCollapsed = false, 
  onToggle = () => {}, 
  userRole = 'staff',
  className = '' 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'staff']
    },
    {
      id: 'residents',
      label: 'Residents',
      path: '/resident-management',
      icon: 'Users',
      roles: ['admin', 'staff']
    },
    {
      id: 'households',
      label: 'Households',
      path: '/household-management',
      icon: 'Home',
      roles: ['admin', 'staff']
    },
    {
      id: 'certificates',
      label: 'Certificates',
      path: '/certificate-generation',
      icon: 'FileText',
      roles: ['admin', 'staff']
    },
    {
      id: 'users',
      label: 'User Management',
      path: '/user-management',
      icon: 'UserCog',
      roles: ['admin']
    }
  ];

  const filteredItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 z-100 h-full bg-card border-r border-border transition-all duration-300 ease-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center h-16 px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Building2" size={20} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-foreground">
                    Barangay
                  </span>
                  <span className="text-xs text-muted-foreground -mt-1">
                    Manager
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems?.map((item) => (
              <Button
                key={item?.id}
                variant={isActive(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className={`w-full justify-start ${
                  isCollapsed ? 'px-2' : 'px-3'
                } ${isActive(item?.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={20}
              >
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">
                    {item?.label}
                  </span>
                )}
              </Button>
            ))}
          </nav>

          {/* Collapse Toggle */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className={`w-full justify-center ${isCollapsed ? 'px-2' : 'px-3'}`}
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={20}
            >
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium">
                  Collapse
                </span>
              )}
            </Button>
          </div>
        </div>
      </aside>
      {/* Mobile Overlay */}
      <div className={`lg:hidden fixed inset-0 z-200 bg-black/50 transition-opacity duration-300 ${
        isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`} onClick={onToggle} />
      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 z-300 h-full w-64 bg-card border-r border-border transform transition-transform duration-300 ease-out ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-foreground">
                  Barangay
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Manager
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredItems?.map((item) => (
              <Button
                key={item?.id}
                variant={isActive(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  handleNavigation(item?.path);
                  onToggle();
                }}
                className={`w-full justify-start px-3 ${
                  isActive(item?.path) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={20}
              >
                <span className="ml-3 text-sm font-medium">
                  {item?.label}
                </span>
              </Button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;