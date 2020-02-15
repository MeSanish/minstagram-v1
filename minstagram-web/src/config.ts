interface IApiEnvConfig {
  baseURL: string;
  timeout: number;
}

const ApiEnv: IApiEnvConfig = {
  baseURL: envConfig.BASE_URL,
  timeout: +envConfig.TIMEOUT
};

export default ApiEnv;