import { SchemaLike, validate as joiValidate, LanguageRootOptions, ValidationOptions } from 'joi';
import { badRequest } from 'boom';

const language: LanguageRootOptions = {
  key: '{{label}} ',
};
const defaultOptions: ValidationOptions = {
  language,
  allowUnknown: false,
  // convert: false,
};

export const validate = <T>(payload: T, schema: SchemaLike, options?: ValidationOptions): any => {
  const joiValidationOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  const { error, value } = joiValidate(payload, schema, joiValidationOptions);
  if (error) {
    throw error;
  }
  return value;
};

