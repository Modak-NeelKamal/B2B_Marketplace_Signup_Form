import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import StepIndicator from '../common/StepIndicator';
import SellerFormStepOne from './SellerFormStepOne';
import SellerFormStepTwo from './SellerFormStepTwo';
import { GSTIN_REGEX, EMAIL_REGEX, PHONE_REGEX, IFSC_REGEX } from '../../utils/validation';

interface SellerFormData {
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

const SellerSignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<SellerFormData>({
    businessName: '',
    ownerName: '',
    gstin: '',
    turnover: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    productCategories: [],
    email: '',
    phone: '',
    address: '',
    documents: [],
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const steps = [
    { id: 'step1', title: 'Business Info' },
    { id: 'step2', title: 'Banking & Products' },
  ];

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'businessName':
        return !value ? 'Business name is required' : '';
      case 'ownerName':
        return !value ? 'Owner name is required' : '';
      case 'gstin':
        return !value 
          ? 'GSTIN is required' 
          : !GSTIN_REGEX.test(value) 
            ? 'Please enter a valid 15-digit GSTIN' 
            : '';
      case 'turnover':
        return !value ? 'Please select your annual turnover' : '';
      case 'email':
        return !value 
          ? 'Email is required' 
          : !EMAIL_REGEX.test(value) 
            ? 'Please enter a valid email address' 
            : '';
      case 'phone':
        return !value 
          ? 'Phone number is required' 
          : !PHONE_REGEX.test(value) 
            ? 'Please enter a valid 10-digit phone number' 
            : '';
      case 'address':
        return !value ? 'Business address is required' : '';
      case 'bankName':
        return !value ? 'Bank name is required' : '';
      case 'accountNumber':
        return !value 
          ? 'Account number is required' 
          : value.length < 9 || value.length > 18
            ? 'Account number should be between 9-18 digits' 
            : '';
      case 'ifscCode':
        return !value 
          ? 'IFSC code is required' 
          : !IFSC_REGEX.test(value) 
            ? 'Please enter a valid IFSC code' 
            : '';
      case 'productCategories':
        return Array.isArray(value) && value.length === 0 
          ? 'Please select at least one product category' 
          : '';
      case 'documents':
        return Array.isArray(value) && value.length === 0 
          ? 'Please upload at least one document' 
          : '';
      default:
        return '';
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const fieldsToValidate = stepIndex === 0
      ? ['businessName', 'ownerName', 'gstin', 'turnover', 'email', 'phone', 'address']
      : ['bankName', 'accountNumber', 'ifscCode', 'productCategories', 'documents'];
    
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = { ...touched };
    
    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, formData[field as keyof SellerFormData]);
    });
    
    setErrors({ ...errors, ...newErrors });
    setTouched({ ...newTouched });
    
    return !fieldsToValidate.some(field => newErrors[field]);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (touched[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: validateField(field, value)
      }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, formData[field as keyof SellerFormData])
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
    } else if (stepIndex === currentStep + 1) {
      handleNext();
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn">
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your seller account has been created. We'll review your information and 
            get back to you within 2-3 business days.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => window.location.href = '/'}
              size="lg"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Seller Registration
      </h1>
      
      <StepIndicator 
        steps={steps} 
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      
      <form onSubmit={handleSubmit} className="mt-8">
        {currentStep === 0 && (
          <SellerFormStepOne
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
        
        {currentStep === 1 && (
          <SellerFormStepTwo
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )}
        
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
          {currentStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex items-center"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex items-center"
            >
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerSignupForm;