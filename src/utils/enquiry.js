import { businessConfig } from '../config/businessConfig';

// Normalises Indian mobile numbers: strips spaces, dashes and +91 / 91 / 0 prefixes
export function normaliseMobile(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

export function validateEnquiry(values) {
  const errors = {};
  const name = values.name.trim();
  if (!name) errors.name = 'Please enter your full name.';
  else if (name.length < 2 || !/^[\p{L}\p{M} .'-]+$/u.test(name)) errors.name = 'Please enter a valid name.';

  if (!values.mobile.trim()) errors.mobile = 'Please enter your mobile number.';
  else if (!/^[6-9]\d{9}$/.test(normaliseMobile(values.mobile)))
    errors.mobile = 'Please enter a valid 10-digit Indian mobile number.';

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!values.lookingFor) errors.lookingFor = 'Please select what you are looking for.';

  if (values.message.length > 1000) errors.message = 'Please keep your message under 1000 characters.';
  return errors;
}

async function readError(response) {
  try {
    const data = await response.json();
    return data.message || data.error || `Request failed (${response.status})`;
  } catch {
    return `Request failed (${response.status})`;
  }
}

/**
 * Sends the enquiry to the provider configured in businessConfig.enquiry.
 * Resolves on success, throws an Error with a user-friendly message on failure.
 */
export async function submitEnquiry(values) {
  const cfg = businessConfig.enquiry;
  const payload = {
    name: values.name.trim(),
    mobile: '+91 ' + normaliseMobile(values.mobile),
    email: values.email.trim(),
    lookingFor: values.lookingFor,
    message: values.message.trim(),
    submittedAt: new Date().toISOString(),
  };

  // Honeypot field filled in: silently pretend success for bots
  if (values.website) return;

  let response;
  if (cfg.provider === 'web3forms') {
    if (!cfg.web3formsAccessKey) throw new Error('The enquiry service is not configured yet.');
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: cfg.web3formsAccessKey,
        subject: `New enquiry from ${payload.name} – ${businessConfig.name}`,
        from_name: businessConfig.name,
        replyto: payload.email || undefined,
        ...payload,
      }),
    });
  } else if (cfg.provider === 'formspree') {
    if (!cfg.formspreeEndpoint) throw new Error('The enquiry service is not configured yet.');
    response = await fetch(cfg.formspreeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, _replyto: payload.email || undefined }),
    });
  } else {
    response = await fetch(cfg.serverEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  if (!response.ok) throw new Error(await readError(response));
  const data = await response.json().catch(() => ({}));
  if (data && data.success === false) throw new Error(data.message || 'Submission failed.');
}
