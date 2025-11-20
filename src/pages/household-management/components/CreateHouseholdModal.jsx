import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateHouseholdModal = ({ isOpen, onClose, onSubmit, residents = [] }) => {
  const [formData, setFormData] = useState({
    householdHeadId: '',
    address: '',
    barangay: '',
    city: 'Quezon City',
    zipCode: '',
    contactNumber: '',
    emergencyContact: '',
    emergencyContactNumber: ''
  });

  const [errors, setErrors] = useState({});

  const barangayOptions = [
    { value: 'barangay-1', label: 'Barangay Bagong Pag-asa' },
    { value: 'barangay-2', label: 'Barangay Batasan Hills' },
    { value: 'barangay-3', label: 'Barangay Commonwealth' },
    { value: 'barangay-4', label: 'Barangay Fairview' },
    { value: 'barangay-5', label: 'Barangay Holy Spirit' },
    { value: 'barangay-6', label: 'Barangay Novaliches Proper' }
  ];

  const residentOptions = residents?.map(resident => ({
    value: resident?.id,
    label: `${resident?.name} (ID: ${resident?.barangayId})`,
    description: `Age: ${resident?.age}, ${resident?.civilStatus}`
  }));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.householdHeadId) {
      newErrors.householdHeadId = 'Please select a household head';
    }
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData?.barangay) {
      newErrors.barangay = 'Please select a barangay';
    }
    if (!formData?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    if (!formData?.contactNumber?.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const selectedResident = residents?.find(r => r?.id === formData?.householdHeadId);
      
      const householdData = {
        ...formData,
        householdHead: selectedResident,
        dateFormed: new Date()?.toISOString(),
        memberCount: 1,
        certificatesIssued: 0,
        members: [{
          ...selectedResident,
          relationship: 'Head'
        }]
      };
      
      onSubmit(householdData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      householdHeadId: '',
      address: '',
      barangay: '',
      city: 'Quezon City',
      zipCode: '',
      contactNumber: '',
      emergencyContact: '',
      emergencyContactNumber: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Home" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create New Household</h2>
              <p className="text-sm text-muted-foreground">Set up a new household profile</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Household Head Selection */}
          <div>
            <Select
              label="Household Head"
              description="Select the primary resident who will be the head of this household"
              options={residentOptions}
              value={formData?.householdHeadId}
              onChange={(value) => handleInputChange('householdHeadId', value)}
              error={errors?.householdHeadId}
              required
              searchable
              placeholder="Search and select a resident..."
            />
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="MapPin" size={20} />
              <span>Address Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Street Address"
                  type="text"
                  placeholder="Enter complete street address"
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                  error={errors?.address}
                  required
                />
              </div>
              
              <Select
                label="Barangay"
                options={barangayOptions}
                value={formData?.barangay}
                onChange={(value) => handleInputChange('barangay', value)}
                error={errors?.barangay}
                required
                placeholder="Select barangay..."
              />
              
              <Input
                label="City"
                type="text"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                disabled
              />
              
              <Input
                label="ZIP Code"
                type="text"
                placeholder="Enter ZIP code"
                value={formData?.zipCode}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                error={errors?.zipCode}
                required
              />
              
              <Input
                label="Contact Number"
                type="tel"
                placeholder="Enter primary contact number"
                value={formData?.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
                error={errors?.contactNumber}
                required
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="Phone" size={20} />
              <span>Emergency Contact (Optional)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Emergency Contact Name"
                type="text"
                placeholder="Enter emergency contact name"
                value={formData?.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
              />
              
              <Input
                label="Emergency Contact Number"
                type="tel"
                placeholder="Enter emergency contact number"
                value={formData?.emergencyContactNumber}
                onChange={(e) => handleInputChange('emergencyContactNumber', e?.target?.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Create Household
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHouseholdModal;