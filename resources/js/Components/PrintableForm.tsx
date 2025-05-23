import React from 'react'

export default function PrintableForm({data}: any) {
console.log(data);

    return (
        <div className='w-full relative '>
            {/* Header Section: Logos and Government Titles */}
            <div className='w-full relative justify-between flex items-center pl-10 pr-10 pt-3'>
                {/* Left-side logos and agency name */}
                <div className='flex items-center'>
                    <img src="/logo/tinio.png" alt="Municipal Logo" className='w-[80px] h-[80px]' />
                    <img src="/logo/mswd.png" alt="MSWD Logo" className='w-[70px] h-[70px]' />
                    <div className='leading-tight ml-2'>
                        <p className='text-[14px]'>Republic of the Philippines</p>
                        <b className='text-[16px]'>Early Childhood Care and Development Council</b>
                        <h1 className='text-[18px] text-sky-800 font-bold'>MUNICIPAL SOCIAL WELFARE AND DEVELOPMENT</h1>
                    </div>
                </div>

                {/* Right-side logo */}
                <div className='flex justify-end'>
                    <img src="/logo/netis-logo.png" alt="System Logo" className='w-[70px] h-[70px]' />
                </div>
            </div>

            {/* Decorative horizontal gradient bar */}
            <div className='w-full mt-2'>
                <div className="w-full mt-3 h-4 bg-gradient-to-r from-green-700 to-sky-700" />
            </div>


            <div className='pl-10 pr-10 pt-5'>
                <h1 className='text-2xl font-bold text-sky-900'>PERSONAL INFORMATION SHEET</h1>
                <p className='text-sm mt-1 text-gray-700'>
                    This Personal Information Sheet is intended for all children enrolled under the NETIS Early Childhood Care and Development (ECCD) Program. It collects essential details such as the child’s full name, birthdate, address, guardian information, and CDC enrollment data to ensure accurate records and proper support for each child’s growth and development.
                </p>
            </div>

            {/* Main Form Container */}
            <div className='w-full pl-10 pr-10 pt-5'>
                <div className='border'>

                    {/* Section: Child's Personal Information */}
                    <div className='bg-accent p-1'>
                        <h1 className='text-[14px] font-bold'>CHILD'S PERSONAL INFORMATION</h1>
                    </div>

                    {/* Name Fields */}
                    <div className='flex'>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>Last Name: <b>{data?.last_name}</b></label>
                        </div>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>First Name: <b>{data?.first_name}</b></label>
                        </div>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>Middle Name: <b>{data?.middle_name}</b></label>
                        </div>
                        <div className='w-2/6 p-1 px-2'>
                            <label className='text-[14px]'>Suffix: <b>{data?.suffix}</b></label>
                        </div>
                    </div>

                    {/* Birthdate and Gender */}
                    <div className='flex border-t'>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>Birthdate: <b>{data?.birthdate}</b></label>
                        </div>
                        <div className='w-full p-1 px-2'>
                            <label className='text-[14px]'>Gender: <b>{data?.gender}</b></label>
                        </div>
                    </div>

                    {/* Guardian and Contact Info */}
                    <div className='flex border-t'>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>Guardian: <b>{data?.guardian}</b></label>
                        </div>
                        <div className='w-full p-1 px-2'>
                            <label className='text-[14px]'>Contact #: <b>{data?.contact_number}</b></label>
                        </div>
                    </div>

                    {/* Section: Address */}
                    <div className='bg-accent p-1 border-t'>
                        <h1 className='text-[14px] font-bold'>ADDRESS</h1>
                    </div>

                    {/* Address Fields */}
                    <div className='flex border-t'>
                        <div className='border-r w-full p-1 px-2'>
                            <label className='text-[14px]'>House #: <b>{data?.house_number}</b></label>
                        </div>
                        <div className='w-full p-1 border-r px-2'>
                            <label className='text-[14px]'>Street: <b>{data?.street}</b></label>
                        </div>
                        <div className='w-full p-1 px-2'>
                            <label className='text-[14px]'>Barangay: <b>{data?.barangay}</b></label>
                        </div>
                    </div>

                    {/* Section: CDC Information */}
                    <div className='bg-accent p-1 border-t'>
                        <h1 className='text-[14px] font-bold'>CDC INFORMATION</h1>
                    </div>

                    {/* CDC Info Fields */}
                    <div className='flex border-t'>
                        <div className='border-r w-4/6 p-1 px-2'>
                            <label className='text-[14px]'>Child Session: <b>{data?.child_session}</b></label>
                        </div>
                        <div className='w-3/6 p-1 border-r px-2'>
                            <label className='text-[14px]'>Child #: <b>{data?.child_number}</b></label>
                        </div>
                        <div className='w-full p-1 px-2'>
                            <label className='text-[14px]'>Name of CDW/CDT: <b>{data?.teacher?.full_name}/{data?.teacher?.role}  </b></label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
