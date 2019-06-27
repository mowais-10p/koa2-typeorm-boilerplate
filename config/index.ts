import * as convict from 'convict';

export interface IConfig {
  env: string;
  server: {
    port: number;
  };
  api: {
    baseURL: string;
  };
  database: {
    connectionName: string;
    databaseType: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    cacheDuration: number;
    maxQueryExecutionTime: number;
    readReplicationSlaves: string;
  };
}

const config = convict<IConfig>({
  env: {
    format: ['local', 'production', 'development'],
    env: 'NODE_ENV',
    arg: 'node-env',
    default: 'local',
  },
  server: {
    port: {
      format: 'port',
      env: 'NODE_PORT',
      default: 4001,
    },
  },
  api: {
    baseURL: {
      format: String,
      env: 'API_BASEURL',
      default: '/api/v1',
    },
  },
  database: {
    connectionName: {
      format: String,
      env: 'CONN_NAME',
      default: '',
    },
    databaseType: {
      format: String,
      env: 'TYPEORM_CONNECTION',
      default: '',
    },
    host: {
      format: String,
      env: 'TYPEORM_HOST',
      default: '',
    },
    port: {
      format: 'port',
      env: 'TYPEORM_PORT',
      default: 0,
    },
    username: {
      format: String,
      env: 'TYPEORM_USERNAME',
      default: '',
    },
    password: {
      format: String,
      env: 'TYPEORM_PASSWORD',
      default: '',
    },
    database: {
      format: String,
      env: 'TYPEORM_DATABASE',
      default: '',
    },
    cacheDuration: {
      format: Number,
      env: 'TYPEORM_CACHE_DURATION',
      default: 360000, // 1 hour
    },
    maxQueryExecutionTime: {
      format: Number,
      env: 'TYPEORM_MAX_QUERY_EXECUTION_TIME',
      default: 300,
    },
    readReplicationSlaves: {
      format: String,
      env: 'TYPEORM_READ_REPLICATION_SLAVES', // comma separated hostnames of read relication slaves
      default: '',
    },
  },
});

config.validate({ allowed: 'strict' });

export default config.getProperties();
