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
}

export const mockGroupChats: GroupChat[] = [
  {
    id: '1',
    name: 'Oxford CompSci 2025 🎓',
    description: 'Official WhatsApp group for Computer Science students starting at Oxford in 2025. Share resources, ask questions, and connect with your cohort!',
    university: 'University of Oxford',
    subject: 'Computer Science',
    memberCount: 156,
    memberCountType: 'admin_reported',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Programming', 'Study Group', 'Official'],
    createdAt: '2024-09-15',
    isVerified: true,
    lastActive: '2 min ago',
    dataSource: 'university_system',
    lastUpdated: '2024-12-18',
    adminContact: 'cs-admin@ox.ac.uk',
    city: 'Oxford',
    updatedAt: '2024-12-18'

  },
  {
    id: '2',
    name: 'Cambridge Medicine Year 1 💊',
    description: 'Verified WhatsApp group for Year 1 Medicine students at Cambridge. Study tips, exam prep, and peer support from fellow medics.',
    university: 'University of Cambridge',
    subject: 'Medicine',
    memberCount: 89,
    memberCountType: 'admin_reported',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Medicine', 'Study Group', 'Verified'],
    createdAt: '2024-08-20',
    isVerified: true,
    lastActive: '5 min ago',
    dataSource: 'admin_reported',
    lastUpdated: '2024-12-17',
    adminContact: 'medicine@cam.ac.uk',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '3',
    name: 'Imperial Engineering Freshers 🔧',
    description: 'Official WhatsApp welcome group for new Engineering students at Imperial College London. Get tips from seniors and meet your cohort!',
    university: 'Imperial College London',
    subject: 'Engineering',
    memberCount: 200,
    memberCountType: 'estimated',
    memberRange: { min: 180, max: 250 },
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Freshers', 'Engineering', 'Official'],
    createdAt: '2024-09-01',
    isVerified: true,
    lastActive: '1 min ago',
    dataSource: 'estimated',
    lastUpdated: '2024-12-15',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '4',
    name: 'LSE Economics Students 📊',
    description: 'WhatsApp group for Economics students at LSE. Share articles, discuss theories, and network with fellow economists.',
    university: 'London School of Economics',
    subject: 'Economics',
    memberCount: 178,
    memberCountType: 'admin_reported',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Economics', 'Discussion', 'Networking'],
    createdAt: '2024-07-10',
    isVerified: true,
    lastActive: '3 min ago',
    dataSource: 'admin_reported',
    lastUpdated: '2024-12-18',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '5',
    name: 'UCL Psychology Support 🧠',
    description: 'Verified WhatsApp group for Psychology students at UCL. Share study resources, discuss course content, and support each other.',
    university: 'University College London',
    subject: 'Psychology',
    memberCount: 120,
    memberCountType: 'range',
    memberRange: { min: 100, max: 140 },
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Psychology', 'Support', 'Verified'],
    createdAt: '2024-09-05',
    isVerified: true,
    lastActive: '7 min ago',
    dataSource: 'self_reported',
    lastUpdated: '2024-12-10',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '6',
    name: 'Edinburgh Law Society ⚖️',
    description: 'Official WhatsApp group for Law students at University of Edinburgh. Case discussions, study groups, and social events.',
    university: 'University of Edinburgh',
    subject: 'Law',
    memberCount: 67,
    memberCountType: 'exact',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Law', 'Study Group', 'Official'],
    createdAt: '2024-08-15',
    isVerified: true,
    lastActive: '12 min ago',
    dataSource: 'university_system',
    lastUpdated: '2024-12-18',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '7',
    name: 'Manchester Business Network 💼',
    description: 'WhatsApp group for Business students at University of Manchester. Project partnerships, career discussions, and networking.',
    university: 'University of Manchester',
    subject: 'Business',
    memberCount: 145,
    memberCountType: 'estimated',
    memberRange: { min: 130, max: 160 },
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Business', 'Networking', 'Career'],
    createdAt: '2024-09-10',
    isVerified: true,
    lastActive: '4 min ago',
    dataSource: 'estimated',
    lastUpdated: '2024-12-12',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '8',
    name: 'Bristol Physics Undergrads 🔬',
    description: 'WhatsApp community for Physics undergraduates at Bristol. Problem-solving sessions, lab discussions, and study support.',
    university: 'University of Bristol',
    subject: 'Physics',
    memberCount: 78,
    memberCountType: 'admin_reported',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Physics', 'Problem Solving', 'Labs'],
    createdAt: '2024-08-25',
    isVerified: true,
    lastActive: '15 min ago',
    dataSource: 'admin_reported',
    lastUpdated: '2024-12-16',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '9',
    name: 'Warwick Maths Society 📐',
    description: 'Official WhatsApp group for Mathematics students at Warwick. Share solutions, discuss theorems, and organize study sessions.',
    university: 'University of Warwick',
    subject: 'Mathematics',
    memberCount: 110,
    memberCountType: 'range',
    memberRange: { min: 95, max: 125 },
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Mathematics', 'Study Sessions', 'Official'],
    createdAt: '2024-09-20',
    isVerified: true,
    lastActive: '8 min ago',
    dataSource: 'self_reported',
    lastUpdated: '2024-12-14',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '10',
    name: 'King\'s Literature Forum 📚',
    description: 'WhatsApp group for English Literature students at King\'s College London. Text discussions, interpretations, and book recommendations.',
    university: 'King\'s College London',
    subject: 'English Literature',
    memberCount: 93,
    memberCountType: 'exact',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Literature', 'Discussion', 'Books'],
    createdAt: '2024-08-30',
    isVerified: true,
    lastActive: '6 min ago',
    dataSource: 'university_system',
    lastUpdated: '2024-12-18',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '11',
    name: 'Oxford History Society 🏛️',
    description: 'Official WhatsApp group for History students at Oxford. Research discussions, essay help, and academic networking.',
    university: 'University of Oxford',
    subject: 'History',
    memberCount: 85,
    memberCountType: 'estimated',
    memberRange: { min: 75, max: 95 },
    isActive: true,
    platform: 'WhatsApp',
    tags: ['History', 'Research', 'Official'],
    createdAt: '2024-09-12',
    isVerified: true,
    lastActive: '11 min ago',
    dataSource: 'estimated',
    lastUpdated: '2024-12-13',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  },
  {
    id: '12',
    name: 'Cambridge Natural Sciences 🧪',
    description: 'Verified WhatsApp group for Natural Sciences students at Cambridge. Cross-disciplinary discussions and study support.',
    university: 'University of Cambridge',
    subject: 'Natural Sciences',
    memberCount: 203,
    memberCountType: 'admin_reported',
    isActive: true,
    platform: 'WhatsApp',
    tags: ['Sciences', 'Cross-disciplinary', 'Verified'],
    createdAt: '2024-08-28',
    isVerified: true,
    lastActive: '9 min ago',
    dataSource: 'admin_reported',
    lastUpdated: '2024-12-17',
        city: 'Oxford',
    updatedAt: '2024-12-18'
  }
];

export const universities = [
  'University of Oxford',
  'University of Cambridge', 
  'Imperial College London',
  'London School of Economics',
  'University College London',
  'University of Edinburgh',
  'University of Manchester',
  'University of Bristol',
  'University of Warwick',
  'King\'s College London'
];

export const subjects = [
  'Computer Science',
  'Medicine',
  'Engineering', 
  'Economics',
  'Psychology',
  'Law',
  'Business',
  'Physics',
  'Mathematics',
  'English Literature',
  'History',
  'Natural Sciences'
];


// ❌ static export hata de
// export const mockGroupChats = [...]



export const fetchMockData = async () => {
  const [groupsRes, filtersRes] = await Promise.all([
    getGroups(),
    getFilters(),
  ]);

  console.log("Groups API kkk:", groupsRes);
  return {
    mockGroupChats: groupsRes?.data || [],
    universities: filtersRes?.universities || [],
    subjects: filtersRes?.subjects || [],
  };
};