/**
 * @swagger
 * components:
 *   schemas:
 *     CsrfTokenBodyDto:
 *       type: object
 *       required:
 *         - csrfToken
 *       properties:
 *         csrfToken:
 *           type: string
 *           description: CSRF token to include in form submissions
 */
export type CsrfTokenBodyDto = {
  csrfToken: string;
};
