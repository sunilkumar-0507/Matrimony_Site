/**
 * Central business configuration.
 * Every piece of business information shown on the site comes from this file.
 * Replace the placeholder contact details below with the real ones before going live.
 */
import logo from '../assets/logo/logo.svg';

const env = import.meta.env;

export const businessConfig = {
  name: 'Kalyana Matrimony',
  tagline: 'Trusted Marriage Service',
  logo,
  siteUrl: 'https://www.kalyanamatrimony.in',

  contact: {
    phoneDisplay: '+91 98765 43210',
    phone: '+919876543210',
    whatsapp: '919876543210', // country code + number, digits only
    whatsappMessage: 'Hello Kalyana Matrimony, I would like to know more about your matrimony services.',
    email: 'info@kalyanamatrimony.in',
    location: 'Thoothukudi, Tamil Nadu',
    address: 'Thoothukudi, Tamil Nadu, India',
    workingHours: 'Mon – Sat, 9:30 AM – 7:00 PM',
  },

  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
  },

  // Put the original photograph at public/images/hero-couple.jpg (or change this path).
  // Until then the decorative fallback is shown.
  heroImage: '/images/hero-couple.jpg',
  heroImageFallback: '/images/hero-couple-placeholder.svg',
  heroImageAlt: 'Indian bride in a red saree and groom in a cream traditional outfit on their wedding day',

  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'A Trusted Matrimony Service for',
    title: 'Meaningful Matches',
    description:
      'We help families find the right life partner through personalized support, trusted networks and complete privacy.',
    primaryCta: 'Enquire for Details',
    secondaryCta: 'Our Services',
  },

  trustHighlights: [
    { icon: 'ShieldCheck', title: 'Trusted & Confidential Service', text: 'Every enquiry is handled with care and discretion.' },
    { icon: 'HeartHandshake', title: 'Personalized Match Support', text: 'Guidance tailored to your family’s preferences.' },
    { icon: 'Users', title: 'Family-Oriented Approach', text: 'We work closely with families at every step.' },
    { icon: 'Lock', title: 'Privacy Assured', text: 'Your details are never shared without consent.' },
  ],

  about: {
    eyebrow: 'About Us',
    title: 'Kalyana Matrimony',
    description:
      'We are a professional matrimonial service dedicated to bringing suitable alliances for brides and grooms. With a personalized and family-focused approach, we ensure trusted, respectful and confidential matchmaking support.',
  },

  services: [
    {
      icon: 'UserSearch',
      title: 'Bride / Groom Search Support',
      description: 'Professional assistance in identifying suitable matrimonial alliances.',
    },
    {
      icon: 'MessagesSquare',
      title: 'Personalized Consultation',
      description: 'Get personalized guidance and support throughout the matrimonial process.',
    },
    {
      icon: 'ClipboardCheck',
      title: 'Profile Shortlisting & Coordination',
      description: 'Assistance with coordinating and shortlisting suitable matrimonial proposals.',
    },
  ],

  whyChooseUs: {
    title: 'Why Choose Kalyana Matrimony?',
    subtitle: 'A dependable partner for families seeking a respectful and well-guided matrimonial journey.',
    features: [
      { icon: 'BadgeCheck', title: 'Trusted Matrimonial Assistance', text: 'Reliable support backed by a trusted network of families.' },
      { icon: 'Headset', title: 'Personalized Customer Support', text: 'A dedicated point of contact who understands your needs.' },
      { icon: 'Home', title: 'Family-Oriented Approach', text: 'Traditions and family values are respected throughout.' },
      { icon: 'LockKeyhole', title: 'Confidential Enquiry Handling', text: 'Your information stays private and is handled securely.' },
      { icon: 'Briefcase', title: 'Professional Coordination', text: 'Smooth communication between families at every stage.' },
      { icon: 'HandHeart', title: 'Dedicated Customer Assistance', text: 'Timely follow-ups until you find the right alliance.' },
    ],
  },

  process: {
    title: 'Our Process',
    subtitle: 'How we assist you after you submit your enquiry.',
    steps: [
      { icon: 'Send', title: 'Submit Enquiry', text: 'Share your basic details and requirements through the enquiry form.' },
      { icon: 'PhoneCall', title: 'Our Consultation', text: 'Our team calls you to understand your family’s preferences.' },
      { icon: 'Search', title: 'Find Suitable Matches', text: 'We identify and shortlist alliances that suit your expectations.' },
      { icon: 'HeartHandshake', title: 'Coordination & Support', text: 'We coordinate between families until the alliance is finalised.' },
    ],
  },

  cta: {
    title: 'Start Your Marriage Journey with Us',
    description: 'Get personalized support from our experienced team.',
    button: 'Enquire Now',
  },

  enquiry: {
    title: 'Enquiry for More Details',
    subtitle: 'Fill in your details and our team will contact you shortly.',
    lookingForOptions: ['Bride', 'Groom', 'Matrimony Services', 'Other'],
    successMessage:
      'Thank you for contacting Kalyana Matrimony. Our team will get in touch with you shortly.',
    // Where enquiries are delivered: "server" (bundled Node backend), "web3forms" or "formspree".
    provider: env.VITE_ENQUIRY_PROVIDER || 'server',
    serverEndpoint: '/api/enquiry',
    web3formsAccessKey: env.VITE_WEB3FORMS_ACCESS_KEY || '',
    formspreeEndpoint: env.VITE_FORMSPREE_ENDPOINT || '',
    recipientEmail: 'info@kalyanamatrimony.in',
  },

  copyright: '© 2026 Kalyana Matrimony. All Rights Reserved.',
};

export const whatsappLink = () =>
  `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
    businessConfig.contact.whatsappMessage
  )}`;
