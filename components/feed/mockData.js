import * as Icons from "@/components/ui/CustomIcons";

export const notifications = [
  {
    id: 1,
    image: "/assets/images/friend-req.png",
    text: "posted a link in your timeline.",
    name: "Steve Jobs",
    time: "42 minutes ago",
  },
  {
    id: 2,
    image: "/assets/images/profile-1.png",
    text: "An admin changed the name of the group Freelacer usa to Freelacer usa",
    time: "42 minutes ago",
  },
  {
    id: 3,
    image: "/assets/images/friend-req.png",
    text: "posted a link in your timeline.",
    name: "Steve Jobs",
    time: "42 minutes ago",
  },
  {
    id: 4,
    image: "/assets/images/profile-1.png",
    text: "An admin changed the name of the group Freelacer usa to Freelacer usa",
    time: "42 minutes ago",
  },
];

export const posts = [
  {
    id: 1,
    author: { name: "Karim Saif", avatar: "/assets/images/post_img.png" },
    time: "5 minute ago",
    title: "-Healthy Tracking App",
    image: "/assets/images/timeline_img.png",
    reactions: {
      count: 9,
      users: [
        "/assets/images/react_img1.png",
        "/assets/images/react_img2.png",
        "/assets/images/react_img3.png",
        "/assets/images/react_img4.png",
        "/assets/images/react_img5.png",
      ],
    },
    comments: 12,
    shares: 122,
  },
  {
    id: 2,
    author: { name: "Karim Saif", avatar: "/assets/images/post_img.png" },
    time: "5 minute ago",
    title: "-Healthy Tracking App",
    image: "/assets/images/timeline_img.png",
    reactions: {
      count: 9,
      users: [
        "/assets/images/react_img1.png",
        "/assets/images/react_img2.png",
        "/assets/images/react_img3.png",
        "/assets/images/react_img4.png",
        "/assets/images/react_img5.png",
      ],
    },
    comments: 12,
    shares: 122,
  },
];

export const suggestedPeople = [
  {
    id: 1,
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatar: "/assets/images/people1.png",
  },
  {
    id: 2,
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatar: "/assets/images/people2.png",
  },
  {
    id: 3,
    name: "Dylan Field",
    role: "CEO of Figma",
    avatar: "/assets/images/people3.png",
  },
];

export const friends = [
  {
    id: 1,
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatar: "/assets/images/people1.png",
    lastActive: "5 minute ago",
  },
  {
    id: 2,
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatar: "/assets/images/people2.png",
    isOnline: true,
  },
  {
    id: 3,
    name: "Dylan Field",
    role: "CEO of Figma",
    avatar: "/assets/images/people3.png",
    isOnline: true,
  },
  {
    id: 4,
    name: "Steve Jobs",
    role: "CEO of Apple",
    avatar: "/assets/images/people1.png",
    lastActive: "5 minute ago",
  },
  {
    id: 5,
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    avatar: "/assets/images/people2.png",
    isOnline: true,
  },
  {
    id: 6,
    name: "Dylan Field",
    role: "CEO of Figma",
    avatar: "/assets/images/people3.png",
    isOnline: true,
  },
];

export const youMightLike = [
  {
    id: 1,
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    avatar: "/assets/images/Avatar.png",
  },
];

export const events = [
  {
    id: 1,
    date: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    peopleGoing: 17,
  },
  {
    id: 2,
    date: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    peopleGoing: 17,
  },
];

export const exploreItems = [
  {
    name: "Learning",
    icon: Icons.Explore,
    hasBadge: true,
    badgeText: "New",
    href: "#",
  },
  { name: "Insights", icon: Icons.Insights, href: "#" },
  { name: "Find friends", icon: Icons.FindFriends, href: "/find-friends.html" },
  { name: "Bookmarks", icon: Icons.Bookmarks, href: "#" },
  { name: "Group", icon: Icons.Group, href: "/group.html" },
  {
    name: "Gaming",
    icon: Icons.Gaming,
    hasBadge: true,
    badgeText: "New",
    href: "#",
  },
  { name: "Settings", icon: Icons.Settings, href: "#" },
  { name: "Save post", icon: Icons.Save, href: "#" },
];

