export interface Promotion {
  readonly _id: string;
  name: string;
  description: string;
  percentage: number;
  minPrice: number;
  amount: number;
  startDate: Date;
  endDate: Date;
  expired: boolean;
}
