# LegalAI - Contract Analysis & Risk Assessment Bot


A cutting-edge AI-powered legal contract analysis tool that provides instant risk assessment, clause-by-clause analysis, and actionable recommendations in both English and Hindi. Built for the **HCL GUVI Hackathon 2025**.

## 🌟 Features

### 📄 **Smart Document Processing**
- **Multi-format Support**: Upload PDF, DOCX, and TXT files
- **Intelligent Text Extraction**: Advanced parsing with drag & drop interface
- **Real-time Processing**: Dynamic progress tracking during analysis

### 🧠 **AI-Powered Analysis**
- **Risk Assessment**: Color-coded risk scores for every clause
- **Contextual Analysis**: Dynamic analysis based on contract type (Employment, Lease, Service, Partnership)
- **Compliance Checking**: Automated compliance status for each clause
- **Legal Recommendations**: Specific, actionable suggestions for improvement

### 🌍 **Bilingual Support**
- **English & Hindi**: Complete analysis available in both languages
- **Seamless Switching**: Real-time language toggle throughout the application
- **Localized Content**: All UI elements and analysis text support both languages

### 📊 **Comprehensive Reporting**
- **Visual Dashboard**: Interactive risk assessment with statistics
- **Detailed Breakdown**: Clause-by-clause analysis with accordion UI
- **PDF Export**: Downloadable comprehensive analysis reports
- **Executive Summary**: High-level insights and recommendations

### 🎨 **Modern UI/UX**
- **Dark Theme**: Professional appearance with bright, cool colors
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Enhanced user experience with clean transitions
- **Accessible Interface**: User-friendly design for all skill levels

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Vite** - Fast build tool and development server

### **UI Components**
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons

### **State Management & Routing**
- **React Router Dom** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling and validation

### **File Processing**
- **react-dropzone** - Drag and drop file uploads
- **Dynamic Analysis Engine** - Custom contract analysis logic

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager
- Modern web browser

### **Clone Repository**
```bash
git clone <YOUR_GIT_URL>
cd legal-ai-contract-analyzer
```

### **Install Dependencies**
```bash
npm install
# or
yarn install
```

### **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Add any environment variables here if needed
VITE_APP_NAME=LegalAI
```

## 🏃‍♂️ Running the Application

### **Development Mode**
```bash
npm run dev
# or
yarn dev
```
- Open [http://localhost:8080](http://localhost:8080) in your browser
- Hot reload enabled for development

### **Build for Production**
```bash
npm run build
# or
yarn build
```

### **Preview Production Build**
```bash
npm run preview
# or
yarn preview
```



### **Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to complete deployment
```

### **Deploy to Netlify**
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
# Or connect your GitHub repo to Netlify for automatic deployments
```

### **Deploy to GitHub Pages**
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

## 📁 Project Structure

```
legal-ai-contract-analyzer/
├── public/                 # Static assets
│   ├── robots.txt         # SEO robots file
│   └── favicon.ico        # App icon
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Navbar.tsx    # Navigation component
│   │   ├── FileUpload.tsx # File upload component
│   │   ├── RiskDashboard.tsx # Risk assessment dashboard
│   │   └── ClauseAnalysis.tsx # Clause analysis component
│   ├── hooks/            # Custom React hooks
│   │   ├── use-mobile.tsx # Mobile detection hook
│   │   └── use-toast.ts  # Toast notification hook
│   ├── lib/              # Utility libraries
│   │   └── utils.ts      # Helper functions
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Main application page
│   │   └── NotFound.tsx  # 404 error page
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles and design system
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## 🎯 Usage Guide

### **1. Upload Contract**
- Drag and drop your contract file (PDF, DOCX, TXT)
- Or click to browse and select file
- Watch the progress bar during upload and processing

### **2. View Analysis**
- **Risk Dashboard**: Overall risk score and statistics
- **Language Toggle**: Switch between English and Hindi
- **Clause Analysis**: Detailed breakdown of each contract clause

### **3. Review Results**
- **Risk Levels**: High (Red), Medium (Orange), Low (Green)
- **Compliance Status**: Yes, No, or Partial compliance
- **Recommendations**: Specific suggestions for improvement

### **4. Export Report**
- Click "Download Report" to get comprehensive analysis
- PDF format with complete breakdown and recommendations

## 🔧 Development

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Style**
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Tailwind CSS for styling
- Component-based architecture

### **Adding New Features**
1. Create component in `src/components/`
2. Add proper TypeScript interfaces
3. Implement responsive design
4. Add bilingual support (English/Hindi)
5. Update tests and documentation

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 License

This project is created for the **HCL GUVI Hackathon 2025** and is intended for demonstration purposes.

## 🏆 Hackathon Information

**Event**: HCL GUVI Hackathon 2025  
**Category**: AI/ML Solutions  
**Team**: []  
**Technology**: Legal Tech AI

## 🆘 Troubleshooting

### **Common Issues**

**Build Errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript Errors:**
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Style Issues:**
```bash
# Rebuild Tailwind CSS
npm run build
```



##  Acknowledgments

- **HCL GUVI** for organizing the hackathon


---

**Built with ❤️ for HCL GUVI Hackathon 2025**
