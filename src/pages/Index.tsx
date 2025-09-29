import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { FileUpload } from '@/components/FileUpload';
import { RiskDashboard } from '@/components/RiskDashboard';
import { ClauseAnalysis } from '@/components/ClauseAnalysis';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Brain, Shield, TrendingUp, FileCheck, Users, Sparkles, Zap, Award } from 'lucide-react';

const Index = () => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  const handleFileAnalyzed = (analysisResult: any) => {
    setAnalysis(analysisResult);
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  const handleLanguageChange = (newLanguage: 'english' | 'hindi') => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Enhanced Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onReset={resetAnalysis}
        showReset={!!analysis}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {!analysis ? (
          <>
            {/* Ultra-Bright Hero Section */}
            <section className="text-center space-y-8 py-16 relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-hero rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
              </div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Award className="w-8 h-8 text-accent animate-pulse" />
                  <span className="text-accent font-bold text-lg">HCL GUVI Hackathon 2025</span>
                  <Award className="w-8 h-8 text-accent animate-pulse" />
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  {language === 'english' ? (
                    <>
                      AI-Powered
                      <span className="bg-gradient-hero bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"> Legal </span>
                      Analysis
                      <div className="flex items-center justify-center mt-4">
                        <Sparkles className="w-8 h-8 text-accent mr-2 animate-pulse" />
                        <Zap className="w-10 h-10 text-primary animate-bounce" />
                        <Sparkles className="w-8 h-8 text-accent ml-2 animate-pulse" />
                      </div>
                    </>
                  ) : (
                    <>
                      AI-संचालित
                      <span className="bg-gradient-hero bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]"> कानूनी </span>
                      विश्लेषण
                      <div className="flex items-center justify-center mt-4">
                        <Sparkles className="w-8 h-8 text-accent mr-2 animate-pulse" />
                        <Zap className="w-10 h-10 text-primary animate-bounce" />
                        <Sparkles className="w-8 h-8 text-accent ml-2 animate-pulse" />
                      </div>
                    </>
                  )}
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {language === 'english' 
                    ? "Upload your legal contracts and get instant risk assessment, clause analysis, and actionable recommendations with cutting-edge AI technology."
                    : "अपने कानूनी अनुबंध अपलोड करें और अत्याधुनिक AI तकनीक के साथ तुरंत जोखिम मूल्यांकन, खंड विश्लेषण और कार्य योग्य सिफारिशें प्राप्त करें।"
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
                <Card className="bg-gradient-glass backdrop-blur-xl border-primary/30 shadow-glow hover:shadow-strong transition-all duration-500 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto shadow-glow animate-pulse-glow group-hover:animate-bounce">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
                      {language === 'english' ? 'Smart Analysis' : 'स्मार्ट विश्लेषण'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {language === 'english' 
                        ? "Advanced AI analyzes every clause for risks, compliance issues, and legal implications with unprecedented accuracy."
                        : "उन्नत AI अभूतपूर्व सटीकता के साथ जोखिम, अनुपालन मुद्दों और कानूनी निहितार्थों के लिए हर खंड का विश्लेषण करता है।"
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-glass backdrop-blur-xl border-primary/30 shadow-glow hover:shadow-strong transition-all duration-500 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto shadow-glow-accent animate-pulse-glow group-hover:animate-bounce">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-accent bg-clip-text text-transparent">
                      {language === 'english' ? 'Risk Assessment' : 'जोखिम मूल्यांकन'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {language === 'english' 
                        ? "Get color-coded risk scores and detailed explanations for every contract section with real-time insights."
                        : "रियल-टाइम अंतर्दृष्टि के साथ हर अनुबंध अनुभाग के लिए रंग-कोडित जोखिम स्कोर और विस्तृत स्पष्टीकरण प्राप्त करें।"
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-glass backdrop-blur-xl border-primary/30 shadow-glow hover:shadow-strong transition-all duration-500 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow animate-pulse-glow group-hover:animate-bounce">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
                      {language === 'english' ? 'Actionable Insights' : 'कार्य योग्य अंतर्दृष्टि'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {language === 'english' 
                        ? "Receive specific recommendations to improve contract terms and reduce legal exposure significantly."
                        : "अनुबंध की शर्तों में सुधार और कानूनी जोखिम को काफी कम करने के लिए विशिष्ट सिफारिशें प्राप्त करें।"
                      }
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

            {/* Enhanced Features Section */}
            <section className="py-16">
              <div className="text-center space-y-6 mb-16">
                <h3 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  {language === 'english' ? 'Why Choose LegalAI?' : 'LegalAI क्यों चुनें?'}
                </h3>
                <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                  {language === 'english' 
                    ? "Professional-grade contract analysis powered by cutting-edge AI technology for the HCL GUVI Hackathon"
                    : "HCL GUVI हैकाथॉन के लिए अत्याधुनिक AI तकनीक द्वारा संचालित पेशेवर-ग्रेड अनुबंध विश्लेषण"
                  }
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4 p-8 bg-gradient-glass backdrop-blur-xl rounded-2xl border border-primary/30 shadow-glow hover:shadow-strong transition-all duration-500">
                  <FileCheck className="w-10 h-10 text-primary flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-lg">
                      {language === 'english' ? 'Multi-Format Support' : 'बहु-प्रारूप समर्थन'}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === 'english' 
                        ? "Supports PDF, DOCX, and TXT files with intelligent text extraction and processing capabilities."
                        : "बुद्धिमान टेक्स्ट निष्कर्षण और प्रसंस्करण क्षमताओं के साथ PDF, DOCX, और TXT फाइलों का समर्थन करता है।"
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-8 bg-gradient-glass backdrop-blur-xl rounded-2xl border border-accent/30 shadow-glow-accent hover:shadow-strong transition-all duration-500">
                  <Users className="w-10 h-10 text-accent flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-lg">
                      {language === 'english' ? 'Bilingual Support' : 'द्विभाषी समर्थन'}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === 'english' 
                        ? "Complete analysis available in both English and Hindi languages with seamless switching."
                        : "निर्बाध स्विचिंग के साथ अंग्रेजी और हिंदी दोनों भाषाओं में पूर्ण विश्लेषण उपलब्ध।"
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-8 bg-gradient-glass backdrop-blur-xl rounded-2xl border border-success/30 shadow-glow-risk-low hover:shadow-strong transition-all duration-500">
                  <TrendingUp className="w-10 h-10 text-success flex-shrink-0 mt-1 animate-pulse" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 text-lg">
                      {language === 'english' ? 'Instant Reports' : 'तत्काल रिपोर्ट'}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {language === 'english' 
                        ? "Generate and download comprehensive PDF reports instantly with detailed analysis and recommendations."
                        : "विस्तृत विश्लेषण और सिफारिशों के साथ तुरंत व्यापक PDF रिपोर्ट जेनरेट और डाउनलोड करें।"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Analysis Results with Language Support */}
            <RiskDashboard analysis={analysis} language={language} />
            <ClauseAnalysis analysis={analysis} language={language} />
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
              © 2025 LegalAI. For demonstration purposes only. Not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;