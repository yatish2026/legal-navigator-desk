import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskDashboardProps {
  analysis: any;
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ analysis }) => {
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
      {/* Overall Risk Score */}
      <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Contract Risk Assessment
          </CardTitle>
          <p className="text-muted-foreground">
            Analysis completed for: {analysis.fileName}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">{overallRiskScore}%</div>
                  <div className="text-sm opacity-90">Risk Score</div>
                </div>
              </div>
            </div>
            <Badge className={cn("text-lg px-4 py-2", getRiskColor(analysis.overall_risk_score))}>
              {getRiskIcon(analysis.overall_risk_score)}
              <span className="ml-2">{analysis.overall_risk_score} Risk</span>
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-card rounded-lg border shadow-soft">
              <div className="text-2xl font-bold text-foreground">{totalClauses}</div>
              <div className="text-sm text-muted-foreground">Total Clauses</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border shadow-soft">
              <div className="text-2xl font-bold text-risk-high">{highRiskClauses}</div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border shadow-soft">
              <div className="text-2xl font-bold text-success">{compliantClauses}</div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{analysis.summary}</p>
          
          {analysis.recommendations && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-foreground">Key Recommendations:</h4>
              <ul className="space-y-1">
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};