import AdminNav from '@/app/components/admin-nav/AdminNav';
import React, { FC, ReactNode } from 'react'
interface AdLayout {
    children: ReactNode;
}
const layout: FC<AdLayout> = ({ children }) => {
    
    return (
        <div>
            <AdminNav />
            {children}
        </div>
    )
}

export default layout