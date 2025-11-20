import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities = [], className = '' }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'resident_added':
        return 'UserPlus';
      case 'certificate_generated':
        return 'FileText';
      case 'household_created':
        return 'Home';
      case 'user_login':
        return 'LogIn';
      case 'data_updated':
        return 'Edit';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'resident_added':
        return 'text-success';
      case 'certificate_generated':
        return 'text-primary';
      case 'household_created':
        return 'text-accent';
      case 'user_login':
        return 'text-secondary';
      case 'data_updated':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return activityTime?.toLocaleDateString();
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Recent Activity
        </h3>
      </div>
      <div className="p-6">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span> {activity?.action}
                  </p>
                  {activity?.details && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity?.details}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimestamp(activity?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;