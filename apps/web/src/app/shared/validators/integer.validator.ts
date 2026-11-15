import { Validator, FieldContext } from '@angular/forms/signals';

export const integerValidator: Validator<number> = ({ value }: FieldContext<number>) => {
  if (value() !== Math.floor(value())) {
    return { kind: 'integer', message: 'The number must be an integer' };
  }

  return null;
};
