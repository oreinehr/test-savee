'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { Film, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Img from '../../../top-movies/public/logo.png';
import { ThemeToggle } from './ThemeToggle';
import useScrollDirection from './useScrollDirection';

export function Header() {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsVisible(false);
    } else if (scrollDirection === 'up') {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  return (
    <div
      className={`bg-transparent fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link href="/" className="text-primary">
        <Image
          src={Img}
          alt="Logo"
          width={120}
          height={100}
          className="w-32 h-32 object-contain"
        />
      </Link>

      <nav className="flex items-center space-x-6">
        <Link
          href="/movies"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Film className="w-6 h-6" />
        </Link>
        <Link
          href="/watchlist"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Clock className="w-6 h-6" />
        </Link>
        <ThemeToggle />
      </nav>
    </div>
  );
}
