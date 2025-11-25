import {
  BriefcaseIcon,
  MapPinIcon,
  LinkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function LeftPanelComponent({ user }) {
  if (!user) return null;

  return (
    <div className="w-full md:w-72 flex flex-col">
      <img
        src={user.avatar_url}
        className="rounded-full w-52 h-52 border mx-auto"
        alt="avatar"
      />
      <h1 className="text-2xl font-semibold mt-4">{user.name}</h1>
      <h2 className="text-gray-600 text-lg">@{user.login}</h2>

      {user.bio && <p className="mt-4 text-gray-800 leading-6">{user.bio}</p>}

      <div className="flex gap-4 mt-4 text-sm text-gray-700">
        <span>
          <b>{user.followers}</b> followers
        </span>
        <span>
          <b>{user.following}</b> following
        </span>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-gray-700">
        {user.company && (
          <li className="flex items-center gap-2">
            <BriefcaseIcon className="w-5 h-5 text-gray-600" />
            {user.company}
          </li>
        )}
        {user.location && (
          <li className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-gray-600" />
            {user.location}
          </li>
        )}
        {user.blog && (
          <li className="flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-gray-600" />
            <a
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {user.blog}
            </a>
          </li>
        )}
        <li className="flex items-center gap-2">
          <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
          Joined {new Date(user.created_at).toDateString()}
        </li>
      </ul>
    </div>
  );
}
