import {
  Link,
  useOutletContext,
} from "@remix-run/react";

import {
  SortButton,
  ClassLink,
} from "../components/Utils";
import { useState } from "react";

export default function Index() {
  const context: {
    list: object[],
    set_info(dt: string, name: string, place: string, class_name: string): void,
    is_loading: boolean,
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

  const [modal_open, setModalOpen] = useState(false);
  const [modal_date, setModalDate] = useState("");
  const [modal_name, setModalName] = useState("");
  const [modal_place, setModalPlace] = useState("");
  const [modal_classes, setModalClasses] = useState<string[]>([]);
  const openDetailModal = (date:string, name:string, place:string, classes:string[]) => {
    setModalOpen(true)
    setModalDate(date)
    setModalName(name)
    setModalPlace(place)
    setModalClasses(classes)
  }

  return (
    <>
      <div className="xl:mt-8 xl:mx-4">
        <div className="relative overflow-x-auto shadow-md xl:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    日付
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    競技会名称
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    開催場所
                    <Link to="/results">{SortButton()}</Link>
                  </div>
                </th>
                <th scope="col" className="xl:px-6 xl:py-3 hidden xl:table-cell">
                  <div className="flex items-center">
                    クラス
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
                <th className="xl:hidden">
                  HP
                </th>

              </tr>
            </thead>
            <tbody>
              {data_list.map((data: results_data) => (
                <tr key={data.date} className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 xl:font-medium text-gray-900 whitespace-nowrap hidden xl:table-cell">
                    {`${data.date.slice(0, 4)}/${data.date.slice(4, 6)}/${data.date.slice(6, 8)}`}
                  </th>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <a href={`http://jbdf-west.jp/compe/data/${data.date}/result/main.php`} target="_blank" rel="noreferrer" className="underline">{data.name}</a>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell">
                    {data.place}
                  </td>
                  <td className="px-6 py-4 text-center hidden xl:table-cell">
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
                              <div className="p-0.5">{ClassLink('DE級', data.date.replaceAll('-', ''), data.name, data.place, 'PBDE', data.classes.includes('PBDE'), setInfo)}</div>
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
                              <div className="p-0.5">{ClassLink('DE級', data.date.replaceAll('-', ''), data.name, data.place, 'ABDE', data.classes.includes('ABDE'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'ABE', data.classes.includes('ABE'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('EF級', data.date.replaceAll('-', ''), data.name, data.place, 'ABEF', data.classes.includes('ABEF'), setInfo)}</div>
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
                              <div className="p-0.5">{ClassLink('DE級', data.date.replaceAll('-', ''), data.name, data.place, 'PLDE', data.classes.includes('PLDE'), setInfo)}</div>
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
                              <div className="p-0.5">{ClassLink('DE級', data.date.replaceAll('-', ''), data.name, data.place, 'ALDE', data.classes.includes('ALDE'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('E級', data.date.replaceAll('-', ''), data.name, data.place, 'ALE', data.classes.includes('ALE'), setInfo)}</div>
                              <div className="p-0.5">{ClassLink('EF級', data.date.replaceAll('-', ''), data.name, data.place, 'ALEF', data.classes.includes('ALEF'), setInfo)}</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>

                  <td className="py-2  text-gray-900 whitespace-nowrap table-cell xl:hidden w-8/12" onClick={() => openDetailModal(data.date, data.name, data.place, data.classes)}>
                    <div className="text-center">
                      {`${data.date.slice(0, 4)}/${data.date.slice(4, 6)}/${data.date.slice(6, 8)}`}
                    </div>
                    <div className="text-center overflow-hidden">
                      {data.name}
                    </div>
                    <div className="text-center overflow-hidden">
                      {data.place}
                    </div>
                  </td>
                  <td className="xl:hidden">
                    <a href={`http://jbdf-west.jp/compe/data/${data.date}/result/main.php`} target="_blank" rel="noreferrer" className="underline text-blue-600">HP</a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* スマホ用のクラス選択モーダル */}
        {(modal_open) &&
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div id="detail-modal" tabIndex={-1} className="modal-back-ground" onClick={(e) => {
              if((e.target as HTMLElement).id == 'detail-modal'){
                setModalOpen(false)
              }
            }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">
                    開催クラス一覧
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={() => setModalOpen(false)}>
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap={"round"} strokeLinejoin={"round"} strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="modal-body">
                  <table className="w-full">
                    <tbody>
                      <tr className="font-bold">
                        <td></td>
                        <td>プロ</td>
                      </tr>
                      <tr>
                        <td className="font-bold">B</td>
                        <td className="border-l-2 border-gray-600/50">
                          <div className="flex">
                            <div className="p-0.5">{ClassLink('オープン', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBO', modal_classes.includes('PBO'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('A級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBA', modal_classes.includes('PBA'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('B級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBB', modal_classes.includes('PBB'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('C級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBC', modal_classes.includes('PBC'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('D級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBD', modal_classes.includes('PBD'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('DE級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBDE', modal_classes.includes('PBDE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('E級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PBE', modal_classes.includes('PBE'), setInfo)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">L</td>
                        <td className="border-l-2 border-gray-600/50">
                          <div className="flex">
                            <div className="p-0.5">{ClassLink('オープン', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLO', modal_classes.includes('PLO'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('A級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLA', modal_classes.includes('PLA'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('B級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLB', modal_classes.includes('PLB'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('C級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLC', modal_classes.includes('PLC'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('D級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLD', modal_classes.includes('PLD'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('DE級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLDE', modal_classes.includes('PLDE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('E級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'PLE', modal_classes.includes('PLE'), setInfo)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr className="h-2"></tr>
                      <tr className="font-bold">
                        <td></td>
                        <td>アマ</td>
                      </tr>
                      <tr>
                        <td className="font-bold">B</td>
                        <td className="border-l-2 border-gray-600/50">
                          <div className="flex">
                            <div className="p-0.5">{ClassLink('オープン', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABO', modal_classes.includes('ABO'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('A級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABA', modal_classes.includes('ABA'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('B級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABB', modal_classes.includes('ABB'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('C級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABC', modal_classes.includes('ABC'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('D級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABD', modal_classes.includes('ABD'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('DE級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABDE', modal_classes.includes('ABDE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('E級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABE', modal_classes.includes('ABE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('EF級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ABEF', modal_classes.includes('ABEF'), setInfo)}</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold">L</td>
                        <td className="border-l-2 border-gray-600/50">
                          <div className="flex">
                            <div className="p-0.5">{ClassLink('オープン', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALO', modal_classes.includes('ALO'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('A級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALA', modal_classes.includes('ALA'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('B級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALB', modal_classes.includes('ALB'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('C級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALC', modal_classes.includes('ALC'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('D級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALD', modal_classes.includes('ALD'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('DE級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALDE', modal_classes.includes('ALDE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('E級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALE', modal_classes.includes('ALE'), setInfo)}</div>
                            <div className="p-0.5">{ClassLink('EF級', modal_date.replaceAll('-', ''), modal_name, modal_place, 'ALEF', modal_classes.includes('ALEF'), setInfo)}</div>
                          </div>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        }
      </div>

    </>
  );
}

