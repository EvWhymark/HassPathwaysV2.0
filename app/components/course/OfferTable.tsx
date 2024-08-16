"use client";

import { ISemesterData, ITerm } from "@/public/data/dataInterface";
import { FC, Fragment, useState } from "react";
import { isMobileOnly } from "react-device-detect";
import ArrowLeft from "@/public/assets/svg/arrow-left.svg?svgr";
import ArrowRight from "@/public/assets/svg/arrow-right.svg?svgr";

const TableData: FC<{ data?: ISemesterData }> = ({ data }) => {
  if (!data) return <div className="!text-gray-600">No Class</div>;

  const { instructor, seats } = data;

  const instructorList = Array.isArray(instructor)
    ? instructor.reduce((acc, inst) => {
        if (acc === "") return inst;
        return acc + ", " + inst;
      }, "")
    : instructor;

  return (
    <div>
      <div>{instructorList}</div>
      <div className="!text-gray-600">{seats}</div>
    </div>
  );
};


type ISemesterTableData = {
  term: ITerm[];
};

export const SemesterTable: FC<ISemesterTableData> = ({ term }) => {
  // 确保 term 是一个数组，如果不是则给它一个空数组
  if (!Array.isArray(term)) {
    console.error("term is not an array:", term);
    term = [];
  }

  return (
    <Fragment>
      {!isMobileOnly && (
        <section className="hidden sm:grid grid-table grid-cols-4 max-w-[960px] overflow-clip rounded-xl border-solid border border-gray-200 bg-white ut-shadow-sm">
          <div className="table-header">Year</div>
          <div className="table-header">Spring</div>
          <div className="table-header">Summer</div>
          <div className="table-header">Fall</div>
          {term.map((t) => {
            return (
              <Fragment key={t.year}>
                <header className="font-medium">{t.year}</header>
                <TableData data={t.spring} />
                <TableData data={t.summer} />
                <TableData data={t.fall} />
              </Fragment>
            );
          })}
        </section>
      )}
      <MobileTable term={term} />
    </Fragment>
  );
};

const MobileTable: FC<ISemesterTableData> = ({ term }) => {
  const [yearIndex, setYearIndex] = useState(0);
  const t: ITerm | undefined = term.at(yearIndex);
  if (!t) return <></>;

  return (
    <section className="block sm:hidden w-52">
      <header className="px-[8.7px] py-[6.53px] flex justify-between">
        <div className="p-[4.35px]" onClick={() => setYearIndex((prev) => Math.max(prev - 1, 0))}>
          <ArrowLeft />
        </div>
        <span>{t.year}</span>
        <div className="p-[4.35px]" onClick={() => setYearIndex((prev) => Math.min(prev + 1, term.length - 1))}>
          <ArrowRight />
        </div>
      </header>
      {/* 这里你可以添加渲染 spring, summer, fall 的逻辑 */}
    </section>
  );
};
