import ApiStatusCard from '@/components/ApiStatusCard';
import ModelInfoCard from '@/components/ModelInfoCard';
import PredictionForm from '@/components/PredictionForm';

export default function HomePage() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Breast Cancer Detection
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered inference using machine learning
          </p>
        </header>

        {/* API Status and Model Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ApiStatusCard />
          <ModelInfoCard />
        </div>

        {/* Prediction Form */}
        <div className="mb-8">
          <PredictionForm />
        </div>

        {/* About / Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            ℹ️ Important Information
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>
              <strong>Educational Purpose:</strong> This tool demonstrates
              machine learning inference for breast cancer detection based on
              cell nucleus measurements from fine needle aspirate (FNA) images.
            </p>
            <p>
              <strong>Not Medical Advice:</strong> This system is for
              informational and research purposes only. Results should not be
              used for medical diagnosis or treatment decisions. Always consult
              qualified healthcare professionals for medical advice.
            </p>
            <p>
              <strong>Data Privacy:</strong> Input data is sent to the API for
              inference and is not stored permanently. Ensure you have proper
              authorization before submitting any real patient data.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              The model analyzes 30 features including radius, texture,
              perimeter, area, smoothness, compactness, concavity, and other
              measurements of cell nuclei to classify samples as benign or
              malignant.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>
            Powered by FastAPI + Next.js | API:{' '}
            {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://54.87.178.118:8000'}
          </p>
        </footer>
      </div>
    </main>
  );
}
