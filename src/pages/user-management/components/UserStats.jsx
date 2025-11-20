import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ stats }) => {
  const statCards = [
    {
      id: 'total',
      title: 'Total Users',
      value: stats?.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'active',
      title: 'Active Users',
      value: stats?.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'admins',
      title: 'Administrators',
      value: stats?.admins,
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'staff',
      title: 'Staff Members',
      value: stats?.staff,
      icon: 'User',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;