import { BaseApi } from './BaseApi';
import { timeApiUrl } from './consts';
import { GetWorldtimeResponse, GetTimezoneResponse } from './types';

class TimezonesApi extends BaseApi {
  constructor() {
    super('/timezone', timeApiUrl);
  }
  public getTimezones = () => this.get<GetTimezoneResponse>('');
  public getWorldtime = (name: string) => this.get<GetWorldtimeResponse>(name);
}

export const timezonesApi = new TimezonesApi();
