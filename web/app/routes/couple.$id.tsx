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
      <div className="xl:mt-8 xl:mx-4">
        <div className="relative overflow-x-auto shadow-md xl:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    日付
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    競技会名
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    出場クラス
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>

                <th scope="col" className="xl:px-6 xl:py-3 table-cell xl:hidden">
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


                <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    所属級
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    背番号
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="xl:px-6 xl:py-3">
                  <div className="flex items-center w-14 justify-center">
                    結果
                    <Link to="/results" className="hidden xl:table-cell">{SortButton()}</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.results_list.map((result) => (
                <tr key={result.date + result.class_id} className="bg-white border-b">
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {`${result.date.slice(0, 4)}/${result.date.slice(4, 6)}/${result.date.slice(6, 8)}`}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {result.competition_name}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {class_names[result.class_id]}
                  </td>

                  <td className="py-1 table-cell text-center xl:hidden">
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

                  <td className="px-6 py-4 hidden xl:table-cell">
                    {result.rank}
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
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

