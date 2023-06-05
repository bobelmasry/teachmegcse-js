import React from 'react';
import Link from "next/link"
import { BsFillFilePdfFill } from "react-icons/bs";

const Table = ({ papers, letter }) => {
  return (
    <div className="mt-10 md:w-4/5 lg:w-2/5 w-5/6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-slate-800 dark:text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 dark:bg-slate-600 text-2xl lg:text-3xl">
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
                  {(paper.hasSolve.toString() == 'True') &&
                  <Link href={`/A-level/${paper.subjectName}/${paper.year}/${paper.slug}/solve`}>
                  <button
                id='Submit'
                className="md:ml-8 mt-2 sm:mt-0 rounded border border-blue-500 bg-blue-600 px-8 md:px-12 py-2 text-sm md:text-lg lg:text-xl font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring active:text-slate-300"
                >
                Solve Interactively
                </button>
                </Link>
                }
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
