import { Navbar, Group, Text, ScrollArea, createStyles } from "@mantine/core";
import { IconBrandEdge } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import { navlink } from "./navlink";
import { useEffect, useState } from "react";

//   { label: "Profile", icon: IconUserCircle, links: "/home/profile" },
//   {
//     label: "Dashboard",
//     icon: IconLayoutDashboard,
//     initiallyOpened: false,
//     links: [
//       { label: "CRM", link: "/home/crm", icon: IconTableAlias },
//       {
//         label: "Admin Contact",
//         link: "/home/admin-contact",
//         icon: IconAddressBook,
//       },
//     ],
//   },
//   {
//     label: "Management",
//     icon: IconAdjustments,
//     links: [
//       { label: "Members", link: "/home/members", icon: IconAffiliate },
//       { label: "Check Out", link: "/home/check-out", icon: IconChecklist },
//       {
//         label: "Purchase Order",
//         link: "/home/create-purchase-order",
//         icon: IconShoppingBag,
//       },
//       { label: "Create User", link: "/home/create-user", icon: IconUserPlus },
//     ],
//   },
//   {
//     label: "Reports & Analytics",
//     icon: IconNotes,
//     links: [
//       { label: "Sales Report", link: "/home/sales", icon: IconReportAnalytics },
//       {
//         label: "Legals Agreements",
//         link: "/home/legals-agreements",
//         icon: IconGavel,
//       },
//     ],
//   },
//   {
//     label: "Documents",
//     icon: IconFolder,
//     links: "/home/shared-documents",
//   },
//   {
//     label: "Settings",
//     icon: IconSettings,
//     links: [
//       {
//         link: "/home/user-management",
//         label: "User Management",
//         icon: IconUsers,
//       },
//       {
//         link: "/home/authentications",
//         label: "Users & Authentications",
//         icon: IconKey,
//       },
//       {
//         link: "/home/notifications",
//         label: "Notifications",
//         icon: IconBellCog,
//       },
//     ],
//   },
// ];

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

export function Sidebar({ handleLogout }) {
  const { classes } = useStyles();

  const [role, setRole] = useState("");

  const showLinks = (roleLinks) => {
    return roleLinks.includes(role);
  };

  const links = navlink.map((item) => {
    if (showLinks(item.roles)) {
      return <LinksGroup {...item} key={item.label} />;
    } else return null;
  });

  useEffect(() => {
    setRole(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData ? userData.role : null;
    });
  }, []);

  return (
    <>
      <Navbar
        width={{ sm: 240 }}
        p="md"
        //className={classes.navbar}
        className="pb-0 bg-blue-50 rounded-lg h-[97vh] mobile:w-1/6 mobile:h-[90vh] "
      >
        <Navbar.Section className="mb-2">
          <Group>
            <IconBrandEdge className="text-accent-secondary m-0 p-0" />
            <Text
              size="xl"
              weight={800}
              className="text-accent-primary font-title m-0 p-0 mobile:hidden"
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
          <div
            onClick={handleLogout}
            className="flex  mx-auto my-2 hover:cursor-pointer group bg-backgroundColor-tertiary rounded px-4 py-1 mobile:px-1"
          >
            <span className="mobile:hidden pr-2 font-medium text-textColor-tertiary group-hover:text-accent-primary">
              Log Out
            </span>
            <IconLogout className="text-textColor-tertiary group-hover:text-accent-primary" />
          </div>
        </Navbar.Section>
      </Navbar>
    </>
  );
}
