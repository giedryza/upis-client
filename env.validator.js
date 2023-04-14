// @ts-check
const { z } = require('zod');

const envVariables = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  NEXT_PUBLIC_HOST_CLIENT: z.string(),
  NEXT_PUBLIC_HOST_API: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_JWT_EXPIRES_IN_DAYS: z.string(),
});

const _env = envVariables.safeParse(process.env);

const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`;
      }

      return null;
    })
    .filter(Boolean);

if (!_env.success) {
  console.error(
    '❌ Invalid environment variables\n👇 Fix or update the `env.validator.js` file.\n',
    ...formatErrors(_env.error.format())
  );
  process.exit(1);
}

module.exports = {
  envVariables,
};
