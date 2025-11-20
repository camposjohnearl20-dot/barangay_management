import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  return (
    <div className="mt-8 text-center space-y-4">
      {/* Trust Signals */}
      <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Secure Access</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} />
          <span>Data Protected</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="CheckCircle" size={14} />
          <span>Government Compliant</span>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-xs text-muted-foreground">
        <p>© {currentYear} Barangay Management System. All rights reserved.</p>
        <p className="mt-1">
          Developed for local government administrative operations
        </p>
      </div>

      {/* Support Information */}
      <div className="text-xs text-muted-foreground">
        <p>For technical support, contact your system administrator</p>
      </div>
    </div>
  );
};

export default LoginFooter;