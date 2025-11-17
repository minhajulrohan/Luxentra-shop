import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Truck, Shield, Headphones, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-primary">Luxentra</span> Shop
            </h3>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                  <Star className="w-5 h-5 fill-primary/50 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold">Trustscore 4.5 | 9,200 reviews</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacypolicy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/termsconditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shipping services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Ship a package
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Track a package
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Domestic shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  International shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Bulk shipping
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Couriers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customers</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-colors">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Email: support@luxentra-shop.xyz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">SHIPPING TO</p>
                <p className="text-xs text-muted-foreground">OVER 200 COUNTRIES</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">100% SECURE</p>
                <p className="text-xs text-muted-foreground">CHECKOUT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Headphones className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">OUTSTANDING</p>
                <p className="text-xs text-muted-foreground">WORLDWIDE SUPPORT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">OVER 9,000</p>
                <p className="text-xs text-muted-foreground">GENUINE REVIEWS</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Copyright © 2022-2025 | All Rights Reserved</p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
