'use client';

import type { PredictionResponse } from '@/lib/types';

interface ResultCardProps {
  result: PredictionResponse;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isMalignant = result.prediction === 1;
  const probabilityPercent = (result.probability * 100).toFixed(2);

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return (
          <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            High Confidence
          </span>
        );
      case 'medium':
        return (
          <span className="px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            Medium Confidence
          </span>
        );
      case 'low':
        return (
          <span className="px-3 py-1 text-sm font-semibold text-orange-800 bg-orange-100 rounded-full">
            Low Confidence
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-100 rounded-full">
            {confidence}
          </span>
        );
    }
  };

  return (
    <div
      className={`border-2 rounded-lg p-6 ${isMalignant ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Prediction Result
      </h3>

      <div className="space-y-4">
        {/* Prediction Label */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Classification:</span>
          <span
            className={`text-2xl font-bold ${isMalignant ? 'text-red-600' : 'text-green-600'}`}
          >
            {result.prediction_label}
          </span>
        </div>

        {/* Probability */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Probability:</span>
            <span className="text-lg font-semibold text-gray-800">
              {probabilityPercent}%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isMalignant ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${probabilityPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 font-medium">Confidence:</span>
          {getConfidenceBadge(result.confidence)}
        </div>

        {/* Metadata */}
        <div className="pt-4 mt-4 border-t border-gray-300">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">API Version:</span>
              <p className="font-mono text-gray-800">{result.api_version}</p>
            </div>
            <div>
              <span className="text-gray-600">Model Version:</span>
              <p className="font-mono text-gray-800">{result.model_version}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
