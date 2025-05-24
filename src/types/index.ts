export interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  pattern?: {
    value: RegExp;
    message: string;
  };
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
}

export interface FormSection {
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormStep {
  id: string;
  title: string;
  sections: FormSection[];
}

export interface SellerFormData {
  businessName: string;
  ownerName: string;
  gstin: string;
  turnover: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  productCategories: string[];
  email: string;
  phone: string;
  address: string;
  documents: File[];
}

export interface BuyerFormData {
  name: string;
  businessName: string;
  gstin: string;
  email: string;
  phone: string;
}