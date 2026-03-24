import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GroupListings } from './components/GroupListings';
import { UniversitiesPage } from './components/UniversitiesPage';
import { AboutPage } from './components/AboutPage';

import { getGroups, getFilters } from './api/groupApi';

type Page = 'home' | 'universities' | 'about' | 'signin' | 'join';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const [groups, setGroups] = useState<any[]>([]);
  const [universities, setUniversities] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const groupListingsRef = useRef<HTMLDivElement | null>(null);

  // ✅ FILTERS LOAD
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await getFilters();
        setUniversities(res?.universities || []);
        setSubjects(res?.subjects || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilters();
  }, []);

  // ✅ GROUPS FETCH (MAIN FIX)
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        setLoading(true);

        const params: any = {};

        if (searchQuery) params.search = searchQuery;
        if (selectedUniversity !== 'all') params.university = selectedUniversity;
        if (selectedSubject !== 'all') params.subject = selectedSubject;

        const res = await getGroups(params);

        setGroups(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchQuery, selectedUniversity, selectedSubject]);

  const handleSearchFocus = () => {
    if (currentPage === 'home' && groupListingsRef.current) {
      setTimeout(() => {
        groupListingsRef.current?.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'universities':
        return (
          <UniversitiesPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );

      case 'about':
        return <AboutPage />;

      default:
        return (
          <>
            <Hero />

            <div ref={groupListingsRef}>
              {loading ? (
                <div className="text-center py-10 text-lg font-medium">
                  Loading groups...
                </div>
              ) : (
                <GroupListings
                  groups={groups}
                  selectedUniversity={selectedUniversity}
                  setSelectedUniversity={setSelectedUniversity}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  universities={universities}
                  subjects={subjects}
                />
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchFocus={handleSearchFocus}
      />

      {renderPage()}
    </div>
  );
}