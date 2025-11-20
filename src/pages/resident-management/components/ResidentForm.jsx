import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResidentForm = ({
  resident = null,
  onSubmit = () => {},
  onCancel = () => {},
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthDate: '',
    gender: '',
    civilStatus: '',
    nationality: 'Filipino',
    religion: '',
    occupation: '',
    address: '',
    zone: '',
    phone: '',
    email: '',
    emergencyContact: '',
    emergencyPhone: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (resident) {
      setFormData({
        firstName: resident?.firstName || '',
        middleName: resident?.middleName || '',
        lastName: resident?.lastName || '',
        suffix: resident?.suffix || '',
        birthDate: resident?.birthDate || '',
        gender: resident?.gender || '',
        civilStatus: resident?.civilStatus || '',
        nationality: resident?.nationality || 'Filipino',
        religion: resident?.religion || '',
        occupation: resident?.occupation || '',
        address: resident?.address || '',
        zone: resident?.zone || '',
        phone: resident?.phone || '',
        email: resident?.email || '',
        emergencyContact: resident?.emergencyContact || '',
        emergencyPhone: resident?.emergencyPhone || '',
        status: resident?.status || 'active'
      });
    }
  }, [resident]);

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const civilStatusOptions = [
    { value: '', label: 'Select Civil Status' },
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
    { value: 'separated', label: 'Separated' }
  ];

  const zoneOptions = [
    { value: '', label: 'Select Zone' },
    { value: '1', label: 'Zone 1' },
    { value: '2', label: 'Zone 2' },
    { value: '3', label: 'Zone 3' },
    { value: '4', label: 'Zone 4' },
    { value: '5', label: 'Zone 5' },
    { value: '6', label: 'Zone 6' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.birthDate) newErrors.birthDate = 'Birth date is required';
    if (!formData?.gender) newErrors.gender = 'Gender is required';
    if (!formData?.civilStatus) newErrors.civilStatus = 'Civil status is required';
    if (!formData?.address?.trim()) newErrors.address = 'Address is required';
    if (!formData?.zone) newErrors.zone = 'Zone is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';

    if (formData?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="First Name"
            type="text"
            value={formData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
            placeholder="Enter first name"
          />
          
          <Input
            label="Middle Name"
            type="text"
            value={formData?.middleName}
            onChange={(e) => handleInputChange('middleName', e?.target?.value)}
            placeholder="Enter middle name (optional)"
          />
          
          <Input
            label="Last Name"
            type="text"
            value={formData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
            placeholder="Enter last name"
          />
          
          <Input
            label="Suffix"
            type="text"
            value={formData?.suffix}
            onChange={(e) => handleInputChange('suffix', e?.target?.value)}
            placeholder="Jr., Sr., III (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Input
            label="Birth Date"
            type="date"
            value={formData?.birthDate}
            onChange={(e) => handleInputChange('birthDate', e?.target?.value)}
            error={errors?.birthDate}
            required
            description={formData?.birthDate ? `Age: ${calculateAge(formData?.birthDate)}` : ''}
          />
          
          <Select
            label="Gender"
            options={genderOptions}
            value={formData?.gender}
            onChange={(value) => handleInputChange('gender', value)}
            error={errors?.gender}
            required
          />
          
          <Select
            label="Civil Status"
            options={civilStatusOptions}
            value={formData?.civilStatus}
            onChange={(value) => handleInputChange('civilStatus', value)}
            error={errors?.civilStatus}
            required
          />
          
          <Input
            label="Nationality"
            type="text"
            value={formData?.nationality}
            onChange={(e) => handleInputChange('nationality', e?.target?.value)}
            placeholder="Enter nationality"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Religion"
            type="text"
            value={formData?.religion}
            onChange={(e) => handleInputChange('religion', e?.target?.value)}
            placeholder="Enter religion (optional)"
          />
          
          <Input
            label="Occupation"
            type="text"
            value={formData?.occupation}
            onChange={(e) => handleInputChange('occupation', e?.target?.value)}
            placeholder="Enter occupation (optional)"
          />
        </div>
      </div>
      {/* Address Information Section */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2" />
          Address Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Complete Address"
              type="text"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              error={errors?.address}
              required
              placeholder="Enter complete address"
            />
          </div>
          
          <Select
            label="Zone"
            options={zoneOptions}
            value={formData?.zone}
            onChange={(value) => handleInputChange('zone', value)}
            error={errors?.zone}
            required
          />
        </div>
      </div>
      {/* Contact Information Section */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Phone" size={20} className="mr-2" />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
            placeholder="Enter phone number"
          />
          
          <Input
            label="Email Address"
            type="email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            placeholder="Enter email address (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            label="Emergency Contact Name"
            type="text"
            value={formData?.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
            placeholder="Enter emergency contact name"
          />
          
          <Input
            label="Emergency Contact Phone"
            type="tel"
            value={formData?.emergencyPhone}
            onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
            placeholder="Enter emergency contact phone"
          />
        </div>
      </div>
      {/* Status Section */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2" />
          Status
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Registration Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            required
          />
        </div>
      </div>
      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
        >
          {resident ? 'Update Resident' : 'Add Resident'}
        </Button>
      </div>
    </form>
  );
};

export default ResidentForm;