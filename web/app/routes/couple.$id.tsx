import {
  ClientLoaderFunctionArgs,
    Link,
    useLoaderData,
} from "@remix-run/react";
import { SortButton } from "../components/Utils";
import { getData } from "../lib/fetchApi";
import { class_names } from "../lib/const";

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  return await getData(`/couple/${params.id}`);
}

export default function Index() {
  const data:{couple_id: string, leader_name:string, partner_name:string, results_list: couple_results[]} = useLoaderData<typeof clientLoader>()

  return (
    <>
      <div className="mt-8 mx-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                    日付
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    競技会名
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    出場クラス
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    所属級
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    背番号
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    最終結果
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.results_list.map((result) => (
                <tr key={result.date + result.class_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    {`${result.date.slice(0, 4)}/${result.date.slice(4, 6)}/${result.date.slice(6, 8)}`}
                  </td>
                  <td className="px-6 py-4">
                    {result.competition_name}
                  </td>
                  <td className="px-6 py-4">
                    {class_names[result.class_id]}
                  </td>
                  <td className="px-6 py-4">
                    {result.rank}
                  </td>
                  <td className="px-6 py-4">
                    {result.back_number}
                  </td>
                  <td className="px-6 py-4">
                    {result.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

