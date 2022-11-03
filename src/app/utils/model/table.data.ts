export interface ITable {
    rows: Array<{
      width: number;
      type: string;
      name: string;
      value: string;
      icon?: string;
    }>;
    actions?: Array<{
      type: string;
      name: string;
      icon: string;
    }>;
  }
  