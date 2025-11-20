import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Breadcrumb = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbItems = () => {
    const path = location?.pathname;
    const items = [
      { label: 'Dashboard', path: '/dashboard', icon: 'Home' }
    ];

    switch (path) {
      case '/dashboard':
        return [{ label: 'Dashboard', path: '/dashboard', icon: 'Home' }];
      
      case '/resident-management':
        return [
          ...items,
          { label: 'Resident Management', path: '/resident-management', icon: 'Users' }
        ];
      
      case '/household-management':
        return [
          ...items,
          { label: 'Household Management', path: '/household-management', icon: 'Home' }
        ];
      
      case '/certificate-generation':
        return [
          ...items,
          { label: 'Certificate Generation', path: '/certificate-generation', icon: 'FileText' }
        ];
      
      case '/user-management':
        return [
          ...items,
          { label: 'User Management', path: '/user-management', icon: 'UserCog' }
        ];
      
      default:
        return items;
    }
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {index === breadcrumbItems?.length - 1 ? (
              <span className="flex items-center space-x-1 text-foreground font-medium">
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground p-1 h-auto"
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;