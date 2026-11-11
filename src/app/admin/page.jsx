
'use client';

import { useState } from 'react';

import {
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Plus,
  Trash2,
  ArrowUpRight,
  Hotel,
  Phone,
  MapPin,
  Mail,
  Pencil,
  Save,
  ChevronRight,
  UserRound
} from 'lucide-react';


/* =========================================
   DEMO DATA
========================================= */

const initialBookings = [
  {
    id: 1,
    guest: 'Aarav Sharma',
    phone: '9876543210',
    email: 'aarav@example.com',
    room: 'Deluxe Room',
    checkIn: '2026-11-12',
    checkOut: '2026-11-14',
    guests: 2,
    amount: 4500,
    status: 'Confirmed'
  },
  {
    id: 2,
    guest: 'Priya Mehta',
    phone: '9876543211',
    email: 'priya@example.com',
    room: 'Premium Suite',
    checkIn: '2026-11-14',
    checkOut: '2026-11-16',
    guests: 3,
    amount: 7500,
    status: 'Pending'
  },
  {
    id: 3,
    guest: 'Rahul Verma',
    phone: '9876543212',
    email: 'rahul@example.com',
    room: 'Standard Room',
    checkIn: '2026-11-15',
    checkOut: '2026-11-17',
    guests: 2,
    amount: 3000,
    status: 'Pending'
  },
  {
    id: 4,
    guest: 'Ananya Gupta',
    phone: '9876543213',
    email: 'ananya@example.com',
    room: 'Deluxe Room',
    checkIn: '2026-11-17',
    checkOut: '2026-11-19',
    guests: 2,
    amount: 4500,
    status: 'Cancelled'
  }
];

const initialRooms = [
  {
    id: 1,
    name: 'Standard Room',
    price: 3000,
    capacity: 2,
    available: 5,
    description: 'Comfortable room for a relaxing stay.'
  },
  {
    id: 2,
    name: 'Deluxe Room',
    price: 4500,
    capacity: 3,
    available: 4,
    description: 'Spacious room with premium amenities.'
  },
  {
    id: 3,
    name: 'Premium Suite',
    price: 7500,
    capacity: 4,
    available: 2,
    description: 'An elevated experience with extra comfort.'
  }
];

const navigation = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Bookings',
    icon: CalendarDays
  },
  {
    name: 'Rooms',
    icon: BedDouble
  },
  {
    name: 'Customers',
    icon: Users
  },
  {
    name: 'Settings',
    icon: Settings
  }
];

const initialSettings = {
  hotelName: 'CITY IN',
  tagline: 'Restaurant · Bar · Stay',
  email: 'cityin@example.com',
  phone: '',
  address: '',
  instagram: ''
};


/* =========================================
   HELPERS
========================================= */

const formatDate = (date) => {
  if (!date) return '—';

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    'en-IN',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  );
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};


/* =========================================
   MAIN ADMIN COMPONENT
========================================= */

export default function AdminPage() {

  const [tab, setTab] = useState('Dashboard');

  const [bookings, setBookings] = useState(initialBookings);

  const [rooms, setRooms] = useState(initialRooms);

  const [settings, setSettings] = useState(initialSettings);

  const [menuOpen, setMenuOpen] = useState(false);

  const [editingSettings, setEditingSettings] = useState(false);

  const [search, setSearch] = useState('');

  const [bookingFilter, setBookingFilter] = useState('All');

  const [notice, setNotice] = useState('');


  /* =====================================
     NAVIGATION
  ===================================== */

  const changeTab = (name) => {
    setTab(name);
    setMenuOpen(false);
    setSearch('');
    setNotice('');
  };


  /* =====================================
     BOOKING HANDLERS
  ===================================== */

  const updateBookingStatus = (id, status) => {

    setBookings(previous =>
      previous.map(booking =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );

    setNotice('Booking status updated successfully.');
  };


  /* =====================================
     ROOM HANDLERS
  ===================================== */

  const addRoom = () => {

    const name = window.prompt('Enter room name:');

    if (!name || !name.trim()) return;

    const price = Number(
      window.prompt('Enter room price in INR:')
    );

    if (!Number.isFinite(price) || price <= 0) {
      window.alert('Please enter a valid room price.');
      return;
    }

    const newRoom = {
      id: Date.now(),
      name: name.trim(),
      price,
      capacity: 2,
      available: 1,
      description: 'New room. Update its details as required.'
    };

    setRooms(previous => [...previous, newRoom]);

    setNotice('New room added successfully.');
  };


  const removeRoom = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to remove this room?'
    );

    if (!confirmed) return;

    setRooms(previous =>
      previous.filter(room => room.id !== id)
    );

    setNotice('Room removed successfully.');
  };


  /* =====================================
     SETTINGS HANDLERS
  ===================================== */

  const updateSetting = (key, value) => {

    setSettings(previous => ({
      ...previous,
      [key]: value
    }));

  };


  const saveSettings = () => {

    setEditingSettings(false);

    setNotice(
      'Settings updated in this demo session.'
    );

  };


  /* =====================================
     DERIVED DATA
  ===================================== */

  const confirmedBookings = bookings.filter(
    booking => booking.status === 'Confirmed'
  );

  const pendingBookings = bookings.filter(
    booking => booking.status === 'Pending'
  );

  const cancelledBookings = bookings.filter(
    booking => booking.status === 'Cancelled'
  );

  const totalRevenue = confirmedBookings.reduce(
    (total, booking) => total + booking.amount,
    0
  );

  const uniqueCustomers = [
    ...new Map(
      bookings.map(booking => [
        booking.phone,
        booking
      ])
    ).values()
  ];


  const filteredBookings = bookings.filter(booking => {

    const matchesSearch = [
      booking.guest,
      booking.phone,
      booking.room
    ].some(value =>
      String(value).toLowerCase().includes(search.toLowerCase())
    );

    const matchesFilter =
      bookingFilter === 'All' ||
      booking.status === bookingFilter;

    return matchesSearch && matchesFilter;

  });


  /* =====================================
     STATUS BADGE
  ===================================== */

  const StatusBadge = ({ status }) => {

    const className =
      status === 'Confirmed'
        ? 'status-confirmed'
        : status === 'Pending'
          ? 'status-pending'
          : 'status-cancelled';

    return (
      <span className={`admin-status ${className}`}>
        {status}
      </span>
    );
  };


  /* =====================================
     BOOKING TABLE
  ===================================== */

  const BookingTable = ({ data }) => {

    if (!data.length) {
      return (
        <div className="admin-empty">
          <CalendarDays size={35} />
          <h3>No bookings found</h3>
          <p>Try changing your search or filter.</p>
        </div>
      );
    }

    return (
      <div className="admin-scroll">

        <table className="admin-table">

          <thead>
            <tr>
              <th>GUEST</th>
              <th>ROOM</th>
              <th>CHECK IN</th>
              <th>CHECK OUT</th>
              <th>GUESTS</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>

            {data.map(booking => (

              <tr key={booking.id}>

                <td>
                  <div className="admin-guest">
                    <div className="admin-avatar">
                      {booking.guest.charAt(0)}
                    </div>

                    <div>
                      <strong>{booking.guest}</strong>
                      <small>{booking.phone}</small>
                    </div>
                  </div>
                </td>

                <td>{booking.room}</td>

                <td>{formatDate(booking.checkIn)}</td>

                <td>{formatDate(booking.checkOut)}</td>

                <td>{booking.guests}</td>

                <td className="admin-amount">
                  {formatCurrency(booking.amount)}
                </td>

                <td>
                  <StatusBadge status={booking.status} />
                </td>

                <td>

                  <select
                    className="status-select"
                    value={booking.status}
                    onChange={e =>
                      updateBookingStatus(
                        booking.id,
                        e.target.value
                      )
                    }
                    aria-label={`Change status for ${booking.guest}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    );
  };


  /* =====================================
     STAT CARD
  ===================================== */

  const StatCard = ({
    title,
    value,
    icon: Icon,
    subtitle,
    className = ''
  }) => (

    <div className={`admin-stat-card ${className}`}>

      <div className="admin-stat-top">

        <span>{title}</span>

        <div className="admin-stat-icon">
          <Icon size={20} />
        </div>

      </div>

      <h2>{value}</h2>

      <p>{subtitle}</p>

    </div>

  );


  /* =====================================
     PAGE CONTENT
  ===================================== */

  const renderContent = () => {

    switch (tab) {


      /* =================================
         DASHBOARD
      ================================= */

      case 'Dashboard':

        return (

          <>

            <div className="admin-page-heading">

              <div>
                <p className="admin-kicker">
                  OVERVIEW / CITY IN
                </p>

                <h1>Dashboard</h1>

                <p className="admin-sub">
                  Welcome to your hotel management dashboard.
                </p>
              </div>

              <button
                className="admin-primary-button"
                onClick={() => changeTab('Bookings')}
              >
                VIEW BOOKINGS
                <ArrowUpRight size={17} />
              </button>

            </div>


            {/* Statistics */}

            <div className="admin-stats">

              <StatCard
                title="TOTAL BOOKINGS"
                value={bookings.length}
                icon={CalendarDays}
                subtitle="All demo booking records"
              />

              <StatCard
                title="CONFIRMED BOOKINGS"
                value={confirmedBookings.length}
                icon={CheckCircle}
                subtitle="Confirmed reservations"
              />

              <StatCard
                title="PENDING BOOKINGS"
                value={pendingBookings.length}
                icon={Clock}
                subtitle="Awaiting confirmation"
              />

              <StatCard
                title="TOTAL REVENUE"
                value={formatCurrency(totalRevenue)}
                icon={IndianRupee}
                subtitle="From confirmed demo bookings"
              />

            </div>


            {/* Dashboard content */}

            <div className="admin-dashboard-grid">

              <section className="admin-panel">

                <div className="admin-panel-heading">

                  <div>
                    <p className="admin-kicker">
                      RECENT ACTIVITY
                    </p>

                    <h2>Recent bookings</h2>
                  </div>

                  <button
                    className="admin-text-button"
                    onClick={() => changeTab('Bookings')}
                  >
                    View all
                    <ChevronRight size={16} />
                  </button>

                </div>

                <BookingTable
                  data={bookings.slice(0, 4)}
                />

              </section>


              <section className="admin-panel admin-overview-panel">

                <p className="admin-kicker">
                  PROPERTY OVERVIEW
                </p>

                <h2>At a glance</h2>

                <div className="overview-row">
                  <span>
                    <BedDouble size={17} />
                    Total room types
                  </span>
                  <strong>{rooms.length}</strong>
                </div>

                <div className="overview-row">
                  <span>
                    <Users size={17} />
                    Unique customers
                  </span>
                  <strong>{uniqueCustomers.length}</strong>
                </div>

                <div className="overview-row">
                  <span>
                    <XCircle size={17} />
                    Cancelled bookings
                  </span>
                  <strong>{cancelledBookings.length}</strong>
                </div>

                <div className="overview-row">
                  <span>
                    <Hotel size={17} />
                    Total rooms listed
                  </span>
                  <strong>
                    {rooms.reduce(
                      (total, room) => total + room.available,
                      0
                    )}
                  </strong>
                </div>

                <div className="admin-overview-note">
                  <TrendingUp size={18} />
                  <p>
                    Your dashboard statistics update automatically
                    when you change the demo data.
                  </p>
                </div>

              </section>

            </div>

          </>

        );


      /* =================================
         BOOKINGS
      ================================= */

      case 'Bookings':

        return (

          <>

            <div className="admin-page-heading">

              <div>
                <p className="admin-kicker">
                  RESERVATION MANAGEMENT
                </p>

                <h1>Bookings</h1>

                <p className="admin-sub">
                  View and manage all room enquiries.
                </p>
              </div>

            </div>


            <div className="admin-panel">

              <div className="admin-booking-toolbar">

                <input
                  type="search"
                  placeholder="Search guest, phone or room..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />

                <select
                  value={bookingFilter}
                  onChange={e => setBookingFilter(e.target.value)}
                >
                  <option value="All">All bookings</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

              </div>


              <div className="admin-filter-summary">

                <span>
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </span>

                <span>
                  {pendingBookings.length} awaiting confirmation
                </span>

              </div>


              <BookingTable data={filteredBookings} />

            </div>

          </>

        );


      /* =================================
         ROOMS
      ================================= */

      case 'Rooms':

        return (

          <>

            <div className="admin-page-heading">

              <div>
                <p className="admin-kicker">
                  PROPERTY MANAGEMENT
                </p>

                <h1>Rooms</h1>

                <p className="admin-sub">
                  Manage room types, prices and capacity.
                </p>
              </div>

              <button
                className="admin-primary-button"
                onClick={addRoom}
              >
                <Plus size={17} />
                ADD NEW ROOM
              </button>

            </div>


            <div className="admin-room-grid">

              {rooms.map(room => (

                <div
                  className="admin-room-card"
                  key={room.id}
                >

                  <div className="admin-room-image">
                    <BedDouble size={45} />

                    <span>ROOM / {String(room.id).slice(-3)}</span>
                  </div>


                  <div className="admin-room-content">

                    <div className="admin-room-title">

                      <h3>{room.name}</h3>

                      <button
                        className="admin-delete-button"
                        onClick={() => removeRoom(room.id)}
                        aria-label={`Remove ${room.name}`}
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                    <p>{room.description}</p>

                    <div className="admin-room-info">

                      <span>
                        <Users size={15} />
                        {room.capacity} guests
                      </span>

                      <span>
                        {room.available} available
                      </span>

                    </div>

                    <div className="admin-room-price">
                      {formatCurrency(room.price)}
                      <small> / night</small>
                    </div>

                  </div>

                </div>

              ))}

            </div>


            {!rooms.length && (
              <div className="admin-empty">
                <BedDouble size={40} />
                <h3>No rooms added yet</h3>
                <p>Use Add New Room to create your first room type.</p>
              </div>
            )}

          </>

        );


      /* =================================
         CUSTOMERS
      ================================= */

      case 'Customers':

        return (

          <>

            <div className="admin-page-heading">

              <div>
                <p className="admin-kicker">
                  GUEST RELATIONSHIPS
                </p>

                <h1>Customers</h1>

                <p className="admin-sub">
                  View guest information from the demo bookings.
                </p>
              </div>

            </div>


            <div className="admin-panel">

              <div className="admin-panel-heading">

                <div>
                  <p className="admin-kicker">
                    GUEST DIRECTORY
                  </p>

                  <h2>All customers</h2>
                </div>

                <span className="admin-count">
                  {uniqueCustomers.length} customers
                </span>

              </div>


              <div className="admin-customer-grid">

                {uniqueCustomers.map(customer => (

                  <div
                    className="admin-customer-card"
                    key={customer.phone}
                  >

                    <div className="admin-customer-avatar">
                      {customer.guest.charAt(0)}
                    </div>

                    <div className="admin-customer-info">

                      <h3>{customer.guest}</h3>

                      <p>
                        <Phone size={13} />
                        {customer.phone}
                      </p>

                      <p>
                        <Mail size={13} />
                        {customer.email}
                      </p>

                    </div>

                    <div className="admin-customer-booking">
                      <span>ROOM</span>
                      <strong>{customer.room}</strong>
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </>

        );


      /* =================================
         SETTINGS
      ================================= */

      case 'Settings':

        return (

          <>

            <div className="admin-page-heading">

              <div>
                <p className="admin-kicker">
                  PROPERTY CONFIGURATION
                </p>

                <h1>Settings</h1>

                <p className="admin-sub">
                  Manage your hotel information.
                </p>
              </div>

              {!editingSettings ? (

                <button
                  className="admin-primary-button"
                  onClick={() => setEditingSettings(true)}
                >
                  <Pencil size={16} />
                  EDIT DETAILS
                </button>

              ) : (

                <button
                  className="admin-primary-button"
                  onClick={saveSettings}
                >
                  <Save size={16} />
                  SAVE CHANGES
                </button>

              )}

            </div>


            <div className="admin-panel admin-settings-panel">

              <div className="admin-panel-heading">

                <div>
                  <p className="admin-kicker">
                    HOTEL INFORMATION
                  </p>

                  <h2>Property details</h2>
                </div>

                <Hotel size={30} />

              </div>


              <div className="admin-settings-grid">

                <label>
                  HOTEL NAME

                  <input
                    disabled={!editingSettings}
                    value={settings.hotelName}
                    onChange={e =>
                      updateSetting('hotelName', e.target.value)
                    }
                  />

                </label>


                <label>
                  TAGLINE

                  <input
                    disabled={!editingSettings}
                    value={settings.tagline}
                    onChange={e =>
                      updateSetting('tagline', e.target.value)
                    }
                  />

                </label>


                <label>
                  EMAIL ADDRESS

                  <input
                    disabled={!editingSettings}
                    type="email"
                    value={settings.email}
                    onChange={e =>
                      updateSetting('email', e.target.value)
                    }
                  />

                </label>


                <label>
                  PHONE NUMBER

                  <input
                    disabled={!editingSettings}
                    value={settings.phone}
                    onChange={e =>
                      updateSetting('phone', e.target.value)
                    }
                    placeholder="Enter contact number"
                  />

                </label>


                <label className="settings-full">
                  PROPERTY ADDRESS

                  <textarea
                    disabled={!editingSettings}
                    value={settings.address}
                    onChange={e =>
                      updateSetting('address', e.target.value)
                    }
                    placeholder="Enter hotel address"
                    rows={3}
                  />

                </label>


                <label className="settings-full">
                  INSTAGRAM URL

                  <input
                    disabled={!editingSettings}
                    value={settings.instagram}
                    onChange={e =>
                      updateSetting('instagram', e.target.value)
                    }
                    placeholder="https://instagram.com/..."
                  />

                </label>

              </div>


              <div className="admin-settings-note">
                <Settings size={17} />

                <p>
                  This is a local demo dashboard. Changes are held in
                  browser memory and are not saved to Firebase.
                </p>

              </div>

            </div>

          </>

        );


      default:
        return null;

    }

  };


  /* =========================================
     MAIN LAYOUT
  ========================================= */

  return (

    <div className="admin-shell admin-layout">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className={`admin-sidebar ${menuOpen ? 'sidebar-open' : ''}`}>

        <div className="admin-brand">

          CITY <em>IN</em>

          <span>ADMINISTRATION</span>

        </div>


        <div className="admin-sidebar-label">
          MAIN MENU
        </div>


        <nav className="admin-nav">

          {navigation.map(item => {

            const Icon = item.icon;

            return (

              <button
                key={item.name}

                className={tab === item.name ? 'active' : ''}

                onClick={() => changeTab(item.name)}
              >

                <Icon size={18} />

                <span>{item.name}</span>

                {tab === item.name && (
                  <ChevronRight
                    className="admin-nav-arrow"
                    size={15}
                  />
                )}

              </button>

            );

          })}

        </nav>


        <div className="admin-sidebar-bottom">

          <div className="admin-sidebar-profile">

            <div className="admin-profile-avatar">
              CI
            </div>

            <div>
              <strong>City In Admin</strong>
              <span>Demo account</span>
            </div>

          </div>


          <a href="/" className="admin-exit-button">
            <LogOut size={17} />
            Exit Dashboard
          </a>

        </div>

      </aside>


      {/* Mobile sidebar overlay */}

      {menuOpen && (

        <button
          className="admin-sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        />

      )}


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="admin-main">


        {/* Top bar */}

        <header className="admin-topbar">

          <div className="admin-topbar-left">

            <button
              className="admin-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle sidebar"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <div>
              <span className="admin-breadcrumb">
                CITY IN / ADMIN
              </span>

              <p>
                {tab}
              </p>
            </div>

          </div>


          <div className="admin-topbar-right">

            <span className="admin-live-indicator">
              <span />
              DEMO MODE
            </span>

            <div className="admin-top-avatar">
              CI
            </div>

          </div>

        </header>


        {/* Page content */}

        <div className="admin-content">

          {notice && (

            <div className="admin-notice">
              <CheckCircle size={17} />
              {notice}

              <button
                onClick={() => setNotice('')}
                aria-label="Dismiss notification"
              >
                <X size={15} />
              </button>
            </div>

          )}

          {renderContent()}

          <footer className="admin-footer">
            <span>© {new Date().getFullYear()} CITY IN</span>
            <span>ADMIN DEMO DASHBOARD</span>
          </footer>

        </div>

      </main>

    </div>

  );

}
