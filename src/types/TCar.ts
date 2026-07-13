export type TCarContent = {
  model: string;
  year: number;
  performance_class: string;
  is_exclusive?: boolean;
  is_premium?: boolean;
};
export type TCar = Record<string, TCarContent>;
export interface ICarsResponse {
  count: number;
  [carName: string]: TCarContent | number;
}
export type TCarEntry = {
  brand: string;
  cars: TCarContent[];
};
