import { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button.jsx';
import { ArrowBigRight, Menu, X } from 'lucide-react';
import { Link, useParams } from 'react-router-dom'; // Add this import
import { fetchApi } from '@/lib/api.js';
import { AuthContext } from '@/context/AuthContext.jsx';
import { DEFAULT_SHOP, verifySlug } from '@/lib/shop.js';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const { slug } = useParams();
  const { staffData, token } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      const shop = await verifySlug(slug);
      setSelectedShop(shop);
    };
    load();
  }, [slug]);

  const currentShop = selectedShop || DEFAULT_SHOP;
  
  const isLoggedIn = (staffData && token);

  return (
    <header className="bg-[#126280] p-4 text-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center px-4 md:px-10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <img src="/laundry-logo.jpg" alt="Laundry Shop" className="w-10 h-10 rounded-full" />
          <Link to={`/${currentShop?.slug}`} className="text-2xl font-bold hover:opacity-80">
            {currentShop?.shop_name || 'Laundry Shop'}
          </Link>
        </h1>

        <nav className="hidden md:flex justify-between items-center gap-10">
          <ul className="flex gap-6 font-semibold">
            <li>
              <Link to={currentShop ? `/${currentShop.slug}` : '/'} className="hover:underline">
                HOME
              </Link>
            </li>
            <li>
              <Link
                to={currentShop ? `/${currentShop.slug}/about` : '/about'}
                className="hover:underline"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link to={currentShop ? `/${currentShop.slug}/services` : '/services'} className="hover:underline">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to={currentShop ? `/${currentShop.slug}/prices` : '/prices'} className="hover:underline">
                PRICES
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <Link to={currentShop ? `/${currentShop.slug}/dashboard` : '/dashboard'}>
              <Button
                variant="outline"
                size="sm"
                className="text-black border-[#126280] hover:bg-white hover:text-[#126280]"
              >
                Back to Dashboard <ArrowBigRight />
              </Button>
            </Link>
          ) : (
            <Link to={currentShop ? `/${currentShop.slug}/login` : '/login'}>
              <Button
                variant="outline"
                size="sm"
                className="text-black border-[#126280] hover:bg-white hover:text-[#126280]"
              >
                LOGIN
              </Button>
            </Link>
          )}
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 px-4 bg-[#126280]">
          <ul className="flex flex-col gap-4 font-semibold mb-4">
            <li><Link to={currentShop ? `/${currentShop.slug}` : '/'} className="hover:underline">HOME</Link></li>
            <li><Link to={currentShop ? `/${currentShop.slug}/about` : '/about'} className="hover:underline">ABOUT</Link></li>
            <li><Link to={currentShop ? `/${currentShop.slug}/services` : '/services'} className="hover:underline">SERVICES</Link></li>
            <li><Link to={currentShop ? `/${currentShop.slug}/prices` : '/prices'} className="hover:underline">PRICES</Link></li>
          </ul>
          {isLoggedIn ? (
            <Link to={currentShop ? `/${currentShop.slug}/dashboard` : '/dashboard'}>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-black hover:bg-white hover:text-[#126280]"
              >
                Back to Dashboard<ArrowBigRight />
              </Button>
            </Link>
          ) : (
            <Link to={currentShop ? `/${currentShop.slug}/login` : '/login'} className="w-full">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-black hover:bg-white hover:text-[#126280]"
              >
                LOGIN
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;