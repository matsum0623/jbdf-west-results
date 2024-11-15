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

export const clientLoader = async () => {
  return {}
}
export const clientAction = async () => {
  return {}
}

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

  const [is_loading, setIsLoading] = useState(false);
  const [is_error, setIsError] = useState(false);

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
    setIsLoading(false)
  }

  const resetSearchParams = () => {
    setSearchLeaderName("")
    setSearchCoupleId("")
    setSearchPartnerName("")
  }

  const setInfo = (couple_id:string, leader_name:string, partner_name:string) => {
    console.log(couple_id, leader_name, partner_name)
    setInfoCoupleId(couple_id)
    setInfoLeaderName(leader_name)
    setInfoPartnerName(partner_name)
  }


  return (
    <>
      {Loading(is_loading)}
      <div className="sticky top-16 z-40 bg-white">
        <div className="flex justify-between pt-2">
          <h1 className="font-bold text-3xl">カップル{details_flag ? "詳細" : "検索"}</h1>
          {details_flag && <Link to="/#" className="underline ml-4 mt-2" onClick={() => navigate(-1)}>戻る</Link>}
        </div>
        <Form method="post" onSubmit={() => searchResults()}>
          <div className="flex sm:gap-2 mt-3 px-1 sm:px-0 sm:ml-2">
            <div className="">
              <label htmlFor="date">選手番号</label>
              <input type="text" inputMode="numeric" name="couple_number" id="date" value={details_flag ? info_couple_id : search_couple_id} className="ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchCoupleId(e.target.value)}/>
            </div>
            <div className="block sm:flex">
              <div className="sm:ml-6">
                <label htmlFor="leader_name">リーダー名</label>
                <input type="text" name="leader_name" id="leader_name" value={details_flag ? info_leader_name : search_leader_name} className="ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchLeaderName(e.target.value)}/>
              </div>
              <div className="">
                <label htmlFor="partner_name">パートナー名</label>
                <input type="text" name="partner_name" id="partner_name" value={details_flag ? info_partner_name : search_partner_name} className="ml-2 input w-44" disabled={details_flag} onChange={(e) => setSearchPartnerName(e.target.value)}/>
              </div>
            </div>
          </div>
          {!details_flag &&
            <div className="flex justify-between mt-2">
              <div className="pl-10 py-2 text-red-600">
                {is_error && <span>
                  ※検索条件をどれか一つ以上入力してください
                </span>}
              </div>
              <div>
                <button type="button" className="btn-cancel mx-2" onClick={() => resetSearchParams()}>クリア</button>
                <button type="submit" className="btn-submit mx-2">検索</button>
              </div>
            </div>
          }
        </Form>
      </div>
      <div className="mt-8 mx-4">
        <Outlet context={{
          list: result_data,
          set_info: setInfo,
        }}/>
      </div>
    </>
  );
}

