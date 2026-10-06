# OPEN SOURCE REVIEW

THIS DOCUMENT IS CRITICAL FOR COMMERCIAL COMPLIANCE.

## 1. Kamra PMS
- **Repository**: `/references/kamra-pms-develop`
- **License**: GNU Affero General Public License Version 3 (AGPL v3)
- **Copyright**: HeyKoala / Contributors
- **Potential Reusable Component**: PMS business logic, reservation schemas.
- **Reuse Method**: REFERENCE ONLY.
- **Commercial SaaS Implications**: AGPL v3 is a highly infectious copyleft license. If we use this code and run it as a service over a network, we are required to offer the source code of our entire modified application to users interacting with it. This completely breaks the proprietary commercial nature of ZENSTAY SaaS.
- **Risk/Concern**: VERY HIGH. Direct code copying is strictly prohibited. We must independently reimplement the logic.

## 2. OpenSTR
- **Repository**: `/references/OpenSTR-main`
- **License**: GNU General Public License Version 3 (GPL v3)
- **Copyright**: OpenSTR / Contributors
- **Potential Reusable Component**: Housekeeping schemas, API routes for tasks.
- **Reuse Method**: REFERENCE ONLY.
- **Commercial SaaS Implications**: GPL v3 requires that derived works distributed to others be licensed under GPL. While SaaS use without distribution sometimes bypasses GPL (unlike AGPL), it is still too legally risky for a proprietary commercial product to incorporate GPL code, especially regarding frontend distribution or future mobile apps.
- **Risk/Concern**: HIGH. Direct code copying is strictly prohibited. We will reimplement housekeeping workflows independently.

## 3. QloApps
- **Repository**: `/references/QloApps-develop`
- **License**: Open Software License (OSL) v. 3.0
- **Copyright**: QloApps / Contributors
- **Potential Reusable Component**: Booking engine pricing logic, property structures.
- **Reuse Method**: REFERENCE ONLY.
- **Commercial SaaS Implications**: OSL 3.0 requires derivative works distributed (which Section 5 defines to include External Deployment/SaaS) to be licensed under OSL. This means if we use the code, we must provide the source code of our derivative work under OSL.
- **Risk/Concern**: VERY HIGH. Direct code copying is strictly prohibited. Reimplement concepts cleanly.

## CONCLUSION
Due to the copyleft nature of all reference repositories (AGPL, GPL, OSL), **NO CODE** from the `references` directory will be directly copied, imported, or merged into the Zenstay product. 
All references will be used strictly as READ-ONLY documentation to understand data models and business rules. Zenstay will be a 100% clean-room proprietary implementation.
