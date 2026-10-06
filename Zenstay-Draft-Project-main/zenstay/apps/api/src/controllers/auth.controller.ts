import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@zenstay/database';
import { env } from '../config/env';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({
        where: { email },
        include: { userRoles: { include: { role: true } } }
      });

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid credentials or inactive account' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const roles = user.userRoles.map((ur: any) => ur.role.name);
      
      const token = jwt.sign(
        { id: user.id, tenantId: user.tenantId, roles },
        env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          tenantId: user.tenantId,
          roles
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async me(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { userRoles: { include: { role: true } }, tenant: true }
      });

      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
        tenantName: user.tenant.name,
        roles: user.userRoles.map((ur: any) => ur.role.name)
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
