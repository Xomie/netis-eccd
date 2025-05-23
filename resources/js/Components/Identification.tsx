// import { abbreviateMiddleName, dateNow, formatBirthdate } from '@/lib/utils';
// import React from 'react';
// type IdentificationProps = {
//   view: 'Front' | 'Back'; // restrict to specific strings
//   data: any;
// };

// export default function Identification({ view, data }: IdentificationProps) {
//   console.log('sa id', data);

//   if (view == 'Back') {
//     return (
//       <div
//         className="w-[230px] h-[378px] border p-3 relative rounded-md overflow-hidden shadow-lg mx-auto bg-[url('/logo/bg.png')] bg-cover bg-center"
//       >
//         {/* header */}
//         <div className='w-full flex items-center text-white'>
//           <img src={data?.barangay_data?.logo} alt="" className='h-12 w-12' />
//           <div className='leading-tight'>
//             <h1 className='leading-tight text-[9px] font-bold uppercase'>{data?.barangay_data?.cdc_name}</h1>
//             <p className='leading-tight text-[7px]'>{data?.barangay_data?.address},General Tinio, Nueva Ecija</p>
//           </div>
//           <img src="/logo/mswd.png" alt="" className='h-9 w-9' />
//         </div>

//         {/* picture */}
//         <div className='mt-6  relative'>
//           <div className="leading-tight flex justify-center ">
//             <div className="w-[100px] h-[100px] border border-gray-400 bg-white rounded overflow-hidden">
//               <img src={`${data?.profile || "/logo/unknown.png"}`} alt="" className='object-cover w-full h-full' />
//             </div>
//           </div>
//           <div className='absolute -bottom-3 right-8'>
//             <img src="/logo/netis-logo.png" alt="" className=' h-[30px] w-[30px] bg-white rounded-full p-0' />
//             <div className='leading-tight text-center text-[4px] font-bold uppercase'>ECCD-{data?.barangay_data?.name}</div>
//           </div>
//         </div>
//         <div className='leading-tight text-center text-[5px] font-bold'>{data?.child_session} - Child No. {data?.child_number}</div>

//         <div className='mt-5 uppercase'>
//           <h1 className="text-center leading-tight  font-bold text-[12px] text-blue-900">{data.first_name} {abbreviateMiddleName(data.middle_name)} {data.last_name}</h1>
//           <p className='text-center leading-tight text-[6px]'>Name</p>
//         </div>

//         <div className='mt-2 pl-2 uppercase pr-2'>
//           <h1 className="text-center leading-tight font-bold text-[9px]">{data.house_number} {data.street} {data.barangay}, General Tinio,Nueva Ecija</h1>
//           <p className='text-center leading-tight text-[6px]'>Address</p>
//         </div>

//         <div className='mt-2 pl-2 uppercase pr-2'>
//           <h1 className="text-center  leading-tight font-bold text-[9px]">{formatBirthdate(data.birthdate)}</h1>
//           <p className='text-center leading-tight text-[6px]'>Birthdate</p>
//         </div>


//         <div className='mt-2 uppercase pl-2 pr-2'>
//           <h1 className="text-center  leading-tight font-bold text-[9px]">{data.teacher.full_name}/{data.teacher.role}</h1>
//           <p className='text-center leading-tight text-[6px]'>CHILD DEVELOPMENT WORKER</p>
//         </div>

//         <div className="absolute bottom-2 left-2 right-2 text-right text-[5px] pl-10 text-black   rounded">
//           <p>This ID is issued by the {data.barangay_data.name} II CDC and must be returned if found. This is not a valid government-issued ID.</p>
//         </div>

//       </div>
//     );
//   } else {
//     return (
//       <div
//         className="w-[230px] h-[378px] border p-3 relative rounded-md overflow-hidden shadow-lg mx-auto bg-[url('/logo/back-bg.png')] bg-cover bg-center"
//       >
//         {/* header */}
//         <div className='w-full flex justify-end items-center text-white'>
//           <div><img src="/logo/netis-logo.png" alt="" className='h-8 w-8 bg-white rounded-full' />
//             <p className='text-center text-[4px] uppercase mt-1'>ECCD-{data.barangay_data.name}</p></div>
//         </div>

//         <div className='mt-3 uppercase text-white'>
//           <h1 className="text-center leading-tight  font-bold text-[14px]">{data.guardian}</h1>
//           <p className='text-center leading-tight text-[6px]'>NAME OF PARENT/GUARDIAN</p>
//         </div>

//         <div className='mt-1 uppercase text-white'>
//           <h1 className="text-center leading-tight  font-bold text-[14px]">{data.contact_number}</h1>
//           <p className='text-center leading-tight text-[6px]'>CONTACT DETAILS</p>
//         </div>

//         <div className='flex justify-center items-center'>
//           <img src={data.barangay_data.logo} alt="" className='bg-white shadow-lg rounded-full h-[7rem] mt-3 w-[7rem]' />
//         </div>

//         <div className='mt-7 uppercase pl-5 pr-5'>
//           <h1 className="text-center leading-tight  font-bold text-[14px] border-b-2 border-black">{data.barangay_data.barangay_captain}</h1>
//           <p className='text-center text-[8px]'>BARANGAY CAPTAIN</p>
//         </div>



//         <div className="absolute font-bold bottom-2 left-2 right-8 text-right text-[7px] pl-10 text-black   rounded">
//           <p>DATE ISSUED: {dateNow()}</p>
//         </div>

//       </div>
//     );
//   }
// }



import { abbreviateMiddleName, dateNow, formatBirthdate, isOver36Chars } from '@/lib/utils';
import React from 'react';
type IdentificationProps = {
  view: 'Front' | 'Back'; // restrict to specific strings
  data: any;
};

export default function Identification({ view, data }: IdentificationProps) {
  return (
    // <div className="flex print:block scale-x-[-1]">
    <div className="flex print:block scale-x-[-1]">
      <div
        className="w-[207.87px] h-[325.04px]  mb-5 border p-2 relative rounded-md overflow-hidden shadow-lg mx-auto bg-[url('/logo/bg.png')] bg-cover bg-center"
      >
        {/* header */}
        <div className='w-full leading flex items-center text-white'>
          <img src={data?.barangay_data?.logo} alt="" className='h-11 w-11' />
          <div className='leading-tight'>
            <h1 style={{ lineHeight: 1 }} className={`${isOver36Chars(data?.barangay_data?.cdc_name) ? "text-[4px] " : 'text-[4.5px] '}  leading-1 text-[9px] pl-.5 font-bold uppercase`}>{data?.barangay_data?.cdc_name}</h1>
            <p style={{ lineHeight: 1.2 }} className={`leading-tight text-[4.5px] font-medium uppercase`}>{data?.barangay_data?.address},General Tinio, Nueva Ecija</p>
          </div>
          <img src="/logo/mswd.png" alt="" className='h-9 w-9' />
        </div>

        {/* picture */}
        <div className='mt-3.5  relative'>
          <div className="leading-tight flex justify-center ">
            <div className="w-[90px] h-[90px] border border-gray-400 bg-white rounded overflow-hidden">
              <img src={`${data?.profile || "/logo/unknown.png"}`} alt="" className='object-cover w-full h-full' />
            </div>
          </div>
          <div className='absolute -bottom-2 right-9'>
            <div className='relative'>
              <img src="/logo/netis-logo.png" alt="" className=' h-[30px] w-[30px] bg-white rounded-full p-0' />
            </div>
          </div>

          <div className='leading-tight absolute -bottom-1.5 left-14 text-center text-[5px] font-bold'>{data?.child_session} - Child No. {data?.child_number}</div>
        </div>



        <div className='mt-4 uppercase'>
          <h1 className="text-center leading-tight  font-bold text-[10px] text-blue-900">{data.first_name} {abbreviateMiddleName(data?.middle_name)} {data.last_name}</h1>
          <p className='text-center leading-tight text-[5px]'>Name</p>
        </div>

        <div className='mt-2 pl-2 uppercase pr-2'>
          <h1 className="text-center leading-tight font-bold text-[7px]">{data.house_number} {data.street} {data.barangay}, General Tinio,Nueva Ecija</h1>
          <p className='text-center leading-tight text-[5px]'>Address</p>
        </div>

        <div className='mt-2 pl-2 uppercase pr-2'>
          <h1 className="text-center  leading-tight font-bold text-[7px]">{formatBirthdate(data.birthdate)}</h1>
          <p className='text-center leading-tight text-[5px]'>Birthdate</p>
        </div>


        <div className='mt-2 uppercase pl-2 pr-2'>
          <h1 className="text-center  leading-tight font-bold text-[7px]">{data.teacher.full_name}/{data.teacher.role}</h1>
          <p className='text-center leading-tight text-[5px]'>CHILD DEVELOPMENT WORKER</p>
        </div>


        <div className='leading-tight text-emerald-800  text-center  mt-2 text-[5px] font-bold uppercase'>
          <p>ECCD-{data?.barangay_data?.name}</p>
        </div>

        <div className="absolute bottom-1 left-2 right-2 text-right text-[5px] pl-4 uppercase text-black   rounded">
          <p>This ID is issued by the {data.barangay_data.cdc_name} and must be returned if found. This ID is non-transferable.</p>
        </div>

      </div>












      <div
        className="w-[207.87px] h-[325.04px]  border p-2 relative rounded-md overflow-hidden shadow-lg mx-auto bg-[url('/logo/back-bg.png')] bg-cover bg-center"
      >
        {/* header */}
        <div className='w-full flex justify-end items-center text-white'>
          <div><img src="/logo/netis-logo.png" alt="" className='h-8 w-8 bg-white rounded-full' />
          </div>
        </div>

        <div className='mt-1 uppercase text-white'>
          <h1 className="text-center leading-tight  font-bold text-[12px]" >{data.guardian}</h1>
          <p className='text-center leading-tight text-[5px] font-medium '>NAME OF PARENT/GUARDIAN</p>
        </div>

        <div className='mt-1 uppercase text-white'>
          <h1 className="text-center leading-tight  font-bold text-[12px]">{data.contact_number}</h1>
          <p className='text-center leading-tight text-[5px] font-medium'>CONTACT DETAILS</p>
        </div>

        <div className='flex justify-center items-center mt-2'>
          <img src={data.barangay_data.logo} alt="" className=' rounded-full h-[8rem]  w-[8rem]' />
        </div>

        <div className='mt-2 uppercase pl-5 pr-5'>
          <h1 className="text-center leading-tight  font-bold text-[12px] border-b border-zinc-400">{data.barangay_data.barangay_captain}</h1>
          <p className='text-center text-[6px] font-medium'>BARANGAY CAPTAIN</p>
        </div>



        <div className="absolute font-bold bottom-1 left-2 right-3 text-right text-[6px]  text-black   rounded flex justify-end items-center">
          <div>
            <p className='text-[5px] text-emerald-800 uppercase'>ECCD-{data.barangay_data.name}</p>
            <p>           DATE ISSUED: {dateNow()}</p>
          </div>
        </div>

      </div>
    </div>
  );

}
