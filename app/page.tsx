'use client';

import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import styles from './page.module.css';

type CompanyData = {
  S: number;
  Company: string;
  'Contact Person': string;
  Phone: string;
  Email: string;
};

export default function Home() {
  const [data, setData] = useState<CompanyData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredData, setFilteredData] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(
      'https://opensheet.elk.sh/19Rk6zzg0aquKBEz9mJeMRpYZaUUDT7V7gvjUKuWnMUU/1'
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const fuse = new Fuse(data, {
        keys: ['Company', 'Contact Person', 'Phone', 'Email'],
        threshold: 0.3, // Adjust this value to control the sensitivity of the fuzzy search
      });
      const result = fuse.search(searchTerm);
      setFilteredData(result.map(({ item }) => item));
    }
  }, [searchTerm, data]);

  return (
    <main className={styles.main}>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>S#</th>
                <th>Company</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.S}>
                  <td>{item.S}</td>
                  <td>{item.Company}</td>
                  <td>{item['Contact Person']}</td>
                  <td>{item.Phone}</td>
                  <td>{item.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
