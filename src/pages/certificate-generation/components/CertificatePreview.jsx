import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CertificatePreview = ({ 
  certificateType, 
  resident, 
  customText, 
  onCustomTextChange, 
  onGeneratePDF, 
  onPrint, 
  onSaveDraft,
  className = '' 
}) => {
  if (!certificateType || !resident) {
    return (
      <div className={`border-2 border-dashed border-border rounded-lg p-8 text-center ${className}`}>
        <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">
          Certificate Preview
        </h3>
        <p className="text-muted-foreground">
          Select a certificate type and resident to see the preview
        </p>
      </div>
    );
  }

  const getCertificateTitle = () => {
    switch (certificateType) {
      case 'barangay-clearance':
        return 'BARANGAY CLEARANCE';
      case 'indigency-certificate':
        return 'CERTIFICATE OF INDIGENCY';
      case 'residency-certificate':
        return 'CERTIFICATE OF RESIDENCY';
      default:
        return 'CERTIFICATE';
    }
  };

  const getCertificateContent = () => {
    const currentDate = new Date()?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    switch (certificateType) {
      case 'barangay-clearance':
        return `TO WHOM IT MAY CONCERN:

This is to certify that ${resident?.fullName}, ${resident?.age} years old, ${resident?.civilStatus}, Filipino citizen, and a resident of ${resident?.address}, has no pending case or derogatory record in this Barangay as of this date.

This certification is issued upon the request of the above-named person for whatever legal purpose it may serve.

${customText || 'Given this ' + new Date()?.getDate() + getOrdinalSuffix(new Date()?.getDate()) + ' day of ' + new Date()?.toLocaleDateString('en-US', { month: 'long' }) + ', ' + new Date()?.getFullYear() + ' at Barangay San Jose, Philippines.'}`;

      case 'indigency-certificate':
        return `TO WHOM IT MAY CONCERN:

This is to certify that ${resident?.fullName}, ${resident?.age} years old, ${resident?.civilStatus}, and a resident of ${resident?.address}, belongs to an indigent family in this Barangay.

This certification is issued to attest that the above-named person is qualified to avail of any government assistance, scholarship, or other social services intended for indigent families.

${customText || 'Given this ' + new Date()?.getDate() + getOrdinalSuffix(new Date()?.getDate()) + ' day of ' + new Date()?.toLocaleDateString('en-US', { month: 'long' }) + ', ' + new Date()?.getFullYear() + ' at Barangay San Jose, Philippines.'}`;

      case 'residency-certificate':
        return `TO WHOM IT MAY CONCERN:

This is to certify that ${resident?.fullName}, ${resident?.age} years old, ${resident?.civilStatus}, Filipino citizen, is a bonafide resident of ${resident?.address}, and has been residing in this Barangay for a considerable period of time.

This certification is issued upon the request of the above-named person for whatever legal purpose it may serve.

${customText || 'Given this ' + new Date()?.getDate() + getOrdinalSuffix(new Date()?.getDate()) + ' day of ' + new Date()?.toLocaleDateString('en-US', { month: 'long' }) + ', ' + new Date()?.getFullYear() + ' at Barangay San Jose, Philippines.'}`;

      default:
        return '';
    }
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Certificate Preview
          </h3>
          <p className="text-sm text-muted-foreground">
            Review the certificate before generating
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveDraft}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save Draft
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onPrint}
            iconName="Printer"
            iconPosition="left"
            iconSize={16}
          >
            Print
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onGeneratePDF}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Generate PDF
          </Button>
        </div>
      </div>
      {/* Certificate Document Preview */}
      <div className="bg-white border border-border rounded-lg shadow-elevation-2 p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
              <Icon name="Building2" size={32} color="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                REPUBLIC OF THE PHILIPPINES
              </h1>
              <h2 className="text-lg font-semibold text-gray-700">
                PROVINCE OF METRO MANILA
              </h2>
              <h3 className="text-base font-medium text-gray-600">
                BARANGAY SAN JOSE
              </h3>
            </div>
          </div>
          <div className="w-full h-px bg-gray-300 mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getCertificateTitle()}
          </h2>
        </div>

        {/* Certificate Content */}
        <div className="mb-8">
          <div className="text-gray-800 leading-relaxed whitespace-pre-line text-justify">
            {getCertificateContent()}
          </div>
        </div>

        {/* Signature Section */}
        <div className="flex justify-end mt-12">
          <div className="text-center">
            <div className="border-b border-gray-400 w-64 mb-2"></div>
            <div className="font-semibold text-gray-800">BARANGAY CAPTAIN</div>
            <div className="text-sm text-gray-600">Punong Barangay</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-500">
            Certificate No: CERT-{new Date()?.getFullYear()}-{String(Math.floor(Math.random() * 10000))?.padStart(4, '0')}
          </div>
          <div className="text-xs text-gray-500">
            Issued on: {new Date()?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>
      {/* Custom Text Editor */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">
          Customize Certificate Text (Optional)
        </h4>
        <textarea
          value={customText}
          onChange={(e) => onCustomTextChange(e?.target?.value)}
          placeholder="Add custom text or modify the closing statement..."
          className="w-full h-24 p-3 border border-border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          This will replace the default closing statement in the certificate
        </p>
      </div>
    </div>
  );
};

export default CertificatePreview;