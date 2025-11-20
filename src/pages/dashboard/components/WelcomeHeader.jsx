import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ user = null, className = '' }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {getCurrentGreeting()}, {user?.name || 'Administrator'}!
          </h1>
          <p className="text-primary-foreground/80 mb-1">
            Welcome to the Barangay Management System
          </p>
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/70">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{getCurrentDate()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} />
              <span className="capitalize">{user?.role || 'Staff'} Access</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center justify-center w-20 h-20 bg-primary-foreground/10 rounded-full">
          <Icon name="Building2" size={40} className="text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;