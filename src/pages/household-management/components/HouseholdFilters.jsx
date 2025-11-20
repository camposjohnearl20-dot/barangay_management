import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HouseholdFilters = ({ 
  searchTerm, 
  onSearchChange, 
  memberCountFilter, 
  onMemberCountChange,
  addressFilter,
  onAddressChange,
  onClearFilters 
}) => {
  const memberCountOptions = [
    { value: '', label: 'All Households' },
    { value: '1', label: '1 Member' },
    { value: '2-3', label: '2-3 Members' },
    { value: '4-5', label: '4-5 Members' },
    { value: '6+', label: '6+ Members' }
  ];

  const addressOptions = [
    { value: '', label: 'All Areas' },
    { value: 'barangay-1', label: 'Barangay Bagong Pag-asa' },
    { value: 'barangay-2', label: 'Barangay Batasan Hills' },
    { value: 'barangay-3', label: 'Barangay Commonwealth' },
    { value: 'barangay-4', label: 'Barangay Fairview' },
    { value: 'barangay-5', label: 'Barangay Holy Spirit' },
    { value: 'barangay-6', label: 'Barangay Novaliches Proper' }
  ];

  const hasActiveFilters = searchTerm || memberCountFilter || addressFilter;

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filter Households</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="search"
          placeholder="Search by household head name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <Select
          options={memberCountOptions}
          value={memberCountFilter}
          onChange={onMemberCountChange}
          placeholder="Filter by member count"
        />

        <Select
          options={addressOptions}
          value={addressFilter}
          onChange={onAddressChange}
          placeholder="Filter by area"
        />
      </div>
      {hasActiveFilters && (
        <div className="flex items-center space-x-2 pt-2 border-t border-border">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Active filters applied. Use "Clear Filters" to reset.
          </span>
        </div>
      )}
    </div>
  );
};

export default HouseholdFilters;