import { AppSidebar } from '@/Components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/Components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    return (
        <SidebarProvider>
            <AppSidebar user={user} variant="inset" />
            <SidebarInset>
                <main>{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
