import { useState } from "react";
import { Group, useMantineTheme, rem, Progress } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import tw from "twin.macro";
import styled from "@emotion/styled";
import axios from "axios";

const Text = styled.p(({ body }) => [
  tw`font-title font-bold text-center`,
  body && tw`text-textColor-secondary text-sm font-medium`,
]);

export function DropFile(props) {
  const theme = useMantineTheme();
  //  const openRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (files) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("file", file);
      });

      // Add userId and name to the form data
      formData.append("userId", user._id); // Replace `userId` with the actual user ID
      formData.append("name", user.firstName); // Replace `name` with the actual user name

      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      console.log("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={handleFileUpload}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept=".pdf,.xls,.xlsx,.txt"
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(220), pointerEvents: "none" }}
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
              size="3.2rem"
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div className="mobile:hidden">
            <Text size="xl" inline>
              Drag files here or click to select files
            </Text>
            <Text body>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      {uploadProgress === 100 ? (
        <div className="font-semibold text-blue-400 flex justify-center">
          Done, please refresh the page!
        </div>
      ) : (
        <Progress
          value={uploadProgress}
          style={{ marginTop: rem(16) }}
          color="blue"
        />
      )}
    </div>
  );
}
