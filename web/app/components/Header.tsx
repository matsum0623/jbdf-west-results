import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 sm:px-12 sticky top-0 z-50">
      <div className="flex justify-between">
        <div>
          <Link to="/" className="text-2xl font-bold hidden sm:block">JBDF西部 結果検索</Link>
        </div>
        <div className="flex">
          <Link to="/results" className="underline mx-3 mt-1">試合結果</Link>
          <Link to="/couple" className="underline mx-3 mt-1">カップル一覧</Link>
        </div>
      </div>
    </header>
  )
}