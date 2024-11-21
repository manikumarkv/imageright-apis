import { AxiosInstance } from 'axios';

interface Batch {
  // Define the properties of the Batch object here
  // For example:
  name: string;
  description: string;
}

export function createBatch(api: AxiosInstance, batch: Batch): Promise<any> {
  return api.post('api/batches', batch).then((res) => Promise.resolve(res.data));
}