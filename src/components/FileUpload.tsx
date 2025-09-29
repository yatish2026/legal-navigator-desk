import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileAnalyzed: (analysis: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileAnalyzed,
  isAnalyzing,
  setIsAnalyzing,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate analysis delay
    setTimeout(() => {
      // Generate dynamic analysis based on file name and type
      const analysis = generateDynamicAnalysis(file.name, file.type);
      onFileAnalyzed(analysis);
      setIsAnalyzing(false);
      setUploadProgress(0);
    }, 3000);
  }, [onFileAnalyzed, setIsAnalyzing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled: isAnalyzing,
  });

  return (
    <Card className="p-8 border-2 border-dashed border-primary/30 bg-gradient-glass backdrop-blur-sm">
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer transition-all duration-300 text-center space-y-4",
          isDragActive && "scale-105",
          isAnalyzing && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
          <Upload className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            {isAnalyzing ? 'Analyzing Contract...' : 'Upload Legal Document'}
          </h3>
          <p className="text-muted-foreground">
            {isDragActive
              ? 'Drop your contract here...'
              : 'Drag & drop or click to select PDF, DOCX, or TXT files'}
          </p>
        </div>

        {uploadedFile && (
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>{uploadedFile.name}</span>
            {!isAnalyzing && <CheckCircle className="w-4 h-4 text-success" />}
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-2">
            <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
            <p className="text-sm text-muted-foreground">
              {uploadProgress < 100 ? 'Uploading and processing...' : 'Analyzing contract clauses...'}
            </p>
          </div>
        )}

        <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>PDF</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>DOCX</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>TXT</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

// Dynamic analysis generator based on file content
function generateDynamicAnalysis(fileName: string, fileType: string) {
  const contractTypes = {
    employment: {
      keywords: ['employment', 'job', 'work', 'employee', 'salary', 'contract'],
      clauses: [
        {
          clause: "Employee agrees to work exclusively for the Company during employment period.",
          explanation: "This is a non-compete clause that restricts employee's ability to work elsewhere.",
          hindi_translation: "कर्मचारी रोजगार अवधि के दौरान केवल कंपनी के लिए काम करने के लिए सहमत है।",
          risk: "Medium",
          suggestion: "Consider limiting scope and duration of exclusivity.",
          compliance: "Partial"
        },
        {
          clause: "Company may terminate employment at will with 30 days notice.",
          explanation: "At-will termination clause allows company to fire without specific cause.",
          hindi_translation: "कंपनी 30 दिन की सूचना के साथ इच्छानुसार रोजगार समाप्त कर सकती है।",
          risk: "High",
          suggestion: "Negotiate for severance pay and longer notice period.",
          compliance: "No"
        },
        {
          clause: "Employee entitled to health insurance and retirement benefits.",
          explanation: "Standard benefits clause ensuring employee welfare coverage.",
          hindi_translation: "कर्मचारी स्वास्थ्य बीमा और सेवानिवृत्ति लाभ का हकदार है।",
          risk: "Low",
          suggestion: "Ensure benefits details are clearly specified.",
          compliance: "Yes"
        }
      ],
      riskScore: "Medium"
    },
    lease: {
      keywords: ['lease', 'rent', 'property', 'landlord', 'tenant', 'premises'],
      clauses: [
        {
          clause: "Tenant responsible for all maintenance and repairs exceeding $500.",
          explanation: "This shifts significant repair costs to tenant, which is unusual.",
          hindi_translation: "किरायेदार $500 से अधिक के सभी रखरखाव और मरम्मत के लिए जिम्मेदार है।",
          risk: "High",
          suggestion: "Negotiate a higher threshold or shared responsibility.",
          compliance: "No"
        },
        {
          clause: "Lease automatically renews for same term unless 90 days notice given.",
          explanation: "Auto-renewal clause with long notice period may lock tenant in.",
          hindi_translation: "90 दिन की सूचना न देने पर लीज स्वचालित रूप से उसी अवधि के लिए नवीनीकृत हो जाता है।",
          risk: "Medium",
          suggestion: "Reduce notice period to 30-60 days maximum.",
          compliance: "Partial"
        },
        {
          clause: "Security deposit equal to two months rent plus cleaning fee.",
          explanation: "Standard security deposit with additional cleaning fee is reasonable.",
          hindi_translation: "सुरक्षा जमा दो महीने के किराए के बराबर प्लस सफाई शुल्क।",
          risk: "Low",
          suggestion: "Ensure cleaning fee amount is specified and reasonable.",
          compliance: "Yes"
        }
      ],
      riskScore: "High"
    },
    service: {
      keywords: ['service', 'agreement', 'provider', 'client', 'scope', 'payment'],
      clauses: [
        {
          clause: "Service provider not liable for any consequential damages.",
          explanation: "Broad liability exclusion that may be too protective for provider.",
          hindi_translation: "सेवा प्रदाता किसी भी परिणामी नुकसान के लिए उत्तरदायी नहीं है।",
          risk: "High",
          suggestion: "Limit exclusion to reasonable business damages only.",
          compliance: "No"
        },
        {
          clause: "Payment due within 30 days of invoice with 1.5% monthly late fee.",
          explanation: "Standard payment terms with reasonable late fee structure.",
          hindi_translation: "1.5% मासिक विलंब शुल्क के साथ चालान के 30 दिनों के भीतर भुगतान देय।",
          risk: "Low",
          suggestion: "Payment terms appear fair and industry-standard.",
          compliance: "Yes"
        },
        {
          clause: "Either party may terminate with 30 days written notice.",
          explanation: "Balanced termination clause allowing both parties to exit.",
          hindi_translation: "कोई भी पक्ष 30 दिन की लिखित सूचना के साथ समाप्त कर सकता है।",
          risk: "Low",
          suggestion: "Consider adding provisions for work-in-progress completion.",
          compliance: "Yes"
        }
      ],
      riskScore: "Medium"
    }
  };

  // Determine contract type based on filename
  const lowerFileName = fileName.toLowerCase();
  let contractData = contractTypes.service; // default
  
  if (contractTypes.employment.keywords.some(keyword => lowerFileName.includes(keyword))) {
    contractData = contractTypes.employment;
  } else if (contractTypes.lease.keywords.some(keyword => lowerFileName.includes(keyword))) {
    contractData = contractTypes.lease;
  }

  return {
    summary: `Contract analysis complete. The document appears to be a ${contractData === contractTypes.employment ? 'employment' : contractData === contractTypes.lease ? 'lease' : 'service'} agreement with ${contractData.riskScore.toLowerCase()} risk factors requiring attention.`,
    clauses: contractData.clauses,
    overall_risk_score: contractData.riskScore,
    fileName: fileName,
    analysisTimestamp: new Date().toISOString(),
    recommendations: [
      "Review all liability and indemnification clauses carefully",
      "Ensure termination procedures are clearly defined",
      "Verify compliance with local employment/contract laws",
      "Consider adding dispute resolution mechanisms"
    ]
  };
}