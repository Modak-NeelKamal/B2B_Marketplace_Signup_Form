import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import FileUpload from '../common/FileUpload';
import FormSection from '../common/FormSection';
import { IFSC_REGEX } from '../../utils/validation';

interface SellerFormStepTwoProps {
  formData: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    productCategories: string[];
    documents: File[];
  };
  errors: Record<string, string>;
  onChange: (field: string, value: string | string[] | File[]) => void;
  onBlur: (field: string) => void;
}

const SellerFormStepTwo: React.FC<SellerFormStepTwoProps> = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    formData.productCategories || []
  );

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics & Appliances' },
    { value: 'fashion', label: 'Fashion & Apparel' },
    { value: 'home', label: 'Home & Furniture' },
    { value: 'grocery', label: 'Grocery & Essentials' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'toys', label: 'Toys & Baby Products' },
    { value: 'sports', label: 'Sports & Fitness' },
    { value: 'books', label: 'Books & Stationery' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'industrial', label: 'Industrial & Scientific' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.id, e.target.value);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e.target.id);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    
    const newCategories = [...selectedCategories];
    
    if (!newCategories.includes(value)) {
      newCategories.push(value);
      setSelectedCategories(newCategories);
      onChange('productCategories', newCategories);
    }
  };

  const removeCategory = (category: string) => {
    const newCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(newCategories);
    onChange('productCategories', newCategories);
  };

  const handleFileChange = (files: File[]) => {
    onChange('documents', files);
  };

  return (
    <div className="animate-fadeIn">
      <FormSection 
        title="Bank Account Details" 
        description="Secure information for payments"
      >
        <Input
          id="bankName"
          label="Bank Name"
          placeholder="Enter your bank name"
          value={formData.bankName}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.bankName}
          required
        />
        
        <Input
          id="accountNumber"
          label="Account Number"
          placeholder="Enter your account number"
          value={formData.accountNumber}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.accountNumber}
          required
        />
        
        <Input
          id="ifscCode"
          label="IFSC Code"
          placeholder="Enter bank IFSC code"
          value={formData.ifscCode}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          error={errors.ifscCode}
          required
          pattern={IFSC_REGEX.toString().slice(1, -1)}
        />
      </FormSection>

      <FormSection
        title="Product Information"
        description="Tell us what you sell"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Categories <span className="text-red-500">*</span>
          </label>
          <Select
            id="categorySelect"
            label=""
            options={categoryOptions}
            value=""
            onChange={handleCategoryChange}
            placeholder="Select product categories"
            error={errors.productCategories}
            className="mb-2"
          />
          
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCategories.map(category => {
                const categoryLabel = categoryOptions.find(
                  opt => opt.value === category
                )?.label;
                
                return (
                  <div 
                    key={category}
                    className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    <span>{categoryLabel}</span>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-2 text-teal-500 hover:text-teal-700"
                    >
                      &times;
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {errors.productCategories && (
            <p className="mt-1 text-sm text-red-500">{errors.productCategories}</p>
          )}
        </div>
      </FormSection>

      <FormSection
        title="Document Upload"
        description="Upload required business documents"
      >
        <FileUpload
          id="documents"
          label="Business Documents (PAN Card, Business Registration, etc.)"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          error={errors.documents}
          required
        />
      </FormSection>
    </div>
  );
};

export default SellerFormStepTwo;