import ImageRight from './imageright';
import { authenticate } from './imageright/api/authentication';


const VERSION = '0.0.6';

interface APIOptions {
  AccessToken: string;
}

class Library {
  private baseUrl: string;
  private version: string;
  private api?: ImageRight;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.version = VERSION;
  }

  createAPI({ AccessToken }: APIOptions): Promise<ImageRight> {
    this.api = new ImageRight(this.baseUrl, AccessToken);
    return Promise.resolve(this.api);
  }

  connect(username: string, password: string): Promise<ImageRight> {
    return authenticate(this.baseUrl, username, password).then(this.createAPI.bind(this));
  }
}

export default Library;