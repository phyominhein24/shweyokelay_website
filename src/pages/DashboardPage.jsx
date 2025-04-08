import { useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../helpers/api";
import { endpoints } from "../constants/endpoints";
import { getData } from "../helpers/localstorage";
import { keys } from "../constants/config";

const DashboardPage = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const [booked, setBooked] = useState(0);
  const [pending, setPending] = useState(0);
  const [reject, setReject] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const handleTicketClick = (ticket) => {
    setTicketDetails(ticket);
  };

  const handleCloseTicketDetails = () => {
    setTicketDetails(null);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProfile = {
      name: form.name.value,
      email: form.email.value,
    };
    setUserProfile(updatedProfile);
    setIsProfileModalOpen(false);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const cancleTicket = async (e) => {
    setLoading(true);
    const result = await getRequest(`${endpoints.cancleTicket}/${e?.id}`);
    if (result.status === 200) {
      loadingData()
    } else {
      setError(true);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    const user = getData(keys.USER) ? getData(keys.USER) : 0;
    const result = await getRequest(`${endpoints.memberProfile}/${user?.id}`);
    if (result.status === 200) {
      setError(false);
      setIsAgent(result?.data?.member?.is_agent);
      setUserProfile(result?.data?.member);
      setPaymentHistory(result?.data?.payment_history);
      setBooked(result?.data?.booked);
      setPending(result?.data?.pending);
      setReject(result?.data?.reject);
    } else {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold text-primary-0">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg font-semibold mb-4">
          {error || "Something went wrong!"}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-0 text-white rounded-md hover:opacity-90"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Paginate the paymentHistory data
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = paymentHistory.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        {isAgent ? 'Agent' : 'User'} Dashboard
      </h1>

      {/* User Profile Section with Ticket Counts */}
      <div className="flex gap-8 mb-10">
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Booked Tickets
          </h3>
          <p className="text-2xl font-bold text-primary-0">{booked}</p>
        </div>
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Pending Tickets
          </h3>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
        </div>
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Rejected Tickets
          </h3>
          <p className="text-2xl font-bold text-red-500">{reject}</p>
        </div>

        <div className="flex flex-col grow bg-white shadow-lg border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-primary-0 mb-4">
            User Profile
          </h2>
          <p className="text-sm mb-2">
            <strong>Name: </strong>
            {userProfile?.name}
          </p>
          <p className="text-sm mb-2">
            <strong>Email: </strong>
            {userProfile?.email}
          </p>
          <p className="text-sm mb-4">
            <strong>Phone: </strong>
            {userProfile?.phone}
          </p>
        </div>
      </div>

      {/* Booked Tickets Table */}
      <div className="w-full bg-white shadow-lg border border-gray-200 rounded-lg p-8 mb-10">
        <div className="flex w-full justify-between items-center border-b border-b-gray-400">
          <h2 className="text-xl font-semibold text-primary-0 mb-3">
            Booked Tickets
          </h2>
          <div className="mb-3">
            <label htmlFor="itemsPerPage" className="mr-2">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border px-2 py-1 rounded-md text-center"
            >
              <option className="text-center" value={2}>2</option>
              <option className="text-center" value={5}>5</option>
              <option className="text-center" value={10}>10</option>
            </select>
          </div>
        </div>

        <table className="mt-2 min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">Bus Number</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">Seat Number</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">Date</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">From</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">To</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">Status</th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-4 py-2 border-b text-sm">{ticket.busNumber}</td>
                <td className="px-4 py-2 border-b text-sm">
                  {Array.isArray(ticket?.seat) 
                        ? ticket.seat.map(seat => `${seat.number}(${seat.type})`).join(", ") 
                        : Array.isArray(JSON.parse(ticket?.seat)) 
                          ? JSON.parse(ticket.seat).map(seat => `${seat.number}(${seat.type})`).join(", ") 
                          : "No data"}
                </td>
                <td className="px-4 py-2 border-b text-sm">
                  {ticket?.start_time ? ticket.start_time.split("T")[0] : "No date available"}
                      ({ticket?.route?.departure 
                      ? ((h, m) => `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`)
                        (...ticket.route.departure.split(":").map(Number)) 
                      : "No time available"})
                </td>
                <td className="px-4 py-2 border-b text-sm">{ticket.route?.starting_point2}</td>
                <td className="px-4 py-2 border-b text-sm">{ticket.route?.ending_point2}</td>
                <td className="px-4 py-2 border-b text-sm">
                  <span
                    className={`
                      px-2 py-1 rounded-md
                      ${ticket.status === "PENDING" ? "text-yellow-500 border-yellow-500" : ""}
                      ${ticket.status === "SUCCESS" ? "text-green-500 border-green-500" : ""}
                      ${ticket.status === "REJECT" ? "text-red-500 border-red-500" : ""}
                      border-2
                    `}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-2 border-b text-sm">
                  <div className="flex gap-3">
        
                    <button
                      className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800"
                      onClick={() => handleTicketClick(ticket)}
                    >
                      View Details
                    </button>

                    {ticket?.status === "PENDING" && (
                      <button
                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:text-red-800"
                        onClick={() => cancleTicket(ticket)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-3 mt-4">
          {Array.from({ length: Math.ceil(paymentHistory.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                currentPage === index + 1
                  ? "bg-primary-0 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {ticketDetails && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-primary-0 mb-4">
              Ticket Details
            </h2>
            <p><strong>Bus Number:</strong> {ticketDetails.busNumber}</p>
            <p><strong>Seat Number:</strong> {Array.isArray(ticketDetails?.seat) 
                        ? ticketDetails.seat.map(seat => `${seat.number}(${seat.type})`).join(", ") 
                        : Array.isArray(JSON.parse(ticketDetails?.seat)) 
                          ? JSON.parse(ticketDetails.seat).map(seat => `${seat.number}(${seat.type})`).join(", ") 
                          : "No data"}
            </p>
            <p><strong>Date:</strong>
              {ticketDetails?.start_time ? ticketDetails.start_time.split("T")[0] : "No date available"}
              ({ticketDetails?.route?.departure 
              ? ((h, m) => `${h % 12 || 12}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`)
                (...ticketDetails.route.departure.split(":").map(Number)) 
              : "No time available"})
            </p>
            <p><strong>From:</strong> {ticketDetails.route?.starting_point2}</p>
            <p><strong>To:</strong> {ticketDetails.route?.ending_point2}</p>
            <p><strong>Status:</strong>
                <span
                  className={`
                    px-2 py-1 rounded-md
                    ${ticketDetails.status === "PENDING" ? "text-yellow-500 border-yellow-500" : ""}
                    ${ticketDetails.status === "SUCCESS" ? "text-green-500 border-green-500" : ""}
                    ${ticketDetails.status === "REJECT" ? "text-red-500 border-red-500" : ""}
                    border-2
                  `}
                >
                  {ticketDetails.status}
                </span>
            </p>
            <button
              onClick={handleCloseTicketDetails}
              className="mt-4 px-4 py-2 bg-primary-0 text-white rounded-md hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
