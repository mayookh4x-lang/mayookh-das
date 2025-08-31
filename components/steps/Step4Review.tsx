
import React, { useState } from 'react';
import type { AdData } from '../../types';
import Button from '../common/Button';
import AdPreview from '../AdPreview';

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
            {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
    );
};


const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
        {children}
    </div>
);

const Step4Review: React.FC<{ adData: AdData; onReset: () => void }> = ({ adData, onReset }) => {
    const { creative, targeting, imageUrl } = adData;
    
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your AI-Generated Ad is Ready!</h2>
            <p className="text-gray-600 mb-8">Review your ad below. You can copy the generated text and use the targeting suggestions for your campaign.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:order-2">
                    <h3 className="text-lg font-semibold mb-4">Ad Preview</h3>
                    <AdPreview
                        headline={creative.headline}
                        primaryText={creative.primaryText}
                        imageUrl={imageUrl}
                    />
                </div>

                <div className="space-y-6 lg:order-1">
                    <h3 className="text-lg font-semibold">Generated Assets</h3>
                    <InfoCard title="Headline">
                       <div className="flex justify-between items-start">
                         <p className="text-gray-800 mr-4">{creative.headline}</p>
                         <CopyButton textToCopy={creative.headline} />
                       </div>
                    </InfoCard>

                    <InfoCard title="Primary Text">
                       <div className="flex justify-between items-start">
                         <p className="text-gray-800 mr-4">{creative.primaryText}</p>
                         <CopyButton textToCopy={creative.primaryText} />
                       </div>
                    </InfoCard>

                    <InfoCard title="Targeting Suggestions">
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Age Range</p>
                                <p className="text-gray-800">{targeting.ageRange}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Locations</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {targeting.locations.map(loc => <span key={loc} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{loc}</span>)}
                                </div>
                            </div>
                             <div>
                                <p className="text-sm font-medium text-gray-500">Interests</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {targeting.interests.map(interest => <span key={interest} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{interest}</span>)}
                                </div>
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </div>

            <div className="flex justify-center pt-10 mt-6 border-t border-gray-200">
                <Button onClick={onReset} variant="primary">
                    Create Another Ad
                </Button>
            </div>
        </div>
    );
};

export default Step4Review;
