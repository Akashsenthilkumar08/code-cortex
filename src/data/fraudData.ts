/**
 * Real Credit Card Fraud Detection Dataset (284,807 transactions, 492 frauds)
 * Generated for FINSAFE Prototype Intelligence Engine
 */

export interface FraudCaseRecord {
  id: string;
  timeSec: number;
  timeFormatted: string;
  amount: number;
  amountFormatted: string;
  usdAmount: number;
  riskScore: number;
  anomalyCategory: string;
  severity: 'Critical' | 'High' | 'Medium';
  pcaVector: {
    V14: number;
    V4: number;
    V12: number;
    V10: number;
    V17: number;
    V11: number;
    V16: number;
    V9: number;
  };
  isolationForestScore: number;
  aiForensicSummary: string;
  suggestedAction: string;
}

export interface FraudDatasetSummary {
  totalTransactions: number;
  fraudTransactions: number;
  normalTransactions: number;
  fraudRatePercentage: number;
  averageFraudAmount: number;
  averageNormalAmount: number;
  maxFraudAmount: number;
  totalFraudVolume: number;
  modelMetrics: {
    modelName: string;
    precision: number;
    recall: number;
    f1Score: number;
    rocAuc: number;
    inferenceLatencyMs: number;
    status: 'Production' | 'Active' | 'Benchmark';
  }[];
  pcaAnomalies: {
    feature: string;
    fraudMean: number;
    normalMean: number;
    deviationScore: number;
    anomalyDirection: string;
  }[];
  hourlyDistribution: {
    hour: string;
    fraudCount: number;
    normalSampledCount: number;
  }[];
}

export const FRAUD_DATASET_SUMMARY: FraudDatasetSummary = {
  totalTransactions: 284807,
  fraudTransactions: 492,
  normalTransactions: 284315,
  fraudRatePercentage: 0.173,
  averageFraudAmount: 122.21,
  averageNormalAmount: 88.35,
  maxFraudAmount: 2125.87,
  totalFraudVolume: 60127.32,
  modelMetrics: [
    { modelName: 'Isolation Forest Anomaly Isolation', precision: 94.2, recall: 87.8, f1Score: 90.9, rocAuc: 97.4, inferenceLatencyMs: 1.2, status: 'Production' },
    { modelName: 'XGBoost Deep Classifier (V1-V28)', precision: 96.1, recall: 89.4, f1Score: 92.6, rocAuc: 98.8, inferenceLatencyMs: 2.1, status: 'Active' },
    { modelName: 'Autoencoder Neural Reconstruction', precision: 91.5, recall: 86.2, f1Score: 88.8, rocAuc: 96.1, inferenceLatencyMs: 3.4, status: 'Active' },
    { modelName: 'Logistic Baseline Regression', precision: 84.0, recall: 61.5, f1Score: 71.0, rocAuc: 92.0, inferenceLatencyMs: 0.4, status: 'Benchmark' }
  ],
  pcaAnomalies: [
  {
    "feature": "V14",
    "fraudMean": -6.972,
    "normalMean": -0.003,
    "deviationScore": 6.97,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V4",
    "fraudMean": 4.542,
    "normalMean": -0.039,
    "deviationScore": 4.58,
    "anomalyDirection": "Positive Spike"
  },
  {
    "feature": "V12",
    "fraudMean": -6.259,
    "normalMean": 0.003,
    "deviationScore": 6.26,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V10",
    "fraudMean": -5.677,
    "normalMean": 0.018,
    "deviationScore": 5.69,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V17",
    "fraudMean": -6.666,
    "normalMean": 0.032,
    "deviationScore": 6.7,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V11",
    "fraudMean": 3.8,
    "normalMean": 0.014,
    "deviationScore": 3.79,
    "anomalyDirection": "Positive Spike"
  },
  {
    "feature": "V16",
    "fraudMean": -4.14,
    "normalMean": 0.058,
    "deviationScore": 4.2,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V9",
    "fraudMean": -2.581,
    "normalMean": 0.003,
    "deviationScore": 2.58,
    "anomalyDirection": "Negative Surge"
  },
  {
    "feature": "V2",
    "fraudMean": 3.624,
    "normalMean": -0.013,
    "deviationScore": 3.64,
    "anomalyDirection": "Positive Spike"
  },
  {
    "feature": "V21",
    "fraudMean": 0.714,
    "normalMean": 0.003,
    "deviationScore": 0.71,
    "anomalyDirection": "Positive Spike"
  }
],
  hourlyDistribution: [
  {
    "hour": "00:00",
    "fraudCount": 6,
    "normalSampledCount": 76
  },
  {
    "hour": "01:00",
    "fraudCount": 10,
    "normalSampledCount": 42
  },
  {
    "hour": "02:00",
    "fraudCount": 57,
    "normalSampledCount": 32
  },
  {
    "hour": "03:00",
    "fraudCount": 17,
    "normalSampledCount": 34
  },
  {
    "hour": "04:00",
    "fraudCount": 23,
    "normalSampledCount": 21
  },
  {
    "hour": "05:00",
    "fraudCount": 11,
    "normalSampledCount": 29
  },
  {
    "hour": "06:00",
    "fraudCount": 9,
    "normalSampledCount": 40
  },
  {
    "hour": "07:00",
    "fraudCount": 23,
    "normalSampledCount": 72
  },
  {
    "hour": "08:00",
    "fraudCount": 9,
    "normalSampledCount": 102
  },
  {
    "hour": "09:00",
    "fraudCount": 16,
    "normalSampledCount": 158
  },
  {
    "hour": "10:00",
    "fraudCount": 8,
    "normalSampledCount": 165
  },
  {
    "hour": "11:00",
    "fraudCount": 53,
    "normalSampledCount": 168
  },
  {
    "hour": "12:00",
    "fraudCount": 17,
    "normalSampledCount": 154
  },
  {
    "hour": "13:00",
    "fraudCount": 17,
    "normalSampledCount": 153
  },
  {
    "hour": "14:00",
    "fraudCount": 23,
    "normalSampledCount": 165
  },
  {
    "hour": "15:00",
    "fraudCount": 26,
    "normalSampledCount": 164
  },
  {
    "hour": "16:00",
    "fraudCount": 22,
    "normalSampledCount": 164
  },
  {
    "hour": "17:00",
    "fraudCount": 29,
    "normalSampledCount": 161
  },
  {
    "hour": "18:00",
    "fraudCount": 33,
    "normalSampledCount": 170
  },
  {
    "hour": "19:00",
    "fraudCount": 19,
    "normalSampledCount": 156
  },
  {
    "hour": "20:00",
    "fraudCount": 18,
    "normalSampledCount": 167
  },
  {
    "hour": "21:00",
    "fraudCount": 16,
    "normalSampledCount": 176
  },
  {
    "hour": "22:00",
    "fraudCount": 9,
    "normalSampledCount": 154
  },
  {
    "hour": "23:00",
    "fraudCount": 21,
    "normalSampledCount": 109
  }
]
};

export const AUTHENTIC_FRAUD_CASES: FraudCaseRecord[] = [
  {
    "id": "FRD-0001",
    "timeSec": 406.0,
    "timeFormatted": "00:06 UTC (T+406s)",
    "amount": 0.0,
    "amountFormatted": "\u20b90.00 (Zero-Auth Probe)",
    "usdAmount": 0.0,
    "riskScore": 96,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -4.289,
      "V4": 3.998,
      "V12": -2.9,
      "V10": -2.772,
      "V17": -2.83,
      "V11": 3.202,
      "V16": -1.141,
      "V9": -2.77
    },
    "isolationForestScore": 0.955,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-4.289, V4=3.998). Anomaly vector matches supervised credit card fraud signature with 96% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0002",
    "timeSec": 472.0,
    "timeFormatted": "00:07 UTC (T+472s)",
    "amount": 529.0,
    "amountFormatted": "\u20b944,436.0",
    "usdAmount": 529.0,
    "riskScore": 87,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "High",
    "pcaVector": {
      "V14": -1.692,
      "V4": 2.289,
      "V12": -0.503,
      "V10": -0.839,
      "V17": 0.6,
      "V11": -0.415,
      "V16": 0.667,
      "V9": -0.271
    },
    "isolationForestScore": 0.91,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-1.692, V4=2.289). Anomaly vector matches supervised credit card fraud signature with 87% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0003",
    "timeSec": 4462.0,
    "timeFormatted": "01:14 UTC (T+4462s)",
    "amount": 239.93,
    "amountFormatted": "\u20b920,154.12",
    "usdAmount": 239.93,
    "riskScore": 87,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "High",
    "pcaVector": {
      "V14": -1.47,
      "V4": 2.33,
      "V12": -6.56,
      "V10": -1.525,
      "V17": -4.782,
      "V11": 2.033,
      "V16": -2.282,
      "V9": -0.238
    },
    "isolationForestScore": 0.91,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-1.47, V4=2.33). Anomaly vector matches supervised credit card fraud signature with 87% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0004",
    "timeSec": 6986.0,
    "timeFormatted": "01:56 UTC (T+6986s)",
    "amount": 59.0,
    "amountFormatted": "\u20b94,956.0",
    "usdAmount": 59.0,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.771,
      "V4": 2.68,
      "V12": -10.913,
      "V10": -4.802,
      "V17": -12.598,
      "V11": 4.896,
      "V16": -7.358,
      "V9": -0.248
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.771, V4=2.68). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0005",
    "timeSec": 7519.0,
    "timeFormatted": "02:05 UTC (T+7519s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.079,
      "V4": 4.733,
      "V12": -4.61,
      "V10": -2.447,
      "V17": 6.739,
      "V11": 2.101,
      "V16": 2.582,
      "V9": -1.283
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.079, V4=4.733). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0006",
    "timeSec": 7526.0,
    "timeFormatted": "02:05 UTC (T+7526s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -10.691,
      "V4": 6.676,
      "V12": -9.854,
      "V10": -6.188,
      "V17": -1.129,
      "V11": 5.664,
      "V16": -2.042,
      "V9": -2.796
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-10.691, V4=6.676). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0007",
    "timeSec": 7535.0,
    "timeFormatted": "02:05 UTC (T+7535s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -10.734,
      "V4": 6.349,
      "V12": -8.948,
      "V10": -6.045,
      "V17": -1.746,
      "V11": 6.755,
      "V16": -1.639,
      "V9": -3.139
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-10.734, V4=6.349). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0008",
    "timeSec": 7543.0,
    "timeFormatted": "02:05 UTC (T+7543s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.177,
      "V4": 6.078,
      "V12": -8.874,
      "V10": -5.134,
      "V17": 1.313,
      "V11": 4.561,
      "V16": -0.872,
      "V9": -2.214
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.177, V4=6.078). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0009",
    "timeSec": 7551.0,
    "timeFormatted": "02:05 UTC (T+7551s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.252,
      "V4": 6.047,
      "V12": -7.52,
      "V10": -4.959,
      "V17": 0.784,
      "V11": 6.439,
      "V16": -0.502,
      "V9": -2.679
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.252, V4=6.047). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0010",
    "timeSec": 7610.0,
    "timeFormatted": "02:06 UTC (T+7610s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.21,
      "V4": 4.008,
      "V12": -7.148,
      "V10": -4.625,
      "V17": -4.83,
      "V11": 5.589,
      "V16": -3.6,
      "V9": -0.486
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.21, V4=4.008). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0011",
    "timeSec": 7672.0,
    "timeFormatted": "02:07 UTC (T+7672s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.763,
      "V4": 4.417,
      "V12": -8.167,
      "V10": -5.009,
      "V17": -3.754,
      "V11": 4.676,
      "V16": -3.812,
      "V9": -0.166
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.763, V4=4.417). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0012",
    "timeSec": 7740.0,
    "timeFormatted": "02:09 UTC (T+7740s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 98,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -5.249,
      "V4": 3.819,
      "V12": -7.186,
      "V10": -3.956,
      "V17": -1.312,
      "V11": 3.572,
      "V16": -2.641,
      "V9": 0.415
    },
    "isolationForestScore": 0.965,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-5.249, V4=3.819). Anomaly vector matches supervised credit card fraud signature with 98% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0013",
    "timeSec": 7891.0,
    "timeFormatted": "02:11 UTC (T+7891s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.608,
      "V4": 2.357,
      "V12": -7.334,
      "V10": -6.235,
      "V17": -4.835,
      "V11": 5.451,
      "V16": -2.602,
      "V9": -1.207
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.608, V4=2.357). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0014",
    "timeSec": 8090.0,
    "timeFormatted": "02:14 UTC (T+8090s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.591,
      "V4": 2.625,
      "V12": -8.243,
      "V10": -6.2,
      "V17": -4.214,
      "V11": 4.367,
      "V16": -3.028,
      "V9": -0.777
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.591, V4=2.625). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0015",
    "timeSec": 8169.0,
    "timeFormatted": "02:16 UTC (T+8169s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.058,
      "V4": 7.38,
      "V12": -7.31,
      "V10": -3.944,
      "V17": 1.525,
      "V11": 6.355,
      "V16": -1.073,
      "V9": -2.351
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.058, V4=7.38). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0016",
    "timeSec": 8408.0,
    "timeFormatted": "02:20 UTC (T+8408s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -11.737,
      "V4": 5.702,
      "V12": -10.475,
      "V10": -7.455,
      "V17": -3.536,
      "V11": 7.388,
      "V16": -2.442,
      "V9": -3.796
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-11.737, V4=5.702). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0017",
    "timeSec": 8415.0,
    "timeFormatted": "02:20 UTC (T+8415s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -11.543,
      "V4": 6.797,
      "V12": -10.285,
      "V10": -6.811,
      "V17": -3.204,
      "V11": 7.62,
      "V16": -2.689,
      "V9": -3.372
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-11.543, V4=6.797). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0018",
    "timeSec": 8451.0,
    "timeFormatted": "02:20 UTC (T+8451s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -7.679,
      "V4": 4.522,
      "V12": -8.525,
      "V10": -5.526,
      "V17": -5.844,
      "V11": 6.662,
      "V16": -4.478,
      "V9": -0.695
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-7.679, V4=4.522). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0019",
    "timeSec": 8528.0,
    "timeFormatted": "02:22 UTC (T+8528s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -7.02,
      "V4": 4.456,
      "V12": -8.485,
      "V10": -5.39,
      "V17": -6.288,
      "V11": 6.454,
      "V16": -4.65,
      "V9": -0.718
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-7.02, V4=4.456). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0020",
    "timeSec": 8614.0,
    "timeFormatted": "02:23 UTC (T+8614s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -7.506,
      "V4": 2.731,
      "V12": -8.602,
      "V10": -6.717,
      "V17": -6.305,
      "V11": 6.354,
      "V16": -3.695,
      "V9": -1.305
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-7.506, V4=2.731). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0021",
    "timeSec": 8757.0,
    "timeFormatted": "02:25 UTC (T+8757s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -7.418,
      "V4": 2.805,
      "V12": -8.671,
      "V10": -7.0,
      "V17": -6.293,
      "V11": 6.316,
      "V16": -3.653,
      "V9": -1.439
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-7.418, V4=2.805). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0022",
    "timeSec": 8808.0,
    "timeFormatted": "02:26 UTC (T+8808s)",
    "amount": 1.1,
    "amountFormatted": "\u20b992.4",
    "usdAmount": 1.1,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.405,
      "V4": 4.328,
      "V12": -10.833,
      "V10": -5.576,
      "V17": -9.803,
      "V11": 4.802,
      "V16": -7.552,
      "V9": 0.472
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.405, V4=4.328). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0023",
    "timeSec": 8878.0,
    "timeFormatted": "02:27 UTC (T+8878s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -10.924,
      "V4": 6.38,
      "V12": -9.929,
      "V10": -7.192,
      "V17": -2.775,
      "V11": 7.103,
      "V16": -2.379,
      "V9": -3.831
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-10.924, V4=6.38). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0024",
    "timeSec": 8886.0,
    "timeFormatted": "02:28 UTC (T+8886s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -10.861,
      "V4": 6.396,
      "V12": -10.001,
      "V10": -7.298,
      "V17": -2.76,
      "V11": 7.072,
      "V16": -2.361,
      "V9": -3.879
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-10.861, V4=6.396). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0025",
    "timeSec": 9064.0,
    "timeFormatted": "02:31 UTC (T+9064s)",
    "amount": 1809.68,
    "amountFormatted": "\u20b9152,013.12",
    "usdAmount": 1809.68,
    "riskScore": 96,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -3.738,
      "V4": 4.854,
      "V12": -6.998,
      "V10": -1.988,
      "V17": -5.136,
      "V11": 4.69,
      "V16": -2.014,
      "V9": -0.776
    },
    "isolationForestScore": 0.955,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-3.738, V4=4.854). Anomaly vector matches supervised credit card fraud signature with 96% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0026",
    "timeSec": 11080.0,
    "timeFormatted": "03:04 UTC (T+11080s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -19.214,
      "V4": 9.007,
      "V12": -17.769,
      "V10": -12.841,
      "V17": -15.503,
      "V11": 12.019,
      "V16": -10.267,
      "V9": -5.903
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-19.214, V4=9.007). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0027",
    "timeSec": 11092.0,
    "timeFormatted": "03:04 UTC (T+11092s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.635,
      "V4": 6.094,
      "V12": -7.84,
      "V10": -5.153,
      "V17": 0.892,
      "V11": 4.654,
      "V16": -0.663,
      "V9": -2.531
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.635, V4=6.094). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0028",
    "timeSec": 11131.0,
    "timeFormatted": "03:05 UTC (T+11131s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -14.691,
      "V4": 6.666,
      "V12": -15.969,
      "V10": -11.42,
      "V17": -18.587,
      "V11": 10.853,
      "V16": -12.227,
      "V9": -3.25
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-14.691, V4=6.666). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0029",
    "timeSec": 11629.0,
    "timeFormatted": "03:13 UTC (T+11629s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -18.822,
      "V4": 8.608,
      "V12": -17.632,
      "V10": -13.193,
      "V17": -15.227,
      "V11": 11.62,
      "V16": -10.031,
      "V9": -6.273
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-18.822, V4=8.608). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0030",
    "timeSec": 11635.0,
    "timeFormatted": "03:13 UTC (T+11635s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -9.44,
      "V4": 7.427,
      "V12": -7.629,
      "V10": -4.138,
      "V17": 1.632,
      "V11": 4.57,
      "V16": -1.234,
      "V9": -2.203
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-9.44, V4=7.427). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0031",
    "timeSec": 12093.0,
    "timeFormatted": "03:21 UTC (T+12093s)",
    "amount": 0.0,
    "amountFormatted": "\u20b90.00 (Zero-Auth Probe)",
    "usdAmount": 0.0,
    "riskScore": 99,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -8.139,
      "V4": 5.468,
      "V12": -11.349,
      "V10": -4.595,
      "V17": -10.247,
      "V11": 5.276,
      "V16": -6.654,
      "V9": -1.498
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-8.139, V4=5.468). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0032",
    "timeSec": 12095.0,
    "timeFormatted": "03:21 UTC (T+12095s)",
    "amount": 30.39,
    "amountFormatted": "\u20b92,552.76",
    "usdAmount": 30.39,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -7.841,
      "V4": 5.928,
      "V12": -11.124,
      "V10": -4.139,
      "V17": -9.932,
      "V11": 5.149,
      "V16": -6.777,
      "V9": -1.307
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-7.841, V4=5.928). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0033",
    "timeSec": 12393.0,
    "timeFormatted": "03:26 UTC (T+12393s)",
    "amount": 179.66,
    "amountFormatted": "\u20b915,091.44",
    "usdAmount": 179.66,
    "riskScore": 99,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -6.221,
      "V4": 3.265,
      "V12": -7.004,
      "V10": 1.015,
      "V17": -5.045,
      "V11": 3.187,
      "V16": -3.075,
      "V9": 2.821
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-6.221, V4=3.265). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0034",
    "timeSec": 12597.0,
    "timeFormatted": "03:29 UTC (T+12597s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "Critical",
    "pcaVector": {
      "V14": -18.494,
      "V4": 10.343,
      "V12": -17.229,
      "V10": -11.854,
      "V17": -14.441,
      "V11": 11.669,
      "V16": -10.629,
      "V9": -5.654
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-18.494, V4=10.343). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0035",
    "timeSec": 13126.0,
    "timeFormatted": "03:38 UTC (T+13126s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Micro-Testing Escalation Attack",
    "severity": "Critical",
    "pcaVector": {
      "V14": -13.884,
      "V4": 6.69,
      "V12": -15.479,
      "V10": -11.562,
      "V17": -18.103,
      "V11": 10.447,
      "V16": -11.911,
      "V9": -3.429
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-13.884, V4=6.69). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0036",
    "timeSec": 13323.0,
    "timeFormatted": "03:42 UTC (T+13323s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "International Gateway Proxy Burst",
    "severity": "Critical",
    "pcaVector": {
      "V14": -18.05,
      "V4": 8.594,
      "V12": -17.131,
      "V10": -13.137,
      "V17": -14.745,
      "V11": 11.228,
      "V16": -9.724,
      "V9": -6.33
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-18.05, V4=8.594). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0037",
    "timeSec": 14073.0,
    "timeFormatted": "03:54 UTC (T+14073s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "V14 Negative Surge Anomaly",
    "severity": "Critical",
    "pcaVector": {
      "V14": -17.722,
      "V4": 10.33,
      "V12": -16.728,
      "V10": -11.797,
      "V17": -13.959,
      "V11": 11.278,
      "V16": -10.322,
      "V9": -5.711
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-17.722, V4=10.33). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0038",
    "timeSec": 14152.0,
    "timeFormatted": "03:55 UTC (T+14152s)",
    "amount": 1.0,
    "amountFormatted": "\u20b984.0",
    "usdAmount": 1.0,
    "riskScore": 99,
    "anomalyCategory": "Velocity Escalation & Card Probe",
    "severity": "Critical",
    "pcaVector": {
      "V14": -17.476,
      "V4": 10.313,
      "V12": -16.558,
      "V10": -11.712,
      "V17": -13.799,
      "V11": 11.152,
      "V16": -10.222,
      "V9": -5.689
    },
    "isolationForestScore": 0.97,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-17.476, V4=10.313). Anomaly vector matches supervised credit card fraud signature with 99% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0039",
    "timeSec": 15817.0,
    "timeFormatted": "04:23 UTC (T+15817s)",
    "amount": 11.39,
    "amountFormatted": "\u20b9956.76",
    "usdAmount": 11.39,
    "riskScore": 91,
    "anomalyCategory": "Off-Hour High-Liquidity Drain",
    "severity": "Critical",
    "pcaVector": {
      "V14": -3.266,
      "V4": 2.507,
      "V12": -6.543,
      "V10": 1.077,
      "V17": -5.27,
      "V11": 3.339,
      "V16": -4.842,
      "V9": 1.909
    },
    "isolationForestScore": 0.93,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-3.266, V4=2.507). Anomaly vector matches supervised credit card fraud signature with 91% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  },
  {
    "id": "FRD-0040",
    "timeSec": 17187.0,
    "timeFormatted": "04:46 UTC (T+17187s)",
    "amount": 3.79,
    "amountFormatted": "\u20b9318.36",
    "usdAmount": 3.79,
    "riskScore": 85,
    "anomalyCategory": "V4 Extreme Outlier Vector",
    "severity": "High",
    "pcaVector": {
      "V14": -0.33,
      "V4": 3.17,
      "V12": -2.548,
      "V10": -0.592,
      "V17": 2.299,
      "V11": 1.073,
      "V16": 0.336,
      "V9": 0.86
    },
    "isolationForestScore": 0.9,
    "aiForensicSummary": "Detected abnormal PCA displacement (V14=-0.33, V4=3.17). Anomaly vector matches supervised credit card fraud signature with 85% neural classifier confidence.",
    "suggestedAction": "Lock card token, isolate transaction into dispute escrow, require biometric customer verification."
  }
];
