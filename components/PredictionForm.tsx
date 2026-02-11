'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { FEATURE_NAMES, EXAMPLE_FEATURES } from '@/lib/types';
import type { PredictionResponse } from '@/lib/types';
import ResultCard from './ResultCard';

export default function PredictionForm() {
  const [features, setFeatures] = useState<string[]>(Array(30).fill(''));
  const [pasteValue, setPasteValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    setValidationErrors([]);
  };

  const handlePaste = () => {
    const trimmed = pasteValue.trim();
    if (!trimmed) {
      setError('Please enter values to paste');
      return;
    }

    // Parse comma or whitespace separated values
    const values = trimmed
      .split(/[\s,]+/)
      .filter(v => v.length > 0);

    if (values.length !== 30) {
      setError(`Expected 30 values, got ${values.length}`);
      return;
    }

    setFeatures(values);
    setPasteValue('');
    setError(null);
    setValidationErrors([]);
  };

  const handleLoadExample = () => {
    setFeatures(EXAMPLE_FEATURES.map(f => String(f)));
    setError(null);
    setValidationErrors([]);
    setResult(null);
  };

  const handleClear = () => {
    setFeatures(Array(30).fill(''));
    setPasteValue('');
    setError(null);
    setValidationErrors([]);
    setResult(null);
  };

  const validateFeatures = (): { valid: boolean; values: number[] } => {
    const errors: string[] = [];
    const values: number[] = [];

    features.forEach((feature, index) => {
      const value = parseFloat(feature);
      if (feature.trim() === '') {
        errors.push(`Feature ${index + 1} (${FEATURE_NAMES[index]}) is required`);
      } else if (isNaN(value) || !isFinite(value)) {
        errors.push(`Feature ${index + 1} (${FEATURE_NAMES[index]}) must be a valid number`);
      } else {
        values.push(value);
      }
    });

    setValidationErrors(errors);
    return { valid: errors.length === 0, values };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const validation = validateFeatures();
    if (!validation.valid) {
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.predict({ features: validation.values });
      setResult(response);
    } catch (err: any) {
      if (err.status === 503) {
        setError('Model not loaded. Please wait for the model to load and try again.');
      } else if (err.status === 422) {
        setError(err.message || 'Validation error: Invalid input data');
      } else if (err.status && err.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to make prediction');
      }
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = features.every(f => f.trim() !== '') && validationErrors.length === 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Make a Prediction</h2>

      {/* Paste and Load Example Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Input (30 comma or space-separated values)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pasteValue}
              onChange={(e) => setPasteValue(e.target.value)}
              placeholder="e.g., 17.99, 10.38, 122.8, ..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handlePaste}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
            >
              Paste
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleLoadExample}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            Load Example
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-md">
          <p className="font-semibold mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside space-y-1 max-h-40 overflow-y-auto">
            {validationErrors.slice(0, 5).map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
            {validationErrors.length > 5 && (
              <li className="text-gray-600">... and {validationErrors.length - 5} more</li>
            )}
          </ul>
        </div>
      )}

      {/* Feature Inputs Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-h-96 overflow-y-auto p-2 border border-gray-200 rounded-md">
          {FEATURE_NAMES.map((name, index) => (
            <div key={index}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                {index + 1}. {name}
              </label>
              <input
                type="text"
                inputMode="decimal"
                value={features[index]}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.0"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || !canSubmit}
          className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="mt-6">
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}
