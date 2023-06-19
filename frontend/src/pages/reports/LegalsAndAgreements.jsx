import React from "react";
import { FileTable } from "../../components";
import { Text, SearchBar, DropFile } from "../../components";

const data = [];

export const LegalsAndAgreements = () => {
  return (
    <div className="grid grid-cols-12 w-full px-5 gap-5">
      <div className="col-span-12 ">
        <Text title>Shared Documents</Text>
        <SearchBar str="File" />
      </div>
      <div className="col-span-9">
        <FileTable data={data} />
      </div>
      <div className="col-span-3">
        <DropFile />
      </div>
    </div>
  );
};
