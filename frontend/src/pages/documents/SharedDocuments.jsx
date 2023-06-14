import React from "react";
import { SearchBar, FileTable, Text } from "../../components";

const data = [
  {
    id: 1,
    file: "File name 01",
    date: "01 Jan 23",
    username: "User Name 01",
  },
  {
    id: 2,
    file: "File name 02",
    date: "01 Jan 23",
    username: "User Name 02",
  },
  {
    id: 3,
    file: "File name 03",
    date: "01 Jan 23",
    username: "User Name 03",
  },
  {
    id: 4,
    file: "File name 04",
    date: "01 Jan 23",
    username: "User Name 04",
  },
  {
    id: 5,
    file: "File name 05",
    date: "01 Jan 23",
    username: "User Name 05",
  },
  {
    id: 6,
    file: "File name 06",
    date: "01 Jan 23",
    username: "User Name 06",
  },
  {
    id: 7,
    file: "File name 07",
    date: "01 Jan 23",
    username: "User Name 07",
  },
  {
    id: 8,
    file: "File name 08",
    date: "01 Jan 23",
    username: "User Name 08",
  },
  {
    id: 9,
    file: "File name 09",
    date: "01 Jan 23",
    username: "User Name 09",
  },
  {
    id: 10,
    file: "File name 10",

    date: "01 Jan 23",
    username: "User Name 10",
  },
  {
    id: 11,
    file: "File name 11",
    date: "01 Jan 23",
    username: "User Name 11",
  },
  {
    id: 12,
    file: "File name 12",
    date: "01 Jan 23",
    username: "User Name 12",
  },
  {
    id: 13,
    file: "File name 13",
    date: "01 Jan 23",
    username: "User Name 13",
  },
  {
    id: 14,
    file: "File name 14",
    date: "01 Jan 23",
    username: "User Name 14",
  },
];

export const SharedDocuments = () => {
  return (
    <div className="grid grid-cols-12 h-full w-full px-5 gap-5">
      <div className="col-span-12 ">
        <Text title>Shared Documents</Text>
        <SearchBar str="File" />
      </div>
      <div className="col-span-12">
        <FileTable data={data} />
      </div>
    </div>
  );
};
