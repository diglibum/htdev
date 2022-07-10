export type Timezone = string;

export type WorldTime = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: number | null;
  dst_offset: number;
  dst_until: number | null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

export type GetTimezoneResponse = Timezone[] | null;

export type GetWorldtimeResponse = WorldTime | null;
