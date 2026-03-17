import React, { useState, useRef } from 'react';
import {Header} from './components/Header';
import {Hero} from './components/Hero';
import {GroupListings} from './components/GroupListings';
import {UniversitiesPage} from './components/UniversitiesPage';
import {AboutPage} from './components/AboutPage';
import {SignInPage} from './components/SignInPage';
import {JoinNowPage} from './components/JoinNowPage';
import { mockGroupChats } from './components/mockData';

type Page = 'home' | 'universities' | 'about' | 'signin' | 'join';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const groupListingsRef = useRef<HTMLDivElement | null>(null);

  const filteredGroups = mockGroupChats.filter((group: any) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUniversity =
      selectedUniversity === 'all' || group.university === selectedUniversity;

    const matchesSubject =
      selectedSubject === 'all' || group.subject === selectedSubject;

    return matchesSearch && matchesUniversity && matchesSubject;
  });

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
      case 'signin':
        return <SignInPage />;
      case 'join':
        return <JoinNowPage />;
      default:
        return (
          <>
            <Hero />
            <div ref={groupListingsRef}>
              <GroupListings
                groups={filteredGroups}
                selectedUniversity={selectedUniversity}
                setSelectedUniversity={setSelectedUniversity}
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
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