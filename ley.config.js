import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { postgresConfig } from './util/config.js';

config();

// const options = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
