"use client"

import React, { useEffect } from 'react';

const GithubCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('access_token', token);
      window.location.href = '/';
    } else {

      console.error('Token tidak ditemukan!');
    }
  }, []);

  return <div>Loading...</div>;
};

export default GithubCallback;
