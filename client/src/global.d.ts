// src/global.d.ts (or any other appropriate file in your project)
interface Window {
    ethereum?: any;  // TypeScript now knows window.ethereum can exist
}

  
  // global.d.ts
interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
  