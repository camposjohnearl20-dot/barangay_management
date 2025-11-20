import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'staff',
    status: 'active',
    sendWelcomeEmail: true
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        fullName: user?.fullName || '',
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        confirmPassword: '',
        role: user?.role || 'staff',
        status: user?.status || 'active',
        sendWelcomeEmail: false
      });
    } else {
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'staff',
        status: 'active',
        sendWelcomeEmail: true
      });
    }
    setErrors({});
  }, [user, mode, isOpen]);

  const roleOptions = [
    { value: 'admin', label: 'Administrator', description: 'Full system access and user management' },
    { value: 'staff', label: 'Staff Member', description: 'Limited access to daily operations' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', description: 'User can log in and access the system' },
    { value: 'inactive', label: 'Inactive', description: 'User account is disabled' },
    { value: 'suspended', label: 'Suspended', description: 'Temporarily restricted access' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (mode === 'create' || formData?.password) {
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        ...formData,
        id: user?.id || Date.now(),
        createdAt: user?.createdAt || new Date()?.toISOString(),
        lastLogin: user?.lastLogin || null
      };

      await onSave(userData);
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {mode === 'create' ? 'Add New User' : 'Edit User'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <Input
            label="Username"
            type="text"
            placeholder="Enter username"
            value={formData?.username}
            onChange={(e) => handleInputChange('username', e?.target?.value)}
            error={errors?.username}
            description="Must be at least 3 characters long"
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <Input
            label={mode === 'create' ? 'Password' : 'New Password'}
            type="password"
            placeholder={mode === 'create' ? 'Enter password' : 'Leave blank to keep current'}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            description="Must be at least 8 characters long"
            required={mode === 'create'}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm password"
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required={mode === 'create' || formData?.password}
          />

          <Select
            label="Role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            required
          />

          <Select
            label="Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            required
          />

          {mode === 'create' && (
            <Checkbox
              label="Send welcome email"
              description="Send login credentials and welcome message to the user"
              checked={formData?.sendWelcomeEmail}
              onChange={(e) => handleInputChange('sendWelcomeEmail', e?.target?.checked)}
            />
          )}

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              iconName={mode === 'create' ? 'Plus' : 'Save'}
              iconPosition="left"
              iconSize={16}
            >
              {mode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;