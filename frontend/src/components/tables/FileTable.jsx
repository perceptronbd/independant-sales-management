import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@mantine/core";
import { ButtonIcon } from "../buttons/ButtonIcon";
import tw from "twin.macro";
import styled from "@emotion/styled";

const HeadGrid = styled.div`
  ${tw`grid grid-cols-4 mobile:grid-cols-2 gap-2 h-12 items-center border-b-2`}
`;

const HeadGridItems = styled.div(({ icon }) => [
  tw`ml-6 my-0 pr-1 font-semibold flex justify-start text-textColor-tertiary`,
  icon && tw`justify-end mr-10`,
]);

const RowGrid = styled.div`
  ${tw`grid grid-cols-4 mobile:grid-cols-2 gap-2 my-2 items-center rounded-lg  hover:bg-backgroundColor-secondary`}
`;

const RowGridItems = styled.div(({ icon, secondary, tertiary }) => [
  tw`ml-6 pr-1 font-semibold flex justify-start group-hover:text-accent-primary`,
  icon && tw`justify-end hover:cursor-pointer `,
  secondary &&
    tw`text-textColor-secondary group-hover:text-textColor-secondary `,
  tertiary && tw`text-textColor-tertiary  group-hover:text-textColor-tertiary`,
]);

export const FileTable = () => {
  const [filedata, setFiledata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllFiles = async () => {
      try {
        const response = await axios.get("/get-files");
        const files = response.data;
        console.log("Files:", files);
        setFiledata(files);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving files:", error);
      }
    };
    getAllFiles();
  }, []);

  const downloadFile = async (filedata) => {
    try {
      const response = await axios.get(`/download/${filedata.id}`, {
        responseType: "blob",
      });

      // Create a temporary URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data.type]));

      // Create a link element to trigger the file download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filedata.originalname);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const files = filedata.map((item) => (
    <RowGrid className="group" key={item.id}>
      <RowGridItems>{item.originalname}</RowGridItems>
      <RowGridItems tertiary className="mobile:!hidden">
        {item.createdAt}
      </RowGridItems>
      <RowGridItems secondary className="mobile:!hidden">
        {item.uploadedBy}
      </RowGridItems>
      <RowGridItems icon>
        <ButtonIcon variant="ghost" onClick={() => downloadFile(item)}>
          <span className="mobile:hidden">Download</span>
        </ButtonIcon>
      </RowGridItems>
    </RowGrid>
  ));

  return (
    <div className="flex flex-col">
      <HeadGrid>
        <HeadGridItems>Files</HeadGridItems>
        <HeadGridItems tertiary className="mobile:!hidden">
          Date
        </HeadGridItems>
        <HeadGridItems secondary className="mobile:!hidden">
          Uploaded by
        </HeadGridItems>
        <HeadGridItems secondary icon>
          Action
        </HeadGridItems>
      </HeadGrid>
      {loading ? (
        <div className="flex justify-center items-center font-semibold text-lg">
          Loading...
        </div>
      ) : (
        <ScrollArea h={500} scrollbarSize={4}>
          {files}
        </ScrollArea>
      )}
    </div>
  );
};
