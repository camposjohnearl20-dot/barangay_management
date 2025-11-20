import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingTasks = ({ tasks = [], onTaskAction = () => {}, className = '' }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'Clock';
      case 'low':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'certificate_approval':
        return 'FileCheck';
      case 'data_validation':
        return 'AlertCircle';
      case 'system_update':
        return 'Settings';
      case 'user_verification':
        return 'UserCheck';
      default:
        return 'CheckSquare';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="CheckSquare" size={20} className="mr-2" />
            Pending Tasks
          </h3>
          {tasks?.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {tasks?.length}
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        {tasks?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-muted-foreground">All tasks completed!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Great job keeping up with administrative duties.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks?.map((task) => (
              <div key={task?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={getTaskTypeIcon(task?.type)} size={16} className="text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-foreground">
                          {task?.title}
                        </h4>
                        <div className={`flex items-center space-x-1 ${getPriorityColor(task?.priority)}`}>
                          <Icon name={getPriorityIcon(task?.priority)} size={12} />
                          <span className="text-xs font-medium capitalize">
                            {task?.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {task?.description}
                      </p>
                      {task?.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate)?.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onTaskAction(task?.id, 'view')}
                      iconName="Eye"
                      iconSize={14}
                    >
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onTaskAction(task?.id, 'complete')}
                      iconName="Check"
                      iconSize={14}
                    >
                      Complete
                    </Button>
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

export default PendingTasks;