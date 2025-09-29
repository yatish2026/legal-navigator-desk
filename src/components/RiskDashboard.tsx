import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskDashboardProps {
  analysis: any;
  language?: 'english' | 'hindi';
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ analysis, language = 'english' }) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-risk-high text-white';
      case 'medium': return 'bg-risk-medium text-white';
      case 'low': return 'bg-risk-low text-white';
      default: return 'bg-risk-minimal text-white';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return <XCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <Shield className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getRiskScore = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 85;
      case 'medium': return 60;
      case 'low': return 30;
      default: return 10;
    }
  };

  const overallRiskScore = getRiskScore(analysis.overall_risk_score);
  const totalClauses = analysis.clauses?.length || 0;
  const highRiskClauses = analysis.clauses?.filter((c: any) => c.risk.toLowerCase() === 'high').length || 0;
  const compliantClauses = analysis.clauses?.filter((c: any) => c.compliance === 'Yes').length || 0;

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Enhanced Overall Risk Score with clean effects */}
      <Card className="bg-gradient-glass backdrop-blur-sm border-primary/30 shadow-clean hover:shadow-strong transition-all duration-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
            {language === 'english' ? 'Contract Risk Assessment' : 'अनुबंध जोखिम मूल्यांकन'}
          </CardTitle>
          <p className="text-muted-foreground">
            {language === 'english' ? 'Analysis completed for:' : 'विश्लेषण पूर्ण:'} <span className="text-accent font-medium">{analysis.fileName}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {language === 'english' 
              ? `Contract Type: ${analysis.contractType} • Complexity: ${analysis.legalComplexity}`
              : `अनुबंध प्रकार: ${analysis.contractType} • जटिलता: ${analysis.legalComplexity}`
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="text-center space-y-6">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-hero flex items-center justify-center shadow-clean animate-pulse-clean border-4 border-primary/30">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-1">{overallRiskScore}%</div>
                  <div className="text-sm opacity-90 font-medium">
                    {language === 'english' ? 'Risk Score' : 'जोखिम स्कोर'}
                  </div>
                </div>
              </div>
              {/* Clean animated rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border border-accent/30 animate-pulse"></div>
            </div>
            <Badge className={cn("text-xl px-6 py-3 shadow-clean", getRiskColor(analysis.overall_risk_score))}>
              {getRiskIcon(analysis.overall_risk_score)}
              <span className="ml-2 font-bold">
                {language === 'english' 
                  ? `${analysis.overall_risk_score} Risk Level`
                  : `${analysis.overall_risk_score} जोखिम स्तर`
                }
              </span>
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-gradient-glass backdrop-blur-xl rounded-xl border border-primary/20 shadow-soft hover:shadow-clean transition-all duration-300">
              <div className="text-3xl font-bold text-foreground mb-2">{totalClauses}</div>
              <div className="text-sm text-muted-foreground font-medium">
                {language === 'english' ? 'Total Clauses' : 'कुल खंड'}
              </div>
              <div className="w-8 h-1 bg-gradient-primary rounded-full mx-auto mt-2"></div>
            </div>
            <div className="text-center p-6 bg-gradient-glass backdrop-blur-xl rounded-xl border border-risk-high/20 shadow-soft hover:shadow-clean transition-all duration-300">
              <div className="text-3xl font-bold text-risk-high mb-2">{highRiskClauses}</div>
              <div className="text-sm text-muted-foreground font-medium">
                {language === 'english' ? 'High Risk' : 'उच्च जोखिम'}
              </div>
              <div className="w-8 h-1 bg-gradient-risk-high rounded-full mx-auto mt-2"></div>
            </div>
            <div className="text-center p-6 bg-gradient-glass backdrop-blur-xl rounded-xl border border-success/20 shadow-soft hover:shadow-clean transition-all duration-300">
              <div className="text-3xl font-bold text-success mb-2">{compliantClauses}</div>
              <div className="text-sm text-muted-foreground font-medium">
                {language === 'english' ? 'Compliant' : 'अनुपालन'}
              </div>
              <div className="w-8 h-1 bg-gradient-risk-low rounded-full mx-auto mt-2"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Summary */}
      <Card className="bg-gradient-glass backdrop-blur-sm border-primary/30 shadow-clean hover:shadow-strong transition-all duration-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center shadow-clean">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl">
              {language === 'english' ? 'Executive Summary' : 'कार्यकारी सारांश'}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/20 border border-border/30 p-4 rounded-lg">
            <p className="text-foreground leading-relaxed text-base">{analysis.summary}</p>
          </div>
          
          {analysis.recommendations && (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground text-lg flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{language === 'english' ? 'Priority Recommendations:' : 'प्राथमिकता सिफारिशें:'}</span>
              </h4>
              <div className="grid gap-3">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-card/50 rounded-lg border border-border/30 hover:bg-card/70 transition-colors duration-200">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-soft">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};