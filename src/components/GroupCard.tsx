import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { GroupChat } from './mockData';
import { MessageCircle, CheckCircle, Shield, Calendar } from 'lucide-react';

interface GroupCardProps {
  group: GroupChat;
}

export function GroupCard({ group }: GroupCardProps) {
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinGroup = () => {
    setHasJoined(true);
    // In a real app, this would open WhatsApp with the group link
    window.open(`https://chat.whatsapp.com/invite/${group.id}`, '_blank');
  };

  const getPlatformIcon = () => {
    if (group.platform === 'WhatsApp') {
      return (
        <div className="flex items-center bg-whatsapp-green text-white px-2 py-1 rounded-full text-xs">
          <MessageCircle className="w-3 h-3 mr-1" />
          WhatsApp
        </div>
      );
    }
    return (
      <Badge variant="secondary" className="text-xs">
        {group.platform}
      </Badge>
    );
  };

  // const getMemberCountDisplay = () => {
  //   switch (group.memberCountType) {
  //     case 'exact':
  //       return `${group.memberCount} members`;
  //     case 'estimated':
  //       return `~${group.memberCount} members`;
  //     case 'range':
  //       return group.memberRange 
  //         ? `${group.memberRange.min}-${group.memberRange.max} members`
  //         : `~${group.memberCount} members`;
  //     default:
  //       return `${group.memberCount} members`;
  //   }
  // };

  // const getDataSourceInfo = () => {
  //   switch (group.dataSource) {
  //     case 'university_system':
  //       return {
  //         label: 'University System',
  //         description: 'Member count automatically synced from university records',
  //         icon: <Shield className="w-3 h-3" />,
  //         color: 'text-green-600'
  //       };
  //     case 'admin_reported':
  //       return {
  //         label: 'Admin Reported',
  //         description: 'Member count reported by group administrators',
  //         icon: <Users className="w-3 h-3" />,
  //         color: 'text-blue-600'
  //       };
  //     case 'self_reported':
  //       return {
  //         label: 'Self Reported',
  //         description: 'Member count self-reported by group creators',
  //         icon: <Info className="w-3 h-3" />,
  //         color: 'text-orange-600'
  //       };
  //     case 'estimated':
  //       return {
  //         label: 'Estimated',
  //         description: 'Member count estimated based on group activity and engagement',
  //         icon: <AlertCircle className="w-3 h-3" />,
  //         color: 'text-gray-600'
  //       };
  //     default:
  //       return {
  //         label: 'Unknown',
  //         description: 'Data source not specified',
  //         icon: <AlertCircle className="w-3 h-3" />,
  //         color: 'text-gray-600'
  //       };
  //   }
  // };

  // const dataSourceInfo = getDataSourceInfo();
  const isDataFresh = new Date(group.lastUpdated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Within 7 days

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:border-whatsapp-green/30 bg-gradient-to-br from-white to-whatsapp-light/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <h3 className="font-medium line-clamp-2 mr-2">{group.name}</h3>
              {group.isVerified && (
                <CheckCircle className="w-4 h-4 text-whatsapp-green flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{group.university}</p>
          </div>
          {getPlatformIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 text-blue-600">
          {group.description}
        </p>
        
        {/* <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{getMemberCountDisplay()}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className={`${dataSourceInfo.color} ml-1`}>
                    {dataSourceInfo.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="text-xs">
                    <div className="font-medium mb-1">{dataSourceInfo.label}</div>
                    <div>{dataSourceInfo.description}</div>
                    <div className="mt-1 text-gray-500">
                      Updated: {new Date(group.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{group.lastActive}</span>
          </div>
        </div> */}

        {/* Data freshness indicator */}
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          <span>
            Data {isDataFresh ? 'updated' : 'last updated'} {new Date(group.lastUpdated).toLocaleDateString()}
          </span>
          {!isDataFresh && (
            <span className="ml-1 text-orange-600">(may be outdated)</span>
          )}
        </div>
        
        {group.isVerified && (
          <div className="flex items-center mb-3 p-2 bg-whatsapp-green/10 rounded-lg">
            <Shield className="w-4 h-4 text-whatsapp-green mr-2" />
            <span className="text-sm text-whatsapp-green">Verified</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1">
          {group.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {group.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{group.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3">
        <Button 
          onClick={handleJoinGroup}
          disabled={hasJoined}
          className={`w-full ${hasJoined ? 'bg-gray-200 text-gray-600' : 'bg-whatsapp-green hover:bg-whatsapp-dark text-white'}`}
        >
          {hasJoined ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Joined via WhatsApp
            </>
          ) : (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Join WhatsApp Group
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}