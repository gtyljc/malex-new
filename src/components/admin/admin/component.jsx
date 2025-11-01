"use client";

import dynamic from "next/dynamic";

// wrapper for AdminApp
const Admin = dynamic(
    () => import("@admin/admin-app/component"), 
    { ssr: false }
);

export default Admin;