type FieldError = {
  path: 'username' | 'password';
  message: string;
};

export type SignInErrorKind = 'credentials' | 'unexpected';

type ParsedSignInError = {
  kind: SignInErrorKind;
  message: string;
  fieldErrors?: FieldError[];
};

const LOGIN_FIELD_PATHS = new Set(['username', 'password']);

function normalizeFieldPath(path: string): FieldError['path'] | null {
  // Accept nested paths (e.g. "body.username") and keep only supported login fields.
  const segment = path.split('.').pop() ?? path;
  return LOGIN_FIELD_PATHS.has(segment) ? (segment as FieldError['path']) : null;
}

function isUnexpectedCode(code: unknown): boolean {
  return typeof code === 'number' && code !== 401;
}

function isNetworkSentinel(message: unknown): boolean {
  return message === 'NETWORK_ERROR';
}

export function parseSignInError(
  error: string | null | undefined,
  credentialsMessage: string,
  unexpectedMessage: string,
): ParsedSignInError {
  if (!error) {
    return { kind: 'unexpected', message: unexpectedMessage };
  }

  try {
    const parsed = JSON.parse(error) as {
      code?: number;
      kind?: SignInErrorKind;
      message?: string;
      messages?: Array<string | FieldError>;
    };

    const kind: SignInErrorKind =
      parsed.kind === 'credentials' || parsed.kind === 'unexpected'
        ? parsed.kind
        : isNetworkSentinel(parsed.message) || isUnexpectedCode(parsed.code)
          ? 'unexpected'
          : 'credentials';

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

      if (kind === 'unexpected') {
        return {
          kind,
          message: unexpectedMessage,
          fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined,
        };
      }

      const message =
        generalMessages.length > 0
          ? generalMessages.join(' | ')
          : (parsed.message ?? credentialsMessage);

      return {
        kind,
        message: isNetworkSentinel(message) ? unexpectedMessage : message,
        fieldErrors: fieldErrors.length > 0 ? fieldErrors : undefined,
      };
    }

    if (kind === 'unexpected') {
      return { kind, message: unexpectedMessage };
    }

    if (parsed.message && !isNetworkSentinel(parsed.message)) {
      return { kind, message: parsed.message };
    }

    return { kind, message: credentialsMessage };
  } catch {
    if (error === 'CredentialsSignin') {
      return { kind: 'credentials', message: credentialsMessage };
    }

    return { kind: 'unexpected', message: unexpectedMessage };
  }
}
