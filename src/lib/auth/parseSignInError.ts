type FieldError = {
  path: 'username' | 'password';
  message: string;
};

type ParsedSignInError = {
  message: string;
  fieldErrors?: FieldError[];
};

const LOGIN_FIELD_PATHS = new Set(['username', 'password']);

function normalizeFieldPath(path: string): FieldError['path'] | null {
  // Accept nested paths (e.g. "body.username") and keep only supported login fields.
  const segment = path.split('.').pop() ?? path;
  return LOGIN_FIELD_PATHS.has(segment) ? (segment as FieldError['path']) : null;
}

export function parseSignInError(
  error: string | null | undefined,
  fallbackMessage: string,
): ParsedSignInError {
  if (!error) {
    return { message: fallbackMessage };
  }

  try {
    const parsed = JSON.parse(error) as {
      message?: string;
      messages?: Array<string | FieldError>;
    };

    if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
      const fieldErrors: FieldError[] = [];
      const generalMessages: string[] = [];

      for (const item of parsed.messages) {
        if (typeof item === 'string') {
          generalMessages.push(item);
          continue;
        }

        if (typeof item === 'object' && item !== null && 'message' in item) {
          const normalizedPath = normalizeFieldPath(item.path ?? '');

          if (normalizedPath) {
            fieldErrors.push({ path: normalizedPath, message: item.message });
          } else {
            generalMessages.push(item.message);
          }
        }
      }

      const message =
        generalMessages.length > 0
          ? generalMessages.join(' | ')
          : (parsed.message ?? fallbackMessage);

      return {
        message,
        fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined,
      };
    }

    if (parsed.message) {
      return { message: parsed.message };
    }

    return { message: fallbackMessage };
  } catch {
    if (error === 'CredentialsSignin') {
      return { message: fallbackMessage };
    }

    return { message: error || fallbackMessage };
  }
}
