enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type Options = {
  timeout?: number;
  method?: METHODS;
  headers?: Record<string, string>;
  data?: any;
} & Record<string, unknown>;

export abstract class BaseApi {
  private url: string;

  protected constructor(endpoint: string, base: string) {
    this.url = `${base}${endpoint}`;
  }

  protected async get<T>(url: string, options: Options = {}) {
    let response = await fetch(this.url + url, { ...options });

    if (response.ok) {
      const json: T = await response.json();
      return {
        data: json,
        status: response.status,
      };
    } else {
      return {
        data: null,
        status: response.status,
      };
    }
  }

  protected async post<T>(url: string, body: any): Promise<T> {
    try {
      const response = await fetch(this.url + url, {
        method: METHODS.POST,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      let result = await response.json();
      return result;
    } catch (e) {
      throw new Error('Something wrong');
    }
  }

  protected async put<T>(url: string, body: any): Promise<T> {
    try {
      const response = await fetch(this.url + url, {
        method: METHODS.PUT,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });

      let result = await response.json();
      return result;
    } catch (e) {
      throw new Error('Something wrong');
    }
  }
}
