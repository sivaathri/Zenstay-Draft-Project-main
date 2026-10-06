import PDFDocument from 'pdfkit';
import { FinancialService } from './financial.service';
import { prisma } from '@zenstay/database';

export class CrgService {
  /**
   * Generates a monthly Compte Rendu de Gérance (CRG) PDF for an owner.
   * Calculates the exact net revenue based on the locked 36% markup rule.
   */
  static async generateMonthlyCrgPdf(tenantId: string, ownerId: string, month: number, year: number): Promise<Buffer> {
    // 1. Fetch the owner and their properties
    const owner = await prisma.owner.findUnique({
      where: { id: ownerId },
      include: { properties: true }
    });

    if (!owner || owner.tenantId !== tenantId) {
      throw new Error('Owner not found or unauthorized');
    }

    // 2. Fetch reservations for that month across all their properties
    // (In this mock, we'll just pull all completed reservations for the properties and filter)
    const propertyIds = owner.properties.map(p => p.id);
    
    // Create dates for filtering (beginning and end of month)
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const reservations = await prisma.reservation.findMany({
      where: {
        propertyId: { in: propertyIds },
        status: 'completed',
        checkOut: {
          gte: startDate,
          lte: endDate
        }
      },
      include: { property: true }
    });

    // 3. Generate PDF using PDFKit
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const buffers: Buffer[] = [];
        
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Header
        doc.fontSize(20).text('COMPTE RENDU DE GÉRANCE (CRG)', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Date de génération: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.text(`Période: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, { align: 'right' });
        doc.moveDown(2);

        // Owner Info
        doc.fontSize(14).text('INFORMATIONS PROPRIÉTAIRE', { underline: true });
        doc.fontSize(12).text(`Nom: ${owner.firstName} ${owner.lastName}`);
        doc.text(`Email: ${owner.email}`);
        if (owner.phone) doc.text(`Téléphone: ${owner.phone}`);
        doc.moveDown(2);

        // Financial Breakdown
        doc.fontSize(14).text('DÉTAILS DES RÉSERVATIONS', { underline: true });
        doc.moveDown();

        let totalGross = 0;
        let totalNet = 0;

        if (reservations.length === 0) {
          doc.fontSize(11).text('Aucune réservation complétée pour cette période.', { font: 'Helvetica-Oblique' });
        } else {
          reservations.forEach((res, index) => {
            const gross = res.totalAmount;
            // Module C: Calculate Exact Net Revenue (1 - 0.36)
            const net = FinancialService.calculateOwnerNetRevenue(gross);

            totalGross += gross;
            totalNet += net;

            doc.fontSize(11).text(`${index + 1}. Réservation: ${res.id.substring(0, 8)} (${res.property.name})`);
            doc.text(`    Arrivée: ${new Date(res.checkIn).toLocaleDateString()} | Départ: ${new Date(res.checkOut).toLocaleDateString()}`);
            doc.text(`    Montant Brut (Voyageur): €${gross.toFixed(2)}`);
            doc.text(`    Montant Net (Propriétaire): €${net.toFixed(2)}`, { font: 'Helvetica-Bold' });
            doc.moveDown();
          });
        }

        doc.moveDown(2);
        doc.rect(50, doc.y, 500, 2).fill('#c59b4e');
        doc.moveDown();

        // Summary Totals
        doc.fontSize(16).text('RÉSUMÉ FINANCIER', { align: 'right' });
        doc.fontSize(12).text(`Total Brut Généré: €${totalGross.toFixed(2)}`, { align: 'right' });
        
        const deductions = totalGross - totalNet;
        doc.text(`Commissions (Zenstay 20% + Plateforme 16%): -€${deductions.toFixed(2)}`, { align: 'right', color: 'red' });
        
        doc.moveDown();
        doc.fontSize(18).text(`REVENU NET À VERSER: €${totalNet.toFixed(2)}`, { align: 'right', color: '#10b981' });

        // Footer
        doc.moveDown(4);
        doc.fontSize(10).fillColor('black').text('Zenstay Luxury Hospitality - Document généré automatiquement et conforme aux spécifications V3.0.', { align: 'center', color: 'grey' });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}
