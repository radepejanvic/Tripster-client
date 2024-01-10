export interface ReviewReport {
  id?: number;
  comment: string;
  photo: string;
  url?: string;
  name: string;
  reason: string;
  reporterEmail: string;
  rate: number;
}
