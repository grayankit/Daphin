import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daphin.app',
  appName: 'Daphin',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
