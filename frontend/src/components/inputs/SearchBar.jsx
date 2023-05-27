import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconSearch, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

export function SearchBar({ str = "...", searchQuery, setSearchQuery }) {
  const theme = useMantineTheme();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex w-full">
      <TextInput
        className="w-full"
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="md"
        rightSection={
          <ActionIcon
            size={32}
            radius="md"
            color={theme.primaryColor}
            variant="filled"
            className=" bg-accent-primary"
          >
            {theme.dir === "ltr" ? (
              <IconArrowRight size="1.1rem" stroke={1.5} />
            ) : (
              <IconArrowLeft size="1.1rem" stroke={1.5} />
            )}
          </ActionIcon>
        }
        placeholder={`Search ${str}`}
        rightSectionWidth={42}
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
}
