import { ArrowUpRight } from 'lucide-react';

type ContactButtonProps = {
  label?: string;
  href?: string;
};

export function ContactButton({ label = 'Contact me', href = '#contact' }: ContactButtonProps = {}) {
  return <a className="contact-button" href={href}>{label} <ArrowUpRight size={18} aria-hidden="true" /></a>;
}

export function StartButton() {
  return <a className="contact-button" href="#brand">Start <ArrowUpRight size={18} aria-hidden="true" /></a>;
}

export function LiveProjectButton() {
  return <button className="live-button" type="button">Live Project <ArrowUpRight size={16} aria-hidden="true" /></button>;
}
