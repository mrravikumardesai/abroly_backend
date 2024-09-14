
export const mapJoiErrors = (errors: any): string[] => {
  const formattedErrors: string[] = [];

  errors.forEach((error: any) => {
    // console.log(error, "THE ERROR");

    const key = error.path[0]; // Access path from details
    const message = error.message.replace(/"([^"]+)"/g, '$1') || 'Invalid value';
    formattedErrors.push(`${key}: ${message}`);
  });

  return formattedErrors;
};

