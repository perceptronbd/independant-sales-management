import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Group,
  Box,
  Collapse,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "90%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    marginLeft: rem(10),
    color: "#95A2B2",
    fontSize: theme.fontSizes.sm,
    borderRadius: `5px`,

    "&:hover": {
      backgroundColor: "white",
      color: "#3D65AB",
      borderRadius: `5px`,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    height: "60%",
    padding: rem(5),
    paddingLeft: rem(15),
    marginTop: rem(5),
    marginLeft: rem(10),
    marginRight: rem(10),
    fontSize: theme.fontSizes.sm,
    color: "#95A2B2",
    borderRadius: `5px`,

    "&:hover": {
      backgroundColor: "white",
      color: "#3D65AB",
    },
  },
}));

export function LinksGroup({
  label,
  icon: Icon,
  initiallyOpened = false,
  links,
}) {
  const { classes } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [linkPath, setLinkPath] = useState("");

  const items = (hasLinks ? links : []).map((link) => (
    <ul key={link.label}>
      <li>
        <ul>
          <div
            //to={link.link}
            className={clsx(classes.link, {
              "text-accent-primary": window.location.pathname === link.link,
            })}
            onClick={() => {
              setLinkPath(link.link);
              setOpened(!opened);
            }}
          >
            <li key={link.label}>
              <NavLink
                to={link.link}
                className={clsx(
                  `${classes.link} flex items-center mobile:p-0 mobile:m-2`,
                  {
                    "text-accent-primary":
                      window.location.pathname === link.link,
                  }
                )}
                onClick={() => {
                  setLinkPath(link.link);
                  setOpened(!opened);
                }}
              >
                {link.icon && <link.icon size="1.1rem" />}
                <span className="ml-5 mobile:hidden">{link.label}</span>
              </NavLink>
            </li>
          </div>
        </ul>
      </li>
    </ul>
  ));

  const navigate = useNavigate();
  const handleControlButtonClick = () => {
    if (!hasLinks && typeof links === "string") {
      navigate(links);
      setLinkPath(links);
    } else {
      setOpened((prevOpened) => !prevOpened);
    }
  };

  return (
    <div>
      <UnstyledButton
        onClick={handleControlButtonClick}
        className={clsx(classes.control, "mobile:p-2", {
          "text-white bg-accent-primary": window.location.pathname === linkPath,
        })}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <div className={clsx("p-1")}>
              <Icon size="1.1rem" />
            </div>
            <Box ml="md" className="mobile:hidden">
              {label}
            </Box>
          </Box>
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </div>
  );
}
