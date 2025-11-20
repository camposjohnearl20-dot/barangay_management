import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  iconColor = 'text-primary',
  className = '' 
}) => {
  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-success';
    if (changeType === 'decrease') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mb-2">
            {value?.toLocaleString()}
          </p>
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={getChangeIcon()} 
                size={16} 
                className={getChangeColor()}
              />
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${iconColor}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;