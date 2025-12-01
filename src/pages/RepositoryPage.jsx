import { useState, useEffect } from 'react';
import { getRepos } from '../utils';

const ITEMS_PER_PAGE = 10;

const RepositoryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async()=> {
      setLoading(true);
    try {
      const resp = await getRepos({
        search: searchText,
        page,
        per_page: ITEMS_PER_PAGE,
      });
      setRepos(resp.data);
      setTotalPages(resp.totalPages);
    } catch (err) {
      console.error("Error fetching repos:", err);
    } finally {
      setLoading(false);
    }
    })()
  }, [searchText, page]);

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
    setPage(1);
  };

  const gotoPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Repositories</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Find a repository..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={searchText}
            onChange={onSearchChange}
          />
        </div>

        {loading ? (
          <div className="text-gray-500">Loading…</div>
        ) : (
          <>
            <ul className="space-y-4">
              {repos.map(repo => (
                <li key={repo.id} className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition">
                  <a
                    href={repo.html_url}
                    className="text-blue-600 font-semibold text-lg hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                  {repo.fork && (
                    <span className="ml-2 text-sm text-gray-500">(forked)</span>
                  )}
                  {repo.description && (
                    <p className="text-gray-700 mt-1 text-sm">{repo.description}</p>
                  )}
                  <div className="mt-2 flex items-center space-x-4 text-gray-500 text-xs">
                    {repo.language && (
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                        <span>{repo.language}</span>
                      </span>
                    )}
                    <span>★ {repo.stargazers_count}</span>
                    <span>Updated on {new Date(repo.updated_at).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                <button
                  className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => gotoPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>
                <span className="text-gray-600">Page {page} of {totalPages}</span>
                <button
                  className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-200 disabled:opacity-50"
                  onClick={() => gotoPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RepositoryPage;
