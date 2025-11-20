import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const ManageMembersModal = ({ isOpen, onClose, household, residents = [], onUpdateHousehold }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResident, setSelectedResident] = useState('');
  const [relationship, setRelationship] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const relationshipOptions = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Child', label: 'Child' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Grandparent', label: 'Grandparent' },
    { value: 'Grandchild', label: 'Grandchild' },
    { value: 'Other', label: 'Other Relative' }
  ];

  const getRelationshipColor = (relationship) => {
    const colors = {
      'Head': 'bg-primary text-primary-foreground',
      'Spouse': 'bg-accent text-accent-foreground',
      'Child': 'bg-success text-success-foreground',
      'Parent': 'bg-secondary text-secondary-foreground',
      'Sibling': 'bg-warning text-warning-foreground',
      'Other': 'bg-muted text-muted-foreground'
    };
    return colors?.[relationship] || colors?.['Other'];
  };

  // Filter available residents (not already in household)
  const availableResidents = residents?.filter(resident => 
    !household?.members?.some(member => member?.id === resident?.id) &&
    resident?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const residentOptions = availableResidents?.map(resident => ({
    value: resident?.id,
    label: `${resident?.name} (ID: ${resident?.barangayId})`,
    description: `Age: ${resident?.age}, ${resident?.civilStatus}`
  }));

  const handleAddMember = () => {
    if (!selectedResident || !relationship) return;

    const resident = residents?.find(r => r?.id === selectedResident);
    if (!resident) return;

    const newMember = {
      ...resident,
      relationship: relationship
    };

    const updatedHousehold = {
      ...household,
      members: [...household?.members, newMember],
      memberCount: household?.memberCount + 1
    };

    onUpdateHousehold(updatedHousehold);
    
    // Reset form
    setSelectedResident('');
    setRelationship('');
    setShowAddForm(false);
  };

  const handleRemoveMember = (memberId) => {
    // Cannot remove household head
    const memberToRemove = household?.members?.find(m => m?.id === memberId);
    if (memberToRemove?.relationship === 'Head') return;

    const updatedMembers = household?.members?.filter(member => member?.id !== memberId);
    const updatedHousehold = {
      ...household,
      members: updatedMembers,
      memberCount: updatedMembers?.length
    };

    onUpdateHousehold(updatedHousehold);
  };

  const handleClose = () => {
    setSearchTerm('');
    setSelectedResident('');
    setRelationship('');
    setShowAddForm(false);
    onClose();
  };

  if (!isOpen || !household) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Manage Household Members</h2>
              <p className="text-sm text-muted-foreground">
                {household?.householdHead?.name}'s Household - {household?.members?.length} members
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="p-6">
          {/* Add Member Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">Add New Member</h3>
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
                iconName={showAddForm ? "Minus" : "Plus"}
                iconPosition="left"
                iconSize={16}
              >
                {showAddForm ? 'Cancel' : 'Add Member'}
              </Button>
            </div>

            {showAddForm && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Select Resident"
                    options={residentOptions}
                    value={selectedResident}
                    onChange={setSelectedResident}
                    searchable
                    placeholder="Search and select a resident..."
                  />
                  
                  <Select
                    label="Relationship"
                    options={relationshipOptions}
                    value={relationship}
                    onChange={setRelationship}
                    placeholder="Select relationship..."
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddMember}
                    disabled={!selectedResident || !relationship}
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Add to Household
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Current Members */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Current Members</h3>
            
            <div className="space-y-3">
              {household?.members?.map((member) => (
                <div key={member?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <Image
                        src={member?.avatar}
                        alt={member?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-base font-medium text-foreground">{member?.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(member?.relationship)}`}>
                          {member?.relationship}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-sm text-muted-foreground">ID: {member?.barangayId}</p>
                        <p className="text-sm text-muted-foreground">Age: {member?.age}</p>
                        <p className="text-sm text-muted-foreground">{member?.civilStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {member?.relationship === 'Head' ? (
                      <span className="text-xs text-muted-foreground px-3 py-1 bg-muted rounded-full">
                        Household Head
                      </span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member?.id)}
                        iconName="UserMinus"
                        iconSize={16}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border mt-6">
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMembersModal;