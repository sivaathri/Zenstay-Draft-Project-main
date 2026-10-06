import axios from 'axios';
import { env } from '../config/env';

export interface GuestyReservation {
  _id: string;
  checkIn: string;
  checkOut: string;
  status: string;
  listing: {
    _id: string;
  };
  money: {
    fareAccommodation: number;
    fareCleaning: number;
  };
}

export class GuestyService {
  private readonly baseUrl = 'https://open-api.guesty.com/v1';
  private readonly isMockMode: boolean;

  constructor() {
    this.isMockMode = !env.GUESTY_API_KEY;
    if (this.isMockMode) {
      console.warn('GUESTY_API_KEY is not set. GuestyService is running in MOCK mode.');
    }
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${env.GUESTY_API_KEY}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Fetch a specific reservation from Guesty
   */
  async getReservation(id: string): Promise<GuestyReservation | null> {
    if (this.isMockMode) {
      return this.mockReservation(id);
    }

    try {
      const response = await axios.get(`${this.baseUrl}/reservations/${id}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch reservation ${id} from Guesty`, error);
      throw error;
    }
  }

  /**
   * Mock data for development and testing when external credentials are not available
   */
  private mockReservation(id: string): GuestyReservation {
    return {
      _id: id,
      checkIn: new Date().toISOString(),
      checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 days
      status: 'confirmed',
      listing: {
        _id: 'mock-listing-1'
      },
      money: {
        fareAccommodation: 450,
        fareCleaning: 120
      }
    };
  }
}

export const guestyService = new GuestyService();
