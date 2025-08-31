
export interface AdFormData {
  productName: string;
  productDescription: string;
  targetAudience: string;
}

export interface AdCreative {
  headline: string;
  primaryText: string;
}

export interface TargetingSuggestions {
    interests: string[];
    locations: string[];
    ageRange: string;
}

export interface AdData {
  creative: AdCreative;
  targeting: TargetingSuggestions;
  imageUrl: string;
}
