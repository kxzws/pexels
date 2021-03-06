import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import logo from '../../assets/logo.svg';
import CONSTANTS from '../../utils/constants';
import './Header.scss';

const Header = () => {
  const currURL = useLocation();

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const { STICKY_VALUE, NOT_STICKY_VALUE } = CONSTANTS.HEADER;

    if (currURL.pathname === '/') {
      if (window.scrollY > STICKY_VALUE) {
        setIsSticky(true);
      }
      if (window.scrollY < NOT_STICKY_VALUE) {
        setIsSticky(false);
      }
    } else {
      setIsSticky(true);
    }
  }, [currURL.pathname]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <header className={`header ${isSticky ? 'header_sticky' : ''}`}>
      <Link to="/" className="header__link">
        <div className="logo-group">
          <img src={logo} alt="logo: Pexels" className="logo-img" />
          <p className="logo-text">Pexels</p>
        </div>
      </Link>
      <SearchInput />
    </header>
  );
};

export default Header;
