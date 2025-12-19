import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Activity, CheckCircle, XCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                // Fetch all generic for now if user specific fails or is empty, 
                // but ideally: `/api/grievances/user/${user.userId}`
                const userId = user?.userId || user?.id; // Handle both cases from AuthController response
                if (userId) {
                    const res = await axios.get(`http://localhost:8080/api/grievances/user/${userId}`);
                    setComplaints(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch complaints", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchComplaints();
    }, [user]);

    return (
        <div className="p-8 md:p-12 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                    My Dashboard
                    <span className="block text-sm font-sans font-normal text-gray-500 mt-2">Welcome back, {user?.fullName}</span>
                </h2>
                <button className="btn-primary" onClick={() => window.location.href = '/raise-grievance'}>
                    + New Complaint
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Complaints" value={complaints.length} icon={<FileText className="text-gray-400" />} />
                <StatCard title="Pending" value={complaints.filter(c => c.status === 'Pending').length} color="text-yellow-600" icon={<Activity className="text-yellow-500" />} />
                <StatCard title="Resolved" value={complaints.filter(c => c.status === 'Resolved').length} color="text-green-600" icon={<CheckCircle className="text-green-500" />} />
                <StatCard title="Rejected" value={complaints.filter(c => c.status === 'Rejected').length} color="text-red-500" icon={<XCircle className="text-red-400" />} />
            </div>

            {/* Complaints List */}
            <h3 className="text-xl font-bold mb-6 text-gray-800">Recent Activity</h3>
            <div className="space-y-4">
                {loading ? <p>Loading...</p> : complaints.length === 0 ? <p className="text-gray-500">No complaints found. Raise one to improve your community!</p> :
                    complaints.map((complaint) => (
                        <motion.div
                            key={complaint.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card-3d flex flex-col md:flex-row items-center justify-between group"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="font-mono font-bold text-green-800 bg-green-50 px-2 py-1 rounded">#{complaint.id}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {complaint.status}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-1">{complaint.category}</h4>
                                <p className="text-sm text-gray-500">{complaint.description}</p>
                                <p className="text-xs text-gray-400 mt-1">Raised on: {complaint.dateRaised}</p>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, color, icon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
    >
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className={`text-3xl font-bold ${color || 'text-gray-900'}`}>{value}</h3>
        </div>
        <div className="bg-gray-50 p-3 rounded-full">
            {icon}
        </div>
    </motion.div>
);

export default Dashboard;
