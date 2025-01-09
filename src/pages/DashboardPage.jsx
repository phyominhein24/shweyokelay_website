import { useState } from "react";

const bookedTickets = [
  {
    id: 1,
    busNumber: "B-1234",
    seatNumber: "A1",
    date: "2025-01-10",
    from: "Yangon",
    to: "Mandalay",
    status: "Booked",
  },
  {
    id: 2,
    busNumber: "B-5678",
    seatNumber: "B2",
    date: "2025-01-15",
    from: "Mandalay",
    to: "Nay Pyi Taw",
    status: "Pending",
  },
  {
    id: 3,
    busNumber: "B-9101",
    seatNumber: "C3",
    date: "2025-01-20",
    from: "Yangon",
    to: "Mandalay",
    status: "Rejected",
  },
  {
    id: 4,
    busNumber: "B-1234",
    seatNumber: "A1",
    date: "2025-01-10",
    from: "Yangon",
    to: "Mandalay",
    status: "Booked",
  },
  {
    id: 5,
    busNumber: "B-5678",
    seatNumber: "B2",
    date: "2025-01-15",
    from: "Mandalay",
    to: "Nay Pyi Taw",
    status: "Pending",
  },
  {
    id: 6,
    busNumber: "B-9101",
    seatNumber: "C3",
    date: "2025-01-20",
    from: "Yangon",
    to: "Mandalay",
    status: "Rejected",
  },
  // Add more tickets if needed
];

const DashboardPage = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Default: 2 items per page

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

  // Calculating ticket counts
  const totalBooked = bookedTickets.filter(
    (ticket) => ticket.status === "Booked"
  ).length;
  const totalPending = bookedTickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;
  const totalRejected = bookedTickets.filter(
    (ticket) => ticket.status === "Rejected"
  ).length;

  // Pagination Logic
  const indexOfLastTicket = currentPage * itemsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
  const currentTickets = bookedTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );

  // Change Page Handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change Items per Page Handler
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return (
    <div className="mx-auto max-w-[1280px] px-3 md:px-5 flex flex-col py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-0 mb-10">
        User Dashboard
      </h1>

      {/* User Profile Section with Ticket Counts */}
      <div className="flex gap-8 mb-10">
        {/* Ticket Count Boxes */}
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Booked Tickets
          </h3>
          <p className="text-2xl font-bold text-primary-0">{totalBooked}</p>
        </div>
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Pending Tickets
          </h3>
          <p className="text-2xl font-bold text-yellow-500">{totalPending}</p>
        </div>
        <div className="w-[200px] flex flex-col justify-center bg-white shadow-lg border border-gray-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-0 mb-3">
            Total Rejected Tickets
          </h3>
          <p className="text-2xl font-bold text-red-500">{totalRejected}</p>
        </div>

        {/* User Profile */}
        <div className="flex flex-col grow bg-white shadow-lg border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-primary-0 mb-4">
            User Profile
          </h2>
          <p className="text-sm mb-2">
            <strong>Name: </strong>
            {userProfile.name}
          </p>
          <p className="text-sm mb-4">
            <strong>Email: </strong>
            {userProfile.email}
          </p>
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Booked Tickets Table */}
      <div className="w-full bg-white shadow-lg border border-gray-200 rounded-lg p-8 mb-10">
        <div className="flex w-full justify-between items-center border-b border-b-gray-400">
          <h2 className="text-xl font-semibold text-primary-0 mb-3">
            Booked Tickets
          </h2>

          {/* Items per Page Selector */}
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
              <option className="text-center" value={2}>
                2
              </option>
              <option className="text-center" value={5}>
                5
              </option>
              <option className="text-center" value={10}>
                10
              </option>
            </select>
          </div>
        </div>

        <table className="mt-2 min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                Bus Number
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                Seat Number
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                Date
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                From
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                To
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                Status
              </th>
              <th className="px-4 py-2 border-b text-sm font-semibold text-primary-0 text-start">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-4 py-2 border-b text-sm">
                  {ticket.busNumber}
                </td>
                <td className="px-4 py-2 border-b text-sm">
                  {ticket.seatNumber}
                </td>
                <td className="px-4 py-2 border-b text-sm">{ticket.date}</td>
                <td className="px-4 py-2 border-b text-sm">{ticket.from}</td>
                <td className="px-4 py-2 border-b text-sm">{ticket.to}</td>
                <td className="px-4 py-2 border-b text-sm">{ticket.status}</td>
                <td className="px-4 py-2 border-b text-sm">
                  <button
                    onClick={() => handleTicketClick(ticket)}
                    className="text-primary-0 font-semibold hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(bookedTickets.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? "bg-primary-0 text-white"
                    : "bg-white text-primary-0"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {/* Ticket Details Modal */}
      {ticketDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-primary-0 mb-4">
              Ticket Details
            </h2>
            <p>
              <strong>Bus Number:</strong> {ticketDetails.busNumber}
            </p>
            <p>
              <strong>Seat Number:</strong> {ticketDetails.seatNumber}
            </p>
            <p>
              <strong>Date:</strong> {ticketDetails.date}
            </p>
            <p>
              <strong>From:</strong> {ticketDetails.from}
            </p>
            <p>
              <strong>To:</strong> {ticketDetails.to}
            </p>
            <button
              onClick={handleCloseTicketDetails}
              className="mt-4 w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-primary-0 mb-4">
              Update Profile
            </h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={userProfile.name}
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue={userProfile.email}
                    required
                    className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-0"
                  />
                </div>
                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-primary-0 text-white py-3 rounded-md text-base font-semibold hover:opacity-90"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
