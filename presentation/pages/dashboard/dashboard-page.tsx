import { Heading } from "@/presentation/atoms/heading/heading";

export function DashboardPage() {
  return (
    <div>
      <Heading level="h1" className="mb-6">
        Dashboard
      </Heading>
      <p className="text-muted-foreground mb-8">
        Welcome to your dashboard. Here you can manage your account and view your services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">Active Services</h2>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">Support Tickets</h2>
          <p className="text-3xl font-bold">1</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-2">Invoices</h2>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Activity</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">2023-11-15</td>
                <td className="px-4 py-3">Website maintenance completed</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">2023-11-10</td>
                <td className="px-4 py-3">Invoice #1234 paid</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">2023-11-05</td>
                <td className="px-4 py-3">Support ticket #5678 opened</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
