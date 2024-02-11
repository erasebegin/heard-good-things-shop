interface SnipcartSettings {
    publicApiKey: string;
    loadStrategy: string;
  }
  
  declare global {
    interface Window {
      SnipcartSettings: SnipcartSettings;
    }
  }