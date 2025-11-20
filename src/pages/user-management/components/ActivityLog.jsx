import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_created':
        return 'UserPlus';
      case 'user_updated':
        return 'UserCheck';
      case 'user_deleted':
        return 'UserX';
      case 'user_login':
        return 'LogIn';
      case 'user_logout':
        return 'LogOut';
      case 'password_changed':
        return 'Key';
      case 'role_changed':
        return 'Shield';
      case 'status_changed':
        return 'ToggleLeft';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_created':
        return 'text-success';
      case 'user_updated':
        return 'text-primary';
      case 'user_deleted':
        return 'text-destructive';
      case 'user_login':
        return 'text-success';
      case 'user_logout':
        return 'text-muted-foreground';
      case 'password_changed':
        return 'text-warning';
      case 'role_changed':
        return 'text-primary';
      case 'status_changed':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Latest user management activities
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {activities?.map((activity) => (
              <div key={activity?.id} className="p-4 hover:bg-muted/30">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">
                        {activity?.description}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(activity?.timestamp)}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>By: {activity?.performedBy}</span>
                      {activity?.targetUser && (
                        <span>Target: {activity?.targetUser}</span>
                      )}
                      {activity?.ipAddress && (
                        <span>IP: {activity?.ipAddress}</span>
                      )}
                    </div>
                    
                    {activity?.details && (
                      <p className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded p-2">
                        {activity?.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;