export type DynamicRule = {
    field: "email" | "amount";
    required?: boolean;
    pattern?: string;
    min?: number;
    max?: number;
  };
  
  export type SubmitFormDTO = {
    email: string;
    amount: number;
  };
  
  export type ServerError = {
    field?: string;
    message: string;
  };
  