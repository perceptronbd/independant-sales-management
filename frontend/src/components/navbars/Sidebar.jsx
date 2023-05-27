import { Navbar, Group, Text, ScrollArea, createStyles } from "@mantine/core";
import {
  IconBrandEdge,
  IconUserCircle,
  IconLayoutDashboard,
  IconAdjustments,
  IconNotes,
  IconSettings,
  IconFolder,
  IconUsers,
  IconFingerprint,
  IconKey,
  IconBellCog,
  IconSwitchHorizontal,
  IconReportAnalytics,
  IconAddressBook,
  IconAffiliate,
  IconChecklist,
  IconShoppingBag,
  IconUserPlus,
  IconGavel,
  IconTableAlias,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { LinksGroup } from "./LinksGroup";

const navlink = [
  { label: "Profile", icon: IconUserCircle, links: "/home/profile" },
  {
    label: "Dashboard",
    icon: IconLayoutDashboard,
    initiallyOpened: false,
    links: [
      { label: "CRM", link: "/home/crm", icon: IconTableAlias },
      {
        label: "Admin Contact",
        link: "/home/admin-contact",
        icon: IconAddressBook,
      },
    ],
  },
  {
    label: "Management",
    icon: IconAdjustments,
    links: [
      { label: "Members", link: "/home/members", icon: IconAffiliate },
      { label: "Check Out", link: "/home/check-out", icon: IconChecklist },
      {
        label: "Purchase Order",
        link: "/home/create-purchase-order",
        icon: IconShoppingBag,
      },
      { label: "Create User", link: "/home/create-user", icon: IconUserPlus },
    ],
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
  },
  {
    label: "Documents",
    icon: IconFolder,
    links: "/home/shared-documents",
  },
  {
    label: "Settings",
    icon: IconSettings,
    links: [
      {
        link: "/home/roles-and-access",
        label: "Roles & Access",
        icon: IconUsers,
      },
      {
        link: "/home/authentications",
        label: "Authentications",
        icon: IconKey,
      },
      {
        link: "/home/user-management",
        label: "User Management",
        icon: IconFingerprint,
      },
      {
        link: "/home/notifications",
        label: "Notifications",
        icon: IconBellCog,
      },
      {
        link: "/home/others",
        label: "Others",
        icon: IconSwitchHorizontal,
      },
    ],
  },
];

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    margin: `0 auto 0 auto`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    // borderBottom: `${rem(1)} solid ${
    //   theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    // }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    margin: "auto",
  },
}));

export function Sidebar() {
  const { classes } = useStyles();
  const links = navlink.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <>
      <Navbar
        width={{ sm: 240 }}
        p="md"
        //className={classes.navbar}
        className="pb-0 bg-blue-50 rounded-lg h-[97vh]"
      >
        <Navbar.Section className={classes.header}>
          <Group position="left">
            <IconBrandEdge className="text-accent-secondary m-0 p-0" />
            <Text
              size="xl"
              weight={800}
              className="text-accent-primary font-title m-0 p-0"
            >
              PLUTO
            </Text>
          </Group>
        </Navbar.Section>

        <Navbar.Section
          grow
          className={`${classes.links}`}
          component={ScrollArea}
        >
          <div
            // className={classes.linksInner}
            className="transition-opacity duration-300"
          >
            {links}
          </div>
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <NavLink to={"/"}>
            <ButtonIcon icon={IconLogout}>Log Out</ButtonIcon>
          </NavLink>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
