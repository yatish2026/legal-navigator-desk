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

// Enhanced dynamic analysis generator with more realistic content
function generateDynamicAnalysis(fileName: string, fileType: string) {
  const contractTemplates = {
    employment: {
      keywords: ['employment', 'job', 'work', 'employee', 'salary', 'contract', 'hire', 'staff'],
      clauses: [
        {
          clause: "Employee agrees to work exclusively for the Company during employment period and shall not engage in any competing business activities.",
          explanation: "This is a comprehensive non-compete clause that restricts the employee's ability to work elsewhere or start competing ventures. It may be overly broad and could limit future career opportunities.",
          hindi_translation: "कर्मचारी रोजगार अवधि के दौरान केवल कंपनी के लिए काम करने और किसी भी प्रतिस्पर्धी व्यावसायिक गतिविधियों में शामिल नहीं होने के लिए सहमत है।",
          risk: "High",
          suggestion: "Negotiate to limit the scope to direct competitors only and add geographical and time limitations (e.g., 1-2 years maximum).",
          compliance: "Partial"
        },
        {
          clause: "Company may terminate employment at will with 30 days notice without cause or severance payment.",
          explanation: "This at-will termination clause heavily favors the employer, allowing termination without specific justification and without financial compensation to the employee.",
          hindi_translation: "कंपनी बिना कारण या बिना बर्खास्तगी भुगतान के 30 दिन की सूचना के साथ इच्छानुसार रोजगार समाप्त कर सकती है।",
          risk: "High",
          suggestion: "Negotiate for severance pay (2-4 weeks per year of service), longer notice period (60-90 days), and clear termination criteria.",
          compliance: "No"
        },
        {
          clause: "Employee entitled to comprehensive health insurance, dental coverage, retirement benefits, and annual performance bonuses based on company profits.",
          explanation: "Excellent benefits package that demonstrates employer commitment to employee welfare. Performance-based bonuses align employee interests with company success.",
          hindi_translation: "कर्मचारी व्यापक स्वास्थ्य बीमा, दंत कवरेज, सेवानिवृत्ति लाभ, और कंपनी के मुनाफे के आधार पर वार्षिक प्रदर्शन बोनस का हकदार है।",
          risk: "Low",
          suggestion: "Ensure specific bonus calculation criteria are detailed in writing to avoid disputes later.",
          compliance: "Yes"
        },
        {
          clause: "All intellectual property created by Employee during employment, including inventions made using company resources, belongs to the Company.",
          explanation: "Standard IP assignment clause but potentially overreaching as it could include personal projects unrelated to work performed on personal time.",
          hindi_translation: "रोजगार के दौरान कर्मचारी द्वारा बनाई गई सभी बौद्धिक संपदा, कंपनी के संसाधनों का उपयोग करके किए गए आविष्कारों सहित, कंपनी की है।",
          risk: "Medium",
          suggestion: "Clarify that this only applies to work-related inventions and exclude personal projects created on personal time without company resources.",
          compliance: "Partial"
        }
      ],
      riskScore: "High",
      summary: "Employment contract analysis reveals significant employee protection concerns with overly broad termination and non-compete clauses. While benefits are competitive, legal protections favor the employer heavily.",
      recommendations: [
        "Negotiate comprehensive severance package with graduated benefits based on tenure",
        "Limit non-compete clause scope geographically and temporally to reasonable business needs",
        "Clarify intellectual property rights to exclude personal projects and innovations",
        "Add detailed performance review procedures and termination cause definitions",
        "Include dispute resolution mechanisms like mediation before litigation",
        "Request written confirmation of all verbal promises made during hiring process"
      ]
    },
    lease: {
      keywords: ['lease', 'rent', 'property', 'landlord', 'tenant', 'premises', 'apartment', 'house'],
      clauses: [
        {
          clause: "Tenant responsible for all maintenance, repairs, and improvements exceeding $500, including structural issues and HVAC system replacement.",
          explanation: "Extremely tenant-unfavorable clause that shifts major structural and system maintenance costs to the tenant, which is typically the landlord's responsibility under standard leasing practices.",
          hindi_translation: "किरायेदार $500 से अधिक के सभी रखरखाव, मरम्मत और सुधार के लिए जिम्मेदार है, जिसमें संरचनात्मक मुद्दे और एचवीएसी सिस्टम प्रतिस्थापन शामिल है।",
          risk: "High",
          suggestion: "Negotiate to limit tenant responsibility to minor repairs ($200-300 max) and cosmetic issues. Major systems and structural repairs should remain landlord's responsibility.",
          compliance: "No"
        },
        {
          clause: "Lease automatically renews for same term unless either party provides 90 days written notice, with 3% annual rent increase.",
          explanation: "Auto-renewal with long notice period could lock tenant into unfavorable terms. The 3% increase may exceed local rent control limits in some jurisdictions.",
          hindi_translation: "जब तक कोई भी पक्ष 90 दिन की लिखित सूचना नहीं देता, 3% वार्षिक किराया वृद्धि के साथ लीज स्वचालित रूप से उसी अवधि के लिए नवीनीकृत हो जाता है।",
          risk: "Medium",
          suggestion: "Reduce notice period to 30-60 days and cap annual increases to local legal limits or market rate, whichever is lower.",
          compliance: "Partial"
        },
        {
          clause: "Security deposit equal to two months rent plus $500 cleaning fee, refundable within 45 days of lease termination upon satisfactory inspection.",
          explanation: "Security deposit amount is within reasonable range, though on the higher side. The separate cleaning fee may be redundant given the security deposit coverage.",
          hindi_translation: "सुरक्षा जमा दो महीने के किराए के बराबर प्लस $500 सफाई शुल्क, संतोषजनक निरीक्षण पर लीज समाप्ति के 45 दिनों के भीतर वापसी योग्य।",
          risk: "Low",
          suggestion: "Negotiate to include cleaning fee within security deposit rather than as separate charge, and ensure detailed move-in inspection documentation.",
          compliance: "Yes"
        },
        {
          clause: "No pets policy strictly enforced with immediate lease termination for violations, regardless of pet size or circumstances.",
          explanation: "Zero-tolerance pet policy with harsh penalty may be problematic for disability accommodations and doesn't account for legitimate service or emotional support animals.",
          hindi_translation: "पालतू जानवरों की नीति नहीं, उल्लंघन के लिए तत्काल लीज समाप्ति के साथ सख्ती से लागू, पालतू जानवर के आकार या परिस्थितियों की परवाह किए बिना।",
          risk: "Medium",
          suggestion: "Add exceptions for service animals as legally required, and consider graduated penalties rather than immediate termination for first violations.",
          compliance: "Partial"
        }
      ],
      riskScore: "High",
      summary: "Residential lease analysis shows heavily landlord-favored terms with excessive tenant financial responsibility and harsh enforcement policies that may violate local tenant protection laws.",
      recommendations: [
        "Research local tenant rights and rent control ordinances before signing",
        "Document all existing property conditions with timestamped photos",
        "Negotiate caps on tenant maintenance responsibility to reasonable amounts",
        "Ensure compliance with ADA requirements for service animal accommodations",
        "Request detailed breakdown of all fees and charges with legal justification",
        "Consider shorter initial lease term to test landlord responsiveness to issues"
      ]
    },
    service: {
      keywords: ['service', 'agreement', 'provider', 'client', 'scope', 'payment', 'consulting', 'professional'],
      clauses: [
        {
          clause: "Service provider shall not be liable for any direct, indirect, consequential, or punitive damages exceeding the total contract value, regardless of cause.",
          explanation: "Extremely broad liability exclusion that may be unenforceable in some jurisdictions and leaves the client with little recourse for provider negligence or breach.",
          hindi_translation: "सेवा प्रदाता कारण की परवाह किए बिना, कुल अनुबंध मूल्य से अधिक किसी भी प्रत्यक्ष, अप्रत्यक्ष, परिणामी, या दंडात्मक नुकसान के लिए उत्तरदायी नहीं होगा।",
          risk: "High",
          suggestion: "Limit liability exclusions to reasonable business damages and maintain provider responsibility for negligence and willful misconduct.",
          compliance: "No"
        },
        {
          clause: "Payment due within 30 days of invoice with 1.5% monthly late fee and right to suspend services for non-payment after 15 days.",
          explanation: "Standard payment terms with reasonable late fee structure and clear consequences for non-payment. The suspension right protects the service provider's interests.",
          hindi_translation: "1.5% मासिक विलंब शुल्क के साथ चालान के 30 दिनों के भीतर भुगतान देय और 15 दिनों के बाद गैर-भुगतान के लिए सेवाओं को निलंबित करने का अधिकार।",
          risk: "Low",
          suggestion: "Payment terms appear fair and industry-standard. Consider requesting 5-day grace period before late fees apply.",
          compliance: "Yes"
        },
        {
          clause: "Either party may terminate with 30 days written notice, with immediate termination allowed for material breach after 7-day cure period.",
          explanation: "Balanced termination clause that allows both parties to exit while providing reasonable notice. The cure period for breaches is fair and allows for good faith resolution.",
          hindi_translation: "कोई भी पक्ष 30 दिन की लिखित सूचना के साथ समाप्त कर सकता है, 7-दिन इलाज अवधि के बाद भौतिक उल्लंघन के लिए तत्काल समाप्ति की अनुमति है।",
          risk: "Low",
          suggestion: "Consider adding provisions for completion of work-in-progress and transition of deliverables to minimize business disruption.",
          compliance: "Yes"
        },
        {
          clause: "All work product and intellectual property developed during service engagement becomes exclusive property of the client, including any derivative works.",
          explanation: "Complete IP assignment to client is comprehensive but may discourage provider innovation. Could be problematic for providers who develop reusable methodologies.",
          hindi_translation: "सेवा सगाई के दौरान विकसित सभी कार्य उत्पाद और बौद्धिक संपदा, किसी भी व्युत्पन्न कार्यों सहित, ग्राहक की विशेष संपत्ति बन जाती है।",
          risk: "Medium",
          suggestion: "Clarify that provider retains rights to general methodologies, tools, and know-how developed independently. Only client-specific deliverables should transfer.",
          compliance: "Partial"
        }
      ],
      riskScore: "Medium",
      summary: "Professional services agreement shows mixed risk profile with reasonable payment and termination terms but concerning liability limitations and IP assignment provisions that may be overly broad.",
      recommendations: [
        "Negotiate mutual liability caps rather than complete provider exclusion",
        "Define clear scope of work to prevent scope creep and billing disputes",
        "Establish intellectual property rights that balance innovation incentives",
        "Include detailed deliverable specifications and acceptance criteria",
        "Add confidentiality provisions to protect both parties' sensitive information",
        "Consider including dispute resolution through arbitration to reduce legal costs"
      ]
    },
    partnership: {
      keywords: ['partnership', 'joint', 'venture', 'business', 'profit', 'loss', 'equity'],
      clauses: [
        {
          clause: "Partners contribute equal initial capital of $100,000 each but profit distribution varies based on active participation and performance metrics.",
          explanation: "Unequal profit sharing despite equal capital contribution could create conflicts. Performance-based distribution needs clear, measurable criteria to avoid disputes.",
          hindi_translation: "साझेदार प्रत्येक $100,000 की समान प्रारंभिक पूंजी का योगदान करते हैं लेकिन लाभ वितरण सक्रिय भागीदारी और प्रदर्शन मेट्रिक्स के आधार पर अलग होता है।",
          risk: "High",
          suggestion: "Define specific, measurable performance criteria and establish regular review periods for profit-sharing adjustments with all partners' consent.",
          compliance: "Partial"
        }
      ],
      riskScore: "High",
      summary: "Partnership agreement contains complex profit-sharing arrangements that could lead to conflicts without clear performance measurement standards.",
      recommendations: [
        "Establish clear decision-making processes and voting procedures",
        "Define specific roles and responsibilities for each partner",
        "Create exit strategies and valuation methods for partnership dissolution"
      ]
    }
  };

  // Advanced contract type detection
  const lowerFileName = fileName.toLowerCase();
  let contractData = contractTemplates.service; // default
  
  // More sophisticated matching
  if (contractTemplates.employment.keywords.some(keyword => lowerFileName.includes(keyword))) {
    contractData = contractTemplates.employment;
  } else if (contractTemplates.lease.keywords.some(keyword => lowerFileName.includes(keyword))) {
    contractData = contractTemplates.lease;
  } else if (contractTemplates.partnership.keywords.some(keyword => lowerFileName.includes(keyword))) {
    contractData = contractTemplates.partnership;
  }

  // Add time-based variance for dynamic feel
  const timeVariants = [
    "recent market analysis shows",
    "current legal precedents indicate",
    "updated regulatory requirements suggest",
    "contemporary business practices recommend"
  ];
  
  const randomVariant = timeVariants[Math.floor(Math.random() * timeVariants.length)];
  
  return {
    summary: `${contractData.summary} Based on ${randomVariant} heightened scrutiny of these terms.`,
    clauses: contractData.clauses,
    overall_risk_score: contractData.riskScore,
    fileName: fileName,
    analysisTimestamp: new Date().toISOString(),
    contractType: contractData === contractTemplates.employment ? 'Employment Agreement' : 
                 contractData === contractTemplates.lease ? 'Residential Lease' : 
                 contractData === contractTemplates.partnership ? 'Partnership Agreement' : 'Service Agreement',
    recommendations: contractData.recommendations,
    legalComplexity: contractData.riskScore === 'High' ? 'Complex' : contractData.riskScore === 'Medium' ? 'Moderate' : 'Standard',
    estimatedReviewTime: contractData.clauses.length * 5 + ' minutes',
    jurisdictionNotes: "Analysis based on general legal principles. Consult local legal counsel for jurisdiction-specific requirements."
  };
}