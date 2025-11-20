import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onToggleStatus, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'inactive':
        return 'text-muted-foreground bg-muted';
      case 'suspended':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'text-primary bg-primary/10';
      case 'staff':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatLastLogin = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const loginDate = new Date(date);
    const diffInHours = Math.floor((now - loginDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return loginDate?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{user?.fullName}</h3>
            <p className="text-sm text-muted-foreground">@{user?.username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
            {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user?.status)}`}>
            {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
          </span>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Mail" size={16} className="mr-2" />
          {user?.email}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Clock" size={16} className="mr-2" />
          Last login: {formatLastLogin(user?.lastLogin)}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} className="mr-2" />
          Created: {new Date(user.createdAt)?.toLocaleDateString()}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit
          </Button>
          <Button
            variant={user?.status === 'active' ? 'warning' : 'success'}
            size="sm"
            onClick={() => onToggleStatus(user)}
            iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
            iconPosition="left"
            iconSize={16}
          >
            {user?.status === 'active' ? 'Suspend' : 'Activate'}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(user)}
          iconName="Trash2"
          iconSize={16}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        />
      </div>
    </div>
  );
};

export default UserCard;