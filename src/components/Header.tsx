import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Users, LogIn, Home, Search, X } from 'lucide-react';
import { universities, subjects } from './mockData';

// ✅ SAME TYPE as App.tsx
type Page = 'home' | 'universities' | 'about' | 'signin' | 'join';

// ✅ FIXED Props Type
type HeaderProps = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearchFocus?: () => void;
};

export function Header({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  onSearchFocus
}: HeaderProps) {

  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allSearchTerms: string[] = [...universities, ...subjects];

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allSearchTerms
        .filter(term =>
          term.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [searchQuery, allSearchTerms]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);

    if (currentPage !== 'home') {
      setCurrentPage('home');
    }

    onSearchFocus?.();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);

    if (currentPage !== 'home') {
      setCurrentPage('home');
    }

    onSearchFocus?.();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between mb-3">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-medium text-whatsapp-green">
              WhatsApp University
            </h1>
          </div>

          <div className="flex items-center space-x-2 opacity-0">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage('signin')}>
              <LogIn className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => setCurrentPage('join')} className="bg-whatsapp-green hover:bg-whatsapp-dark text-white">
              <Users className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-8 h-8 bg-whatsapp-green rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-medium text-whatsapp-green">
              WhatsApp University
            </h1>
          </div>

          <nav className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors ${
                currentPage === 'home'
                  ? 'text-whatsapp-green'
                  : 'text-muted-foreground hover:text-whatsapp-green'
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Browse Groups
            </button>

            <button
              onClick={() => setCurrentPage('universities')}
              className={`transition-colors ${
                currentPage === 'universities'
                  ? 'text-whatsapp-green'
                  : 'text-muted-foreground hover:text-whatsapp-green'
              }`}
            >
              Universities
            </button>

            <button
              onClick={() => setCurrentPage('about')}
              className={`transition-colors ${
                currentPage === 'about'
                  ? 'text-whatsapp-green'
                  : 'text-muted-foreground hover:text-whatsapp-green'
              }`}
            >
              About
            </button>
          </nav>

          <div className="flex items-center space-x-3 opacity-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage('signin')}
              className="border-whatsapp-green text-whatsapp-green hover:bg-whatsapp-green hover:text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>

            <Button
              size="sm"
              onClick={() => setCurrentPage('join')}
              className="bg-whatsapp-green hover:bg-whatsapp-dark text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Now
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mt-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />

              <Input
                ref={searchRef}
                type="text"
                placeholder="Search universities, subjects, or groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-12 py-3 text-lg border-2 border-whatsapp-green/20 focus:border-whatsapp-green rounded-full shadow-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg z-50">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center"
                >
                  <Search className="w-4 h-4 mr-3" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}