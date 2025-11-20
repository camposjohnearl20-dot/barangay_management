import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import UserStats from './components/UserStats';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';
import UserCard from './components/UserCard';
import UserModal from './components/UserModal';
import ActivityLog from './components/ActivityLog';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortBy, setSortBy] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    activity: ''
  });

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Admin User",
    role: "admin",
    email: "admin@barangay.gov.ph"
  };

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: "Maria Santos",
      username: "msantos",
      email: "maria.santos@barangay.gov.ph",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15T08:00:00Z",
      lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 2,
      fullName: "Juan Dela Cruz",
      username: "jdelacruz",
      email: "juan.delacruz@barangay.gov.ph",
      role: "staff",
      status: "active",
      createdAt: "2024-02-20T09:30:00Z",
      lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 3,
      fullName: "Ana Rodriguez",
      username: "arodriguez",
      email: "ana.rodriguez@barangay.gov.ph",
      role: "staff",
      status: "active",
      createdAt: "2024-03-10T10:15:00Z",
      lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 4,
      fullName: "Carlos Mendoza",
      username: "cmendoza",
      email: "carlos.mendoza@barangay.gov.ph",
      role: "staff",
      status: "suspended",
      createdAt: "2024-01-25T11:45:00Z",
      lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 5,
      fullName: "Lisa Garcia",
      username: "lgarcia",
      email: "lisa.garcia@barangay.gov.ph",
      role: "admin",
      status: "active",
      createdAt: "2024-04-05T14:20:00Z",
      lastLogin: new Date(Date.now() - 30 * 60 * 1000)?.toISOString()
    },
    {
      id: 6,
      fullName: "Roberto Flores",
      username: "rflores",
      email: "roberto.flores@barangay.gov.ph",
      role: "staff",
      status: "inactive",
      createdAt: "2024-02-28T16:00:00Z",
      lastLogin: null
    }
  ]);

  // Mock activity log data
  const [activities] = useState([
    {
      id: 1,
      type: "user_created",
      description: "New user account created",
      performedBy: "Maria Santos",
      targetUser: "Roberto Flores",
      timestamp: new Date(Date.now() - 30 * 60 * 1000)?.toISOString(),
      ipAddress: "192.168.1.100",
      details: "Staff member account created with basic permissions"
    },
    {
      id: 2,
      type: "user_login",
      description: "User logged into system",
      performedBy: "Juan Dela Cruz",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(),
      ipAddress: "192.168.1.105"
    },
    {
      id: 3,
      type: "status_changed",
      description: "User status changed to suspended",
      performedBy: "Maria Santos",
      targetUser: "Carlos Mendoza",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)?.toISOString(),
      ipAddress: "192.168.1.100",
      details: "Account suspended due to policy violation"
    },
    {
      id: 4,
      type: "password_changed",
      description: "Password updated successfully",
      performedBy: "Ana Rodriguez",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)?.toISOString(),
      ipAddress: "192.168.1.110"
    },
    {
      id: 5,
      type: "role_changed",
      description: "User role updated from staff to admin",
      performedBy: "Maria Santos",
      targetUser: "Lisa Garcia",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString(),
      ipAddress: "192.168.1.100",
      details: "Promoted to administrator role with full system access"
    }
  ]);

  // Calculate user statistics
  const userStats = {
    total: users?.length,
    active: users?.filter(user => user?.status === 'active')?.length,
    admins: users?.filter(user => user?.role === 'admin')?.length,
    staff: users?.filter(user => user?.role === 'staff')?.length
  };

  // Filter and sort users
  const filteredUsers = users?.filter(user => {
      const matchesSearch = !filters?.search || 
        user?.fullName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        user?.username?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesRole = !filters?.role || user?.role === filters?.role;
      const matchesStatus = !filters?.status || user?.status === filters?.status;
      
      let matchesActivity = true;
      if (filters?.activity) {
        const now = new Date();
        const lastLogin = user?.lastLogin ? new Date(user.lastLogin) : null;
        
        switch (filters?.activity) {
          case 'recent':
            matchesActivity = lastLogin && (now - lastLogin) <= 7 * 24 * 60 * 60 * 1000;
            break;
          case 'inactive':
            matchesActivity = lastLogin && (now - lastLogin) > 30 * 24 * 60 * 60 * 1000;
            break;
          case 'never':
            matchesActivity = !lastLogin;
            break;
        }
      }
      
      return matchesSearch && matchesRole && matchesStatus && matchesActivity;
    })?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];
      
      if (sortBy === 'lastLogin') {
        aValue = aValue ? new Date(aValue) : new Date(0);
        bValue = bValue ? new Date(bValue) : new Date(0);
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      role: '',
      status: '',
      activity: ''
    });
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleToggleUserStatus = (user) => {
    const newStatus = user?.status === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id ? { ...u, status: newStatus } : u
    ));
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user?.fullName}? This action cannot be undone.`)) {
      setUsers(prev => prev?.filter(u => u?.id !== user?.id));
    }
  };

  const handleSaveUser = (userData) => {
    if (modalMode === 'create') {
      setUsers(prev => [...prev, userData]);
    } else {
      setUsers(prev => prev?.map(u => 
        u?.id === userData?.id ? userData : u
      ));
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole={currentUser?.role}
        className="hidden lg:block"
      />
      <Sidebar 
        isCollapsed={!isMobileSidebarOpen}
        onToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        userRole={currentUser?.role}
        className="lg:hidden"
      />
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <Header 
          user={currentUser}
          onLogout={handleLogout}
        />

        <main className="pt-16">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <Breadcrumb />
                <h1 className="text-2xl font-bold text-foreground mt-2">User Management</h1>
                <p className="text-muted-foreground mt-1">
                  Manage system users, roles, and permissions
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  iconName="Menu"
                  iconSize={20}
                  className="lg:hidden"
                />
                
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    iconName="Table"
                    iconSize={16}
                  />
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    iconName="Grid3X3"
                    iconSize={16}
                  />
                </div>
              </div>
            </div>

            <UserStats stats={userStats} />

            <UserFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onAddUser={handleAddUser}
            />

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-3">
                {viewMode === 'table' ? (
                  <UserTable
                    users={filteredUsers}
                    onEdit={handleEditUser}
                    onToggleStatus={handleToggleUserStatus}
                    onDelete={handleDeleteUser}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers?.map(user => (
                      <UserCard
                        key={user?.id}
                        user={user}
                        onEdit={handleEditUser}
                        onToggleStatus={handleToggleUserStatus}
                        onDelete={handleDeleteUser}
                      />
                    ))}
                  </div>
                )}

                {filteredUsers?.length === 0 && (
                  <div className="bg-card border border-border rounded-lg p-12 text-center">
                    <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
                    <p className="text-muted-foreground mb-4">
                      {filters?.search || filters?.role || filters?.status || filters?.activity
                        ? 'Try adjusting your filters to see more results.' :'Get started by adding your first user account.'
                      }
                    </p>
                    <Button
                      variant="default"
                      onClick={handleAddUser}
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Add New User
                    </Button>
                  </div>
                )}
              </div>

              <div className="xl:col-span-1">
                <ActivityLog activities={activities} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        mode={modalMode}
      />
    </div>
  );
};

export default UserManagement;