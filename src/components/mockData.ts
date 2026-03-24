import { getGroups, getFilters } from "../api/groupApi";

export interface GroupChat {
  id: string;
  name: string;
  description: string;
  university: string;
  subject: string;
  memberCount: number;
  memberCountType: 'exact' | 'estimated' | 'range' | 'admin_reported';
  memberRange?: { min: number; max: number };
  isActive: boolean;
  platform: 'WhatsApp' | 'Discord' | 'Telegram' | 'Facebook';
  tags: string[];
  createdAt: string;
  isVerified: boolean;
  lastActive: string;
  dataSource: 'admin_reported' | 'university_system' | 'self_reported' | 'estimated';
  lastUpdated: string;
  adminContact?: string;
  city: string;
  updatedAt: string;
  _id: string;
}

// ✅ empty initial
export let mockGroupChats: GroupChat[] = [];
export let universities: string[] = [];
export let subjects: string[] = [];

export const fetchMockData = async () => {
  try {
    const [groupsRes, filtersRes] = await Promise.all([
      getGroups(),
      getFilters(),
    ]);

    console.log("Groups API:", groupsRes);
    console.log("Filters API:", filtersRes);

    // ✅ yahi main fix hai
    mockGroupChats = groupsRes?.data || [];

    // ⚠️ IMPORTANT: filtersRes.data use kar
    universities = filtersRes?.data?.universities || [];
    subjects = filtersRes?.data?.subjects || [];

    return {
      mockGroupChats,
      universities,
      subjects,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    // fallback
    mockGroupChats = [];
    universities = [];
    subjects = [];

    return {
      mockGroupChats,
      universities,
      subjects,
    };
  }
};