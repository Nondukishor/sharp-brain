export interface IConfig {
  environment: {
    port: number;
    mode: 'development' | 'stage' | 'production';
  };
}
