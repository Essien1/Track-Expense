// types.ts
export interface Expense {
    amount: number;
    description: string;
    person: string;
    category: string;
    date: string; // Ensure `date` is included in all components
  }
  