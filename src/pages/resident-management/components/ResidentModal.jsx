import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResidentModal = ({
  resident = null,
  isOpen = false,
  onClose = () => {},
  onEdit = () => {},
  onGenerateId = () => {}
}) => {
  if (!isOpen || !resident) return null;

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Inactive' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 'N/A';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birth?.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                <Image
                  src={resident?.avatar}
                  alt={resident?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {resident?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Barangay ID: {resident?.barangayId}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {getStatusBadge(resident?.status)}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
                iconSize={20}
                className="h-8 w-8 p-0"
              />
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="User" size={20} className="mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-sm text-foreground mt-1">{resident?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Age</label>
                    <p className="text-sm text-foreground mt-1">{resident?.age} years old</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Birth Date</label>
                    <p className="text-sm text-foreground mt-1">
                      {resident?.birthDate ? new Date(resident.birthDate)?.toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="text-sm text-foreground mt-1 capitalize">{resident?.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Civil Status</label>
                    <p className="text-sm text-foreground mt-1 capitalize">{resident?.civilStatus || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nationality</label>
                    <p className="text-sm text-foreground mt-1">{resident?.nationality || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Religion</label>
                    <p className="text-sm text-foreground mt-1">{resident?.religion || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Occupation</label>
                    <p className="text-sm text-foreground mt-1">{resident?.occupation || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="MapPin" size={20} className="mr-2" />
                  Address Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Complete Address</label>
                    <p className="text-sm text-foreground mt-1">{resident?.address}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Zone</label>
                    <p className="text-sm text-foreground mt-1">Zone {resident?.zone}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <p className="text-sm text-foreground mt-1">{resident?.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <p className="text-sm text-foreground mt-1">{resident?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                    <p className="text-sm text-foreground mt-1">{resident?.emergencyContact || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Emergency Phone</label>
                    <p className="text-sm text-foreground mt-1">{resident?.emergencyPhone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div className="bg-muted/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Calendar" size={20} className="mr-2" />
                  Registration Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Registration Date</label>
                    <p className="text-sm text-foreground mt-1">
                      {resident?.registrationDate ? new Date(resident.registrationDate)?.toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-sm text-foreground mt-1">
                      {resident?.lastUpdated ? new Date(resident.lastUpdated)?.toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Household Information */}
              {resident?.household && (
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="Home" size={20} className="mr-2" />
                    Household Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Household ID</label>
                      <p className="text-sm text-foreground mt-1">{resident?.household?.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Role in Household</label>
                      <p className="text-sm text-foreground mt-1 capitalize">{resident?.household?.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-muted/20">
            <Button
              variant="outline"
              onClick={() => onGenerateId(resident)}
              iconName="CreditCard"
              iconPosition="left"
              iconSize={16}
            >
              Generate ID Card
            </Button>
            <Button
              variant="default"
              onClick={() => onEdit(resident)}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit Resident
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResidentModal;