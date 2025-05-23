import Form from '@/Components/Form';
import { SiteHeader } from '@/Components/site-header';
import { Button } from '@/Components/ui/button';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { IdCardIcon, PenLineIcon, Plus, PrinterIcon, Trash, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"

import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import CustomPagination from '../Components/CustomPagination';
import { PaginatedResponse } from '@/types/pagination';
import Checkbox from '@/Components/Checkbox';
import { calculateAge } from '@/lib/utils';
import { router } from '@inertiajs/react';
import Identification from '@/Components/Identification';
import { useReactToPrint } from 'react-to-print';
import PrintableForm from '@/Components/PrintableForm';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu"


interface Barangay {
    id: number;
    name: string;
    address?: string;
    cdc_name?: string;
    barangay_captain?: string;
    logo?: string;
}

interface Teacher {
    id: number;
    full_name: string;
    role?: string;
}

interface Children {
    barangay_data: any;
    child_number: number | string;
    id: number | string,
    first_name: string,
    middle_name?: string,
    last_name: string,
    suffix?: string,
    birthdate: string,
    gender: string,
    guardian: string,
    contact_number: number | string,
    barangay: string,
    street?: string,
    house_number?: string,
    child_session: string,
    barangays: Barangay,
    teacher: Teacher,
    profile?: File | null | string
}

interface FormState {
    id: number | null | string,
    child_number: string | number,
    first_name: string,
    middle_name?: string,
    last_name: string,
    suffix?: string,
    birthdate: string,
    gender: string,
    guardian: string,
    contact_number: number | string,
    barangay: string,
    street?: string,
    house_number?: string,
    child_session: string,
    barangay_id: string | number,
    teacher_id: string | number,
    cdw_specify?: string // for "Others"
    profile?: File | null | string
}

interface NetisProps {
    barangays: Barangay[];
    teachers: Teacher[];
    data: PaginatedResponse<Children>;
}

const Netis: React.FC<NetisProps> = ({ barangays, teachers, data }) => {
    const [selectedData, setSelectedData] = useState<any>([]);

    const [content, setContent] = useState<string>('main');
    const [openDelete, setOpenDelete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [view, setView] = useState<'Front' | 'Back'>('Front');
    const [toEdit, setToEdit] = useState<Children>();
    const handleEdit = (data: any) => {
        console.log(data);

        setToEdit(data)
        setContent('edit');
    }

    const toggleView = () => {
        setView((prev) => (prev === 'Front' ? 'Back' : 'Front'));
    };

    const convertToFormState = (child: Children): FormState => ({
        id: child.id,
        child_number: child.child_number,
        first_name: child.first_name,
        middle_name: child.middle_name,
        last_name: child.last_name,
        suffix: child.suffix,
        birthdate: child.birthdate,
        gender: child.gender,
        guardian: child.guardian,
        contact_number: child.contact_number,
        barangay: child.barangay,
        street: child.street,
        house_number: child.house_number,
        child_session: child.child_session,
        barangay_id: child.barangay_data.id,
        teacher_id: child.teacher.id,
        profile: typeof child.profile === 'string' ? child.profile : null,
    });

    const [idToDelete, setIdToDelete] = useState<number | string | null>(null);

    const handleDelete = (id: number) => {
        setIdToDelete(id);
        setOpenDelete(true);
    };

    const submitDelete = () => {
        if (!idToDelete) return;
        setLoading(true)
        router.delete(`/child-profiles/${idToDelete}`, {
            onSuccess: () => {
                router.reload({ only: ['data'] });
                setLoading(false)
                setOpenDelete(false);
                setIdToDelete(null);

            },
            onError: (err) => {
                console.error('Delete error:', err);
                setLoading(false)
            },
        });
    };

    const handleCheckboxChange = (item: any, isChecked: boolean) => {
        setSelectedData((prev: any[]) => {
            if (isChecked) {
                return [...prev, item];
            } else {
                return prev.filter(data => data.id !== item.id);
            }
        });
    };


    useEffect(() => {
        console.log(selectedData);

    }, [selectedData])



    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const printForm = useReactToPrint({ contentRef });

    const [search, setSearch] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const handleSearch = () => {
        setLoading(true);
        router.reload({
            only: ['data'],
            // preserveScroll: true,
            data: {
                search: search,
                barangay: selectedBarangay,
            },
            onFinish: () => setLoading(false),
        });
    };

    useEffect(() => {
        router.reload({
            only: ['data'],
            // preserveScroll: true,
            data: {
                search: search,
                barangay: selectedBarangay,
            },
            onFinish: () => setLoading(false),
        });
    }, [selectedBarangay])

    const handleClearSearch = () => {
        router.reload({
            only: ['data'],
            // preserveScroll: true,
            data: {
                search: '',
                barangay: '',
            },
            onFinish: () => setLoading(false),
        });
        setSearch(""); // Clear search input
        setSelectedBarangay("");
    };



    useEffect(() => {
        const open = localStorage.getItem("open");
        if (open !== null) {
            const isOpen = JSON.parse(open);
            if (isOpen) {
                setContent("apply");
                localStorage.removeItem("open");
            }
        }
    }, []);

    if (content === 'main') {
        return (
            <Authenticated>
                <SiteHeader>
                    <div className='w-full flex justify-between items-center'>
                        <b>NETIS ECCD INFORMATION</b>
                        <Button onClick={() => setContent('apply')} className='text-xs bg-green-700'>
                            <Plus /> New Student
                        </Button>
                    </div>
                </SiteHeader>
                <div className="w-full p-2 flex justify-between items-center">
                    <div className="w-full flex">
                        <Input
                            placeholder="Search.."
                            className="w-4/6"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                        />
                        <Button
                            onClick={handleSearch}
                            className="ml-2 bg-green-700 text-white"
                            disabled={loading} // Disable button while loading
                        >
                            Search
                        </Button>

                        {search && (
                            <Button
                                onClick={handleClearSearch}
                                className="ml-2 bg-red-500 text-white"
                            >
                                <X />
                            </Button>
                        )}
                    </div>
                    <div className="w-full flex justify-end items-center gap-x-2">
                        <Select
                            onValueChange={(value) =>
                                setSelectedBarangay(value)
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Barangay" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Bago">Bago</SelectItem>
                                <SelectItem value="Concepcion">
                                    Concepcion
                                </SelectItem>
                                <SelectItem value="Nazareth">
                                    Nazareth
                                </SelectItem>
                                <SelectItem value="Padolina">
                                    Padolina
                                </SelectItem>
                                <SelectItem value="Pias">Pias</SelectItem>
                                <SelectItem value="San Pedro (Pob.)">
                                    San Pedro (Pob.)
                                </SelectItem>
                                <SelectItem value="Poblacion East">
                                    Poblacion East
                                </SelectItem>
                                <SelectItem value="Poblacion West">
                                    Poblacion West
                                </SelectItem>
                                <SelectItem value="Rio Chico">
                                    Rio Chico
                                </SelectItem>
                                <SelectItem value="Poblacion Central">
                                    Poblacion Central
                                </SelectItem>
                                <SelectItem value="Pulong Matong">
                                    Pulong Matong
                                </SelectItem>
                                <SelectItem value="Sampaguita">
                                    Sampaguita
                                </SelectItem>
                                <SelectItem value="Palale">
                                    Palale
                                </SelectItem>
                                <SelectItem value="All">
                                    All
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* <DateRangePicker /> */}
                    </div>
                </div>
                <div className='pl-2 pr-2'>
                    <ContextMenu>
                        <ContextMenuTrigger>

                            <Table className='border text-xs'>
                                {data.data.length == 0 ? <TableCaption>No record.</TableCaption> : <></>}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Gender</TableHead>
                                        <TableHead>Age</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>CDC/CDW Teacher</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.data.map((items, index) => (
                                        <TableRow key={index}>

                                            <TableCell>
                                                <div className='flex items-center gap-x-2'>
                                                    <Checkbox
                                                        checked={selectedData.some((data: any) => data.id === items.id)}
                                                        onChange={(e) => handleCheckboxChange(items, e.target.checked)}
                                                    />

                                                    <img src={
                                                        typeof items.profile === 'string'
                                                            ? items.profile
                                                            : items.profile instanceof File
                                                                ? URL.createObjectURL(items.profile)
                                                                : '/logo/unknown.png'
                                                    } alt="" className='rounded-full border shadow-sm h-10 w-10' />
                                                    <div>
                                                        <h1 className='uppercase font-medium text-[12px]'>{items.first_name} {items.middle_name} {items.last_name}</h1>
                                                        <p className='text-[10px]'>{items.child_number}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{items.gender}</TableCell>
                                            <TableCell>{calculateAge(items.birthdate)} yrs old</TableCell>
                                            <TableCell><h1>Brgy. {items.barangay} </h1>General Tinio, Nueva Ecija </TableCell>
                                            <TableCell><h1>{items.teacher.full_name}</h1>
                                                <p>{items.teacher.role}</p></TableCell>
                                            <TableCell>
                                                <div className='flex items-center justify-center gap-x-2'>

                                                    <button onClick={() => handleDelete(Number(items.id))} className='p-2 border rounded-sm hover:bg-zinc-200'>
                                                        <Trash className='h-4 w-4' />
                                                    </button>
                                                    <button onClick={() => handleEdit(items)} className='p-2 border rounded-sm hover:bg-zinc-200'>
                                                        <PenLineIcon className='h-4 w-4' />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem onClick={() => setContent('issuance')} >CREATE IDENTIFICATION CARD</ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                    <CustomPagination meta={data} />
                </div>

                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete this child's information.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            {loading ? <Button className='bg-red-200 text-red-400' disabled={true} >
                                Yes! Delete it
                            </Button> : <Button variant="destructive" onClick={submitDelete}>
                                Yes! Delete it
                            </Button>}
                            <Button variant="outline" onClick={() => setOpenDelete(false)}>
                                Cancel
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </Authenticated>
        );
    }

    if (content === 'apply') {
        return (
            <div className='w-full bg-black/85 flex justify-center pt-5 overflow-auto pb-[15rem]'>
                <div className='w-4/6'>
                    <div className='w-full mb-2 flex justify-end gap-x-2'>
                        <Button className='bg-green-800'>
                            <PrinterIcon />
                        </Button>
                        <Button onClick={() => setContent('main')}>
                            <X />
                        </Button>
                    </div>
                    <Form setContent={setContent} teachers={teachers} barangays={barangays} />
                </div>
            </div>
        );
    }

    if (content === 'edit') {
        return (
            <div className='w-full bg-black/85 flex justify-center pt-5 overflow-auto pb-[15rem]'>
                <div className='w-4/6'>
                    <div className='w-full mb-2 flex justify-end gap-x-2'>
                        <Button onClick={() => setContent('print')} className='bg-green-800'>
                            <PrinterIcon />
                        </Button>
                        <Button onClick={() => setContent('main')}>
                            <X />
                        </Button>
                    </div>
                    {toEdit && <Form setContent={setContent} teachers={teachers} barangays={barangays} toEdit={convertToFormState(toEdit)} />}
                </div>
            </div>
        );
    }


    if (content === 'issuance') {
        return (
            <div className='w-full bg-black/85 flex justify-center pt-5 overflow-auto pb-[15rem]'>
                <div className='w-4/6'>
                    <div className='w-full mb-2 flex justify-end gap-x-2'>
                        <Button onClick={reactToPrintFn}>
                            <PrinterIcon />
                        </Button>
                        {/* <Button onClick={() => toggleView()}>
                            {view} <IdCardIcon />
                        </Button> */}
                        <Button onClick={() => setContent('main')}>
                            <X />
                        </Button>
                    </div>
                    <div className={`${selectedData.length == 1 ? "print:grid-cols-1" : 
                    selectedData.length == 2 ? "print:grid-cols-2 print:place-items-start" :
                    selectedData.length == 3 ? "print:grid-cols-3 print:place-items-start" : 
                    selectedData.length == 4 ? "print:grid-cols-4 print:place-items-start" :
                     "print:grid-cols-5 print:place-items-start"} w-full p-5 grid gap-1 `} ref={contentRef}>
                        {selectedData.map((items: unknown, index: React.Key | null | undefined) => (
                            <Identification key={index} view={view} data={items} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }



    if (content === 'print') {
        return (
            <div className='w-full bg-black/85 flex justify-center pt-5 overflow-auto pb-[15rem]'>
                <div className='w-4/6'>
                    <div className='w-full mb-2 flex justify-end gap-x-2'>
                        <Button onClick={printForm}>
                            <PrinterIcon />
                        </Button>
                        <Button onClick={() => setContent('main')}>
                            <X />
                        </Button>
                    </div>
                    <div className='w-full bg-white h-[936px]' ref={contentRef}>
                        <PrintableForm data={toEdit} />
                    </div>
                </div>
            </div>
        );
    }


    return null; // In case 'content' has an unexpected value
};

export default Netis;
