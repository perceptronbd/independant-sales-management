import {
  IconUserCircle,
  IconLayoutDashboard,
  IconNotes,
  IconSettings,
  IconFolder,
  IconUsers,
  IconBellCog,
  IconReportAnalytics,
  IconShoppingCart,
  IconChecklist,
  IconShoppingBag,
  IconUserPlus,
  IconGavel,
  IconGitBranch,
} from "@tabler/icons-react";

export const navlink = [
  {
    label: "Profile",
    icon: IconUserCircle,
    links: "/home/profile",
    roles: [
      "manager",
      "generator-leader",
      "generator",
      "prescriptor",
      "agent",
      "user",
    ],
  },
  // {
  //   label: "Dashboard",
  //   icon: IconLayoutDashboard,
  //   initiallyOpened: false,
  //   links: [
  //     { label: "CRM", link: "/home/crm", icon: IconTableAlias },
  //     {
  //       label: "Admin Contact",
  //       link: "/home/admin-contact",
  //       icon: IconAddressBook,
  //     },
  //   ],
  //   roles: [
  //     "manager",
  //     "generator-leader",
  //     "generator",
  //     "prescriptor",
  //     "agent",
  //     "user",
  //   ],
  // },
  {
    label: "Dashboard",
    icon: IconLayoutDashboard,
    links: [
      // { label: "Members", link: "/home/members", icon: IconAffiliate },
      { label: "Check Out", link: "/home/check-out", icon: IconChecklist },
      { label: "Tree", link: "/home/tree", icon: IconGitBranch },
      {
        label: "Purchase Order",
        link: "/home/create-purchase-order",
        icon: IconShoppingCart,
      },
      { label: "Create User", link: "/home/create-user", icon: IconUserPlus },
    ],
    roles: ["manager", "generator-leader", "generator", "prescriptor", "agent"],
  },
  {
    label: "Reports & Analytics",
    icon: IconNotes,
    links: [
      { label: "Sales Report", link: "/home/sales", icon: IconReportAnalytics },
      {
        label: "Legals Agreements",
        link: "/home/legals-agreements",
        icon: IconGavel,
      },
    ],
    roles: ["manager", "generator-leader", "generator", "prescriptor"],
  },
  {
    label: "Documents",
    icon: IconFolder,
    links: "/home/shared-documents",

    roles: [
      "manager",
      "generator-leader",
      "generator",
      "prescriptor",
      "agent",
      "user",
    ],
  },
  {
    label: "Settings",
    icon: IconSettings,
    links: [
      {
        link: "/home/user-management",
        label: "User Management",
        icon: IconUsers,
      },
      {
        link: "/home/products",
        label: "Create Products",
        icon: IconShoppingBag,
      },
      {
        link: "/home/notifications",
        label: "Notifications",
        icon: IconBellCog,
      },
    ],
    roles: ["manager"],
  },
];
