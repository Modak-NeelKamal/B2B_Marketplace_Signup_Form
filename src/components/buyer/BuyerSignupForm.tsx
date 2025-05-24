import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import FormSection from '../common/FormSection';
import { GSTIN_REGEX, EMAIL_REGEX, PHONE_REGEX } from '../../utils/validation';

interface BuyerFormData {
  name: string;
  businessName: string;
  gstin: string;
  email: string;
  phone: string;
}

const BuyerSignupForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BuyerFormData>({
    name: '',
    businessName: '',
    gstin: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name':
        return !value ? 'Full name is required' : '';
      case 'businessName':
        return !value ? 'Business name is required' : '';
      case 'gstin':
        return !value 
          ? 'GSTIN is required' 
          : !GSTIN_REGEX.test(value) 
            ? 'Please enter a valid 15-digit GSTIN' 
            : '';
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
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    if (touched[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: validateField(id, value)
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [id]: true
    }));
    
    setErrors(prev => ({
      ...prev,
      [id]: validateField(id, value)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
      newErrors[key] = validateField(
        key, 
        formData[key as keyof BuyerFormData]
      );
    });
    
    setErrors(newErrors);
    setTouched(newTouched);
    
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md animate-fadeIn">
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your buyer account has been created. You can now start exploring products
            and connecting with sellers.
          </p>
          <div className="mt-6">
            <Button 
              onClick={() => window.location.href = '/'}
              size="lg"
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Buyer Registration
      </h1>
      
      <form onSubmit={handleSubmit} className="mt-8 animate-fadeIn">
        <FormSection
          title="Personal Information"
          description="Tell us about yourself"
        >
          <Input
            id="name"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            required
          />
        </FormSection>
        
        <FormSection
          title="Business Information"
          description="Tell us about your business"
        >
          <Input
            id="businessName"
            label="Business Name"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.businessName}
            required
          />
          
          <Input
            id="gstin"
            label="GSTIN"
            placeholder="15-digit GSTIN number"
            value={formData.gstin}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.gstin}
            required
            pattern={GSTIN_REGEX.toString().slice(1, -1)}
          />
        </FormSection>
        
        <FormSection
          title="Contact Information"
          description="How can we reach you?"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              required
              pattern={EMAIL_REGEX.toString().slice(1, -1)}
            />
            
            <Input
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              required
              pattern={PHONE_REGEX.toString().slice(1, -1)}
            />
          </div>
        </FormSection>
        
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Button
            type="submit"
            className="w-full md:w-auto"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BuyerSignupForm;