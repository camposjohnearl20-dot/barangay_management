import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AuditTrail = ({ className = '' }) => {
  // Mock audit trail data
  const auditLogs = [
  {
    id: 1,
    certificateType: 'Barangay Clearance',
    certificateNumber: 'CERT-2024-0156',
    residentName: 'Maria Cruz Santos',
    residentId: 'BRG-2024-001',
    issuedBy: 'Admin User',
    issuedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_119edae7e-1763296718356.png",
    issuedByAvatarAlt: 'Professional headshot of male admin with short brown hair wearing blue shirt',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    action: 'Generated PDF',
    status: 'Completed'
  },
  {
    id: 2,
    certificateType: 'Indigency Certificate',
    certificateNumber: 'CERT-2024-0155',
    residentName: 'Juan Garcia Dela Cruz',
    residentId: 'BRG-2024-002',
    issuedBy: 'Staff User',
    issuedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc406c35-1763298318532.png",
    issuedByAvatarAlt: 'Professional headshot of female staff with long black hair wearing white blouse',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    action: 'Printed Document',
    status: 'Completed'
  },
  {
    id: 3,
    certificateType: 'Residency Certificate',
    certificateNumber: 'CERT-2024-0154',
    residentName: 'Ana Flores Rodriguez',
    residentId: 'BRG-2024-003',
    issuedBy: 'Admin User',
    issuedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_119edae7e-1763296718356.png",
    issuedByAvatarAlt: 'Professional headshot of male admin with short brown hair wearing blue shirt',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    action: 'Saved Draft',
    status: 'Draft'
  },
  {
    id: 4,
    certificateType: 'Barangay Clearance',
    certificateNumber: 'CERT-2024-0153',
    residentName: 'Roberto Villanueva Mendoza',
    residentId: 'BRG-2024-004',
    issuedBy: 'Staff User',
    issuedByAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fc406c35-1763298318532.png",
    issuedByAvatarAlt: 'Professional headshot of female staff with long black hair wearing white blouse',
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    action: 'Generated PDF',
    status: 'Completed'
  }];


  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'Draft':
        return { name: 'Clock', color: 'text-warning' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'Generated PDF':
        return 'Download';
      case 'Printed Document':
        return 'Printer';
      case 'Saved Draft':
        return 'Save';
      default:
        return 'FileText';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Recent Certificate Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Track all certificate generation activities for compliance
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground">Audit Trail</h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Government Compliance</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {auditLogs?.map((log) => {
            const statusIcon = getStatusIcon(log?.status);
            return (
              <div key={log?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={log?.issuedByAvatar}
                      alt={log?.issuedByAvatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon
                        name={getActionIcon(log?.action)}
                        size={16}
                        className="text-primary" />

                      <span className="font-medium text-foreground">
                        {log?.certificateType}
                      </span>
                      <Icon
                        name={statusIcon?.name}
                        size={16}
                        className={statusIcon?.color} />

                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        <span className="font-medium">Resident:</span> {log?.residentName} ({log?.residentId})
                      </div>
                      <div>
                        <span className="font-medium">Certificate No:</span> {log?.certificateNumber}
                      </div>
                      <div>
                        <span className="font-medium">Action:</span> {log?.action} by {log?.issuedBy}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 text-right">
                    <div className="text-sm text-muted-foreground">
                      {formatTimeAgo(log?.timestamp)}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                    log?.status === 'Completed' ?
                    'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`
                    }>
                      {log?.status}
                    </div>
                  </div>
                </div>
              </div>);

          })}
        </div>

        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing recent 4 activities
            </span>
            <button className="text-primary hover:text-primary/80 font-medium">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>);

};

export default AuditTrail;