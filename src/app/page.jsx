
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  CalendarDays,
  Users,
  BedDouble,
  MapPin
} from 'lucide-react';

import { db, configured } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

/* =========================================
   IMAGES
========================================= */

const photo = {
  hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=85',

  dine: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1100&q=85',

  bar: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1100&q=85',

  room: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1100&q=85',

  food: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1100&q=85',

  interior: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1100&q=85'
};

/* =========================================
   EXPERIENCE CARDS
========================================= */

const categories = [
  {
    name: 'THE KITCHEN',
    title: 'Taste the moment.',
    img: photo.dine,
    description: 'An inviting place to meet over food and conversation.'
  },
  {
    name: 'THE BAR',
    title: 'After dark.',
    img: photo.bar,
    description: 'Atmosphere, music and evenings worth remembering.'
  },
  {
    name: 'THE ROOMS',
    title: 'Stay a little longer.',
    img: photo.room,
    description: 'Make the night part of your getaway.'
  }
];

/* =========================================
   GALLERY
========================================= */

const galleryImages = [
  photo.interior,
  photo.bar,
  photo.room,
  photo.dine,
  photo.food
];

/* =========================================
   BOOKING FORM
========================================= */

const initialForm = {
  destination: 'City Inn',
  name: '',
  phone: '',
  checkin: '',
  checkout: '',
  guests: '2',
  room: 'Standard room',
  notes: ''
};

/* =========================================
   ANIMATION
========================================= */

const rise = {
  initial: {
    opacity: 0,
    y: 36
  },

  whileInView: {
    opacity: 1,
    y: 0
  },

  viewport: {
    once: true,
    amount: 0.15
  },

  transition: {
    duration: 0.7
  }
};

/* =========================================
   HOMEPAGE
========================================= */

export default function Home() {

  const [menu, setMenu] = useState(false);

  const [lightbox, setLightbox] = useState(-1);

  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  /* Update form fields */

  const update = (key, value) => {
    setForm(previous => ({
      ...previous,
      [key]: value
    }));

    setStatus('');
  };

  /* Scroll to booking */

  const goToBooking = () => {
    document.getElementById('hero-booking')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    setMenu(false);
  };

  /* Find rooms */

  const findRooms = () => {

    if (!form.destination.trim()) {
      setStatus('Please enter your destination.');
      return;
    }

    if (!form.checkin || !form.checkout) {
      setStatus('Please select your check-in and check-out dates.');
      return;
    }

    if (new Date(form.checkout) <= new Date(form.checkin)) {
      setStatus('Check-out must be after check-in.');
      return;
    }

    setStatus('');
    setShowDetails(true);
  };

  /* Submit booking enquiry to Firebase */

  async function submit(e) {

    e.preventDefault();

    if (new Date(form.checkout) <= new Date(form.checkin)) {
      setStatus('Check-out must be after check-in.');
      return;
    }

    if (!configured) {
      setStatus(
        'Demo mode: connect Firebase to send enquiries to the admin dashboard.'
      );
      return;
    }

    try {

      setSubmitting(true);
      setStatus('');

      await addDoc(collection(db, 'bookingRequests'), {
        ...form,
        status: 'new',
        createdAt: serverTimestamp()
      });

      setStatus(
        'Your enquiry has been submitted successfully! Our team will contact you to confirm availability and pricing.'
      );

      setForm(initialForm);

    } catch (error) {

      console.error('Booking enquiry error:', error);

      setStatus(
        'Could not send your enquiry. Please try again.'
      );

    } finally {

      setSubmitting(false);

    }
  }

  return (
    <>

      {/* =====================================
          NAVIGATION
      ===================================== */}

      <header className="nav">

        <a className="logo" href="#top">
          CITY <em>INN</em>
          <small>RESTAURANT · BAR · STAY</small>
        </a>

        <nav className={menu ? 'links open' : 'links'}>

          <a onClick={() => setMenu(false)} href="#experience">
            Experience
          </a>

          <a onClick={() => setMenu(false)} href="#dining">
            Dining & bar
          </a>

          <a onClick={() => setMenu(false)} href="#rooms">
            Rooms
          </a>

          <a onClick={() => setMenu(false)} href="#gallery">
            Gallery
          </a>

          <a onClick={() => setMenu(false)} href="#reviews">
            Reviews
          </a>

          <a onClick={() => setMenu(false)} href="#contact">
            Contact
          </a>

        </nav>

        <button
          className="nav-book"
          onClick={goToBooking}
          type="button"
        >
          BOOK A STAY
          <ArrowUpRight size={17} />
        </button>

        <button
          className="hamb"
          aria-label="Toggle navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>

      </header>


      <main id="top">

        {/* =====================================
            HERO + BOOKING SEARCH BAR
        ===================================== */}

        <section className="hero hero-booking-layout">

          <img
            src={photo.hero}
            alt="City Inn restaurant interior"
          />

          <div className="hero-shade" />

          <div className="hero-side">
            AN EXPERIENCE IN EVERY MOMENT
            <span>—</span>
            EST. YOUR NEXT VISIT
          </div>

          {/* Hero heading */}

          <motion.div
            className="hero-copy"

            initial={{
              opacity: 0,
              y: 45
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 1
            }}
          >

            <p className="eyebrow">
              WELCOME TO CITY INN
            </p>

            <h1>
              Eat well.
              <br />
              <i>Stay late.</i>
              <br />
              Feel alive.
            </h1>

            <div className="hero-actions">

              <a
                className="gold-btn"
                href="#experience"
              >
                EXPLORE CITY INN
                <ArrowUpRight size={19} />
              </a>

              <button
                type="button"
                className="line-btn hero-reserve-button"
                onClick={goToBooking}
              >
                RESERVE YOUR ROOM
                <ArrowRight size={18} />
              </button>

            </div>

          </motion.div>

          <div className="hero-stamp">
            DINE <b>✳</b> DRINK <b>✳</b> STAY
          </div>


          {/* =================================
              BOOKING SEARCH PANEL
          ================================= */}

          <motion.div
            className="hero-booking-panel"
            id="hero-booking"

            initial={{
              opacity: 0,
              y: 25
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.8,
              delay: 0.3
            }}
          >

            <div className="booking-search-heading">

              <p className="eyebrow dark">
                YOUR NEXT STAY STARTS HERE
              </p>

              <h2>
                Find your place at <i>CITY INN.</i>
              </h2>

            </div>


            {/* Search fields */}

            <div className="booking-search-bar">

              <label className="search-field destination-field">

                <span>
                  <MapPin size={16} />
                  DESTINATION
                </span>

                <input
                  type="text"
                  value={form.destination}
                  onChange={e => update('destination', e.target.value)}
                  placeholder="Where would you like to stay?"
                  required
                />

              </label>


              <label className="search-field">

                <span>
                  <CalendarDays size={16} />
                  CHECK IN
                </span>

                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={form.checkin}
                  onChange={e => update('checkin', e.target.value)}
                  required
                />

              </label>


              <label className="search-field">

                <span>
                  <CalendarDays size={16} />
                  CHECK OUT
                </span>

                <input
                  type="date"
                  min={
                    form.checkin ||
                    new Date().toISOString().split('T')[0]
                  }
                  value={form.checkout}
                  onChange={e => update('checkout', e.target.value)}
                  required
                />

              </label>


              <label className="search-field guests-field">

                <span>
                  <Users size={16} />
                  GUESTS
                </span>

                <select
                  value={form.guests}
                  onChange={e => update('guests', e.target.value)}
                >

                  {[1, 2, 3, 4, 5, 6].map(number => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}

                </select>

              </label>


              <button
                type="button"
                className="find-rooms-button"
                onClick={findRooms}
              >
                <ArrowRight size={19} />
                FIND ROOMS
              </button>

            </div>


            {/* Bottom strip */}

            <div className="booking-search-bottom">

              <span>
                <BedDouble size={17} />
                A comfortable stay, a memorable experience.
              </span>

              <span>
                ROOMS · DINING · BAR
              </span>

            </div>


            {/* =================================
                GUEST DETAILS
            ================================= */}

            {showDetails && (

              <form
                id="guest-details"
                className="guest-details-panel"
                onSubmit={submit}
              >

                <div className="guest-details-heading">

                  <div>

                    <span>
                      YOUR STAY / NEXT STEP
                    </span>

                    <h3>
                      Complete your enquiry
                    </h3>

                  </div>

                  <button
                    type="button"
                    className="close-details"
                    onClick={() => setShowDetails(false)}
                    aria-label="Close guest details"
                  >
                    <X size={18} />
                  </button>

                </div>


                <div className="guest-details-grid">

                  <label>
                    YOUR NAME

                    <input
                      required
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Full name"
                      autoComplete="name"
                    />
                  </label>


                  <label>
                    PHONE NUMBER

                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="Contact number"
                      autoComplete="tel"
                    />
                  </label>


                  <label>
                    ROOM PREFERENCE

                    <select
                      value={form.room}
                      onChange={e => update('room', e.target.value)}
                    >
                      <option>Standard room</option>
                      <option>Deluxe room</option>
                      <option>Any available room</option>
                    </select>
                  </label>


                  <label>
                    SPECIAL REQUESTS

                    <input
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      placeholder="Optional requests"
                    />
                  </label>

                </div>


                <button
                  className="gold-btn guest-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? 'SENDING...'
                    : 'SUBMIT BOOKING ENQUIRY'}

                  <ArrowUpRight size={18} />
                </button>


                <p className="hero-form-status" role="status">
                  {status ||
                    'Your stay is subject to availability and confirmation by CITY INN.'}
                </p>

              </form>

            )}


            {!showDetails && status && (

              <p className="hero-form-status search-error" role="status">
                {status}
              </p>

            )}

          </motion.div>

        </section>


        {/* =====================================
            TICKER
        ===================================== */}

        <div className="ticker">

          <div>
            GOOD FOOD ✳ GOOD COMPANY ✳ GOOD NIGHTS ✳ CITY INN ✳
            GOOD FOOD ✳ GOOD COMPANY ✳ GOOD NIGHTS ✳ CITY INN ✳
          </div>

        </div>


        {/* =====================================
            INTRODUCTION
        ===================================== */}

        <section
          className="intro section"
          id="experience"
        >

          <motion.div {...rise}>

            <p className="eyebrow dark">
              THE CITY INN WAY / 001
            </p>

            <h2>
              Not just a place.
              <br />
              <i>A whole mood.</i>
            </h2>

          </motion.div>


          <motion.div
            {...rise}
            className="intro-right"
          >

            <p>
              One destination, three ways to enjoy it.
              Discover a welcoming restaurant, a lively bar
              atmosphere and rooms for a relaxed overnight stay.
            </p>

            <a
              href="#dining"
              className="under-link"
            >
              DISCOVER THE EXPERIENCE
              <ArrowUpRight size={17} />
            </a>

          </motion.div>

          <span className="intro-mark">
            ✳
          </span>

        </section>


        {/* =====================================
            EXPERIENCE CARDS
        ===================================== */}

        <section
          className="experiences"
          id="dining"
        >

          <div className="section-top">

            <span>02 / DISCOVER</span>

            <span>THREE WAYS TO CITY INN</span>

          </div>


          <div className="experience-grid">

            {categories.map((category, index) => (

              <motion.a
                {...rise}

                href={index === 2 ? '#rooms' : '#contact'}

                className={`experience-card exp-${index}`}

                key={category.name}
              >

                <img
                  src={category.img}
                  alt={category.name.toLowerCase()}
                />

                <div className="card-shade" />

                <div className="card-top">

                  <span>0{index + 1}</span>

                  <ArrowUpRight />

                </div>

                <div className="card-copy">

                  <p>{category.name}</p>

                  <h3>{category.title}</h3>

                  <span>{category.description}</span>

                </div>

              </motion.a>

            ))}

          </div>

        </section>


        {/* =====================================
            ROOMS
        ===================================== */}

        <section
          className="feature-split"
          id="rooms"
        >

          <motion.div
            {...rise}
            className="feature-image"
          >

            <img
              src={photo.room}
              alt="Illustrative hotel room"
            />

            <div className="photo-label">
              THE STAY EDITION — 03
            </div>

          </motion.div>


          <motion.div
            {...rise}
            className="feature-text"
          >

            <p className="eyebrow dark">
              ROOMS & STAYS
            </p>

            <h2>
              Your night.
              <br />
              <i>Your pace.</i>
            </h2>

            <p>
              Planning to stay over? Send your dates and preferences.
              Our team can confirm available rooms and rates.
            </p>


            <div className="room-perks">

              <span>
                <BedDouble />
                Room enquiries
              </span>

              <span>
                <CalendarDays />
                Date selection
              </span>

              <span>
                <Users />
                Guest details
              </span>

            </div>


            <button
              type="button"
              className="dark-btn"
              onClick={goToBooking}
            >
              REQUEST A ROOM
              <ArrowUpRight size={17} />
            </button>

          </motion.div>

        </section>


        {/* =====================================
            DINING FEATURE
        ===================================== */}

        <section className="menu-feature">

          <div className="menu-left">

            <p className="eyebrow">
              THE FLAVOURS
            </p>

            <h2>
              Gather.
              <br />
              <i>Indulge.</i>
              <br />
              Repeat.
            </h2>

            <p>
              From shared meals to a relaxed evening at the bar,
              CITY INN is made for moments together.
            </p>

            <a
              href="#contact"
              className="under-link light"
            >
              ASK ABOUT DINING
              <ArrowUpRight size={18} />
            </a>

          </div>


          <div className="menu-photo">

            <img
              src={photo.food}
              alt="Illustrative plated food"
            />

            <span>
              THE TABLE IS YOURS
            </span>

          </div>


          <div className="menu-index">
            GOOD TIMES / EVERY TIME
          </div>

        </section>


        {/* =====================================
            GALLERY
        ===================================== */}

        <section
          className="gallery section"
          id="gallery"
        >

          <div className="gallery-head">

            <div>

              <p className="eyebrow dark">
                A LOOK INSIDE / 004
              </p>

              <h2>
                Scenes from
                <br />
                <i>the feeling.</i>
              </h2>

            </div>

          </div>


          <div className="gallery-grid">

            {galleryImages.map((src, index) => (

              <button
                key={src}

                onClick={() => setLightbox(index)}

                className={`gallery-item gallery-${index}`}

                aria-label={`Open gallery image ${index + 1}`}
              >

                <img
                  src={src}
                  alt={`City Inn hospitality gallery ${index + 1}`}
                />

                <span>
                  <ArrowUpRight />
                </span>

              </button>

            ))}

          </div>

        </section>


        {/* =====================================
            GUEST REVIEWS
        ===================================== */}

        <section
          className="reviews-section"
          id="reviews"
        >

          <div className="reviews-heading">

            <div>

              <p className="eyebrow dark">
                THE CITY INN EXPERIENCE / 006
              </p>

              <h2>
                Good times.
                <br />
                <i>Great memories.</i>
              </h2>

            </div>


            <div className="reviews-heading-right">

              <div className="reviews-stars">
                ★★★★★
              </div>

              <p>
                Every visit has a story.
              </p>

            </div>

          </div>


          <div className="reviews-grid">


            {/* Review 1 */}

            <motion.article
              {...rise}
              className="review-card review-featured"
            >

              <div className="review-card-top">

                <span className="review-quote">
                  “
                </span>

                <span className="review-stars">
                  ★★★★★
                </span>

              </div>


              <p className="review-text">
                A wonderful atmosphere, beautiful interiors
                and a place that makes you want to stay a
                little longer. Looking forward to visiting again!
              </p>


              <div className="review-author">

                <div className="review-avatar">
                  G
                </div>

                <div>
                  <strong>Guest Review</strong>
                  <span>Restaurant experience</span>
                </div>

              </div>

            </motion.article>


            {/* Review 2 */}

            <motion.article
              {...rise}
              className="review-card"
            >

              <div className="review-card-top">

                <span className="review-quote">
                  “
                </span>

                <span className="review-stars">
                  ★★★★★
                </span>

              </div>


              <p className="review-text">
                A lovely setting for spending time with friends
                and family. The overall ambience makes the
                experience special.
              </p>


              <div className="review-author">

                <div className="review-avatar">
                  G
                </div>

                <div>
                  <strong>Guest Review</strong>
                  <span>Dining experience</span>
                </div>

              </div>

            </motion.article>


            {/* Review 3 */}

            <motion.article
              {...rise}
              className="review-card"
            >

              <div className="review-card-top">

                <span className="review-quote">
                  “
                </span>

                <span className="review-stars">
                  ★★★★★
                </span>

              </div>


              <p className="review-text">
                A comfortable place to unwind and enjoy
                a relaxed evening. The atmosphere is what
                makes it memorable.
              </p>


              <div className="review-author">

                <div className="review-avatar">
                  G
                </div>

                <div>
                  <strong>Guest Review</strong>
                  <span>Stay experience</span>
                </div>

              </div>

            </motion.article>


          </div>


          <div className="reviews-bottom">

            <span>
              GOOD EXPERIENCES ARE MEANT TO BE SHARED.
            </span>

            <button
              type="button"
              onClick={goToBooking}
            >
              PLAN YOUR VISIT
              <ArrowUpRight size={17} />
            </button>

          </div>


          <p className="reviews-demo-note">
            Sample testimonials for design preview.
            Replace with verified customer reviews before publishing.
          </p>

        </section>


        {/* =====================================
            CONTACT
        ===================================== */}

        <section
          className="contact section"
          id="contact"
        >

          <p className="eyebrow dark">
            COME FIND US
          </p>

          <h2>
            See you
            <br />
            <i>at CITY INN.</i>
          </h2>


          <div className="contact-grid">

            <div>

              <span>VISIT</span>

              <p>Address to be added</p>

            </div>


            <div>

              <span>CALL</span>

              <p>Phone number to be added</p>

            </div>


            <div>

              <span>FOLLOW</span>

              <p>Instagram link to be added</p>

            </div>

          </div>


          <p className="contact-note">
            Business address, opening hours, contact number
            and social links are pending confirmation.
          </p>

        </section>

      </main>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <div className="footer-logo">

          CITY <i>IN</i>

          <span>
            COME AS YOU ARE. STAY FOR THE FEELING.
          </span>

        </div>


        <div className="footer-right">

          <a href="#top">
            BACK TO TOP ↑
          </a>

          <a href="/admin">
            ADMIN LOGIN
          </a>

          <span>
            © {new Date().getFullYear()} CITY INN
          </span>

        </div>

      </footer>


      {/* =====================================
          GALLERY LIGHTBOX
      ===================================== */}

      <AnimatePresence>

        {lightbox >= 0 && (

          <motion.div
            className="lightbox"

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            exit={{
              opacity: 0
            }}

            role="dialog"
            aria-modal="true"
          >

            <button
              className="lightbox-close"
              onClick={() => setLightbox(-1)}
              aria-label="Close gallery"
            >
              <X />
            </button>


            <button
              onClick={() => setLightbox((lightbox + 4) % 5)}
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>


            <img
              src={galleryImages[lightbox]}
              alt="Expanded hospitality photograph"
            />


            <button
              onClick={() => setLightbox((lightbox + 1) % 5)}
              aria-label="Next image"
            >
              <ArrowRight />
            </button>


            <span>
              {lightbox + 1} / 5
            </span>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}
