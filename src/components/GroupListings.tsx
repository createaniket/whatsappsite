import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { GroupCard } from './GroupCard';
import { DataPrivacyInfo } from './DataPrivacyInfo';
import { GroupChat } from './mockData';
import { universities, subjects } from './mockData';
import { Filter, Search, X } from 'lucide-react';

interface GroupListingsProps {
  groups: GroupChat[];
  selectedUniversity: string;
  setSelectedUniversity: (university: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function GroupListings({ 
  groups, 
  selectedUniversity, 
  setSelectedUniversity,
  selectedSubject,
  setSelectedSubject,
  searchQuery,
  setSearchQuery
}: GroupListingsProps) {

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // ✅ FIX: memoize karo
  const allSearchTerms = useMemo(() => {
    return [...universities, ...subjects];
  }, []);

  const hasActiveFilters =
    selectedUniversity !== 'all' ||
    selectedSubject !== 'all' ||
    searchQuery.length > 0;

  // Sync with parent search
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // ✅ Suggestions logic (no warning now)
  useEffect(() => {
    if (localSearchQuery.length > 0) {
      const filtered = allSearchTerms
        .filter(term =>
          term.toLowerCase().includes(localSearchQuery.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [localSearchQuery, allSearchTerms]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    setShowSuggestions(false);
  };

  const handleSearchChange = (value: string) => {
    setLocalSearchQuery(value);
    setSearchQuery(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchQuery(suggestion);
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  const clearAllFilters = () => {
    setSelectedUniversity('all');
    setSelectedSubject('all');
    setLocalSearchQuery('');
    setSearchQuery('');
  };

  
  return (
    <section className="py-12 md:py-16 bg-background" id="browse">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl text-whatsapp-green">Find Your University Groups</h2>
            <DataPrivacyInfo />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {searchQuery ? (
              <>
                Search results for <span className="font-medium text-whatsapp-green">"{searchQuery}"</span>
              </>
            ) : (
              'Browse verified WhatsApp groups by university and subject'
            )}
          </p>

          {/* Large Green Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white w-6 h-6" />
                <Input
                  ref={searchRef}
                  type="text"
                  placeholder="Search universities, subjects, or groups..."
                  value={localSearchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => localSearchQuery.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-16 pr-16 py-6 text-xl bg-whatsapp-green text-white placeholder-white/80 border-0 rounded-2xl shadow-lg focus:shadow-xl transition-shadow focus:ring-4 focus:ring-whatsapp-green/30 focus:ring-offset-2"
                />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>
            </form>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-whatsapp-green/20 rounded-lg shadow-lg z-50">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-6 py-4 hover:bg-whatsapp-green/5 transition-colors border-b border-gray-100 last:border-b-0 flex items-center"
                  >
                    <Search className="w-5 h-5 mr-3 text-whatsapp-green" />
                    <span className="text-lg">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Quick Search Tags */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {['Oxford', 'Cambridge', 'Computer Science', 'Medicine', 'Engineering', 'Business'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSuggestionClick(tag)}
                  className="px-4 py-2 text-sm bg-whatsapp-green/10 text-whatsapp-green rounded-full hover:bg-whatsapp-green/20 transition-colors border border-whatsapp-green/20"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="bg-whatsapp-green/10 text-whatsapp-green">
                <Search className="w-3 h-3 mr-1" />
                Search: {searchQuery}
              </Badge>
            )}
            {selectedUniversity !== 'all' && (
              <Badge variant="secondary" className="bg-whatsapp-green/10 text-whatsapp-green">
                University: {selectedUniversity}
                <button 
                  onClick={() => setSelectedUniversity('all')}
                  className="ml-1 hover:bg-whatsapp-green/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedSubject !== 'all' && (
              <Badge variant="secondary" className="bg-whatsapp-green/10 text-whatsapp-green">
                Subject: {selectedSubject}
                <button 
                  onClick={() => setSelectedSubject('all')}
                  className="ml-1 hover:bg-whatsapp-green/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            <button 
              onClick={clearAllFilters}
              className="text-sm text-muted-foreground hover:text-whatsapp-green transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h3 className="text-xl mb-2">Available Groups</h3>
            <p className="text-muted-foreground">
              {groups.length === 0 ? 'No groups found' : 
               groups.length === 1 ? '1 group found' : 
               `${groups.length} groups found`}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Member counts updated regularly through university partnerships and admin reports
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-48 border-whatsapp-green/20 focus:border-whatsapp-green">
                <SelectValue placeholder="All Universities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map(university => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-48 border-whatsapp-green/20 focus:border-whatsapp-green">
                <SelectValue placeholder="All Subjects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl mb-2">No groups found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find more groups.
            </p>
            {hasActiveFilters && (
              <button 
                onClick={clearAllFilters}
                className="text-whatsapp-green hover:text-whatsapp-dark transition-colors"
              >
                Clear all filters and show all groups
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}

        {/* Popular searches if no search query */}
        {!searchQuery && groups.length > 0 && (
          <div className="mt-12 text-center">
            <h4 className="text-lg mb-4 text-muted-foreground">Popular searches</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Computer Science', 'Medicine', 'Engineering', 'Business', 'Law', 'Psychology'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSuggestionClick(term)}
                  className="px-4 py-2 text-sm bg-whatsapp-green/5 text-whatsapp-green rounded-full hover:bg-whatsapp-green/10 transition-colors border border-whatsapp-green/20"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}