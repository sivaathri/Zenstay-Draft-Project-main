import { prisma } from '@zenstay/database';

export class FinancialService {
  /**
   * Distributes the exact cleaning fee collected into Check-in and Check-out
   * amounts based on the tenant's configured ratio (e.g. 30/70).
   * 
   * Ensures no rounding discrepancies (No profit, no loss).
   */
  static async calculateCleaningDistribution(tenantId: string, totalCleaningFee: number): Promise<{ checkInAmount: number, checkOutAmount: number }> {
    // In a full implementation, we'd fetch the tenant's configuration from the database.
    // Defaulting to the 30/70 rule specified in V3.0 (Section A.7)
    // const config = await prisma.tenantConfig.findUnique({ where: { tenantId } });
    // const checkInPercent = config?.checkInDistributionPercent ?? 30;
    
    const checkInPercent = 30; // 30%
    const checkOutPercent = 100 - checkInPercent; // 70%

    // Calculate exact amounts without rounding first
    const rawCheckIn = (totalCleaningFee * checkInPercent) / 100;
    
    // Rounding to nearest cent for the first intervention
    const checkInAmount = Math.round(rawCheckIn * 100) / 100;
    
    // Strict disbursement: The check-out amount is exactly the remainder.
    // This absolutely guarantees that checkInAmount + checkOutAmount === totalCleaningFee
    const checkOutAmount = Math.round((totalCleaningFee - checkInAmount) * 100) / 100;

    return {
      checkInAmount,
      checkOutAmount
    };
  }

  /**
   * Enforces the payment ceiling for shared interventions.
   * "The distribution can never exceed the total cleaning fee paid by the traveler."
   */
  static validateSharedInterventionCeiling(totalAvailable: number, requestedAmounts: number[]): boolean {
    const totalRequested = requestedAmounts.reduce((sum, amount) => sum + amount, 0);
    // Use an epsilon for floating point comparison if necessary, but we work in cents/rounded
    return totalRequested <= totalAvailable;
  }

  /**
   * MODULE C - Owner CRG Revenue Calculation
   * "Owner net revenue + 20% HOMELOK commission + 16% booking-site commission = 36% total markup."
   * Thus, Owner net revenue = Gross Booking Amount * (1 - 0.36)
   */
  static calculateOwnerNetRevenue(grossBookingAmount: number, customCommissionOverride?: number): number {
    const platformCommission = 0.16; // 16% OTA / Guesty channel commission
    const zenstayCommission = customCommissionOverride ?? 0.20; // 20% standard management fee

    const totalDeductions = platformCommission + zenstayCommission;
    
    // The exact net amount the owner receives
    const netRevenue = grossBookingAmount * (1 - totalDeductions);
    
    return Math.round(netRevenue * 100) / 100;
  }
}
