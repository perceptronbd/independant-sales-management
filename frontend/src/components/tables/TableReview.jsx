import { useState } from "react";
import { createStyles, Table, ScrollArea, rem } from "@mantine/core";
import clsx from "clsx";

const data = [
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
  {
    id: 1,
    name: "John Doe",
    amount: 100,
  },
];

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function TableReview() {
  const { classes } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr
      key={row.id}
      className="hover:bg-backgroundColor-secondary hover:text-accent-primary hover:font-bold"
    >
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td className="text-alert-ok">{row.amount}</td>
    </tr>
  ));

  return (
    <ScrollArea
      h={450}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={700}>
        <thead
          className={clsx(`${classes.header}`, {
            [classes.scrolled]: scrolled,
          })}
        >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
