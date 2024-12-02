import {
    Link,
    useOutletContext
} from "@remix-run/react";
import { SortButton } from "../components/Utils";
import { useState } from "react";

export default function Index() {
  const context: {
    result_data: couple_info[],
    set_info(couple_id:string, leader_name:string, partner_name:string): void;
    setIsLoading(loading:boolean): void;
  } = useOutletContext();
  const data_list: couple_info[] = []
  if(context){
    for (const element of context.result_data) {
      data_list.push(element as couple_info);
    }
  }
  const setInfo = (couple_id:string, leader_name:string, partner_name:string) => {
    context.setIsLoading(true);
    context.set_info(couple_id, leader_name, partner_name);
    context.setIsLoading(false);
  }

  const [ct, setCt] = useState(0);
  const [sort_flag, setSortFlag] = useState({
    couple_id: true,
    leader_name: false,
    partner_name: false,
  });
  const sortResultData = (key: keyof couple_info) => {
    sort_flag[key] = !sort_flag[key]
    setSortFlag(sort_flag)
    context.result_data.sort((a:couple_info, b:couple_info) => {
      if(a[key] > b[key]) return 1 * (sort_flag[key] ? 1 : -1)
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
                <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                    <span className="hidden xl:block">選手番号</span>
                    <span className="block xl:hidden">ID</span>
                    <button onClick={() => sortResultData('couple_id')}>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    <span className="hidden xl:block">リーダー名</span>
                    <span className="block xl:hidden">L</span>
                    <button onClick={() => sortResultData('leader_name')}>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    <span className="hidden xl:block">パートナー名</span>
                    <span className="block xl:hidden">P</span>
                    <button onClick={() => sortResultData('partner_name')}>{SortButton()}</button>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    詳細
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data_list.map((data: couple_info) => (
                <tr key={data.couple_id} className="bg-white border-b">
                  <th scope="row" className="py-2 xl:px-6 xl:py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                    {data.couple_id}
                  </th>
                  <td className="py-2 xl:px-6 xl:py-4 text-center">
                    {data.leader_name}
                  </td>
                  <td className="py-2 xl:px-6 xl:py-4 text-center">
                    {data.partner_name}
                  </td>
                  <td className="py-2 xl:px-6 xl:py-4 text-center">
                    <Link to={`/couple/${data.couple_id}`} className="font-medium text-blue-600 hover:underline"
                      onClick={() => setInfo(data.couple_id, data.leader_name, data.partner_name)}>詳細</Link>
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

