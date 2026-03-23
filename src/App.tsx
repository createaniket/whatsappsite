import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GroupListings } from './components/GroupListings';
import { UniversitiesPage } from './components/UniversitiesPage';
import { AboutPage } from './components/AboutPage';
// import { SignInPage } from './components/SignInPage';
// import { JoinNowPage } from './components/JoinNowPage';
import { getGroups } from "./api/groupApi";

type Page = 'home' | 'universities' | 'about' | 'signin' | 'join';

export default function App() {

  // ✅ IMPORTANT: always define type
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const groupListingsRef = useRef<HTMLDivElement | null>(null);

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

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const data = await getGroups();
        console.log("API response:", data);

        // ✅ SAFE SET
        setGroups(Array.isArray(data?.data) ? data.data : []);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // ✅ MAP DB → UI
  // const formattedGroups = groups.map((g: any) => ({
  //   id: g._id,
  //   name: g.displayLineMain || g.name,
  //   description: g.groupTypeDescription || "",
  //   university: g.university,
  //   subject: g.subject || "General",
  //   city: g.city || "",
  //   memberCount: g.memberCount || 0,
  //   platform: "WhatsApp",
  //   groupJoinUrl: g.groupJoinUrl,

  //   // ✅ dynamic tags
  //   tags: [
  //     g.city && `📍 ${g.city}`,
  //     g.university && `🎓 ${g.university}`,
  //     g.subject && `📘 ${g.subject}`
  //   ].filter(Boolean),

  //   // ✅ REQUIRED FOR UI TYPE
  //   isActive: true,
  //   createdAt: g.createdAt || new Date().toISOString(),

  //   // ✅ SAFE FALLBACKS
  //   isVerified: true,
  //   lastActive: "Recently",
  //   lastUpdated: g.updatedAt || new Date().toISOString(),
  //   memberCountType: "exact",
  //   dataSource: "admin_reported"
  // }));

  const formattedGroups = groups.map((g: any) => ({
    id: g._id,
    name: g.displayLineMain || g.name,
    description: g.groupTypeDescription || "",
    university: g.university,
    subject: g.subject || "General",
    city: g.city || "",
    memberCount: g.memberCount || 0,
  
    // ✅ FIX
    platform: "WhatsApp" as const,
  
    groupJoinUrl: g.groupJoinUrl,
  
    tags: [
      g.city && `📍 ${g.city}`,
      g.university && `🎓 ${g.university}`,
      g.subject && `📘 ${g.subject}`
    ].filter(Boolean),
  
    isActive: true,
    createdAt: g.createdAt || new Date().toISOString(),
  
    isVerified: true,
    lastActive: "Recently",
    lastUpdated: g.updatedAt || new Date().toISOString(),
  
    memberCountType: "exact" as const,
    dataSource: "admin_reported" as const
  }));

  // ✅ FILTER
  const filteredGroups = formattedGroups.filter((group: any) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      group.name?.toLowerCase().includes(q) ||
      group.description?.toLowerCase().includes(q) ||
      group.university?.toLowerCase().includes(q) ||
      group.subject?.toLowerCase().includes(q);

    const matchesUniversity =
      selectedUniversity === 'all' || group.university === selectedUniversity;

    const matchesSubject =
      selectedSubject === 'all' || group.subject === selectedSubject;

    return matchesSearch && matchesUniversity && matchesSubject;
  });

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

      // case 'signin':
      //   return <SignInPage />;

      // case 'join':
      //   return <JoinNowPage />;

      default:
        return (
          <>
            <Hero />

            <div ref={groupListingsRef}>
              {loading ? (
                <p className="text-center mt-10">Loading groups...</p>
              ) : (
                <GroupListings
                  groups={filteredGroups}
                  selectedUniversity={selectedUniversity}
                  setSelectedUniversity={setSelectedUniversity}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
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