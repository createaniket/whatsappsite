import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { universities, mockGroupChats } from './mockData';
import { Users, MessageCircle, CheckCircle, Search } from 'lucide-react';

interface UniversitiesPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function UniversitiesPage({ searchQuery, setSearchQuery }: UniversitiesPageProps) {
  const [localSearch, setLocalSearch] = useState('');

  const getUniversityStats = (university: string) => {
    const groups = mockGroupChats.filter(group => group.university === university);
    const totalMembers = groups.reduce((sum, group) => sum + group.memberCount, 0);
    const verifiedGroups = groups.filter(group => group.isVerified).length;
    return {
      groupCount: groups.length,
      memberCount: totalMembers,
      verifiedCount: verifiedGroups
    };
  };

  const effectiveSearch = searchQuery || localSearch;
  const filteredUniversities = universities.filter(university =>
    university.toLowerCase().includes(effectiveSearch.toLowerCase())
  );

  const handleUniversityClick = (university: string) => {
    setSearchQuery(university);
    // In a real app, this would navigate to the home page with the university selected
    window.location.hash = 'browse';
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4 text-whatsapp-green">Partner Universities</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Official WhatsApp groups are available for students from these verified universities. 
          Each university has dedicated groups for different subjects and years.
        </p>

        {/* Local search for universities page */}
        {!searchQuery && (
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search universities..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 border-whatsapp-green/20 focus:border-whatsapp-green"
              />
            </div>
          </div>
        )}
      </div>

      {effectiveSearch && (
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            {filteredUniversities.length === 0 ? 'No universities found' :
             filteredUniversities.length === 1 ? '1 university found' :
             `${filteredUniversities.length} universities found`}
            {effectiveSearch && (
              <span> for <span className="font-medium text-whatsapp-green">"{effectiveSearch}"</span></span>
            )}
          </p>
        </div>
      )}

      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl mb-2">No universities found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms to find universities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map(university => {
            const stats = getUniversityStats(university);
            return (
              <Card 
                key={university} 
                className="hover:shadow-lg transition-all cursor-pointer border-whatsapp-green/10 hover:border-whatsapp-green/30"
                onClick={() => handleUniversityClick(university)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium line-clamp-2">{university}</h3>
                    <Badge className="bg-whatsapp-green text-white ml-2 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4 text-whatsapp-green" />
                        <span>WhatsApp Groups</span>
                      </div>
                      <span className="font-medium">{stats.groupCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-whatsapp-green" />
                        <span>Total Members</span>
                      </div>
                      <span className="font-medium">{stats.memberCount.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-whatsapp-green" />
                        <span>Verified Groups</span>
                      </div>
                      <span className="font-medium">{stats.verifiedCount}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-whatsapp-green text-center">
                      Click to view groups from this university
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