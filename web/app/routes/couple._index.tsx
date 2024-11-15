import {
    Link,
    useOutletContext
} from "@remix-run/react";
import { SortButton } from "../components/Utils";

export const clientLoader = async () => {
  return {};
}

export const clientAction = async () => {
  return {};
}

export default function Index() {
  const context: {
    list: object[],
    set_info(couple_id:string, leader_name:string, partner_name:string): void;
  } = useOutletContext();
  const data_list: couple_info[] = []
  if(context){
    for (const element of context.list) {
      data_list.push(element as couple_info);
    }
  }
  const setInfo = (couple_id:string, leader_name:string, partner_name:string) => {
    context.set_info(couple_id, leader_name, partner_name);
  }

  return (
    <>
      <div className="mt-8 sm:mx-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                    <span className="hidden sm:block">選手番号</span>
                    <span className="block sm:hidden">ID</span>
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    <span className="hidden sm:block">リーダー名</span>
                    <span className="block sm:hidden">L</span>
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    <span className="hidden sm:block">パートナー名</span>
                    <span className="block sm:hidden">P</span>
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    詳細
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data_list.map((data: couple_info) => (
                <tr key={data.couple_id} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.couple_id}
                  </th>
                  <td className="px-6 py-4">
                    {data.leader_name}
                  </td>
                  <td className="px-6 py-4">
                    {data.partner_name}
                  </td>
                  <td className="px-6 py-4">
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

