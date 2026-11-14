import {
  BadgeCheck, Briefcase, ClipboardCheck, HandHeart, HeartHandshake, Headset, Home,
  Lock, LockKeyhole, MessagesSquare, PhoneCall, Search, Send, ShieldCheck, UserSearch, Users,
} from 'lucide-react';

// Maps icon names used in businessConfig to Lucide components
const icons = {
  BadgeCheck, Briefcase, ClipboardCheck, HandHeart, HeartHandshake, Headset, Home,
  Lock, LockKeyhole, MessagesSquare, PhoneCall, Search, Send, ShieldCheck, UserSearch, Users,
};

export default function Icon({ name, size = 28, strokeWidth = 1.5, ...props }) {
  const Component = icons[name] || HeartHandshake;
  return <Component size={size} strokeWidth={strokeWidth} aria-hidden="true" {...props} />;
}
