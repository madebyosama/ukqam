'use client';

import { useEffect, useState } from 'react';
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
    setFilteredData(
      data.filter(
        (item) =>
          item.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item['Contact Person']
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.Phone.includes(searchTerm) ||
          item.Email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
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
