import Landing from "./components/Landing/Landing";
import { getServerSession } from "next-auth";
import { authOptions } from "./libs/auth/auth";
import ServerSession from "./components/Session/ServerSession";
import ClientSession from "./components/Session/ClientSession";

export default async function Home() {
  // getting session data in server side
  const session = await getServerSession(authOptions);

  // converting the client session data to string
  const serverSessionData = JSON.stringify(session);

  // converting session into boolean with double not operator
  // it will become true if the session has data
  const isLoggedIn = !!session;

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Landing isLoggedIn={isLoggedIn} />
      {isLoggedIn && <div className="w-full flex flex-col items-center justify-center relative top-[120px]">
        <h1 className="text-xl text-purple-400">Welcome! { session.user?.name }</h1>
      </div>}
      <div className="mx-4 relative top-[200px]">
        <ServerSession serverSessionData={serverSessionData} />
        <ClientSession />
      </div>
    </div>
  );
}
