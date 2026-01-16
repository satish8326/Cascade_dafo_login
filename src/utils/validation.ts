/**
 * Validation utilities for form fields
 * Centralized validation logic for reusability
 */

export interface ValidationRule<T = string> {
  validate: (value: T) => string | undefined;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

/**
 * Email validation rule
 */
export const emailRule: ValidationRule = {
  validate: (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid email';
    }
    return undefined;
  },
};

/**
 * Required field validation rule
 */
export const requiredRule = (fieldName: string): ValidationRule => ({
  validate: (value: string) => {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    return undefined;
  },
});

/**
 * Phone number validation rule
 */
export const phoneRule: ValidationRule = {
  validate: (value: string) => {
    if (!value.trim()) {
      return 'Phone number is required';
    }
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
      return 'Enter a valid phone number';
    }
    return undefined;
  },
};

/**
 * Zip code validation rule
 */
export const zipCodeRule: ValidationRule = {
  validate: (value: string) => {
    if (!value.trim()) {
      return 'Zip code is required';
    }
    if (!/^\d{5}(-\d{4})?$/.test(value.trim())) {
      return 'Enter a valid zip code';
    }
    return undefined;
  },
};

/**
 * Account number validation rule (7 digits)
 */
export const accountNumberRule: ValidationRule = {
  validate: (value: string) => {
    if (!/^\d+$/.test(value)) {
      return 'Only numeric values are allowed';
    }
    if (value.length !== 7) {
      return 'Account number must be 7 digits';
    }
    return undefined;
  },
};

/**
 * Validate form values against rules
 */
export const validateForm = <T extends Record<string, unknown>>(
  values: T,
  rules: ValidationRules
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  Object.keys(rules).forEach((key) => {
    const rule = rules[key];
    if (rule) {
      const error = rule.validate(String(values[key] || ''));
      if (error) {
        errors[key as keyof T] = error;
      }
    }
  });

  return errors;
};

/**
 * Check if form is valid (no errors)
 */
export const isFormValid = <T extends Record<string, unknown>>(
  errors: Partial<Record<keyof T, string>>
): boolean => {
  return Object.keys(errors).length === 0;
};

