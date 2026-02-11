'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import type { HealthResponse } from '@/lib/types';

export default function ApiStatusCard() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
            Healthy
          </span>
        );
      case 'degraded':
        return (
          <span className="px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            Degraded
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
            Unhealthy
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">API Status</h2>
        <button
          onClick={fetchHealth}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {health && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Status:</span>
            {getStatusBadge(health.status)}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Model Loaded:</span>
            <span className={`font-semibold ${health.model_loaded ? 'text-green-600' : 'text-red-600'}`}>
              {health.model_loaded ? 'Yes' : 'No'}
            </span>
          </div>
          {health.model_version && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Model Version:</span>
              <span className="font-mono text-sm text-gray-800">{health.model_version}</span>
            </div>
          )}
          {health.promoted_at && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Promoted At:</span>
              <span className="text-sm text-gray-800">{new Date(health.promoted_at).toLocaleString()}</span>
            </div>
          )}
        </div>
      )}

      {!health && !error && !loading && (
        <p className="text-gray-500 text-center py-4">
          Click &quot;Refresh&quot; to check API status
        </p>
      )}
    </div>
  );
}
