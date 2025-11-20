import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const UserFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onAddUser 
}) => {
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const activityOptions = [
    { value: '', label: 'All Activity' },
    { value: 'recent', label: 'Recent (7 days)' },
    { value: 'inactive', label: 'Inactive (30+ days)' },
    { value: 'never', label: 'Never logged in' }
  ];

  const hasActiveFilters = filters?.search || filters?.role || filters?.status || filters?.activity;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          <Input
            type="search"
            placeholder="Search users..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
          
          <Select
            placeholder="Filter by role"
            options={roleOptions}
            value={filters?.role}
            onChange={(value) => onFilterChange('role', value)}
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />
          
          <Select
            placeholder="Filter by activity"
            options={activityOptions}
            value={filters?.activity}
            onChange={(value) => onFilterChange('activity', value)}
          />
        </div>

        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          )}
          
          <Button
            variant="default"
            onClick={onAddUser}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add New User
          </Button>
        </div>
      </div>
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters?.search && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Search: "{filters?.search}"
              </span>
            )}
            {filters?.role && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Role: {roleOptions?.find(opt => opt?.value === filters?.role)?.label}
              </span>
            )}
            {filters?.status && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Status: {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
              </span>
            )}
            {filters?.activity && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                Activity: {activityOptions?.find(opt => opt?.value === filters?.activity)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilters;