import {
  Link,
  useOutletContext,
} from "@remix-run/react";

import {
  SortButton,
  ClassLink,
} from "../components/Utils";

export default function Index() {
  const context: {
    list: object[],
    set_info(dt: string, name: string, place: string, class_name: string): void;
  } = useOutletContext();
  const data_list: results_data[] = []
  if(context){
    for (const element of context.list) {
      data_list.push(element as results_data);
    }
  }
  const setInfo = (dt:string, name:string, place:string, class_name:string) => {
    context.set_info(dt, name, place, class_name);
  }

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
                    競技会名称
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    開催場所
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    クラス
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data_list.map((data: results_data) => (
                <tr key={data.date} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.date}
                  </th>
                  <td className="px-6 py-4">
                    {data.name}
                  </td>
                  <td className="px-6 py-4">
                    {data.place}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <table>
                      <thead>
                        <tr className="font-bold">
                          <td></td>
                          <td>プロ</td>
                          <td className="border-l-2 border-gray-600/50">アマ</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="font-bold">B</td>
                          <td className="border-l-2 border-gray-600/50">
                            <div className="flex">
                              <div className="p-0.5">{ClassLink('オープン', data.date.replaceAll('-', ''), data.name, data.place, 'PBO', data.classes.includes('PBO'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('A級', data.date.replaceAll('-', ''), data.name, data.place, 'PBA', data.classes.includes('PBA'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('B級', data.date.replaceAll('-', ''), data.name, data.place, 'PBB', data.classes.includes('PBB'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('C級', data.date.replaceAll('-', ''), data.name, data.place, 'PBC', data.classes.includes('PBC'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('D級', data.date.replaceAll('-', ''), data.name, data.place, 'PBD', data.classes.includes('PBD'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'PBE', data.classes.includes('PBE'), setInfo)}</div>
                            </div>
                          </td>
                          <td className="border-l-2 border-gray-600/50">
                            <div className="flex">
                              <div className="p-0.5">{ClassLink('オープン', data.date.replaceAll('-', ''), data.name, data.place, 'ABO', data.classes.includes('ABO'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('A級', data.date.replaceAll('-', ''), data.name, data.place, 'ABA', data.classes.includes('ABA'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('B級', data.date.replaceAll('-', ''), data.name, data.place, 'ABB', data.classes.includes('ABB'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('C級', data.date.replaceAll('-', ''), data.name, data.place, 'ABC', data.classes.includes('ABC'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('D級', data.date.replaceAll('-', ''), data.name, data.place, 'ABD', data.classes.includes('ABD'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'ABE', data.classes.includes('ABE'), setInfo)}</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="font-bold">L</td>
                          <td className="border-l-2 border-gray-600/50">
                            <div className="flex">
                              <div className="p-0.5">{ClassLink('オープン', data.date.replaceAll('-', ''), data.name, data.place, 'PLO', data.classes.includes('PLO'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('A級', data.date.replaceAll('-', ''), data.name, data.place, 'PLA', data.classes.includes('PLA'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('B級', data.date.replaceAll('-', ''), data.name, data.place, 'PLB', data.classes.includes('PLB'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('C級', data.date.replaceAll('-', ''), data.name, data.place, 'PLC', data.classes.includes('PLC'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('D級', data.date.replaceAll('-', ''), data.name, data.place, 'PLD', data.classes.includes('PLD'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'PLE', data.classes.includes('PLE'), setInfo)}</div>
                            </div>
                          </td>
                          <td className="border-l-2 border-gray-600/50">
                            <div className="flex">
                              <div className="p-0.5">{ClassLink('オープン', data.date.replaceAll('-', ''), data.name, data.place, 'ALO', data.classes.includes('ALO'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('A級', data.date.replaceAll('-', ''), data.name, data.place, 'ALA', data.classes.includes('ALA'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('B級', data.date.replaceAll('-', ''), data.name, data.place, 'ALB', data.classes.includes('ALB'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('C級', data.date.replaceAll('-', ''), data.name, data.place, 'ALC', data.classes.includes('ALC'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('D級', data.date.replaceAll('-', ''), data.name, data.place, 'ALD', data.classes.includes('ALD'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'ALE', data.classes.includes('ALE'), setInfo)}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

