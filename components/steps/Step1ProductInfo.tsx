
import React from 'react';
import type { AdFormData } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';

interface Step1Props {
  formData: AdFormData;
  onDataChange: (data: Partial<AdFormData>) => void;
  onNext: () => void;
}

const Step1ProductInfo: React.FC<Step1Props> = ({ formData, onDataChange, onNext }) => {
  const { productName, productDescription } = formData;
  const isFormValid = productName.trim() !== '' && productDescription.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tell Us About Your Product</h2>
      <p className="text-gray-600 mb-6">First, provide some basic details about what you're advertising.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="productName"
          label="Product or Service Name"
          value={productName}
          onChange={(e) => onDataChange({ productName: e.target.value })}
          placeholder="e.g., Artisan Coffee Beans"
          required
        />
        <Textarea
          id="productDescription"
          label="Product/Service Description"
          value={productDescription}
          onChange={(e) => onDataChange({ productDescription: e.target.value })}
          placeholder="Describe your product's features, benefits, and what makes it unique."
          helperText="The more detail you provide, the better the AI can tailor your ad."
          required
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={!isFormValid}>
            Next: Define Audience
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step1ProductInfo;
