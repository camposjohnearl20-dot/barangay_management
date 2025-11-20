import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevation-2">
          <Icon name="Building2" size={32} color="white" />
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Barangay Manager
        </h1>
        <p className="text-lg text-muted-foreground">
          Administrative Management System
        </p>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            Authorized Personnel Only
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          This system is for official barangay business only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;