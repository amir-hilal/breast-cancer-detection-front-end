'use client';

import { apiClient } from '@/lib/api';
import type { ModelInfo } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function ModelInfoCard() {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModelInfo();
  }, []);

  const fetchModelInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getModelInfo();
      setModelInfo(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch model info',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Model Information
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Model Information
        </h2>
        <div className="p-4 text-sm text-red-800 bg-red-100 rounded-md">
          {error}
        </div>
        <button
          onClick={fetchModelInfo}
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Model Information
        </h2>
        <span className="flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      {modelInfo && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-600">Model Type:</span>
            <span className="col-span-2 font-semibold text-gray-800">
              {modelInfo.model_type}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-600">Version:</span>
            <span className="col-span-2 font-mono text-sm text-gray-800">
              {modelInfo.model_version}
            </span>
          </div>

          {modelInfo.promotion_metadata &&
            Object.keys(modelInfo.promotion_metadata).length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Promotion Metadata
                </h3>
                <div className="space-y-2 text-sm">
                  {modelInfo.promotion_metadata.promoted_at && (
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-600">Promoted At:</span>
                      <span className="col-span-2 text-gray-800">
                        {new Date(
                          modelInfo.promotion_metadata.promoted_at,
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {modelInfo.promotion_metadata.promoted_by && (
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-600">Promoted By:</span>
                      <span className="col-span-2 text-gray-800">
                        {modelInfo.promotion_metadata.promoted_by}
                      </span>
                    </div>
                  )}
                  {modelInfo.promotion_metadata.environment && (
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-600">Environment:</span>
                      <span className="col-span-2 text-gray-800">
                        {modelInfo.promotion_metadata.environment}
                      </span>
                    </div>
                  )}
                  {modelInfo.promotion_metadata.notes && (
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-600">Notes:</span>
                      <span className="col-span-2 text-gray-800">
                        {modelInfo.promotion_metadata.notes}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
