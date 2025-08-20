'use client';

import SocialIcon from './SocialIcon';

interface SocialLinksProps {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  threads?: string;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
}

export default function SocialLinks({
  facebook,
  instagram,
  twitter,
  youtube,
  linkedin,
  threads,
  className = '',
  iconSize = 'md'
}: SocialLinksProps) {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {facebook && (
        <SocialIcon platform="facebook" href={facebook} size={iconSize} />
      )}
      {instagram && (
        <SocialIcon platform="instagram" href={instagram} size={iconSize} />
      )}
      {twitter && (
        <SocialIcon platform="twitter" href={twitter} size={iconSize} />
      )}
      {youtube && (
        <SocialIcon platform="youtube" href={youtube} size={iconSize} />
      )}
      {linkedin && (
        <SocialIcon platform="linkedin" href={linkedin} size={iconSize} />
      )}
      {threads && (
        <SocialIcon platform="threads" href={threads} size={iconSize} />
      )}
    </div>
  );
}