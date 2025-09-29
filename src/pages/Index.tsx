import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { RiskDashboard } from '@/components/RiskDashboard';
import { ClauseAnalysis } from '@/components/ClauseAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Brain, Shield, TrendingUp, FileCheck, Users } from 'lucide-react';

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileAnalyzed = (analysisResult: any) => {
    setAnalysis(analysisResult);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">LegalAI</h1>
                <p className="text-sm text-muted-foreground">Contract Analysis & Risk Assessment</p>
              </div>
            </div>
            {analysis && (
              <Button 
                onClick={resetAnalysis} 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {!analysis ? (
          <>
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-bold text-foreground">
                  AI-Powered
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Legal </span>
                  Analysis
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload your legal contracts and get instant risk assessment, clause analysis, 
                  and actionable recommendations in both English and Hindi.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
                <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Smart Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      Advanced AI analyzes every clause for risks, compliance issues, and legal implications.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Risk Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      Get color-coded risk scores and detailed explanations for every contract section.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-glass backdrop-blur-sm border-primary/20 shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">Actionable Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center">
                      Receive specific recommendations to improve contract terms and reduce legal exposure.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Upload Section */}
            <section className="max-w-2xl mx-auto">
              <FileUpload
                onFileAnalyzed={handleFileAnalyzed}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
              />
            </section>

            {/* Features Section */}
            <section className="py-12">
              <div className="text-center space-y-4 mb-12">
                <h3 className="text-3xl font-bold text-foreground">Why Choose LegalAI?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Professional-grade contract analysis powered by cutting-edge AI technology
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4 p-6 bg-card rounded-lg border shadow-soft">
                  <FileCheck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Multi-Format Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOCX, and TXT files with intelligent text extraction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-card rounded-lg border shadow-soft">
                  <Users className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Bilingual Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete analysis available in both English and Hindi languages.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-card rounded-lg border shadow-soft">
                  <TrendingUp className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Instant Reports</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate and download comprehensive PDF reports instantly.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Analysis Results */}
            <RiskDashboard analysis={analysis} />
            <ClauseAnalysis analysis={analysis} />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">LegalAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional legal contract analysis powered by artificial intelligence.
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 LegalAI. For demonstration purposes only. Not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;