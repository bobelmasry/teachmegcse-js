import React from 'react';
import Link from "next/link"
import { BsFillFilePdfFill } from "react-icons/bs";

const Table = ({ papers, letter }) => {
  return (
    <div className="mt-10 md:w-4/5 lg:w-2/5 w-5/6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-700">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-slate-800 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-2xl lg:text-3xl">
                Paper Name
              </th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper) => (
              (paper.slug.toString().charAt(5) === letter) &&
              <tr key={paper.slug}>
                <td className="flex flex-wrap px-6 text-xl md:text-3xl lg:text-3xl py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold">
                  <BsFillFilePdfFill />
                  <Link className="hover:text-blue-700 hover:underline ml-2" href={`/A-level/${paper.subjectName}/${paper.year}/${paper.slug}`}>
                      {paper.slug}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
    
  );
};

export default Table;
