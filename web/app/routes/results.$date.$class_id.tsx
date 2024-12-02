import { ClientLoaderFunctionArgs, Link, useLoaderData } from "@remix-run/react";

import { SortButton } from "../components/Utils";
import { getData } from "../lib/fetchApi";
import { useState } from "react";
import { BackNumberConvert } from "../lib/util";

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  return await getData(`/results/${params.date}/${params.class_id}`)
}

export default function Index() {
  const [result_data] = useState<couple_result[]>(useLoaderData<typeof clientLoader>().sort((a:couple_result, b:couple_result) => {
    return (a['result_order'] > b['result_order']) ? 1 : -1
  }));

  const [ct, setCt] = useState(0);
  const [sort_flag, setSortFlag] = useState({
    couple_id: true,
    leader_name: false,
    partner_name: false,
    back_number: false,
    rank: false,
    result: false,
    result_order: false,
  });
  const sortResultData = (key: keyof couple_result) => {
    sort_flag[key] = !sort_flag[key]
    setSortFlag(sort_flag)
    result_data.sort((a:couple_result, b:couple_result) => {
      const a_key = (key === 'back_number') ? BackNumberConvert(a[key]) : a[key]
      const b_key = (key === 'back_number') ? BackNumberConvert(b[key]) : b[key]
      if(a_key > b_key) return 1 * (sort_flag[key] ? 1 : -1)
      return -1 * (sort_flag[key] ? 1 : -1)
    })
    setCt(ct + 1)
  }

  return (
    <>
      <div className="xl:mt-8 xl:mx-4">
        <div className="relative overflow-x-auto shadow-md xl:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-1 xl:px-6 xl:py-3" onClick={() => sortResultData('couple_id')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    選手ID
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3" onClick={() => sortResultData('leader_name')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    リーダー
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3" onClick={() => sortResultData('partner_name')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    パートナー
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3 hidden xl:table-cell" onClick={() => sortResultData('back_number')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    背番号
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3 hidden xl:table-cell" onClick={() => sortResultData('rank')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    所属級
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="py-1 xl:px-6 xl:py-3" onClick={() => sortResultData('result_order')}>
                  <div className="flex items-center justify-center underline hover:cursor-pointer">
                    最終結果
                    <button>{SortButton()}</button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {result_data.map((result:couple_result) => (
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

