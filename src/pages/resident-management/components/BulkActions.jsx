import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BulkActions = ({
  selectedCount = 0,
  onExport = () => {},
  onBulkStatusUpdate = () => {},
  onBulkDelete = () => {},
  onClearSelection = () => {},
  className = ''
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'export', label: 'Export Selected' },
    { value: 'activate', label: 'Mark as Active' },
    { value: 'deactivate', label: 'Mark as Inactive' },
    { value: 'pending', label: 'Mark as Pending' },
    { value: 'delete', label: 'Delete Selected' }
  ];

  const handleBulkAction = async () => {
    if (!bulkAction || selectedCount === 0) return;

    setIsProcessing(true);
    
    try {
      switch (bulkAction) {
        case 'export':
          await onExport();
          break;
        case 'activate': await onBulkStatusUpdate('active');
          break;
        case 'deactivate': await onBulkStatusUpdate('inactive');
          break;
        case 'pending': await onBulkStatusUpdate('pending');
          break;
        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${selectedCount} resident(s)? This action cannot be undone.`)) {
            await onBulkDelete();
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
      setBulkAction('');
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={`bg-primary/5 border border-primary/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} resident{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Select
              options={bulkActionOptions}
              value={bulkAction}
              onChange={setBulkAction}
              placeholder="Choose action"
              className="min-w-40"
            />
            
            <Button
              variant="default"
              size="sm"
              onClick={handleBulkAction}
              disabled={!bulkAction || isProcessing}
              loading={isProcessing}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onExport()}
            disabled={isProcessing}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            disabled={isProcessing}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear Selection
          </Button>
        </div>
      </div>

      {/* Action Descriptions */}
      {bulkAction && (
        <div className="mt-3 p-3 bg-muted/50 rounded border border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div className="text-sm text-muted-foreground">
              {bulkAction === 'export' && `Export ${selectedCount} resident records to CSV file.`}
              {bulkAction === 'activate' && `Mark ${selectedCount} resident(s) as active.`}
              {bulkAction === 'deactivate' && `Mark ${selectedCount} resident(s) as inactive.`}
              {bulkAction === 'pending' && `Mark ${selectedCount} resident(s) as pending.`}
              {bulkAction === 'delete' && (
                <span className="text-destructive">
                  Permanently delete {selectedCount} resident(s). This action cannot be undone.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions;