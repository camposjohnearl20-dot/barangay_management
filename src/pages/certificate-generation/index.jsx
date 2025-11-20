import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CertificateTypeSelector from './components/CertificateTypeSelector';
import ResidentSearchSelector from './components/ResidentSearchSelector';
import CertificatePreview from './components/CertificatePreview';
import AuditTrail from './components/AuditTrail';

const CertificateGeneration = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedCertificateType, setSelectedCertificateType] = useState('');
  const [selectedResident, setSelectedResident] = useState(null);
  const [customText, setCustomText] = useState('');

  // Mock user data
  const currentUser = {
    id: 1,
    name: 'Admin User',
    role: 'admin',
    email: 'admin@barangay.gov.ph'
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const handleGeneratePDF = () => {
    if (!selectedCertificateType || !selectedResident) return;
    
    // Mock PDF generation
    console.log('Generating PDF for:', {
      type: selectedCertificateType,
      resident: selectedResident?.fullName,
      customText
    });
    
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${selectedCertificateType}-${selectedResident?.barangayId}.pdf`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    
    alert('PDF generated successfully!');
  };

  const handlePrint = () => {
    if (!selectedCertificateType || !selectedResident) return;
    
    // Mock print functionality
    console.log('Printing certificate for:', {
      type: selectedCertificateType,
      resident: selectedResident?.fullName
    });
    
    window.print();
  };

  const handleSaveDraft = () => {
    if (!selectedCertificateType || !selectedResident) return;
    
    // Mock save draft functionality
    console.log('Saving draft for:', {
      type: selectedCertificateType,
      resident: selectedResident?.fullName,
      customText
    });
    
    alert('Draft saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
        userRole={currentUser?.role}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        {/* Header */}
        <Header
          user={currentUser}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="pt-16 p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Certificate Generation
            </h1>
            <p className="text-muted-foreground">
              Generate official barangay certificates with auto-populated resident data
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Certificate Setup */}
            <div className="xl:col-span-2 space-y-8">
              {/* Certificate Type Selection */}
              <div className="bg-card border border-border rounded-lg p-6">
                <CertificateTypeSelector
                  selectedType={selectedCertificateType}
                  onTypeSelect={setSelectedCertificateType}
                />
              </div>

              {/* Resident Selection */}
              {selectedCertificateType && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <ResidentSearchSelector
                    selectedResident={selectedResident}
                    onResidentSelect={setSelectedResident}
                  />
                </div>
              )}

              {/* Certificate Preview */}
              {selectedCertificateType && selectedResident && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <CertificatePreview
                    certificateType={selectedCertificateType}
                    resident={selectedResident}
                    customText={customText}
                    onCustomTextChange={setCustomText}
                    onGeneratePDF={handleGeneratePDF}
                    onPrint={handlePrint}
                    onSaveDraft={handleSaveDraft}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Audit Trail */}
            <div className="xl:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6">
                <AuditTrail />
              </div>
            </div>
          </div>

          {/* Mobile Actions */}
          {selectedCertificateType && selectedResident && (
            <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
              <div className="flex space-x-3">
                <button
                  onClick={handleSaveDraft}
                  className="flex-1 bg-secondary text-secondary-foreground py-3 px-4 rounded-lg font-medium text-center"
                >
                  Save Draft
                </button>
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-outline border border-border py-3 px-4 rounded-lg font-medium text-center"
                >
                  Print
                </button>
                <button
                  onClick={handleGeneratePDF}
                  className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium text-center"
                >
                  Generate PDF
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CertificateGeneration;