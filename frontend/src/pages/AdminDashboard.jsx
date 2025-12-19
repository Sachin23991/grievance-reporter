import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Shield, AlertCircle, CheckSquare, Clock } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const complaints = [
    { id: '001', citizen: 'John Doe', category: 'Roads', status: 'Pending', read: false, priority: 'High' },
    { id: '002', citizen: 'Jane Smith', category: 'Water', status: 'Action Taken', read: true, priority: 'Medium' },
    { id: '003', citizen: 'Rahul Kumar', category: 'Sanitation', status: 'Resolved', read: true, priority: 'Low' },
  ];

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen pt-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Authority Dashboard</h2>
          <p className="text-gray-500">Manage public grievances and assign actions.</p>
        </div>
        <div className="flex gap-4">
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> Online
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricBox title="Total Complaints" value="152" icon={<Shield className="text-gray-400" />} />
        <MetricBox title="Escalated" value="12" valueColor="text-red-600" icon={<AlertCircle className="text-red-400" />} />
        <MetricBox title="Unread" value="45" valueColor="text-yellow-600" icon={<Clock className="text-yellow-400" />} />
        <MetricBox title="Resolved" value="95" valueColor="text-green-600" icon={<CheckSquare className="text-green-400" />} />
      </div>

      {/* Management Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-50 text-green-900 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="p-4 border-b border-green-100">ID</th>
                <th className="p-4 border-b border-green-100">Citizen</th>
                <th className="p-4 border-b border-green-100">Category</th>
                <th className="p-4 border-b border-green-100">Read Status</th>
                <th className="p-4 border-b border-green-100">Status</th>
                <th className="p-4 border-b border-green-100">Priority</th>
                <th className="p-4 border-b border-green-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono font-medium text-gray-600">#{c.id}</td>
                  <td className="p-4 font-medium">{c.citizen}</td>
                  <td className="p-4 text-gray-600">{c.category}</td>
                  <td className="p-4">
                    {c.read ? (
                      <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">✔ Read</span>
                    ) : (
                      <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded">● Unread</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                        c.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium">{c.priority}</td>
                  <td className="p-4">
                    <button className="text-green-700 hover:text-green-900 font-medium text-sm border border-green-200 hover:bg-green-50 px-3 py-1 rounded transition-colors">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ title, value, valueColor, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
      {icon}
    </div>
    <h3 className={`text-4xl font-bold ${valueColor || 'text-gray-900'}`}>{value}</h3>
  </div>
);

export default AdminDashboard;
