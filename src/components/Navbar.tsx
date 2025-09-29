import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, Globe, Award, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavbarProps {
  language: 'english' | 'hindi';
  onLanguageChange: (language: 'english' | 'hindi') => void;
  onReset?: () => void;
  showReset?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  onLanguageChange, 
  onReset, 
  showReset = false 
}) => {
  return (
    <header className="border-b bg-gradient-to-r from-card/95 via-card/90 to-card/95 backdrop-blur-xl sticky top-0 z-50 shadow-glow border-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shadow-glow animate-pulse-glow">
                  <Scale className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-accent rounded-full animate-ping"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                    LegalAI
                  </h1>
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground font-medium">
                  Contract Analysis & Risk Assessment
                </p>
              </div>
            </div>
            
            {/* HCL GUVI Hackathon Badge */}
            <div className="hidden md:flex items-center">
              <Badge className="bg-gradient-accent text-white px-3 py-1.5 shadow-glow-accent border-0 animate-pulse">
                <Award className="w-4 h-4 mr-1" />
                <span className="font-bold">HCL GUVI Hackathon</span>
              </Badge>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-primary" />
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-32 bg-gradient-glass border-primary/30 shadow-soft hover:shadow-glow transition-all duration-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/20 shadow-glow">
                  <SelectItem value="english" className="hover:bg-primary/10">
                    🇺🇸 English
                  </SelectItem>
                  <SelectItem value="hindi" className="hover:bg-primary/10">
                    🇮🇳 हिंदी
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            {showReset && onReset && (
              <Button 
                onClick={onReset} 
                variant="outline" 
                className="border-primary/50 text-primary hover:bg-gradient-primary hover:text-white shadow-soft hover:shadow-glow transition-all duration-300"
              >
                New Analysis
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile HCL GUVI Badge */}
        <div className="md:hidden mt-3 flex justify-center">
          <Badge className="bg-gradient-accent text-white px-3 py-1.5 shadow-glow-accent border-0">
            <Award className="w-4 h-4 mr-1" />
            <span className="font-bold">HCL GUVI Hackathon</span>
          </Badge>
        </div>
      </div>
    </header>
  );
};