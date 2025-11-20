import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResidentTable = ({ 
  residents = [], 
  onEdit = () => {}, 
  onView = () => {}, 
  onGenerateId = () => {},
  selectedResidents = [],
  onSelectResident = () => {},
  onSelectAll = () => {}
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedResidents = [...residents]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const isAllSelected = residents?.length > 0 && selectedResidents?.length === residents?.length;
  const isPartiallySelected = selectedResidents?.length > 0 && selectedResidents?.length < residents?.length;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('barangayId')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Barangay ID
                  <Icon 
                    name={sortField === 'barangayId' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1"
                  />
                </Button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Name
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1"
                  />
                </Button>
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Address</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Contact</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('status')}
                  className="h-auto p-0 font-medium hover:bg-transparent"
                >
                  Status
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={16} 
                    className="ml-1"
                  />
                </Button>
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedResidents?.map((resident) => (
              <tr 
                key={resident?.id} 
                className="hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onView(resident)}
              >
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedResidents?.includes(resident?.id)}
                    onChange={() => onSelectResident(resident?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-primary font-medium">
                    {resident?.barangayId}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={resident?.avatar}
                        alt={resident?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {resident?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Age: {resident?.age}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-foreground">
                    {resident?.address}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Zone {resident?.zone}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm text-foreground">
                    {resident?.phone}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {resident?.email}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {getStatusBadge(resident?.status)}
                </td>
                <td className="px-4 py-3" onClick={(e) => e?.stopPropagation()}>
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(resident)}
                      className="h-8 w-8 p-0"
                      iconName="Eye"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(resident)}
                      className="h-8 w-8 p-0"
                      iconName="Edit"
                      iconSize={16}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGenerateId(resident)}
                      className="h-8 w-8 p-0"
                      iconName="CreditCard"
                      iconSize={16}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {sortedResidents?.map((resident) => (
          <div 
            key={resident?.id}
            className="bg-card border border-border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedResidents?.includes(resident?.id)}
                  onChange={() => onSelectResident(resident?.id)}
                  className="rounded border-border mt-1"
                />
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={resident?.avatar}
                    alt={resident?.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {resident?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ID: {resident?.barangayId} • Age: {resident?.age}
                  </div>
                </div>
              </div>
              {getStatusBadge(resident?.status)}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>{resident?.address}, Zone {resident?.zone}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Phone" size={14} />
                <span>{resident?.phone}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(resident)}
                iconName="Eye"
                iconPosition="left"
                iconSize={16}
              >
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(resident)}
                iconName="Edit"
                iconPosition="left"
                iconSize={16}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGenerateId(resident)}
                iconName="CreditCard"
                iconPosition="left"
                iconSize={16}
              >
                ID Card
              </Button>
            </div>
          </div>
        ))}
      </div>
      {residents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No residents found</h3>
          <p className="text-muted-foreground">
            Get started by adding your first resident to the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResidentTable;