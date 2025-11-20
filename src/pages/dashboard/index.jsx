import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeHeader from './components/WelcomeHeader';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import PendingTasks from './components/PendingTasks';

const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  // Mock user data - in real app, this would come from authentication context
  const mockUser = {
    id: 1,
    name: "Maria Santos",
    role: "admin",
    email: "maria.santos@barangay.gov.ph"
  };

  // Mock dashboard metrics
  const dashboardMetrics = [
    {
      id: 'residents',
      title: 'Total Residents',
      value: 1247,
      change: 8.2,
      changeType: 'increase',
      icon: 'Users',
      iconColor: 'text-primary'
    },
    {
      id: 'households',
      title: 'Total Households',
      value: 342,
      change: 3.1,
      changeType: 'increase',
      icon: 'Home',
      iconColor: 'text-success'
    },
    {
      id: 'certificates',
      title: 'Certificates Issued',
      value: 89,
      change: 12.5,
      changeType: 'increase',
      icon: 'FileText',
      iconColor: 'text-accent'
    },
    {
      id: 'pending',
      title: 'Pending Requests',
      value: 15,
      change: -5.2,
      changeType: 'decrease',
      icon: 'Clock',
      iconColor: 'text-warning'
    }
  ];

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'resident_added',
      user: 'Juan Dela Cruz',
      action: 'registered as new resident',
      details: 'Barangay ID: BRG-2024-1248',
      timestamp: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 2,
      type: 'certificate_generated',
      user: 'Maria Santos',
      action: 'generated Barangay Clearance',
      details: 'For: Pedro Martinez (BRG-2024-0892)',
      timestamp: new Date(Date.now() - 900000) // 15 minutes ago
    },
    {
      id: 3,
      type: 'household_created',
      user: 'Ana Reyes',
      action: 'created new household profile',
      details: 'Address: 123 Sampaguita Street',
      timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
    },
    {
      id: 4,
      type: 'data_updated',
      user: 'Carlos Lopez',
      action: 'updated resident information',
      details: 'Updated contact details for Rosa Garcia',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 5,
      type: 'user_login',
      user: 'Elena Fernandez',
      action: 'logged into the system',
      details: 'Staff access from IP: 192.168.1.45',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ];

  // Mock pending tasks
  const pendingTasks = [
    {
      id: 1,
      type: 'certificate_approval',
      title: 'Certificate Approval Required',
      description: 'Indigency Certificate for Carmen Rodriguez needs approval',
      priority: 'high',
      dueDate: new Date(Date.now() + 86400000) // Tomorrow
    },
    {
      id: 2,
      type: 'data_validation',
      title: 'Data Validation Issue',
      description: 'Duplicate resident records found - requires manual review',
      priority: 'medium',
      dueDate: new Date(Date.now() + 172800000) // 2 days
    },
    {
      id: 3,
      type: 'user_verification',
      title: 'New User Verification',
      description: 'Staff account for Roberto Silva pending verification',
      priority: 'low',
      dueDate: new Date(Date.now() + 259200000) // 3 days
    }
  ];

  useEffect(() => {
    // Simulate loading user data
    setUser(mockUser);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    setUser(null);
    // In real app, clear authentication and redirect
  };

  const handleTaskAction = (taskId, action) => {
    console.log(`Task ${taskId} action: ${action}`);
    // In real app, handle task completion or viewing
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={user?.role || 'staff'}
      />
      <div className={`transition-all duration-300 ease-out ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <Header 
          user={user}
          onLogout={handleLogout}
        />
        
        <main className="pt-16">
          <div className="p-6 space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb />
            
            {/* Welcome Header */}
            <WelcomeHeader user={user} />
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics?.map((metric) => (
                <MetricCard
                  key={metric?.id}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  iconColor={metric?.iconColor}
                />
              ))}
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Activity Feed */}
              <div className="lg:col-span-2 space-y-6">
                <ActivityFeed activities={recentActivities} />
                <QuickActions userRole={user?.role || 'staff'} />
              </div>
              
              {/* Right Column - Pending Tasks */}
              <div className="space-y-6">
                <PendingTasks 
                  tasks={pendingTasks}
                  onTaskAction={handleTaskAction}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;