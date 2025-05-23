// import ApplicationLogo from '@/Components/ApplicationLogo';
// import { Link } from '@inertiajs/react';
// import { PropsWithChildren } from 'react';

// export default function Guest({ children }: PropsWithChildren) {
//     return (
//         <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
//             <div>
//                 <Link href="/">
//                     <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
//                 </Link>
//             </div>

//             <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
//                 {children}
//             </div>
//         </div>
//     );
// }

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { GalleryVerticalEnd } from 'lucide-react';
import { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md text-primary-foreground">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <img src="/logo/netis-logo.png" alt="" className='h-10 w-10'/>
            </div>
            SPMS.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* <LoginForm /> */}{children}
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/logo/mswd.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
    );
}
