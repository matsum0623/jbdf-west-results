import {
  Form,
  Link,
  Outlet,
  useMatches,
  useNavigate,
} from "@remix-run/react";
import { useState } from "react";
import { getData } from "../lib/fetchApi";
import { class_names } from "../lib/const";
import { Loading } from "../components/Utils";

export const clientAction = async () => {
  return {}
}

export default function Index() {
  const matches = useMatches()
  const details_flag = !matches[2].id.includes('/results._index')
  const navigate = useNavigate()

  const [result_data, setResultData] = useState<results_data[]>([]);
  const [search_start_date, setSearchStartDate] = useState("");
  const [search_end_date, setSearchEndDate] = useState("");
  const [search_name, setSearchName] = useState("");
  const [search_place, setSearchPlace] = useState("");
  const [search_class, setSearchClass] = useState("");

  const [info_date, setInfoDate] = useState("");
  const [info_name, setInfoName] = useState("");
  const [info_place, setInfoPlace] = useState("");
  const [info_class, setInfoClass] = useState("");

  const [is_loading, setIsLoading] = useState(false);
  const [is_search_hide, setIsSearchHide] = useState(false);


  const searchResults = async () => {
    setIsLoading(true)
    const path_parameter = '?' +
      (search_start_date != '' ? `&start_date=${search_start_date}` : '') +
      (search_end_date != '' ? `&end_date=${search_end_date}` : '') +
      (search_name != '' ? `&name=${search_name}` : '') +
      (search_place != '' ? `&place=${search_place}` : '') +
      (search_class != '' ? `&class_id=${search_class}` : '')
    // ここでデータ取得して結果を切り替える
    const search_data = await getData(`/results${path_parameter}`)
    setResultData(search_data)
    setIsSearchHide(true)
    setIsLoading(false)
  }
  const resetSearchParams = () => {
    setSearchStartDate("");
    setSearchEndDate("");
    setSearchName("");
    setSearchPlace("");
    setSearchClass("")
    setResultData([]);
  }

  const setInfo = (dt:string, name:string, place:string, class_id:string) => {
    setInfoDate(dt)
    setInfoName(name)
    setInfoPlace(place)
    setInfoClass(class_id)
  }

  return (
    <>
      {Loading(is_loading)}
      <div className="sticky top-16 z-40 bg-white">
        <div className="flex justify-between pt-2">
          <div className="flex">
            <h1 className="font-bold text-xl xl:text-3xl">試合結果{details_flag ? "詳細" : "検索"}</h1>
            <button type="button" className={"btn-search-hide ml-12" + (details_flag ? ' hidden' : '')} onClick={() => setIsSearchHide(!is_search_hide)}>検索条件を{is_search_hide ? '表示' : '隠す'}</button>
          </div>
          {details_flag && <Link to="/#" className="underline ml-4 mt-2" onClick={() => navigate(-1)}>戻る</Link>}
        </div>
        <div className={is_search_hide && !details_flag ? 'hidden' : 'block'}>
          <Form method="post" onSubmit={() => searchResults()}>
            <div className="xl:flex gap-2 mx-2 xl:mt-3 xl:ml-2">
              <div className="flex">
                <div className={details_flag ? 'hidden' : ''}>
                  <label htmlFor="start_date" className="text-sm xl:text-base">開始日付</label>
                  <input type="date" name="start_date" id="start_date" value={search_start_date} className="xl:ml-2 input w-44" hidden={details_flag} onChange={(e) => setSearchStartDate(e.target.value)}/>
                </div>
                <div className={details_flag ? 'hidden' : ''}>
                  <label htmlFor="end_date" className="text-sm xl:text-base">終了日付</label>
                  <input type="date" name="end_date" id="end_date" value={search_end_date} className="ml-2 input w-44" hidden={details_flag} onChange={(e) => setSearchEndDate(e.target.value)}/>
                </div>
              </div>
              <div className="flex">
                <div className={!details_flag ? 'hidden' : ''}>
                  <label htmlFor="date" className="text-sm xl:text-base">日付</label>
                  <input type="text" name="date" id="date" value={info_date.replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')} className="xl:ml-2 input w-44" disabled/>
                </div>
                <div className={!details_flag ? 'hidden' : 'block xl:hidden'}>
                  <label htmlFor="class_id" className="text-sm xl:text-base">クラス</label>
                  <input type="text" name="date" id="date" value={info_class} className="ml-2 input w-44" disabled/>
                </div>
              </div>

              <div className="flex">
                <div className="xl:ml-6">
                  <label htmlFor="name" className="text-sm xl:text-base">競技会名称</label>
                  <input type="text" name="name" id="name" value={details_flag ? info_name : search_name} className="xl:ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchName(e.target.value)}/>
                </div>
                <div className="">
                  <label htmlFor="place" className="text-sm xl:text-base">開催場所</label>
                  <input type="text" name="place" id="place" value={details_flag ? info_place : search_place} className="ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchPlace(e.target.value)}/>
                </div>
              </div>
              <div className={!details_flag ? 'hidden' : 'hidden xl:block'}>
                <label htmlFor="class_id" className="text-sm xl:text-base">クラス</label>
                <input type="text" name="date" id="date" value={info_class} className="ml-2 input w-44" disabled/>
              </div>

              <div className={details_flag ? 'hidden' : 'flex'}>
                <div>
                  <label htmlFor="class_id">クラス</label>
                  <select name="class_id" id="class_id" value={details_flag ? info_class : search_class} className="xl:ml-2 input" onChange={(e) => setSearchClass(e.target.value)} disabled={details_flag}>
                    <option key={'ALL'} value={''}>すべて</option>
                    {Object.keys(class_names).map((class_id:string) => (
                      <option key={class_id} value={class_id}>{class_names[class_id]}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-submit mx-4 mt-6 xl:hidden">検索</button>
              </div>
            </div>
            {!details_flag &&
              <div className="hidden xl:flex justify-end mt-2">
                <button type="button" className="btn-cancel mx-2" onClick={() => resetSearchParams()}>クリア</button>
                <button type="submit" className="btn-submit mx-2">検索</button>
              </div>
            }
          </Form>
        </div>
        <div className="mt-2 xl:mt-8 xl:mx-4">
          <Outlet context={{
            list: result_data,
            set_info: setInfo,
            is_loading: is_loading,
          }}/>
        </div>
      </div>
    </>
  );
}

