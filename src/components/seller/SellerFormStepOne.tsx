import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import FormSection from '../common/FormSection';
import { GSTIN_REGEX, EMAIL_REGEX, PHONE_REGEX } from '../../utils/validation';

interface SellerFormStepOneProps {
  formData: {
    businessName: string;
    ownerName: string;
    gstin: string;
    turnover: string;
    email: string;
    phone: string;
    address: string;
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
}

const SellerFormStepOne: React.FC<SellerFormStepOneProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {
  const turnoverOptions = [
    { value: '2-5', label: '₹2 Cr - ₹5 Cr' },
    { value: '5-10', label: '₹5 Cr - ₹10 Cr' },
    { value: '10-25', label: '₹10 Cr - ₹25 Cr' },
    { value: '25-50', label: '₹25 Cr - ₹50 Cr' },
    { value: '50+', label: 'Above ₹50 Cr' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.id, e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.id, e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.id);
  };

  const handleSelectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    onBlur(e.target.id);
  };

  return (
    <div className="animate-fadeIn">
      <FormSection 
        title="Business Information" 
        description="Tell us about your business"
      >
        <Input
          id="businessName"
          label="Business Name"
          placeholder="Enter your business name"
          value={formData.businessName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.businessName}
          required
        />
        
        <Input
          id="ownerName"
          label="Owner Name"
          placeholder="Enter owner's full name"
          value={formData.ownerName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.ownerName}
          required
        />
        
        <Input
          id="gstin"
          label="GSTIN"
          placeholder="15-digit GSTIN number"
          value={formData.gstin}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.gstin}
          required
          pattern={GSTIN_REGEX.toString().slice(1, -1)}
        />
        
        <Select
          id="turnover"
          label="Annual Turnover"
          options={turnoverOptions}
          value={formData.turnover}
          onChange={handleSelectChange}
          onBlur={handleSelectBlur}
          error={errors.turnover}
          required
          placeholder="Select your annual turnover range"
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
            onChange={handleInputChange}
            onBlur={handleInputBlur}
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
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={errors.phone}
            required
            pattern={PHONE_REGEX.toString().slice(1, -1)}
          />
        </div>
        
        <Input
          id="address"
          label="Business Address"
          placeholder="Enter your business address"
          value={formData.address}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.address}
          required
        />
      </FormSection>
    </div>
  );
};

export default SellerFormStepOne;