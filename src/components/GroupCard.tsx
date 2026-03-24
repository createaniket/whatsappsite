import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { GroupChat } from "./mockData";
import { MessageCircle, CheckCircle, Shield, Calendar } from "lucide-react";

interface GroupCardProps {
  group: GroupChat;
}

export function GroupCard({ group }: GroupCardProps) {
  const [hasJoined, setHasJoined] = useState(false);

  const desc = group.description?.trim();

  const isNumeric = /^\d+$/.test(desc);
  const isMainGroup = desc === "Main Group";

  let text = group.subject;
  let color = "text-blue-600";

  if (desc) {
    if (isNumeric) {
      text = group.subject;
      color = "text-orange-500";
    } else if (isMainGroup) {
      text = desc;
      color = "text-green-600";
    } else {
      text = desc;
      color = "text-blue-600";
    }
  }

  const handleJoinGroup = () => {
    setHasJoined(true);
    // In a real app, this would open WhatsApp with the group link
    window.open(`https://chat.whatsapp.com/invite/${group.id}`, "_blank");
  };

  const getPlatformIcon = () => {
    if (group.platform === "WhatsApp") {
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

  // const dataSourceInfo = getDataSourceInfo();
  const isDataFresh =
    new Date(group.lastUpdated) >
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // Within 7 days

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
        <p className={`text-sm mb-4 line-clamp-3 ${color}`}>{text}</p>

        {/* Data freshness indicator */}
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          <span>
            Data {isDataFresh ? "updated" : "last updated"}{" "}
            {new Date(group.updatedAt).toLocaleDateString()}
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

        {/* <div className="flex flex-wrap gap-1">
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
        </div> */}

        <div className="flex flex-wrap gap-2">
          {group.city && (
            <Badge variant="secondary" className="text-xs">
              📍 {group.city}
            </Badge>
          )}

          {group.subject && (
            <Badge variant="secondary" className="text-xs">
              🎓 {group.subject}
            </Badge>
          )}

          {group.university && (
            <Badge variant="secondary" className="text-xs">
              🏫 {group.university}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          onClick={handleJoinGroup}
          disabled={hasJoined}
          className={`w-full ${
            hasJoined
              ? "bg-gray-200 text-gray-600"
              : "bg-whatsapp-green hover:bg-whatsapp-dark text-white"
          }`}
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
