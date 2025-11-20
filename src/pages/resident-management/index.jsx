import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ResidentTable from './components/ResidentTable';
import ResidentFilters from './components/ResidentFilters';
import ResidentForm from './components/ResidentForm';
import ResidentModal from './components/ResidentModal';
import BulkActions from './components/BulkActions';

const ResidentManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showResidentModal, setShowResidentModal] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [selectedResidents, setSelectedResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Maria Santos",
    role: "admin",
    email: "maria.santos@barangay.gov.ph"
  };

  // Mock residents data
  const [residents, setResidents] = useState([
  {
    id: 1,
    barangayId: "BRG-2024-001",
    firstName: "Juan",
    middleName: "Cruz",
    lastName: "Dela Cruz",
    name: "Juan Cruz Dela Cruz",
    age: 35,
    birthDate: "1988-05-15",
    gender: "male",
    civilStatus: "married",
    nationality: "Filipino",
    religion: "Catholic",
    occupation: "Teacher",
    address: "123 Rizal Street",
    zone: "1",
    phone: "+63 912 345 6789",
    email: "juan.delacruz@email.com",
    emergencyContact: "Maria Dela Cruz",
    emergencyPhone: "+63 912 345 6790",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_196c567d2-1763291953915.png",
    avatarAlt: "Professional headshot of Filipino man with short black hair in white polo shirt",
    registrationDate: "2024-01-15",
    lastUpdated: "2024-11-15",
    household: {
      id: "HH-001",
      role: "head"
    }
  },
  {
    id: 2,
    barangayId: "BRG-2024-002",
    firstName: "Maria",
    middleName: "Santos",
    lastName: "Garcia",
    name: "Maria Santos Garcia",
    age: 28,
    birthDate: "1995-08-22",
    gender: "female",
    civilStatus: "single",
    nationality: "Filipino",
    religion: "Catholic",
    occupation: "Nurse",
    address: "456 Bonifacio Avenue",
    zone: "2",
    phone: "+63 917 234 5678",
    email: "maria.garcia@email.com",
    emergencyContact: "Rosa Garcia",
    emergencyPhone: "+63 917 234 5679",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_140f42d1c-1763300841840.png",
    avatarAlt: "Professional headshot of Filipina woman with long black hair in blue blouse",
    registrationDate: "2024-02-10",
    lastUpdated: "2024-11-10",
    household: {
      id: "HH-002",
      role: "head"
    }
  },
  {
    id: 3,
    barangayId: "BRG-2024-003",
    firstName: "Roberto",
    middleName: "Mendoza",
    lastName: "Reyes",
    name: "Roberto Mendoza Reyes",
    age: 42,
    birthDate: "1981-12-03",
    gender: "male",
    civilStatus: "married",
    nationality: "Filipino",
    religion: "Protestant",
    occupation: "Engineer",
    address: "789 Mabini Street",
    zone: "3",
    phone: "+63 920 345 6789",
    email: "roberto.reyes@email.com",
    emergencyContact: "Carmen Reyes",
    emergencyPhone: "+63 920 345 6790",
    status: "pending",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_124b724d8-1763292494646.png",
    avatarAlt: "Professional headshot of Filipino man with glasses and mustache in dark suit",
    registrationDate: "2024-03-05",
    lastUpdated: "2024-11-05",
    household: {
      id: "HH-003",
      role: "head"
    }
  },
  {
    id: 4,
    barangayId: "BRG-2024-004",
    firstName: "Ana",
    middleName: "Lopez",
    lastName: "Villanueva",
    name: "Ana Lopez Villanueva",
    age: 31,
    birthDate: "1992-07-18",
    gender: "female",
    civilStatus: "divorced",
    nationality: "Filipino",
    religion: "Catholic",
    occupation: "Accountant",
    address: "321 Luna Street",
    zone: "1",
    phone: "+63 915 678 9012",
    email: "ana.villanueva@email.com",
    emergencyContact: "Pedro Villanueva",
    emergencyPhone: "+63 915 678 9013",
    status: "active",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_122710690-1763297773531.png",
    avatarAlt: "Professional headshot of Filipina woman with shoulder-length hair in red blazer",
    registrationDate: "2024-04-12",
    lastUpdated: "2024-11-12",
    household: {
      id: "HH-004",
      role: "head"
    }
  },
  {
    id: 5,
    barangayId: "BRG-2024-005",
    firstName: "Carlos",
    middleName: "Ramos",
    lastName: "Torres",
    name: "Carlos Ramos Torres",
    age: 55,
    birthDate: "1968-11-25",
    gender: "male",
    civilStatus: "widowed",
    nationality: "Filipino",
    religion: "Catholic",
    occupation: "Retired",
    address: "654 Aguinaldo Road",
    zone: "4",
    phone: "+63 918 901 2345",
    email: "",
    emergencyContact: "Miguel Torres",
    emergencyPhone: "+63 918 901 2346",
    status: "inactive",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b671ab1f-1763292989842.png",
    avatarAlt: "Professional headshot of older Filipino man with gray hair in checkered shirt",
    registrationDate: "2024-05-20",
    lastUpdated: "2024-10-20",
    household: {
      id: "HH-005",
      role: "head"
    }
  }]
  );

  // Filter residents based on search and filter criteria
  const filteredResidents = useMemo(() => {
    return residents?.filter((resident) => {
      const matchesSearch = !searchTerm ||
      resident?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      resident?.barangayId?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesZone = !selectedZone || resident?.zone === selectedZone;
      const matchesStatus = !selectedStatus || resident?.status === selectedStatus;

      const matchesDateRange = !dateRange?.start && !dateRange?.end ||
      dateRange?.start && dateRange?.end &&
      new Date(resident.registrationDate) >= new Date(dateRange.start) &&
      new Date(resident.registrationDate) <= new Date(dateRange.end);

      return matchesSearch && matchesZone && matchesStatus && matchesDateRange;
    });
  }, [residents, searchTerm, selectedZone, selectedStatus, dateRange]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleAddResident = () => {
    setSelectedResident(null);
    setShowAddForm(true);
  };

  const handleEditResident = (resident) => {
    setSelectedResident(resident);
    setShowEditForm(true);
    setShowResidentModal(false);
  };

  const handleViewResident = (resident) => {
    setSelectedResident(resident);
    setShowResidentModal(true);
  };

  const handleGenerateId = (resident) => {
    // Mock ID card generation
    alert(`Generating ID card for ${resident?.name} (${resident?.barangayId})`);
    setShowResidentModal(false);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedResident) {
        // Update existing resident
        setResidents((prev) => prev?.map((resident) =>
        resident?.id === selectedResident?.id ?
        {
          ...resident,
          ...formData,
          name: `${formData?.firstName} ${formData?.middleName} ${formData?.lastName}`?.replace(/\s+/g, ' ')?.trim(),
          lastUpdated: new Date()?.toISOString()?.split('T')?.[0]
        } :
        resident
        ));
      } else {
        // Add new resident
        const newResident = {
          id: residents?.length + 1,
          barangayId: `BRG-2024-${String(residents?.length + 1)?.padStart(3, '0')}`,
          ...formData,
          name: `${formData?.firstName} ${formData?.middleName} ${formData?.lastName}`?.replace(/\s+/g, ' ')?.trim(),
          age: calculateAge(formData?.birthDate),
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_117dbac63-1763295212937.png",
          avatarAlt: "Default profile photo of person in professional attire",
          registrationDate: new Date()?.toISOString()?.split('T')?.[0],
          lastUpdated: new Date()?.toISOString()?.split('T')?.[0]
        };

        setResidents((prev) => [...prev, newResident]);
      }

      setShowAddForm(false);
      setShowEditForm(false);
      setSelectedResident(null);
    } catch (error) {
      console.error('Failed to save resident:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today?.getFullYear() - birth?.getFullYear();
    const monthDiff = today?.getMonth() - birth?.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today?.getDate() < birth?.getDate()) {
      age--;
    }
    return age;
  };

  const handleSelectResident = (residentId) => {
    setSelectedResidents((prev) =>
    prev?.includes(residentId) ?
    prev?.filter((id) => id !== residentId) :
    [...prev, residentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedResidents?.length === filteredResidents?.length) {
      setSelectedResidents([]);
    } else {
      setSelectedResidents(filteredResidents?.map((resident) => resident?.id));
    }
  };

  const handleBulkExport = async () => {
    // Mock export functionality
    alert(`Exporting ${selectedResidents?.length} resident records...`);
    setSelectedResidents([]);
  };

  const handleBulkStatusUpdate = async (status) => {
    setResidents((prev) => prev?.map((resident) =>
    selectedResidents?.includes(resident?.id) ?
    { ...resident, status, lastUpdated: new Date()?.toISOString()?.split('T')?.[0] } :
    resident
    ));
    setSelectedResidents([]);
  };

  const handleBulkDelete = async () => {
    setResidents((prev) => prev?.filter((resident) => !selectedResidents?.includes(resident?.id)));
    setSelectedResidents([]);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedZone('');
    setSelectedStatus('');
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={currentUser?.role} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        {/* Header */}
        <Header
          user={currentUser}
          onLogout={handleLogout} />


        {/* Page Content */}
        <main className="pt-16 p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Resident Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage barangay residents and their information
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                variant="default"
                onClick={handleAddResident}
                iconName="Plus"
                iconPosition="left"
                iconSize={20}>

                Add New Resident
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Residents</p>
                  <p className="text-2xl font-bold text-foreground">{residents?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Residents</p>
                  <p className="text-2xl font-bold text-foreground">
                    {residents?.filter((r) => r?.status === 'active')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="UserCheck" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                  <p className="text-2xl font-bold text-foreground">
                    {residents?.filter((r) => r?.status === 'pending')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">
                    {residents?.filter((r) => {
                      const regDate = new Date(r.registrationDate);
                      const now = new Date();
                      return regDate?.getMonth() === now?.getMonth() && regDate?.getFullYear() === now?.getFullYear();
                    })?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <ResidentFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onClearFilters={handleClearFilters}
            className="mb-6" />


          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedResidents?.length}
            onExport={handleBulkExport}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkDelete={handleBulkDelete}
            onClearSelection={() => setSelectedResidents([])}
            className="mb-6" />


          {/* Residents Table */}
          <ResidentTable
            residents={filteredResidents}
            onEdit={handleEditResident}
            onView={handleViewResident}
            onGenerateId={handleGenerateId}
            selectedResidents={selectedResidents}
            onSelectResident={handleSelectResident}
            onSelectAll={handleSelectAll} />

        </main>
      </div>
      {/* Add Resident Modal */}
      {showAddForm &&
      <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Add New Resident</h2>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
                iconName="X"
                iconSize={20}
                className="h-8 w-8 p-0" />

              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                <ResidentForm
                onSubmit={handleFormSubmit}
                onCancel={() => setShowAddForm(false)}
                isLoading={isLoading} />

              </div>
            </div>
          </div>
        </>
      }
      {/* Edit Resident Modal */}
      {showEditForm && selectedResident &&
      <>
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowEditForm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Edit Resident</h2>
                <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditForm(false)}
                iconName="X"
                iconSize={20}
                className="h-8 w-8 p-0" />

              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
                <ResidentForm
                resident={selectedResident}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowEditForm(false)}
                isLoading={isLoading} />

              </div>
            </div>
          </div>
        </>
      }
      {/* Resident Details Modal */}
      <ResidentModal
        resident={selectedResident}
        isOpen={showResidentModal}
        onClose={() => setShowResidentModal(false)}
        onEdit={handleEditResident}
        onGenerateId={handleGenerateId} />

    </div>);

};

export default ResidentManagement;