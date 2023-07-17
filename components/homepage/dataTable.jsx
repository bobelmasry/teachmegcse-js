export default function DataTable({questionsSolved}) {
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
  <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
    <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Subject
        </th>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Questions Solved
        </th>
        <th scope="col" className="sm:px-4 px-2 py-3">
          Percentage
        </th>
      </tr>
    </thead>
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Biology
        </th>
        <td className="px-10 py-4">
        {questionsSolved?.filter((question) => question.Subject == 'biology').length || 0}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved?.filter((question) => (question.Subject == 'biology') && (question.Correct.toString() == 'true')).length/questionsSolved?.filter((question) => question.Subject == 'biology').length) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Chemistry
        </th>
        <td className="px-10 py-4">
        {questionsSolved?.filter((question) => question.Subject == 'chemistry').length || 0}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved?.filter((question) => (question.Subject == 'chemistry') && (question.Correct.toString() == 'true')).length/questionsSolved?.filter((question) => question.Subject == 'chemistry').length) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Physics
        </th>
        <td className="px-10 py-4">
        {questionsSolved?.filter((question) => question.Subject == 'physics').length || 0}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved?.filter((question) => (question.Subject == 'physics') && (question.Correct.toString() == 'true')).length/questionsSolved?.filter((question) => question.Subject == 'physics').length) * 10000)) / 100} %`}
        </td>
      </tr>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="sm:px-4 px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          Economics
        </th>
        <td className="px-10 py-4">
        {questionsSolved?.filter((question) => question.Subject == 'economics').length || 0}
        </td>
        <td className="sm:px-4 px-2 py-4">
        {`${Math.round(((questionsSolved?.filter((question) => (question.Subject == 'economics') && (question.Correct.toString() == 'true')).length/questionsSolved?.filter((question) => question.Subject == 'economics').length) * 10000)) / 100} %`}
        </td>
      </tr>
    </tbody>
  </table>
</div>
    )
}