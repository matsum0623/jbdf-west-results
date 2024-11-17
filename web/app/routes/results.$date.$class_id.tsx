import { ClientLoaderFunctionArgs, Link, useLoaderData } from "@remix-run/react";

import { SortButton } from "../components/Utils";
import { getData } from "../lib/fetchApi";

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  return await getData(`/results/${params.date}/${params.class_id}`)
}

export default function Index() {
  return (
    <>
      <div className="xl:mt-8 xl:mx-4">
        <div className="relative overflow-x-auto shadow-md xl:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-1 xl:px-6 xl:py-3">
                  <div className="flex items-center justify-center">
                    選手ID
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3">
                  <div className="flex items-center justify-center">
                    リーダー
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3">
                  <div className="flex items-center justify-center">
                    パートナー
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center justify-center">
                    背番号
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center justify-center">
                    所属級
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3">
                  <div className="flex items-center justify-center">
                    最終結果
                    <Link to="/results" className="hidden xl:block">{SortButton()}</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {useLoaderData<typeof clientLoader>().map((result:couple_result) => (
                <tr key={result.couple_id} className="bg-white border-b">
                  <th scope="row" className="py-2 xl:px-6 xl:py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                    <Link to={`/couple/${result.couple_id}`} className="underline">{result.couple_id}</Link>
                  </th>
                  <td className="py-2 xl:px-6 xl:py-4 text-center">
                    {result.leader_name}
                  </td>
                  <td className="py-2 xl:px-6 xl:py-4 text-center">
                    {result.partner_name}
                  </td>
                  <td className="xl:px-6 xl:py-4 hidden xl:table-cell text-center">
                    {result.back_number}
                  </td>
                  <td className="xl:px-6 xl:py-4 hidden xl:table-cell text-center">
                    {result.rank}
                  </td>
                  <td className="py-2 xl:px-6 xl:py-4  text-center">
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

