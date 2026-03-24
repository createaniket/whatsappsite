import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GroupListings } from './components/GroupListings';
import { UniversitiesPage } from './components/UniversitiesPage';
import { AboutPage } from './components/AboutPage';
// import { SignInPage } from './components/SignInPage';
// import { JoinNowPage } from './components/JoinNowPage';

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

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [groupRes, filterRes] = await Promise.all([
          getGroups(),
          getFilters(),
        ]);

        console.log("Groups API:", groupRes);
        console.log("Filters API:", filterRes);

        setGroups(groupRes?.data || groupRes || []);
        setUniversities(filterRes?.universities || []);
        setSubjects(filterRes?.subjects || []);

      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ FILTER LOGIC
  const filteredGroups = groups.filter((group: any) => {
    const matchesSearch =
      group.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.university?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUniversity =
      selectedUniversity === 'all' || group.university === selectedUniversity;

    const matchesSubject =
      selectedSubject === 'all' || group.subject === selectedSubject;

    return matchesSearch && matchesUniversity && matchesSubject;
  });

  // ✅ SCROLL LOGIC
  const handleSearchFocus = () => {
    if (currentPage === 'home' && groupListingsRef.current) {
      setTimeout(() => {
        groupListingsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  };

  // ✅ PAGE RENDER
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
                  groups={filteredGroups}
                  selectedUniversity={selectedUniversity}
                  setSelectedUniversity={setSelectedUniversity}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  universities={universities}   // ✅ API filters
                  subjects={subjects}           // ✅ API filters
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