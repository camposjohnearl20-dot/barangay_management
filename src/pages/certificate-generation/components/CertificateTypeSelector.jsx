import React from 'react';

import Icon from '../../../components/AppIcon';

const CertificateTypeSelector = ({ selectedType, onTypeSelect, className = '' }) => {
  const certificateTypes = [
    {
      id: 'barangay-clearance',
      name: 'Barangay Clearance',
      description: 'Certificate of good moral character and standing in the community',
      icon: 'Shield',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'indigency-certificate',
      name: 'Indigency Certificate',
      description: 'Certificate for financial assistance and social services',
      icon: 'Heart',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'residency-certificate',
      name: 'Residency Certificate',
      description: 'Certificate of residence within the barangay',
      icon: 'Home',
      color: 'bg-amber-50 border-amber-200 hover:bg-amber-100'
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Certificate Type
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose the type of certificate you want to generate
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certificateTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => onTypeSelect(type?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : type?.color
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedType === type?.id ? 'bg-primary text-white' : 'bg-white'
              }`}>
                <Icon name={type?.icon} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {type?.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {type?.description}
                </p>
              </div>
              {selectedType === type?.id && (
                <Icon name="Check" size={20} className="text-primary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CertificateTypeSelector;