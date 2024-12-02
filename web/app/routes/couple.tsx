import {
  Form,
  Link,
    Outlet,
    useMatches,
    useNavigate,
} from "@remix-run/react";
import { useState } from "react";
import { getData } from "../lib/fetchApi";
import { Loading } from "../components/Utils";

export default function Couple() {
  const matches = useMatches()
  const details_flag = !matches[2].id.includes('/couple._index')
  const navigate = useNavigate()

  const [result_data, setResultData] = useState<couple_info[]>([]);

  const [search_couple_id, setSearchCoupleId] = useState("");
  const [search_leader_name, setSearchLeaderName] = useState("");
  const [search_partner_name, setSearchPartnerName] = useState("");

  const [info_couple_id, setInfoCoupleId] = useState("");
  const [info_leader_name, setInfoLeaderName] = useState("");
  const [info_partner_name, setInfoPartnerName] = useState("");
  const [filter_type, setFilterType] = useState("ALL");

  const [is_loading, setIsLoading] = useState(false);
  const [is_error, setIsError] = useState(false);
  const [is_search_hide, setIsSearchHide] = useState(false);

  const searchResults = async () => {
    if(search_couple_id == '' && search_leader_name == '' && search_partner_name == ''){
      setIsError(true)
      return
    }
    setIsError(false)
    setIsLoading(true)
    const path_parameter = '?' +
      (search_couple_id != '' ? `&couple_id=${search_couple_id}` : '') +
      (search_leader_name != '' ? `&leader_name=${search_leader_name}` : '') +
      (search_partner_name != '' ? `&partner_name=${search_partner_name}` : '')
    // ここでデータ取得して結果を切り替える
    const search_data = await getData(`/couple${path_parameter}`)
    setResultData(search_data)
    setIsSearchHide(true)
    setIsLoading(false)
  }

  const resetSearchParams = () => {
    setSearchLeaderName("")
    setSearchCoupleId("")
    setSearchPartnerName("")
    setResultData([])
  }

  const setInfo = (couple_id:string, leader_name:string, partner_name:string) => {
    setInfoCoupleId(couple_id)
    setInfoLeaderName(leader_name)
    setInfoPartnerName(partner_name)
  }

  return (
    <>
      {is_loading && Loading()}
      <div className="top-16 z-40 bg-white">
        <div className="flex justify-between pt-2">
          <div className="flex">
            <h1 className="font-bold text-xl xl:text-3xl">カップル{details_flag ? "詳細" : "検索"}</h1>
            <button type="button" className={"btn-search-hide ml-12" + (details_flag ? ' hidden' : '')} onClick={() => setIsSearchHide(!is_search_hide)}>検索条件を{is_search_hide ? '表示' : '隠す'}</button>
          </div>
          {details_flag && <Link to="/#" className="underline ml-4 mt-2" onClick={() => navigate(-1)}>戻る</Link>}
        </div>
        <div className={(is_search_hide && !details_flag) ? 'hidden' : 'block'}>
          <Form onSubmit={() => searchResults()}>
            <div className="xl:flex xl:gap-2 xl:mt-3 mx-2 xl:px-0 xl:ml-2">
              <div className="">
                <label htmlFor="date" className="text-sm xl:text-base">選手番号</label>
                <input type="text" inputMode="numeric" name="couple_number" id="date" value={details_flag ? info_couple_id : search_couple_id} className="xl:ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchCoupleId(e.target.value)}/>
              </div>
              <div className="flex">
                <div className="xl:ml-6">
                  <label htmlFor="leader_name" className="text-sm xl:text-base">リーダー名</label>
                  <input type="text" name="leader_name" id="leader_name" value={details_flag ? info_leader_name : search_leader_name} className="xl:ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchLeaderName(e.target.value)}/>
                </div>
                <div className="">
                  <label htmlFor="partner_name" className="text-sm xl:text-base">パートナー名</label>
                  <input type="text" name="partner_name" id="partner_name" value={details_flag ? info_partner_name : search_partner_name} className="ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchPartnerName(e.target.value)}/>
                </div>
              </div>
              {details_flag &&
                <div className="xl:ml-8">
                  <label htmlFor="filter" className="text-sm xl:text-base">絞り込み</label>
                  <div id="filter" className="flex gap-2">
                    <div className="flex items-center">
                      <input checked={filter_type=='ALL'} id="filter-radio-1" type="radio" value="ALL" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" onChange={() => setFilterType('ALL')}/>
                      <label htmlFor="filter-radio-1" className="ms-2 text-sm font-medium text-gray-900">すべて</label>
                    </div>
                    <div className="flex items-center">
                      <input checked={filter_type=='B'} id="filter-radio-2" type="radio" value="B" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" onChange={() => setFilterType('B')}/>
                      <label htmlFor="filter-radio-2" className="ms-2 text-sm font-medium text-gray-900">ボールルーム</label>
                    </div>
                    <div className="flex items-center">
                      <input checked={filter_type=='L'} id="filter-radio-3" type="radio" value="L" name="filter-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" onChange={() => setFilterType('L')}/>
                      <label htmlFor="filter-radio-3" className="ms-2 text-sm font-medium text-gray-900">ラテン</label>
                    </div>
                  </div>
                </div>
              }
            </div>
            {!details_flag &&
              <div className="flex justify-between mt-2">
                <div className="pl-10 py-2 text-red-600">
                  {is_error && <span>
                    ※検索条件をどれか一つ以上入力してください
                  </span>}
                </div>
                <div>
                  <button type="button" className="btn-cancel mx-2 hidden xl:inline-flex" onClick={() => resetSearchParams()}>クリア</button>
                  <button type="submit" className="btn-submit mx-2">検索</button>
                </div>
              </div>
            }
          </Form>
        </div>
      </div>
      <div className="mt-2 xl:mt-8 xl:mx-4">
        <Outlet context={{
          result_data: result_data,
          set_info: setInfo,
          filter_type: filter_type,
          setIsLoading: setIsLoading,
        }}/>
      </div>
    </>
  );
}

