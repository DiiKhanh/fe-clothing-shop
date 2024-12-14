import algoliasearch from 'algoliasearch/lite';
import { env } from '@/config/env';

const searchClient = algoliasearch(env.ALGO_APP_ID, env.ALGO_API_KEY);
const index = searchClient.initIndex('product');

export { searchClient };
export default index;
