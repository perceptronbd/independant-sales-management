import { useState } from "react";
import { Switch, useMantineTheme } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";

export function SliderInput({ checked: initialChecked }) {
  const theme = useMantineTheme();
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div className="mx-auto">
      <Switch
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        color="teal"
        size="md"
        label=""
        thumbIcon={
          checked ? (
            <IconCheck
              size="0.8rem"
              color={theme.colors.teal[theme.fn.primaryShade()]}
              stroke={3}
            />
          ) : (
            <IconX
              size="0.8rem"
              color={theme.colors.red[theme.fn.primaryShade()]}
              stroke={3}
            />
          )
        }
      />
    </div>
  );
}
