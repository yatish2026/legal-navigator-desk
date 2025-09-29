import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Shield, CheckCircle, XCircle, Download, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClauseAnalysisProps {
  analysis: any;
}

export const ClauseAnalysis: React.FC<ClauseAnalysisProps> = ({ analysis }) => {
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-risk-high text-white border-risk-high';
      case 'medium': return 'bg-risk-medium text-white border-risk-medium';
      case 'low': return 'bg-risk-low text-white border-risk-low';
      default: return 'bg-risk-minimal text-white border-risk-minimal';
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance.toLowerCase()) {
      case 'yes': return 'bg-success text-white';
      case 'no': return 'bg-destructive text-white';
      default: return 'bg-warning text-white';
    }
  };

  const getComplianceIcon = (compliance: string) => {
    switch (compliance.toLowerCase()) {
      case 'yes': return <CheckCircle className="w-4 h-4" />;
      case 'no': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const generatePDFReport = () => {
    // Simulate PDF generation
    const pdfContent = `
Legal Contract Analysis Report
Generated on: ${new Date().toLocaleDateString()}
Contract: ${analysis.fileName}

EXECUTIVE SUMMARY
${analysis.summary}

OVERALL RISK SCORE: ${analysis.overall_risk_score}

CLAUSE ANALYSIS:
${analysis.clauses.map((clause: any, index: number) => `
${index + 1}. ${clause.clause}
   Risk Level: ${clause.risk}
   Compliance: ${clause.compliance}
   Explanation: ${clause.explanation}
   Suggestion: ${clause.suggestion}
`).join('\n')}

RECOMMENDATIONS:
${analysis.recommendations?.map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n') || 'No specific recommendations available.'}
`;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contract-analysis-${analysis.fileName.replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Clause-by-Clause Analysis</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            <Tabs value={language} onValueChange={(value: any) => setLanguage(value)} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english" className="flex items-center space-x-1">
                  <Languages className="w-4 h-4" />
                  <span>English</span>
                </TabsTrigger>
                <TabsTrigger value="hindi" className="flex items-center space-x-1">
                  <Languages className="w-4 h-4" />
                  <span>हिंदी</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button onClick={generatePDFReport} className="bg-gradient-primary hover:bg-gradient-primary/90 shadow-glow">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-4">
            {analysis.clauses.map((clause: any, index: number) => (
              <AccordionItem 
                key={index} 
                value={`clause-${index}`}
                className="border rounded-lg bg-card shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center space-x-3">
                      <Badge className={cn("px-3 py-1", getRiskColor(clause.risk))}>
                        {clause.risk}
                      </Badge>
                      <Badge className={cn("px-3 py-1", getComplianceColor(clause.compliance))}>
                        {getComplianceIcon(clause.compliance)}
                        <span className="ml-1">{clause.compliance}</span>
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Clause {index + 1}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 space-y-4">
                  <Tabs value={language} className="w-full">
                    <TabsContent value="english" className="space-y-4 mt-0">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Original Clause</h4>
                        <p className="text-sm text-foreground italic">"{clause.clause}"</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Explanation</h4>
                          <p className="text-sm text-muted-foreground">{clause.explanation}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Recommendation</h4>
                          <p className="text-sm text-muted-foreground">{clause.suggestion}</p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="hindi" className="space-y-4 mt-0">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">मूल खंड</h4>
                        <p className="text-sm text-foreground italic">"{clause.clause}"</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">हिंदी अनुवाद</h4>
                          <p className="text-sm text-muted-foreground">{clause.hindi_translation}</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">स्पष्टीकरण</h4>
                            <p className="text-sm text-muted-foreground">{clause.explanation}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">सुझाव</h4>
                            <p className="text-sm text-muted-foreground">{clause.suggestion}</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};