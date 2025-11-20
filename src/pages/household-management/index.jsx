import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import HouseholdCard from './components/HouseholdCard';
import CreateHouseholdModal from './components/CreateHouseholdModal';
import ManageMembersModal from './components/ManageMembersModal';
import HouseholdDetailsModal from './components/HouseholdDetailsModal';
import HouseholdFilters from './components/HouseholdFilters';

const HouseholdManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedHousehold, setSelectedHousehold] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [memberCountFilter, setMemberCountFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  // Mock user data
  const currentUser = {
    id: 'user-1',
    name: 'Maria Santos',
    role: 'admin',
    email: 'maria.santos@barangay.gov.ph'
  };

  // Mock households data
  const [households, setHouseholds] = useState([
  {
    id: 'HH-001',
    householdHead: {
      id: 'RES-001',
      name: 'Juan Carlos Dela Cruz',
      barangayId: 'BRG-2024-001',
      age: 45,
      civilStatus: 'Married',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_196c567d2-1763291953915.png",
      avatarAlt: 'Professional headshot of middle-aged Filipino man with short black hair in white collared shirt'
    },
    address: '123 Sampaguita Street, Barangay Bagong Pag-asa',
    barangay: 'barangay-1',
    city: 'Quezon City',
    zipCode: '1105',
    contactNumber: '+63 917 123 4567',
    emergencyContact: 'Rosa Dela Cruz',
    emergencyContactNumber: '+63 918 765 4321',
    dateFormed: '2024-01-15T00:00:00Z',
    memberCount: 4,
    certificatesIssued: 8,
    members: [
    {
      id: 'RES-001',
      name: 'Juan Carlos Dela Cruz',
      barangayId: 'BRG-2024-001',
      age: 45,
      civilStatus: 'Married',
      relationship: 'Head',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_196c567d2-1763291953915.png",
      avatarAlt: 'Professional headshot of middle-aged Filipino man with short black hair in white collared shirt'
    },
    {
      id: 'RES-002',
      name: 'Maria Elena Dela Cruz',
      barangayId: 'BRG-2024-002',
      age: 42,
      civilStatus: 'Married',
      relationship: 'Spouse',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0133154-1763299535170.png",
      avatarAlt: 'Smiling Filipino woman with long dark hair wearing blue blouse'
    },
    {
      id: 'RES-003',
      name: 'Carlos Miguel Dela Cruz',
      barangayId: 'BRG-2024-003',
      age: 18,
      civilStatus: 'Single',
      relationship: 'Child',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13e1abaa8-1763295535572.png",
      avatarAlt: 'Young Filipino man with short dark hair in casual white t-shirt'
    },
    {
      id: 'RES-004',
      name: 'Sofia Isabella Dela Cruz',
      barangayId: 'BRG-2024-004',
      age: 15,
      civilStatus: 'Single',
      relationship: 'Child',
      avatar: "https://images.unsplash.com/photo-1564636866914-cf34c1b21880",
      avatarAlt: 'Teenage Filipino girl with long dark hair wearing pink top'
    }]

  },
  {
    id: 'HH-002',
    householdHead: {
      id: 'RES-005',
      name: 'Roberto Martinez',
      barangayId: 'BRG-2024-005',
      age: 38,
      civilStatus: 'Married',
      avatar: "https://images.unsplash.com/photo-1731951039706-0e793240bb32",
      avatarAlt: 'Filipino man with mustache wearing dark blue polo shirt'
    },
    address: '456 Rose Avenue, Barangay Batasan Hills',
    barangay: 'barangay-2',
    city: 'Quezon City',
    zipCode: '1126',
    contactNumber: '+63 919 234 5678',
    emergencyContact: 'Carmen Martinez',
    emergencyContactNumber: '+63 920 876 5432',
    dateFormed: '2024-02-20T00:00:00Z',
    memberCount: 3,
    certificatesIssued: 5,
    members: [
    {
      id: 'RES-005',
      name: 'Roberto Martinez',
      barangayId: 'BRG-2024-005',
      age: 38,
      civilStatus: 'Married',
      relationship: 'Head',
      avatar: "https://images.unsplash.com/photo-1731951039706-0e793240bb32",
      avatarAlt: 'Filipino man with mustache wearing dark blue polo shirt'
    },
    {
      id: 'RES-006',
      name: 'Ana Cristina Martinez',
      barangayId: 'BRG-2024-006',
      age: 35,
      civilStatus: 'Married',
      relationship: 'Spouse',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12fe366de-1763296429148.png",
      avatarAlt: 'Filipino woman with shoulder-length hair wearing white blouse'
    },
    {
      id: 'RES-007',
      name: 'Miguel Roberto Martinez',
      barangayId: 'BRG-2024-007',
      age: 12,
      civilStatus: 'Single',
      relationship: 'Child',
      avatar: "https://images.unsplash.com/photo-1665847840712-73b679632a85",
      avatarAlt: 'Young Filipino boy with short dark hair wearing red shirt'
    }]

  },
  {
    id: 'HH-003',
    householdHead: {
      id: 'RES-008',
      name: 'Elena Reyes',
      barangayId: 'BRG-2024-008',
      age: 67,
      civilStatus: 'Widow',
      avatar: "https://images.unsplash.com/photo-1583124961569-7fe7dbc808be",
      avatarAlt: 'Elderly Filipino woman with gray hair wearing floral blouse'
    },
    address: '789 Jasmine Lane, Barangay Commonwealth',
    barangay: 'barangay-3',
    city: 'Quezon City',
    zipCode: '1121',
    contactNumber: '+63 921 345 6789',
    emergencyContact: 'Pedro Reyes',
    emergencyContactNumber: '+63 922 987 6543',
    dateFormed: '2024-03-10T00:00:00Z',
    memberCount: 2,
    certificatesIssued: 3,
    members: [
    {
      id: 'RES-008',
      name: 'Elena Reyes',
      barangayId: 'BRG-2024-008',
      age: 67,
      civilStatus: 'Widow',
      relationship: 'Head',
      avatar: "https://images.unsplash.com/photo-1583124961569-7fe7dbc808be",
      avatarAlt: 'Elderly Filipino woman with gray hair wearing floral blouse'
    },
    {
      id: 'RES-009',
      name: 'Carmen Reyes Santos',
      barangayId: 'BRG-2024-009',
      age: 40,
      civilStatus: 'Married',
      relationship: 'Child',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_122710690-1763297773531.png",
      avatarAlt: 'Filipino woman with long dark hair wearing green blouse'
    }]

  }]
  );

  // Mock residents data for creating households
  const mockResidents = [
  {
    id: 'RES-010',
    name: 'Antonio Fernandez',
    barangayId: 'BRG-2024-010',
    age: 52,
    civilStatus: 'Married',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_15045587f-1763295043077.png",
    avatarAlt: 'Middle-aged Filipino man with graying hair wearing white shirt'
  },
  {
    id: 'RES-011',
    name: 'Luz Esperanza Garcia',
    barangayId: 'BRG-2024-011',
    age: 29,
    civilStatus: 'Single',
    avatar: "https://images.unsplash.com/photo-1694185766501-487b73d10332",
    avatarAlt: 'Young Filipino woman with curly hair wearing yellow top'
  },
  {
    id: 'RES-012',
    name: 'Ricardo Villanueva',
    barangayId: 'BRG-2024-012',
    age: 34,
    civilStatus: 'Married',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_124b724d8-1763292494646.png",
    avatarAlt: 'Filipino man with beard wearing dark gray shirt'
  }];


  // Filter households based on search and filters
  const filteredHouseholds = households?.filter((household) => {
    const matchesSearch = household?.householdHead?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    household?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase());

    const matchesMemberCount = !memberCountFilter ||
    memberCountFilter === '1' && household?.memberCount === 1 ||
    memberCountFilter === '2-3' && household?.memberCount >= 2 && household?.memberCount <= 3 ||
    memberCountFilter === '4-5' && household?.memberCount >= 4 && household?.memberCount <= 5 ||
    memberCountFilter === '6+' && household?.memberCount >= 6;

    const matchesAddress = !addressFilter || household?.barangay === addressFilter;

    return matchesSearch && matchesMemberCount && matchesAddress;
  });

  const handleCreateHousehold = (householdData) => {
    const newHousehold = {
      ...householdData,
      id: `HH-${String(households?.length + 1)?.padStart(3, '0')}`
    };
    setHouseholds((prev) => [...prev, newHousehold]);
  };

  const handleEditHousehold = (household) => {
    setSelectedHousehold(household);
    // In a real app, this would open an edit modal
    console.log('Edit household:', household);
  };

  const handleViewDetails = (household) => {
    setSelectedHousehold(household);
    setShowDetailsModal(true);
  };

  const handleManageMembers = (household) => {
    setSelectedHousehold(household);
    setShowMembersModal(true);
  };

  const handleUpdateHousehold = (updatedHousehold) => {
    setHouseholds((prev) =>
    prev?.map((h) => h?.id === updatedHousehold?.id ? updatedHousehold : h)
    );
    setSelectedHousehold(updatedHousehold);
  };

  const handleGenerateCertificate = (household, member = null) => {
    // Navigate to certificate generation with household context
    navigate('/certificate-generation', {
      state: {
        household,
        selectedMember: member,
        returnTo: '/household-management'
      }
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setMemberCountFilter('');
    setAddressFilter('');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={currentUser?.role} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <Header user={currentUser} onLogout={handleLogout} />

        {/* Page Content */}
        <main className="pt-16 p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Household Management</h1>
              <p className="text-muted-foreground">
                Manage household units and family relationships
              </p>
            </div>
            <Button
              variant="default"
              onClick={() => setShowCreateModal(true)}
              iconName="Plus"
              iconPosition="left"
              iconSize={20}>

              Create New Household
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Home" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{households?.length}</p>
                  <p className="text-sm text-muted-foreground">Total Households</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {households?.reduce((sum, h) => sum + h?.memberCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Members</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {households?.reduce((sum, h) => sum + h?.certificatesIssued, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Certificates Issued</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {(households?.reduce((sum, h) => sum + h?.memberCount, 0) / households?.length)?.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Household Size</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <HouseholdFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            memberCountFilter={memberCountFilter}
            onMemberCountChange={setMemberCountFilter}
            addressFilter={addressFilter}
            onAddressChange={setAddressFilter}
            onClearFilters={handleClearFilters} />


          {/* Households Grid */}
          <div className="mt-6">
            {filteredHouseholds?.length > 0 ?
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHouseholds?.map((household) =>
              <HouseholdCard
                key={household?.id}
                household={household}
                onEdit={handleEditHousehold}
                onViewDetails={handleViewDetails}
                onManageMembers={handleManageMembers} />

              )}
              </div> :

            <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Home" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">No households found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || memberCountFilter || addressFilter ?
                'Try adjusting your search criteria or filters.' : 'Get started by creating your first household.'}
                </p>
                {!searchTerm && !memberCountFilter && !addressFilter &&
              <Button
                variant="default"
                onClick={() => setShowCreateModal(true)}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}>

                    Create New Household
                  </Button>
              }
              </div>
            }
          </div>
        </main>
      </div>
      {/* Modals */}
      <CreateHouseholdModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateHousehold}
        residents={mockResidents} />

      <ManageMembersModal
        isOpen={showMembersModal}
        onClose={() => setShowMembersModal(false)}
        household={selectedHousehold}
        residents={mockResidents}
        onUpdateHousehold={handleUpdateHousehold} />

      <HouseholdDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        household={selectedHousehold}
        onEdit={handleEditHousehold}
        onGenerateCertificate={handleGenerateCertificate} />

    </div>);

};

export default HouseholdManagement;