import NextAuth from 'next-auth/next';
import { authOptions } from '@lib/auth';

/**
 * @swagger
 * /api/auth/providers:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retrieve configured authentication providers
 *     responses:
 *       200:
 *         description: Returns the list of available providers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProvidersBodyDto'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/session:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current user session
 *     responses:
 *       200:
 *         description: Session object or null if not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SessionBodyDto'
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HttpErrorDto'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/csrf:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Retrieve CSRF token
 *     responses:
 *       200:
 *         description: CSRF token for form submissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CsrfTokenBodyDto'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in using credentials provider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignInPayloadDto'
 *     responses:
 *       200:
 *         description: Redirect URL after successful authentication
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign out current user
 *     responses:
 *       200:
 *         description: Redirect URL after sign out
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/callback/{provider}:
 *   get:
 *     tags:
 *       - Auth
 *     summary: OAuth callback endpoint for a given provider
 *     parameters:
 *       - name: provider
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider identifier (e.g., credentials)
 *     responses:
 *       302:
 *         description: Redirect after processing the callback
 *       500:
 *         description: Internal server error
 */

const handler: ReturnType<typeof NextAuth> = NextAuth(authOptions);
export { handler as GET, handler as POST };
