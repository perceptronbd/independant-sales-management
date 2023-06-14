import { useRef } from "react";
import { Group, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Button } from "../buttons/Button";
import tw from "twin.macro";
import styled from "@emotion/styled";

const Text = styled.p(({ body }) => [
  tw`font-title font-bold text-center`,
  body && tw`text-textColor-secondary text-sm font-medium`,
]);

export function DropFile(props) {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  return (
    <div>
      <div>
        <Text>Drag images here or click to select files</Text>
        <Text body>File should not exceed 5MB</Text>
      </div>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
        className="h-[200px]"
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(150), pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              size="3.2rem"
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === "dark" ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size="2.1rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="2.1rem" stroke={1.5} />
          </Dropzone.Idle>
        </Group>
      </Dropzone>
      <Group position="center">
        <Button onClick={() => openRef.current()}>Select files</Button>
      </Group>
    </div>
  );
}
