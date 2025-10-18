import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173/api';

export const auditService = {
  async submitAuditRequest(data: {
    businessName: string;
    email: string;
    websiteUrl: string;
    phone?: string;
    goals?: string;
  }) {
    // For development, we'll simulate API call
    if (import.meta.env.DEV) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, message: 'Audit request submitted successfully' });
        }, 2000);
      });
    }

    // Production API call
    const response = await axios.post(`${API_BASE_URL}/audit-request`, data);
    return response.data;
  },
};