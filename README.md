# Breast Cancer Detection Frontend

A production-ready Next.js frontend application for breast cancer detection ML inference, consuming a FastAPI backend.

## Features

- **API Status Monitoring**: Real-time health checks and model status
- **Model Information**: Display model metadata and promotion details
- **Prediction Interface**: 30-feature input form with validation
- **Quick Input Options**: Paste bulk values or load example data
- **Result Visualization**: Clear display of predictions with confidence levels
- **Error Handling**: Comprehensive error states (503, 422, 500+)
- **Responsive Design**: Clean, mobile-friendly UI with Tailwind CSS

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React** for UI components
- **Fetch API** with timeout handling

## Project Structure

```
breast-cancer-detection-front-end/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ApiStatusCard.tsx   # Health check display
│   ├── ModelInfoCard.tsx   # Model metadata display
│   ├── PredictionForm.tsx  # Input form with validation
│   └── ResultCard.tsx      # Prediction results display
├── lib/
│   ├── api.ts              # API client wrapper
│   └── types.ts            # TypeScript definitions
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind config
└── next.config.js          # Next.js config
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   copy .env.example .env.local
   ```

   Edit `.env.local` to set your API URL:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://3.91.8.186:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Usage

### Testing API Endpoints from UI

1. **Check API Status**
   - Click "Refresh" in the API Status section
   - View health status, model version, and promotion details

2. **View Model Information**
   - Automatically loads on page load
   - Shows model type, path, version, and metadata

3. **Make Predictions**

   **Option 1: Manual Entry**
   - Fill in all 30 feature fields individually

   **Option 2: Paste Values**
   - Copy 30 comma or space-separated numbers
   - Paste into the quick input field
   - Click "Paste" to populate all fields

   **Option 3: Load Example**
   - Click "Load Example" to fill with sample data
   - Submit to see a prediction

4. **View Results**
   - See classification (Benign/Malignant)
   - View probability percentage with visual bar
   - Check confidence level
   - Review API and model version info

### Feature List (30 features in order)

1. radius_mean
2. texture_mean
3. perimeter_mean
4. area_mean
5. smoothness_mean
6. compactness_mean
7. concavity_mean
8. concave points_mean
9. symmetry_mean
10. fractal_dimension_mean
11. radius_se
12. texture_se
13. perimeter_se
14. area_se
15. smoothness_se
16. compactness_se
17. concavity_se
18. concave points_se
19. symmetry_se
20. fractal_dimension_se
21. radius_worst
22. texture_worst
23. perimeter_worst
24. area_worst
25. smoothness_worst
26. compactness_worst
27. concavity_worst
28. concave points_worst
29. symmetry_worst
30. fractal_dimension_worst

### Example Feature Values

```
17.99, 10.38, 122.8, 1001.0, 0.1184, 0.2776, 0.3001, 0.1471, 0.2419, 0.07871, 1.095, 0.9053, 8.589, 153.4, 0.006399, 0.04904, 0.05373, 0.01587, 0.03003, 0.006193, 25.38, 17.33, 184.6, 2019.0, 0.1622, 0.6656, 0.7119, 0.2654, 0.4601, 0.1189
```

## API Integration

The frontend connects to these endpoints:

- `GET /` - API info
- `GET /health` - Health check
- `GET /model/info` - Model metadata
- `POST /predict` - Make prediction

All API calls include:
- 10-second timeout
- Comprehensive error handling
- Type-safe responses

## Error Handling

- **503**: Model not loaded
- **422**: Validation error (invalid input)
- **500+**: Server error
- **Timeout**: Request timeout after 10 seconds
- **Network**: Connection failures

## Notes

- Assumes CORS is enabled on the API
- No authentication required
- All data is validated client-side before submission
- Results are for educational purposes only

## License

This project is for educational and research purposes.
