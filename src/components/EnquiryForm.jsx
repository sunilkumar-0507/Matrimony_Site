import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { businessConfig, whatsappLink } from '../config/businessConfig';
import { normaliseMobile, submitEnquiry, validateEnquiry } from '../utils/enquiry';
import { SocialIcon } from './SocialIcons';

const initialValues = { name: '', mobile: '', email: '', lookingFor: '', message: '', website: '' };
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const LAST_KEY = 'km-last-enquiry';

// Remembers the last successful enquiry so the same details aren't sent twice in a row
function isDuplicate(values) {
  try {
    const last = JSON.parse(localStorage.getItem(LAST_KEY) || 'null');
    return (
      last &&
      last.mobile === normaliseMobile(values.mobile) &&
      last.lookingFor === values.lookingFor &&
      Date.now() - last.at < DUPLICATE_WINDOW_MS
    );
  } catch {
    return false;
  }
}

function rememberSubmission(values) {
  try {
    localStorage.setItem(
      LAST_KEY,
      JSON.stringify({ mobile: normaliseMobile(values.mobile), lookingFor: values.lookingFor, at: Date.now() })
    );
  } catch {
    /* storage unavailable – ignore */
  }
}

export default function EnquiryForm({ id = 'enquiry' }) {
  const { enquiry } = businessConfig;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const submitting = useRef(false);
  const formRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting.current) return;

    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    if (isDuplicate(values)) {
      setServerError('We have already received your enquiry. Our team will contact you shortly.');
      setStatus('error');
      return;
    }

    submitting.current = true;
    setStatus('submitting');
    setServerError('');
    try {
      await submitEnquiry(values);
      rememberSubmission(values);
      setStatus('success');
      setValues(initialValues);
    } catch (err) {
      setServerError(
        err?.message && !/failed to fetch|networkerror/i.test(err.message)
          ? err.message
          : 'We could not send your enquiry. Please check your connection and try again.'
      );
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  };

  const fieldProps = (name) => ({
    id: `enq-${name}`,
    name,
    value: values[name],
    onChange: update,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `enq-${name}-error` : undefined,
  });

  const fieldError = (name) =>
    errors[name] && (
      <span id={`enq-${name}-error`} className="field__error">
        {errors[name]}
      </span>
    );

  return (
    <div id={id} className="enquiry-card">
      <span className="enquiry-card__corner enquiry-card__corner--tl" aria-hidden="true" />
      <span className="enquiry-card__corner enquiry-card__corner--br" aria-hidden="true" />

      {status === 'success' ? (
        <div className="enquiry-success" role="status">
          <CheckCircle2 size={56} strokeWidth={1.4} aria-hidden="true" />
          <h3>Enquiry Submitted</h3>
          <p>{enquiry.successMessage}</p>
          <div className="enquiry-success__actions">
            <button type="button" className="btn btn--gold" onClick={() => setStatus('idle')}>
              Submit Another Enquiry
            </button>
            <a className="btn btn--ghost-light" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <SocialIcon name="whatsapp" size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <>
          <h2 className="enquiry-card__title">{enquiry.title}</h2>
          <p className="enquiry-card__subtitle">{enquiry.subtitle}</p>

          <form ref={formRef} className="enquiry-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="enq-name">
                Full Name <span aria-hidden="true">*</span>
              </label>
              <input type="text" autoComplete="name" placeholder="Enter your full name" required maxLength={80} {...fieldProps('name')} />
              {fieldError('name')}
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="enq-mobile">
                  Mobile Number <span aria-hidden="true">*</span>
                </label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" required maxLength={16} {...fieldProps('mobile')} />
                {fieldError('mobile')}
              </div>
              <div className="field">
                <label htmlFor="enq-email">Email Address</label>
                <input type="email" autoComplete="email" placeholder="you@example.com" maxLength={120} {...fieldProps('email')} />
                {fieldError('email')}
              </div>
            </div>

            <div className="field">
              <label htmlFor="enq-lookingFor">
                I Am Looking For <span aria-hidden="true">*</span>
              </label>
              <select required {...fieldProps('lookingFor')}>
                <option value="" disabled>
                  Select an option
                </option>
                {enquiry.lookingForOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {fieldError('lookingFor')}
            </div>

            <div className="field">
              <label htmlFor="enq-message">Message / Requirements</label>
              <textarea rows={4} placeholder="Share your requirements (optional)" maxLength={1000} {...fieldProps('message')} />
              {fieldError('message')}
            </div>

            {/* Honeypot – hidden from people, catches spam bots */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="enq-website">Website</label>
              <input type="text" id="enq-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
            </div>

            {status === 'error' && serverError && (
              <div className="form-alert" role="alert">
                <AlertCircle size={18} aria-hidden="true" />
                <span>{serverError}</span>
              </div>
            )}

            <button type="submit" className="btn btn--gold btn--block btn--lg" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="spin" aria-hidden="true" /> Submitting…
                </>
              ) : (
                <>
                  Submit Enquiry <Send size={17} aria-hidden="true" />
                </>
              )}
            </button>
            <p className="enquiry-form__note">Your details are kept strictly confidential.</p>
          </form>
        </>
      )}
    </div>
  );
}
