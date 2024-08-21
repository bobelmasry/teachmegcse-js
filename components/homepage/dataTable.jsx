export default function DataTable({ questionsSolved }) {
  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full text-lg text-left text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-800 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
          <tr>
            <th scope="col" className="sm:px-6 px-4 py-4">
              Subject
            </th>
            <th scope="col" className="sm:px-6 px-4 py-4 text-right">
              Questions Solved
            </th>
            <th scope="col" className="sm:px-6 px-4 py-4 text-right">
              Percentage Correct
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            { subject: 'Biology', maxQuestions: 5700 },
            { subject: 'Chemistry', maxQuestions: 5489 },
            { subject: 'Physics', maxQuestions: 5860 },
            { subject: 'Economics', maxQuestions: 4123 },
          ].map((subjectItem, index) => {
            const { subject, maxQuestions } = subjectItem;
            const questionsSolvedForSubject = questionsSolved?.filter(
              (question) => question.Subject === subject.toLowerCase()
            ) || [];
            const correctAnswers = questionsSolvedForSubject.filter(
              (question) => question.Correct.toString() === 'true'
            ).length;
            const percentageCorrect =
              questionsSolvedForSubject.length > 0
                ? Math.round((correctAnswers / questionsSolvedForSubject.length) * 10000) / 100
                : 0;

            return (
              <tr
                key={subject}
                className={`${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                } border-b dark:border-gray-700 transition-colors`}
              >
                <th
                  scope="row"
                  className="sm:px-6 px-4 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {subject}
                </th>
                <td className="sm:px-6 px-4 py-4 text-right">
                  {questionsSolvedForSubject.length} / {maxQuestions}
                </td>
                <td
                  className={`sm:px-6 px-4 py-4 text-right font-semibold ${
                    percentageCorrect >= 75
                      ? 'text-green-500'
                      : percentageCorrect >= 50
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }`}
                >
                  {`${percentageCorrect} %`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
