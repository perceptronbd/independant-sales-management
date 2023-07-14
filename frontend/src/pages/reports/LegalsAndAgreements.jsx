import React from "react";
import { FileTable } from "../../components";
import { SearchBar, DropFile } from "../../components";

const data = [];

export const LegalsAndAgreements = () => {
  return (
    <div className="grid grid-cols-12 w-full px-5 gap-5 mobile:w-[80vw]">
      <div className="col-span-12 ">
        <div className="font-title text-4xl font-semibold mb-4 w-full p-2">
          Leagals & Agreements
        </div>
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
