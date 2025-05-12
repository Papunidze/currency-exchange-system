'use client';

import Link from 'next/link';
import { JSX, useState, useEffect } from 'react';

import { BellIcon, SearchIcon, Icon } from '@app-shared/icons';
import CreateForm from '@app-shared/ui/form';

import { contactSchema } from './action';
import styles from './contact.module.scss';

interface ContactFormData {
  fullName: string;
  email: string;
  queryType: string;
  message: string;
}

export default function ContactContent(): JSX.Element {
  const [userType, setUserType] = useState<'visitor' | 'existing' | null>(null);
  const [showTicketForm, setShowTicketForm] = useState(false);

  useEffect(() => {
    if (userType === 'visitor') {
      setShowTicketForm(true);
    }

    if (userType === 'existing') {
      window.open('/auth/signin', '_blank');
      setUserType(null);
    }
  }, [userType]);

  const onSubmit = (data: ContactFormData): void => {
    console.warn('Form submitted with data:', data);
  };

  const handleTicketToggle = (): void => {
    setShowTicketForm(!showTicketForm);
  };

  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactHeader}>
        <h1>Customer Service Center</h1>
        <p>
          Explore solutions via the automated chatbot or in our Help Center, and
          connect directly to our dedicated Customer Service team. To track your
          request, please
          <Link href="#" className={styles.link}>
            log in
          </Link>
          .
        </p>
        <div className={styles.troubleSigning}>
          <span>Trouble signing in?</span>
          <Link href="#" className={styles.link}>
            Tap here
          </Link>
          .
        </div>
      </div>

      <div className={styles.entrySection}>
        <h2>Please select type of entry</h2>
        <div className={styles.entryOptions}>
          <div
            className={`${styles.entryCard} ${userType === 'visitor' ? styles.active : ''}`}
            onClick={() => setUserType('visitor')}
          >
            <div className={styles.entryIcon}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M15 15C15.8889 15 16.6667 14.6667 17.3333 14C18 13.3333 18.3333 12.5556 18.3333 11.6667C18.3333 10.7778 18 10 17.3333 9.33333C16.6667 8.66667 15.8889 8.33333 15 8.33333C14.1111 8.33333 13.3333 8.66667 12.6667 9.33333C12 10 11.6667 10.7778 11.6667 11.6667C11.6667 12.5556 12 13.3333 12.6667 14C13.3333 14.6667 14.1111 15 15 15ZM15 21.6667C13.1667 21.6667 11.4583 21.2083 9.875 20.2917C8.29167 19.375 7.08333 18.1667 6.25 16.6667C6.36111 15.6667 6.875 14.7639 7.79167 13.9583C8.70833 13.1528 9.83333 12.75 11.1667 12.75C11.5556 12.75 11.9444 12.7917 12.3333 12.875C12.7222 12.9583 13.1111 13.0833 13.5 13.25C13.8889 13.4167 14.1667 13.5417 14.3333 13.625C14.5 13.7083 14.7222 13.75 15 13.75C15.2778 13.75 15.5 13.7083 15.6667 13.625C15.8333 13.5417 16.1111 13.4167 16.5 13.25C16.8889 13.0833 17.2778 12.9583 17.6667 12.875C18.0556 12.7917 18.4444 12.75 18.8333 12.75C20.1667 12.75 21.2917 13.1528 22.2083 13.9583C23.125 14.7639 23.6389 15.6667 23.75 16.6667C22.9167 18.1667 21.7083 19.375 20.125 20.2917C18.5417 21.2083 16.8333 21.6667 15 21.6667ZM15 6.66667C16.3889 6.66667 17.5694 7.15278 18.5417 8.125C19.5139 9.09722 20 10.2778 20 11.6667C20 13.0556 19.5139 14.2361 18.5417 15.2083C17.5694 16.1806 16.3889 16.6667 15 16.6667C13.6111 16.6667 12.4306 16.1806 11.4583 15.2083C10.4861 14.2361 10 13.0556 10 11.6667C10 10.2778 10.4861 9.09722 11.4583 8.125C12.4306 7.15278 13.6111 6.66667 15 6.66667ZM15 20C17.6111 20 19.9722 20.6389 22.0833 21.9167C24.1944 23.1944 25.5556 24.8611 26.1667 26.9167C26.3333 27.4167 26.3333 27.9167 26.1667 28.4167C26 28.9167 25.6944 29.3056 25.25 29.5833C22.9444 30.9722 20.5139 31.875 17.9583 32.2917C15.4028 32.7083 12.8889 32.5278 10.4167 31.75C9.83333 31.5833 9.38889 31.25 9.08333 30.75C8.77778 30.25 8.66667 29.7222 8.75 29.1667C9.08333 27.5 9.875 26.0139 11.125 24.7083C12.375 23.4028 13.8333 22.4722 15.5 21.9167"
                  fill="#2e4e79"
                />
              </svg>
            </div>
            <span>Visitor</span>
          </div>

          <div
            className={`${styles.entryCard} ${userType === 'existing' ? styles.active : ''}`}
            onClick={() => setUserType('existing')}
          >
            <div className={styles.entryIcon}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path
                  d="M5 25V5H25V10H20V10.8333C19.4444 10.6111 18.8611 10.4444 18.25 10.3333C17.6389 10.2222 17 10.1667 16.3333 10.1667H13.3333V10.8333C12.6667 10.6667 11.9722 10.5556 11.25 10.5C10.5278 10.4444 9.77778 10.4444 9 10.5L9.16667 8.33333H20.8333V6.66667H7.5V23.3333H22.5V20H24.1667V25H5ZM16.6667 15.8333V14.1667H30V15.8333H16.6667ZM23.3333 20V17.5H16.6667V15.8333H23.3333V13.3333H25V15.8333H30V17.5H25V20H23.3333Z"
                  fill="#2e4e79"
                />
              </svg>
            </div>
            <span>Existing User</span>
          </div>
        </div>
      </div>
      {userType === 'visitor' && (
        <div className={styles.ticketContainer}>
          <div className={styles.ticketHeader} onClick={handleTicketToggle}>
            <div className={styles.ticketTitle}>
              <Icon icon="DASHBOARD" size="sm" />
              <span>Open a New Ticket</span>
            </div>
            <div className={styles.plusIcon}>{showTicketForm ? '×' : '+'}</div>
          </div>

          {showTicketForm && (
            <div className={styles.formContainer}>
              <CreateForm<ContactFormData>
                schema={contactSchema}
                onSubmit={onSubmit}
                buttonVariant="primary"
                size="medium"
                submitLabel="Submit Inquiry"
                className={styles.contactForm}
              />
            </div>
          )}
        </div>
      )}
      <div className={styles.contactInfo}>
        <h2>Contact Us</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <BellIcon size="md" />
            <p>support@currencyexchange.com</p>
          </div>
          <div className={styles.infoItem}>
            <SearchIcon size="md" />
            <p>+1 (800) 123-4567</p>
          </div>
        </div>
      </div>
    </section>
  );
}
