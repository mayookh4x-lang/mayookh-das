
import React from 'react';
import type { AdFormData } from '../../types';
import Button from '../common/Button';
import Textarea from '../common/Textarea';

interface Step2Props {
  formData: AdFormData;
  onDataChange: (data: Partial<AdFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step2Audience: React.FC<Step2Props> = ({ formData, onDataChange, onNext, onBack }) => {
  const { targetAudience } = formData;
  const isFormValid = targetAudience.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Who Is Your Target Audience?</h2>
      <p className="text-gray-600 mb-6">Describe your ideal customer. Think about their interests, demographics, and behaviors.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Textarea
          id="targetAudience"
          label="Target Audience Description"
          value={targetAudience}
          onChange={(e) => onDataChange({ targetAudience: e.target.value })}
          placeholder="e.g., Young professionals aged 25-40 living in urban areas, who value sustainability, enjoy gourmet food, and follow tech blogs."
          helperText="Be as specific as possible for the best targeting suggestions."
          required
        />
        <div className="flex justify-between pt-4">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={!isFormValid}>
            Generate Ad
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step2Audience;
