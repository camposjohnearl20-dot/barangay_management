import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HouseholdDetailsModal = ({ isOpen, onClose, household, onEdit, onGenerateCertificate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const mockCertificates = [
    {
      id: 'CERT-001',
      type: 'Barangay Clearance',
      issuedTo: household?.householdHead?.name || '',
      dateIssued: '2024-11-15',
      status: 'Active',
      purpose: 'Employment Requirements'
    },
    {
      id: 'CERT-002',
      type: 'Indigency Certificate',
      issuedTo: household?.members?.[1]?.name || 'Family Member',
      dateIssued: '2024-11-10',
      status: 'Active',
      purpose: 'Medical Assistance'
    },
    {
      id: 'CERT-003',
      type: 'Residency Certificate',
      issuedTo: household?.householdHead?.name || '',
      dateIssued: '2024-11-05',
      status: 'Expired',
      purpose: 'Business Permit'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-success text-success-foreground',
      'Expired': 'bg-destructive text-destructive-foreground',
      'Pending': 'bg-warning text-warning-foreground'
    };
    return colors?.[status] || colors?.['Pending'];
  };

  if (!isOpen || !household) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 overflow-hidden rounded-full">
              <Image
                src={household?.householdHead?.avatar}
                alt={household?.householdHead?.avatarAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{household?.householdHead?.name}</h2>
              <p className="text-sm text-muted-foreground">Household ID: {household?.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(household)}
              iconName="Edit"
              iconPosition="left"
              iconSize={16}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'members' ?'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Members ({household?.members?.length})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'certificates'
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Certificates
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Address</label>
                      <p className="text-base text-foreground">{household?.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date Formed</label>
                      <p className="text-base text-foreground">{formatDate(household?.dateFormed)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                      <p className="text-base text-foreground">{household?.contactNumber || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Total Members</label>
                      <p className="text-base text-foreground">{household?.memberCount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Certificates Issued</label>
                      <p className="text-base text-foreground">{household?.certificatesIssued}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                      <p className="text-base text-foreground">{household?.emergencyContact || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{household?.memberCount}</p>
                    <p className="text-sm text-muted-foreground">Total Members</p>
                  </div>
                  <div className="bg-success/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-success">{household?.certificatesIssued}</p>
                    <p className="text-sm text-muted-foreground">Certificates</p>
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-accent">
                      {household?.members?.filter(m => m?.age < 18)?.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Minors</p>
                  </div>
                  <div className="bg-secondary/10 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-secondary">
                      {household?.members?.filter(m => m?.age >= 60)?.length}
                    </p>
                    <p className="text-sm text-muted-foreground">Seniors</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Household Members</h3>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onGenerateCertificate(household)}
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={16}
                >
                  Generate Certificate
                </Button>
              </div>
              
              <div className="space-y-3">
                {household?.members?.map((member) => (
                  <div key={member?.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 overflow-hidden rounded-full">
                        <Image
                          src={member?.avatar}
                          alt={member?.avatarAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGenerateCertificate(household, member)}
                      iconName="FileText"
                      iconSize={16}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Issued Certificates</h3>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onGenerateCertificate(household)}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Generate New
                </Button>
              </div>
              
              <div className="space-y-3">
                {mockCertificates?.map((certificate) => (
                  <div key={certificate?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h4 className="text-base font-medium text-foreground">{certificate?.type}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate?.status)}`}>
                            {certificate?.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-muted-foreground">Issued to: {certificate?.issuedTo}</p>
                          <p className="text-sm text-muted-foreground">Date: {formatDate(certificate?.dateIssued)}</p>
                          <p className="text-sm text-muted-foreground">Purpose: {certificate?.purpose}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Download"
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        iconSize={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetailsModal;