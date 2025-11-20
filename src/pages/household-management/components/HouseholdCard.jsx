import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HouseholdCard = ({ household, onEdit, onViewDetails, onManageMembers }) => {
  const [showMembers, setShowMembers] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Home" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {household?.householdHead?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Household ID: {household?.id}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(household)}
            iconName="Edit"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(household)}
            iconName="Eye"
            iconSize={16}
          />
        </div>
      </div>
      {/* Address */}
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="MapPin" size={16} className="text-muted-foreground" />
        <p className="text-sm text-foreground">{household?.address}</p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{household?.memberCount}</p>
          <p className="text-xs text-muted-foreground">Members</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">{household?.certificatesIssued}</p>
          <p className="text-xs text-muted-foreground">Certificates</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{formatDate(household?.dateFormed)}</p>
          <p className="text-xs text-muted-foreground">Date Formed</p>
        </div>
      </div>
      {/* Members Toggle */}
      <div className="border-t border-border pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMembers(!showMembers)}
          className="w-full justify-between"
          iconName={showMembers ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
        >
          <span className="text-sm font-medium">
            {showMembers ? 'Hide Members' : 'Show Members'} ({household?.members?.length})
          </span>
        </Button>

        {/* Members List */}
        {showMembers && (
          <div className="mt-4 space-y-3">
            {household?.members?.map((member) => (
              <div key={member?.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 overflow-hidden rounded-full">
                    <Image
                      src={member?.avatar}
                      alt={member?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{member?.name}</p>
                    <p className="text-xs text-muted-foreground">Age: {member?.age}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelationshipColor(member?.relationship)}`}>
                  {member?.relationship}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onManageMembers(household)}
          iconName="Users"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Manage Members
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(household)}
          iconName="FileText"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default HouseholdCard;