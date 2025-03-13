import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const footerLinks = [
    {
      title: t('footer.about'),
      links: [
        { text: t('footer.about'), href: '/about' },
        { text: t('footer.contact'), href: '/contact' },
        { text: t('footer.terms'), href: '/terms' },
        { text: t('footer.privacy'), href: '/privacy' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms of Service', href: '/terms' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Cookie Policy', href: '/cookies' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'Careers', href: '/careers' },
        { text: 'Press', href: '/press' },
        { text: 'Advertising', href: '/advertising' },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Music App
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {t('footer.copyright')}
            </p>
            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                >
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 