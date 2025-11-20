import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ResidentSearchSelector = ({ selectedResident, onResidentSelect, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock residents data
  const mockResidents = [
  {
    id: 1,
    barangayId: 'BRG-2024-001',
    firstName: 'Maria',
    lastName: 'Santos',
    middleName: 'Cruz',
    fullName: 'Maria Cruz Santos',
    dateOfBirth: '1985-03-15',
    age: 39,
    gender: 'Female',
    civilStatus: 'Married',
    address: '123 Rizal Street, Barangay San Jose',
    contactNumber: '+63 912 345 6789',
    occupation: 'Teacher',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18d43244b-1763297288059.png",
    avatarAlt: 'Professional headshot of Filipino woman with shoulder-length black hair wearing white blouse'
  },
  {
    id: 2,
    barangayId: 'BRG-2024-002',
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    middleName: 'Garcia',
    fullName: 'Juan Garcia Dela Cruz',
    dateOfBirth: '1978-07-22',
    age: 46,
    gender: 'Male',
    civilStatus: 'Married',
    address: '456 Bonifacio Avenue, Barangay San Jose',
    contactNumber: '+63 917 234 5678',
    occupation: 'Carpenter',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc38413b-1763294138349.png",
    avatarAlt: 'Professional headshot of Filipino man with short black hair wearing blue polo shirt'
  },
  {
    id: 3,
    barangayId: 'BRG-2024-003',
    firstName: 'Ana',
    lastName: 'Rodriguez',
    middleName: 'Flores',
    fullName: 'Ana Flores Rodriguez',
    dateOfBirth: '1992-11-08',
    age: 32,
    gender: 'Female',
    civilStatus: 'Single',
    address: '789 Luna Street, Barangay San Jose',
    contactNumber: '+63 905 876 5432',
    occupation: 'Nurse',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_100ef577e-1763294608562.png",
    avatarAlt: 'Professional headshot of young Filipino woman with long black hair wearing medical scrubs'
  },
  {
    id: 4,
    barangayId: 'BRG-2024-004',
    firstName: 'Roberto',
    lastName: 'Mendoza',
    middleName: 'Villanueva',
    fullName: 'Roberto Villanueva Mendoza',
    dateOfBirth: '1965-12-03',
    age: 59,
    gender: 'Male',
    civilStatus: 'Widowed',
    address: '321 Mabini Road, Barangay San Jose',
    contactNumber: '+63 918 765 4321',
    occupation: 'Retired',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12555ad0a-1763292986677.png",
    avatarAlt: 'Professional headshot of elderly Filipino man with gray hair wearing formal white shirt'
  }];


  useEffect(() => {
    if (searchTerm?.length >= 2) {
      setIsSearching(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockResidents?.filter((resident) =>
        resident?.fullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        resident?.barangayId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleResidentSelect = (resident) => {
    onResidentSelect(resident);
    setSearchTerm(resident?.fullName);
    setSearchResults([]);
  };

  const clearSelection = () => {
    onResidentSelect(null);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Resident
        </h3>
        <p className="text-sm text-muted-foreground">
          Search by name or Barangay ID to select a resident
        </p>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by name or Barangay ID (e.g., BRG-2024-001)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="pr-10" />

        {searchTerm &&
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSelection}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-auto"
          iconName="X"
          iconSize={16} />

        }
      </div>
      {/* Search Results */}
      {searchResults?.length > 0 &&
      <div className="border border-border rounded-lg bg-card shadow-elevation-1 max-h-64 overflow-y-auto">
          {searchResults?.map((resident) =>
        <button
          key={resident?.id}
          onClick={() => handleResidentSelect(resident)}
          className="w-full p-3 text-left hover:bg-muted transition-colors border-b border-border last:border-b-0">

              <div className="flex items-center space-x-3">
                <Image
              src={resident?.avatar}
              alt={resident?.avatarAlt}
              className="w-10 h-10 rounded-full object-cover" />

                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {resident?.fullName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ID: {resident?.barangayId} • {resident?.address}
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
        )}
        </div>
      }
      {/* Loading State */}
      {isSearching &&
      <div className="flex items-center justify-center py-4">
          <Icon name="Loader2" size={20} className="animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
        </div>
      }
      {/* Selected Resident Display */}
      {selectedResident &&
      <div className="border border-border rounded-lg bg-card p-4">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-medium text-foreground">Selected Resident</h4>
            <Button
            variant="ghost"
            size="sm"
            onClick={clearSelection}
            iconName="X"
            iconSize={16} />

          </div>
          <div className="flex items-center space-x-4">
            <Image
            src={selectedResident?.avatar}
            alt={selectedResident?.avatarAlt}
            className="w-16 h-16 rounded-full object-cover" />

            <div className="flex-1">
              <h5 className="font-medium text-foreground mb-1">
                {selectedResident?.fullName}
              </h5>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Barangay ID: {selectedResident?.barangayId}</div>
                <div>Age: {selectedResident?.age} • {selectedResident?.gender}</div>
                <div>Address: {selectedResident?.address}</div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default ResidentSearchSelector;