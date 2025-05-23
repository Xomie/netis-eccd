import { SiteHeader } from '@/Components/site-header'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Button } from '@/Components/ui/button'
import { PenLine, Plus, Trash, Upload } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Input } from '@/Components/ui/input'
import axios from 'axios'
import { router } from '@inertiajs/react'
import { SettingsProps } from '@/types/settings'

export default function Settings({ teachers, barangays }: SettingsProps) {
    const [openTeacher, setOpenTeacher] = useState<boolean>(false);
    const [openBarangay, setOpenBarangay] = useState<boolean>(false);
    const [teacherForm, setTeacherForm] = useState({ id: null, full_name: '', role: '' });
    const [barangayForm, setBarangayForm] = useState({
        id: '',
        name: '',
        address: '',
        barangay_captain: '',
        cdc_name: '',
        logo: null as File | null,
        logoPreview: ''
    });


    const handleTeacherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeacherForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBarangayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "logo" && files && files[0]) {
            const file = files[0];
            setBarangayForm(prev => ({
                ...prev,
                logo: file,
                logoPreview: URL.createObjectURL(file),
            }));
        } else {
            setBarangayForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleTeacherSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/storeTeacher', teacherForm); 
            router.visit(window.location.href, {
                only: ['teachers'], 
                preserveScroll: true,
            });
            setOpenTeacher(false);
            setTeacherForm({ id: null, full_name: '', role: '' });

        } catch (error: any) {
        }
    };

    const handleBarangaySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", barangayForm.name);
        formData.append("address", barangayForm.address);
        formData.append("barangay_captain", barangayForm.barangay_captain);
        formData.append("cdc_name", barangayForm.cdc_name);
        formData.append("id", barangayForm.id);
        if (barangayForm.logo) formData.append("logo", barangayForm.logo);

        try {
            await axios.post("/storeBarangay", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            router.visit(window.location.href, {
                only: ['barangays'], // Must match backend prop
                preserveScroll: true,
            });
            setBarangayForm({ id: '', name: '', address: '', cdc_name: '', barangay_captain: '', logo: null, logoPreview: '' });
            setOpenBarangay(false);
        } catch (error) {
        }
    };

    const handleDeleteTeacher = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await axios.delete(`/deleteTeacher/${id}`);
                router.visit(window.location.href, {
                    only: ['teachers'], // Must match backend prop
                    preserveScroll: true,
                });

            } catch (error) {
                console.error('Failed to delete teacher:', error);
                alert('Failed to delete teacher.');
            }
        }
    };

    const handleDeleteBarangay = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this barangay?')) {
            try {
                await axios.delete(`/deleteBarangay/${id}`);
                // router.reload(['barangays']);
                router.visit(window.location.href, {
                    only: ['barangays'], // Must match backend prop
                    preserveScroll: true,
                });

            } catch (error) {
                console.error('Failed to delete barangay:', error);
                alert('Failed to delete barangay.');
            }
        }
    };

    const handleEditTeacher = (data: any) => {
        setTeacherForm({ id: data.id, full_name: data.full_name, role: data.role });
        setOpenTeacher(true);
    }

    const handleEditBarangay = (data: any) => {
        setBarangayForm({
            id: data.id,
            name: data.name,
            address: data.address,
            barangay_captain: data.barangay_captain,
            cdc_name: data.cdc_name,
            logo: null, 
            logoPreview: data.logo,
        });
        setOpenBarangay(true);
    };

    return (
        <Authenticated>
            <SiteHeader>
                <div className='flex justify-between items-center'>
                    <b className='text-sky-900 font-bold'>SETTINGS</b>
                    <div className='flex items-center gap-x-2'>
                        <Button onClick={() => setOpenTeacher(true)} className='text-xs bg-green-800'><Plus /> New Teacher</Button>
                        <Button onClick={() => setOpenBarangay(true)} className='text-xs bg-green-800'><Plus /> New Barangay</Button>
                    </div>
                </div>
            </SiteHeader>
            <div className='p-5'>
                <Tabs defaultValue="teacher">
                    <TabsList>
                        <TabsTrigger value="teacher">Teacher</TabsTrigger>
                        <TabsTrigger value="barangay">Barangay</TabsTrigger>
                    </TabsList>
                    <TabsContent value="teacher">
                        <Table className='border text-xs'>
                            {teachers.length == 0 ? <TableCaption>No record.</TableCaption> : <></>}
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Full Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teachers.map((items, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{items.full_name}</TableCell>
                                        <TableCell>{items.role}</TableCell>
                                        <TableCell>
                                            <div className='flex justify-end '>
                                                <button onClick={() => handleDeleteTeacher(items.id)} className='p-2 rounded-md hover:bg-zinc-200'><Trash className='size-4' /></button>
                                                <button onClick={() => handleEditTeacher(items)} className='p-2 rounded-md hover:bg-zinc-200'><PenLine className='size-4' /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="barangay">
                        <Table className='border text-sm'>
                            {barangays.length == 0 ? <TableCaption>No record.</TableCaption> : <></>}
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[79px]">Logo</TableHead>
                                    <TableHead>Barangay</TableHead>
                                    <TableHead>Barangay Captain</TableHead>
                                    <TableHead>Child Development Center</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {barangays.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell><img src={item.logo} alt="" className='h-12 w-12 rounded-full' /></TableCell>
                                        <TableCell><h1>{item.name}</h1> <p className='text-[10px]'>{item.address}</p></TableCell>
                                        <TableCell>{item.barangay_captain}</TableCell>
                                        <TableCell>{item.cdc_name}</TableCell>
                                        <TableCell>
                                            <div className='flex justify-end gap-x-1'>
                                                <button onClick={() => handleDeleteBarangay(item.id)} className='p-2 rounded-md hover:bg-zinc-200'><Trash className='size-4' /></button>
                                                <button onClick={() => handleEditBarangay(item)} className='p-2 rounded-md hover:bg-zinc-200'><PenLine className='size-4' /></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TabsContent>
                </Tabs>
            </div>




            <Dialog open={openTeacher} onOpenChange={setOpenTeacher}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-emerald-800 font-bold '>Teacher Information</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleTeacherSubmit} className="space-y-3">
                        <Input
                            type="text"
                            name="full_name"
                            value={teacherForm.full_name}
                            onChange={handleTeacherChange}
                            placeholder="Full Name"

                            required
                        />

                        {/* Role Select Dropdown */}
                        <Select
                            value={teacherForm.role}
                            onValueChange={(value) => setTeacherForm(prev => ({ ...prev, role: value }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CDT">CDT</SelectItem>
                                <SelectItem value="CDW">CDW</SelectItem>
                                <SelectItem value="CDT/CDW">CDT/CDW</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex justify-end gap-x-2">
                            <Button type="submit" className=' text-xs bg-sky-900 w-[90px]'>Save</Button>
                            <Button type="button" variant='outline' onClick={() => setOpenTeacher(false)} className=' text-xs border-red-400 text-red-500'>Cancel</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>


            <Dialog open={openBarangay} onOpenChange={setOpenBarangay}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-emerald-800 font-bold '>Barangay Information</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBarangaySubmit} className="flex gap-x-3">
                        <div className="w-4/6 flex flex-col items-center">
                            {barangayForm.logoPreview ? (
                                <label
                                    htmlFor="logo-upload"
                                    className="w-[13rem] h-[13rem]  cursor-pointer rounded overflow-hidden "
                                >
                                    <img
                                        src={barangayForm.logoPreview}
                                        alt="Logo Preview"
                                        className="w-[13rem] h-[13rem] object-cover"
                                    />
                                </label>
                            ) : (
                                <label
                                    htmlFor="logo-upload"
                                    className="w-[13rem] h-[13rem] mx-auto border-2 border-dashed border-gray-200 flex flex-col justify-center items-center cursor-pointer rounded hover:border-sky-600 transition"
                                >
                                    <span className="text-gray-500 flex items-center gap-x-2 text-xs"><Upload className='size-4'/> Upload Logo</span>
                                </label>
                            )}

                            <input
                                id="logo-upload"
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleBarangayChange}
                                className="hidden"
                            />
                        </div>


                        <div className='w-full '>
                            <Input
                                type="text"
                                name="name"
                                value={barangayForm.name}
                                onChange={handleBarangayChange}
                                placeholder="Barangay Name"
                                className="w-full p-2 border rounded mb-3"
                                required
                            />
                            <Input
                                type="text"
                                name="address"
                                value={barangayForm.address}
                                onChange={handleBarangayChange}
                                placeholder="Address"
                                className="w-full p-2 border rounded mb-3"
                                required
                            />
                            <Input
                                type="text"
                                name="barangay_captain"
                                value={barangayForm.barangay_captain}
                                onChange={handleBarangayChange}
                                placeholder="Barangay Captain"
                                className="w-full p-2 border rounded mb-3"
                                required
                            />
                            <Input
                                type="text"
                                name="cdc_name"
                                value={barangayForm.cdc_name}
                                onChange={handleBarangayChange}
                                placeholder="CDC"
                                className="w-full p-2 border rounded mb-3"
                                required
                            />
                            <div className='flex gap-x-2 justify-end'>
                                <Button type="submit" className='text-xs w-[80px] bg-sky-900'>Save</Button>
                                <Button type="button" onClick={() => setOpenBarangay(false)} variant="outline" className='text-xs border-red-400 text-red-500'>Cancel</Button>

                            </div>
                        </div>


                    </form>

              
                </DialogContent>
            </Dialog>



        </Authenticated>
    )
}
