import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { SortButton } from "../components/Utils";
import { getData } from "../lib/fetchApi";
import { class_names } from "../lib/const";
import { useEffect, useState } from "react";
import { BackNumberConvert } from "../lib/util";

export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  return await getData(`/couple/${params.id}`);
}

export default function Index() {
  const data:{couple_id: string, leader_name:string, partner_name:string, results_list: couple_results[]} = useLoaderData<typeof clientLoader>()
  const [result_data] = useState<couple_results[]>(data.results_list);

  const context: {
    filter_type: string;
    set_info(couple_id:string, leader_name:string, partner_name:string): void;
    setIsLoading(loading:boolean): void;
  } = useOutletContext();

  useEffect(() => {
    context.set_info(data.couple_id, data.leader_name, data.partner_name);
  })

  const filterResults = (filter_type: string) => {
    return filter_type == 'ALL' ? result_data : result_data.filter((result) => result.class_id.slice(1,2) === filter_type)
  }

  const navigate = useNavigate()

  const navigateToResults = (date: string, class_id: string) => {
    context.setIsLoading(true)
    navigate(`/results/${date}/${class_id}`)
    context.setIsLoading(false)
  }

  const [ct, setCt] = useState(0);
  const [sort_flag, setSortFlag] = useState({
    date: false,
    competition_name: false,
    class_id: false,
    rank: false,
    back_number: false,
    result: false,
    result_order: false,
  });
  const sortResultData = (key: keyof couple_results) => {
    sort_flag[key] = !sort_flag[key]
    setSortFlag(sort_flag)
    result_data.sort((a:couple_results, b:couple_results) => {
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
                <th scope="col" className="px-6 py-3 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => sortResultData('date')}>
                  <div className="flex items-center">
                    日付
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => sortResultData('competition_name')}>
                  <div className="flex items-center">
                    競技会名
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => sortResultData('class_id')}>
                  <div className="flex items-center">
                    出場クラス
                    <button>{SortButton()}</button>
                  </div>
                </th>

                <th scope="col" className="xl:px-6 xl:py-3 table-cell xl:hidden underline"  onClick={() => sortResultData('date')}>
                  <div className="text-center">
                    日付
                  </div>
                  <div className="text-center">
                    競技会名称
                  </div>
                  <div className="text-center">
                    開催場所
                  </div>
                </th>


                <th scope="col" className="px-6 py-3 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => sortResultData('rank')}>
                  <div className="flex items-center text-center justify-center">
                    所属級
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => sortResultData('back_number')}>
                  <div className="flex items-center text-center justify-center">
                    背番号
                    <button>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="xl:px-6 xl:py-3 flex justify-center underline hover:cursor-pointer" onClick={() => sortResultData('result_order')}>
                  <div className="py-4 xl:py-0">
                    結果
                    <button className="hidden xl:inline-block">{SortButton()}</button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filterResults(context.filter_type).map((result) => (
                <tr key={result.date + result.class_id} className="bg-white border-b">
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {`${result.date.slice(0, 4)}/${result.date.slice(4, 6)}/${result.date.slice(6, 8)}`}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell underline hover:cursor-pointer" onClick={() => navigateToResults(result.date, result.class_id)}>
                    {result.competition_name}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {class_names[result.class_id]}
                  </td>

                  <td className="py-1 table-cell text-center xl:hidden underline" onClick={() => navigateToResults(result.date, result.class_id)}>
                    <div>
                      {`${result.date.slice(0, 4)}/${result.date.slice(4, 6)}/${result.date.slice(6, 8)}`}
                    </div>
                    <div>
                      {result.competition_name}
                    </div>
                    <div>
                      {class_names[result.class_id]}
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden xl:table-cell text-center">
                    {result.rank}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell text-center">
                    {result.back_number}
                  </td>
                  <td className="xl:px-6 xl:py-4 text-center">
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

