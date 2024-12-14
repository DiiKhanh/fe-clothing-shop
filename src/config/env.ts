import * as yup from 'yup';

const createEnv = () => {
  const EnvSchema = yup.object({
    API_URL: yup
      .string()
      .required('API_URL là biến môi trường bắt buộc.'),
    
    // APP_URL: yup
    //   .string()
    //   .default('http://localhost:3000'),

    ALGO_API_KEY: yup
      .string()
      .required('ALGO_API_KEY là biến môi trường bắt buộc.'),
    
    ALGO_APP_ID: yup
      .string()
      .required('ALGO_APP_ID là biến môi trường bắt buộc.'),
    
    CLOUDINARY_CLOUD_NAME: yup
      .string()
      .required('CLOUDINARY_CLOUD_NAME là biến môi trường bắt buộc.'),
    
    CLOUDINARY_PREFIX_PATH: yup
      .string()
      .required('CLOUDINARY_PREFIX_PATH là biến môi trường bắt buộc.'),
  });

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_DB_BASE_URL,
    // APP_URL: process.env.NEXT_PUBLIC_BASE_URL,
    ALGO_APP_ID: process.env.NEXT_PUBLIC_ALGO_APP_ID,
    ALGO_API_KEY: process.env.NEXT_PUBLIC_ALGO_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_PREFIX_PATH: process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH
  };

  try {
    const validatedEnv = EnvSchema.validateSync(envVars, { abortEarly: false });
    return validatedEnv;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      const errors: Record<string, string> = err.inner.reduce((acc: Record<string, string>, curr) => {
        if (curr.path) {
          acc[curr.path] = curr.message;
        }
        return acc;
      }, {});

      const errorMessages = Object.entries(errors)
        .map(([key, message]) => `- ${key}: ${message}`)
        .join('\n');

      throw new Error(`Invalid env provided.
      The following variables are missing or invalid:
      ${errorMessages}
      `);
  }
    throw err;
  }
};

export const env = createEnv();
