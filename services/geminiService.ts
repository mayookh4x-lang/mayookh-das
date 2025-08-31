
import { GoogleGenAI, Type } from "@google/genai";
import type { AdFormData, AdCreative, TargetingSuggestions, AdData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateAdTextAndTargeting = async (formData: AdFormData): Promise<{ creative: AdCreative, targeting: TargetingSuggestions }> => {
  const model = 'gemini-2.5-flash';
  const prompt = `
    Based on the following product information, generate compelling Facebook ad copy and detailed targeting suggestions.
    
    Product Name: ${formData.productName}
    Product Description: ${formData.productDescription}
    Target Audience: ${formData.targetAudience}

    Generate a response in JSON format with the following structure:
    - "creative": an object with "headline" (max 40 chars) and "primaryText" (max 125 chars).
    - "targeting": an object with "interests" (an array of 5-10 specific interests), "locations" (an array of 3-5 relevant cities or countries), and "ageRange" (e.g., "25-45").

    The ad copy should be engaging, persuasive, and tailored to the target audience. The targeting suggestions should be highly relevant to the product.
  `;

  const adContentSchema = {
    type: Type.OBJECT,
    properties: {
      creative: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING, description: "A short, catchy headline for the ad (max 40 characters)." },
          primaryText: { type: Type.STRING, description: "The main body text of the ad (max 125 characters)." },
        },
        required: ["headline", "primaryText"],
      },
      targeting: {
        type: Type.OBJECT,
        properties: {
          interests: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 5-10 specific interests for targeting."
          },
          locations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 3-5 relevant cities or countries for targeting."
          },
          ageRange: {
            type: Type.STRING,
            description: "The target age range, formatted like '25-45'."
          }
        },
        required: ["interests", "locations", "ageRange"],
      },
    },
    required: ["creative", "targeting"],
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: adContentSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);
    return parsedData;

  } catch (error) {
    console.error("Error generating ad text and targeting:", error);
    throw new Error("Failed to generate ad content from Gemini API.");
  }
};

const generateAdImage = async (formData: AdFormData): Promise<string> => {
  const model = 'imagen-4.0-generate-001';
  const prompt = `Create a photorealistic, high-quality, visually appealing image for a Facebook ad. The image should be vibrant, clean, and professional. Do not include any text, logos, or watermarks. The product is "${formData.productName}". Description: "${formData.productDescription}". The style should be suitable for the target audience: ${formData.targetAudience}.`;
  
  try {
    const response = await ai.models.generateImages({
        model: model,
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating ad image:", error);
    throw new Error("Failed to generate ad image from Gemini API.");
  }
};

export const generateFullAd = async (formData: AdFormData): Promise<AdData> => {
  try {
    // Run both requests in parallel
    const [adContent, imageUrl] = await Promise.all([
      generateAdTextAndTargeting(formData),
      generateAdImage(formData)
    ]);

    return {
      creative: adContent.creative,
      targeting: adContent.targeting,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error("Error in generateFullAd:", error);
    if (error instanceof Error) {
        throw new Error(`Ad generation failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during ad generation.");
  }
};
