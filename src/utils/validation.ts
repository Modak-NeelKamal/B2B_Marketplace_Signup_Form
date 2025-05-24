// GSTIN validation regex for Indian businesses
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number validation regex for Indian numbers
export const PHONE_REGEX = /^[6-9]\d{9}$/;

// IFSC code validation regex for Indian banks
export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

// PAN validation regex for Indian PAN cards
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

// Validate GSTIN
export const validateGSTIN = (gstin: string): boolean => {
  return GSTIN_REGEX.test(gstin);
};

// Validate email
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

// Validate IFSC code
export const validateIFSC = (ifsc: string): boolean => {
  return IFSC_REGEX.test(ifsc);
};

// Validate PAN
export const validatePAN = (pan: string): boolean => {
  return PAN_REGEX.test(pan);
};

// Format currency for display (₹)
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};