import { ClientLoaderFunctionArgs, Link, useLoaderData } from "@remix-run/react";

import { SortButton } from "../components/Utils";
import { getData } from "../lib/fetchApi";

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  const results_list:couple_result[] = await getData(`/results/${params.date}/${params.class_id}`)
  return { results_list: results_list };
}

export const clientAction = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  console.log("clientAction", request, params);
  return { date: new Date() };
}

export default function Index() {
  const data = useLoaderData<typeof clientLoader>()
  console.log("data:", data);
  return (
    <>
      <div className="mt-8 mx-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-1 sm:px-6 sm:py-3">
                  <div className="flex items-center justify-center">
                    選手ID
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 sm:px-6 sm:py-3">
                  <div className="flex items-center justify-center">
                    リーダー
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 sm:px-6 sm:py-3">
                  <div className="flex items-center justify-center">
                    パートナー
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 sm:px-6 sm:py-3 hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    背番号
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 sm:px-6 sm:py-3 hidden sm:table-cell">
                  <div className="flex items-center justify-center">
                    所属級
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 sm:px-6 sm:py-3">
                  <div className="flex items-center justify-center">
                    最終結果
                    <Link to="/results" className="hidden sm:block">{SortButton()}</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.results_list.map((result) => (
                <tr key={result.couple_id} className="bg-white border-b">
                  <th scope="row" className="sm:px-6 sm:py-4 font-medium text-gray-900 whitespace-nowrap">
                    <Link to={`/couple/${result.couple_id}`} className="underline">{result.couple_id}</Link>
                  </th>
                  <td className="sm:px-6 sm:py-4">
                    {result.leader_name}
                  </td>
                  <td className="sm:px-6 sm:py-4">
                    {result.partner_name}
                  </td>
                  <td className="sm:px-6 sm:py-4 hidden sm:table-cell">
                    {result.back_number}
                  </td>
                  <td className="sm:px-6 sm:py-4 hidden sm:table-cell">
                    {result.rank}
                  </td>
                  <td className="sm:px-6 sm:py-4">
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

