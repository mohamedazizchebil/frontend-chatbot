// app/layout.js
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aidea Bot',
  description: 'Dashboard Aidea',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> 
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-blue-600 border-t mt-20 py-6 text-center text-sm text-white">
          © {new Date().getFullYear()} Aidea Bot · Tous droits réservés.
        </footer>
      </body>
    </html>
  );
}
