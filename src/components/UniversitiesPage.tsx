import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Users, MessageCircle, CheckCircle, Search } from 'lucide-react';
import { getUniversityCounts } from '../api/groupApi';

interface UniversitiesPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  groups: any[];
  universities: string[];
  setCurrentPage: (page: any) => void;
}

export function UniversitiesPage({
  searchQuery,
  setSearchQuery,
  groups,
  universities,
  setCurrentPage
}: UniversitiesPageProps) {

  const [localSearch, setLocalSearch] = useState('');
  const [counts, setCounts] = useState<any[]>([]);

  // ✅ FETCH COUNTS
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getUniversityCounts();
        setCounts(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  // ✅ COUNT FROM API
  const getCount = (university: string) => {
    const found = counts.find(c => c.university === university);
    return found ? found.count : 0;
  };

  // ✅ MEMBER + VERIFIED
  const getUniversityStats = (university: string) => {
    const filteredGroups = groups.filter(
      group => group.university === university
    );

    return {
      memberCount: filteredGroups.reduce(
        (sum, group) => sum + (group.memberCount || 0),
        0
      ),
      verifiedCount: filteredGroups.filter(g => g.isVerified).length
    };
  };

  const effectiveSearch = searchQuery || localSearch;

  const filteredUniversities = universities.filter(university =>
    university.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  // ✅ CLEAN CLICK HANDLER (ONLY ONE)
  const handleUniversityClick = (university: string) => {
    setSearchQuery(university);
    setCurrentPage('home'); // 👈 IMPORTANT
  };

  return (
    <div className="container mx-auto px-4 py-16">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4 text-whatsapp-green">
          Partner Universities
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Official WhatsApp groups are available for students from these verified universities.
        </p>

        {!searchQuery && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              <Input
                placeholder="Search universities..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>

      {/* RESULT COUNT */}
      {effectiveSearch && (
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            {filteredUniversities.length === 0
              ? 'No universities found'
              : filteredUniversities.length === 1
              ? '1 university found'
              : `${filteredUniversities.length} universities found`}
            <span> for "<span className="text-whatsapp-green">{effectiveSearch}</span>"</span>
          </p>
        </div>
      )}

      {/* EMPTY */}
      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
          <h3>No universities found</h3>
        </div>
      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredUniversities.map(university => {
            const stats = getUniversityStats(university);

            return (
              <Card
                key={university}
                onClick={() => handleUniversityClick(university)}
                className="cursor-pointer hover:shadow-lg"
              >

                <CardHeader>
                  <div className="flex justify-between">
                    <h3>{university}</h3>
                    <Badge className="bg-whatsapp-green text-white">
                      Verified
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">

                    {/* ✅ API COUNT */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp Groups</span>
                      </div>
                      <span className="font-medium">
                        {getCount(university)}
                      </span>
                    </div>

                    {/* MEMBERS */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Total Members</span>
                      </div>
                      <span className="font-medium">
                        {stats.memberCount.toLocaleString()}
                      </span>
                    </div>

                    {/* VERIFIED */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified Groups</span>
                      </div>
                      <span className="font-medium">
                        {stats.verifiedCount}
                      </span>
                    </div>

                  </div>

                  {/* 👇 NO CLICK HERE NOW */}
                  <div className="mt-4 pt-3 border-t">
                    <p className="text-xs text-whatsapp-green text-center">
                      Click to view groups
                    </p>
                  </div>

                </CardContent>

              </Card>
            );
          })}

        </div>
      )}
    </div>
  );
}