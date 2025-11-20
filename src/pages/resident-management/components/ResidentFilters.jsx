import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ResidentFilters = ({
  searchTerm = '',
  onSearchChange = () => {},
  selectedZone = '',
  onZoneChange = () => {},
  selectedStatus = '',
  onStatusChange = () => {},
  dateRange = { start: '', end: '' },
  onDateRangeChange = () => {},
  onClearFilters = () => {},
  className = ''
}) => {
  const zoneOptions = [
    { value: '', label: 'All Zones' },
    { value: '1', label: 'Zone 1' },
    { value: '2', label: 'Zone 2' },
    { value: '3', label: 'Zone 3' },
    { value: '4', label: 'Zone 4' },
    { value: '5', label: 'Zone 5' },
    { value: '6', label: 'Zone 6' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const hasActiveFilters = searchTerm || selectedZone || selectedStatus || dateRange?.start || dateRange?.end;

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Search by name or Barangay ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Zone Filter */}
        <div>
          <Select
            placeholder="Select Zone"
            options={zoneOptions}
            value={selectedZone}
            onChange={onZoneChange}
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            placeholder="Select Status"
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
          />
        </div>

        {/* Date Range Start */}
        <div>
          <Input
            type="date"
            placeholder="Start Date"
            value={dateRange?.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
          />
        </div>

        {/* Date Range End */}
        <div>
          <Input
            type="date"
            placeholder="End Date"
            value={dateRange?.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
          />
        </div>
      </div>
      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Search: "{searchTerm}"
            </span>
          )}
          {selectedZone && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Zone: {selectedZone}
            </span>
          )}
          {selectedStatus && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              Status: {statusOptions?.find(opt => opt?.value === selectedStatus)?.label}
            </span>
          )}
          {dateRange?.start && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              From: {new Date(dateRange.start)?.toLocaleDateString()}
            </span>
          )}
          {dateRange?.end && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              To: {new Date(dateRange.end)?.toLocaleDateString()}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ResidentFilters;