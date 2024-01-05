import Layout from "@/components/Layout";

export default function UserManagementPage() {
  interface User {
    _id: number;
    role: string;
    username: string;
  }
  
  const users: User[] = [
    {
      _id: 1,
      username: "admin",
      role: "Admin"
    },
    {
      _id: 2,
      username: "user",
      role: "User"
    }
  ];

  return (
    <Layout>
      <main className="w-full">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">User Management</h1>
        <section className="w-full">
          <div className="flex flex-row items-center justify-between w-full border-t border-gray-300" />
          {
            users.map((user) => (
              <div key={user._id} className="flex flex-row items-center justify-between w-full px-5 py-3 border-b border-gray-300">
                <div className="flex flex-row items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="ml-3">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">User ID: {user.username}</p>
                    <p className="text-sm text-gray-500">User ID: {user._id}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <button className="px-3 py-1 transition rounded-md bg-green-500 hover:bg-green-800 text-white">Edit</button>
                  <button className="px-3 py-1 transition rounded-md bg-red-500 hover:bg-red-800 text-white ml-2">Delete</button>
                </div>
              </div>
            ))
          }
        </section>
      </main>
    </Layout>
  );
}