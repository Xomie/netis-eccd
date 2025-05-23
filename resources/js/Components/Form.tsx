import React, { useEffect, useState } from 'react'
import InputLabel from './InputLabel'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Button } from './ui/button'
import { OctagonAlert } from 'lucide-react'
import axios from 'axios'
import { router } from '@inertiajs/react'

interface FormState {
    id: number | null | string,
    first_name: string,
    child_number: string | number,
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

interface Barangay {
    id: number | string;
    name?: string;
    cdc_name?: string;
}

interface Teacher {
    id: number | string;
    full_name: string;
}

interface FormProps {
    teachers: Teacher[];
    barangays: Barangay[];
    toEdit?: FormState | null;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Form: React.FC<FormProps> = ({ teachers, barangays, toEdit, setContent }) => {
    console.log(barangays);


    const [loading, setLoading] = useState<boolean>(false);

    const initialForm: FormState = {
        id: null,
        child_number: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birthdate: '',
        gender: '',
        guardian: '',
        contact_number: '',
        barangay: '',
        street: '',
        house_number: '',
        child_session: '',
        barangay_id: '',
        teacher_id: '',
        cdw_specify: '',
        profile: null,
    };

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormState>(toEdit ?? initialForm);
    const [errors, setErrors] = useState<{ [key in keyof FormState]?: boolean }>({});
    const [statusDetail, setStatusDetail] = useState<string>('');
    const [errorDetail, setErrorDetail] = useState<string>('');
    useEffect(() => {
        if (toEdit) {
            setFormData(toEdit);
            console.log('toEdit.profile:', toEdit); // Log the profile value
            console.log('Type of toEdit.profile:', typeof toEdit.profile);
            if (toEdit.profile && toEdit.profile instanceof File) {
                const imageUrl = URL.createObjectURL(toEdit.profile);
                setProfileImage(imageUrl);
            } else if (typeof toEdit.profile == 'string') {
                // If the profile is a string URL from the backend (e.g., in edit mode)
                setProfileImage(toEdit.profile);
            }
        }
    }, [toEdit]);
    const validateForm = () => {
        const requiredFields: (keyof FormState)[] = [
            'first_name', 'last_name', 'birthdate', 'gender','child_number',
            'guardian', 'contact_number', 'barangay',
            'child_session', 'barangay_id', 'teacher_id'
        ];

        const newErrors: { [key in keyof FormState]?: boolean } = {};

        requiredFields.forEach((field) => {
            const value = formData[field];
            if (!value || (typeof value === 'string' && value.trim() === '')) {
                newErrors[field] = true;
                setErrorDetail('Please fill up all the required fields.')
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const resetForm = () => {
        setFormData(initialForm);
    };


    // For regular inputs (text, number, date)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // For selects
    const handleSelectChange = (name: keyof FormState, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // For gender radio
    const handleGenderChange = (value: string) => {
        setFormData(prev => ({ ...prev, gender: value }));
    };

    // Handle file change and display the image preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            setFormData((prev) => ({ ...prev, profile: file }));

            // Create a URL for the selected image
            const fileURL = URL.createObjectURL(file);
            setProfileImage(fileURL);
        }
    };


    const handleSubmit = async () => {
        if (!validateForm()) return;
        const form = new FormData();

        // Append all form fields to the FormData object
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'profile' && value instanceof File) {
                form.append(key, value);
            } else if (typeof value === 'string' || typeof value === 'number') {
                form.append(key, String(value)); // ensure string
            }
        });

        try {
            setLoading(true);
            setStatusDetail('Please wait...')
            const response = await axios.post('/child-profiles', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setStatusDetail('Saving Information...')
                router.reload({
                    only: ['data', 'teachers'],
                });
            }
        } catch (error: any) {
            setErrors(error.response.data.errors);
        } finally {
            setErrorDetail('')
            setStatusDetail('')
            setLoading(false);
            resetForm();
            setErrors({});
            setContent('main');
        }
    };

    return (
        <div className='w-full  bg-white'>
            <div className='text-center items-center pb-10 pl-10 pr-10 pt-8 flex gap-x-2'>
                <div className='w-2/6 flex justify-end items-center gap-x-2'>
                    <img src="/logo/tinio.png" alt="" className='h-[4rem] w-[4rem]' />
                    <img src="/logo/mswd.png" alt="" className='h-[3.5rem] w-[3.5rem]' />
                </div>
                <div className='w-full text-left leading-tight'>
                    <h6 className='text-[12px] font-medium'>Republic of the Philippines</h6>
                    <h4 className='text-[14px] font-bold'>Early Childhood Care and Development Council</h4>
                    <h1 className='font-bold text-[16px] text-sky-700'>MUNICIPAL SOCIAL WELFARE AND DEVELOPENT </h1>
                </div>
                <div className='w-2/6'>
                    {/* <img src="/logo/mswd.png" alt="" className='h-[5rem] w-[5rem]'/> */}
                </div>
            </div>


            <div className="relative w-full bg-green-700 h-12 mt-10 flex items-center px-6">
                {/* Logo (left side, overlapping top/bottom) */}
                <div className="absolute left-32 top-1/2 bg-white p-1 rounded-full -translate-y-1/2">
                    <img
                        src="/logo/netis-logo.png"
                        alt="Logo"
                        className="h-24 w-24 object-contain  rounded-full border-sky-800 border-4 shadow-xl "
                    />
                </div>

                {/* Title (pushed to center beside logo) */}
                <div className="flex-1 text-center">
                    <h1 className="text-xl font-bold text-white uppercase">
                        CHILD'S PERSONAL INFORMATION
                    </h1>
                </div>
            </div>
            <h1 className='text-center mt-4 text-xl font-bold text-sky-700'>New Application</h1>
            <p className='text-[12px] text-justify pl-5 pr-5 leading-tight indent-10'>Please fill out all the required information accurately and completely before answering each item below.
                For items that do not apply to your child, you may leave them blank. Required fields are marked with an
                asterisk (*) — please ensure they are properly filled out.
                Your truthful and complete responses will help the Early Childhood Development Council (ECDC)
                build a reliable information system for Filipino children. This will serve as a valuable reference
                in designing effective programs and services that promote the health, safety, and development of young
                children across the country.</p>
            <b className='pl-5 text-[12px] text-red-700 '>* items with an asterisk(*) are required</b>



            <div className='p-2 w-full  mt-5 pl-5 text-sky-800 font-bold text-[14px]'>I. PERSONAL INFORMATION</div>
            <div className='w-full p-5'>
                <InputLabel className="w-full text-[11px]">Child Number: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Input
                        name="child_number"
                        value={formData.child_number}
                        onChange={handleChange}
                        className={`w-full mb-2 ${errors.child_number ? 'border-red-500 border' : ''}`}
                    />
                    </InputLabel>

                    <div className='flex items-center gap-x-2'>
                        <InputLabel className="w-full text-[11px]">First Name: <small className='text-red-800 text-[14px] font-bold'>*</small>
                            <Input
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className={`w-full ${errors.first_name ? 'border-red-500 border' : ''}`}
                            />

                        </InputLabel>
                        <InputLabel className="w-full text-[11px]">Middle Name:
                            <Input
                                name="middle_name"
                                value={formData.middle_name}
                                onChange={handleChange}
                            />

                        </InputLabel>
                        <InputLabel className="w-full text-[11px]">Last Name: <small className='text-red-800 text-[14px] font-bold'>*</small>
                            <Input
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className={`w-full ${errors.last_name ? 'border-red-400 border' : ''}`}
                            />

                        </InputLabel>
                        <InputLabel className="w-[150px] text-[11px]">Suffix:
                            <Select onValueChange={(value) => handleSelectChange('suffix', value)}>
                                <SelectTrigger className="w-[80px]" >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="JR">JR</SelectItem>
                                    <SelectItem value="SR">SR</SelectItem>
                                    <SelectItem value="II">II</SelectItem>
                                    <SelectItem value="III">III</SelectItem>
                                    <SelectItem value="IV">IV</SelectItem>
                                    <SelectItem value="V">V</SelectItem>
                                    <SelectItem value="VI">VI</SelectItem>
                                </SelectContent>
                            </Select>
                        </InputLabel>
                    </div>
            </div>

            <div className='flex items-center gap-x-3 mt-2 pl-5 b'>
                <InputLabel className="w-[260px] text-[11px]">Birthdate: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Input type='date'
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className={`w-full ${errors.birthdate ? 'border-red-500 border' : ''}`}
                    />
                </InputLabel>


                <div className='h-14 '>

                    <InputLabel className=" text-[11px] mb-2">Gender: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    </InputLabel>

                    <RadioGroup value={formData.gender} onValueChange={handleGenderChange} defaultValue="option-one" className='flex items-start'>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="option-one" />
                            <Label htmlFor="option-one" className='text-[12px]'>Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="option-two" />
                            <Label htmlFor="option-two" className='text-[12px]'>Female</Label>
                        </div>
                    </RadioGroup>

                </div>



            </div>

            <div className='w-full p-5 mt-2'>

                <div className='flex items-center gap-x-2 text-[11px]'>
                    <InputLabel className="w-full text-[11px]">Name of Parent/Guardian: <small className='text-red-800 text-[14px] font-bold'>*</small>
                        <Input name="guardian"
                            value={formData.guardian}
                            onChange={handleChange}
                            className={`w-full ${errors.guardian ? 'border-red-500 border' : ''}`}
                        />
                    </InputLabel>
                    <InputLabel className="w-full text-[11px]">Contact #: <small className='text-red-800 text-[14px] font-bold'>*</small>
                        <Input type='number' name="contact_number"
                            value={formData.contact_number}
                            onChange={handleChange}
                            className={`w-full ${errors.contact_number ? 'border-red-500 border' : ''}`}
                        /></InputLabel>

                </div>
            </div>


            <div className='p-2 w-full text-sky-800 mt-5 pl-5 font-bold text-[14px]'>II. ADDRESS</div>

            <div className='flex items-center gap-x-2 mt-4 pl-5 pr-5'>
                <InputLabel className="w-full text-[11px]">Barangay: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Select
                        value={formData.barangay}
                        onValueChange={(value) => handleSelectChange('barangay', value)}>
                        <SelectTrigger className={`w-full ${errors.barangay ? 'border-red-500 border' : ''}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Bago">Bago</SelectItem>
                            <SelectItem value="Concepcion">Concepcion</SelectItem>
                            <SelectItem value="Nazareth">Nazareth</SelectItem>
                            <SelectItem value="Padolina">Padolina</SelectItem>
                            <SelectItem value="Palale">Palale</SelectItem>
                            <SelectItem value="Pias">Pias</SelectItem>
                            <SelectItem value="Poblacion Central">Poblacion Central</SelectItem>
                            <SelectItem value="Poblacion East">Poblacion East</SelectItem>
                            <SelectItem value="Poblacion West">Poblacion West</SelectItem>
                            <SelectItem value="Pulong Matong">Pulong Matong</SelectItem>
                            <SelectItem value="Rio Chico">Rio Chico</SelectItem>
                            <SelectItem value="Sampaguita">Sampaguita</SelectItem>
                            <SelectItem value="San Pedro">San Pedro</SelectItem>
                        </SelectContent>
                    </Select>
                </InputLabel>
                <InputLabel className="w-full text-[11px]">Street:
                    <Input name="street"
                        value={formData.street}
                        onChange={handleChange} />
                </InputLabel>
                <InputLabel className="w-full text-[11px]">House #:
                    <Input name="house_number"
                        value={formData.house_number}
                        onChange={handleChange} /></InputLabel>

            </div>



            <div className='p-2 w-full text-sky-800 mt-5 pl-5  font-bold text-[14px]'>II. CDC INFORMATION</div>

            <div className='flex items-center gap-x-2 mt-4 pl-5 pr-5'>
                <InputLabel className="w-full text-[11px]">Child Session: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Select
                        value={formData.child_session}
                        onValueChange={(value) => handleSelectChange('child_session', value)}>
                        <SelectTrigger className={`w-full ${errors.child_session ? 'border-red-500 border' : ''}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Session A">Session A</SelectItem>
                            <SelectItem value="Session B">Session B</SelectItem>
                            <SelectItem value="Session C">Session C</SelectItem>
                            <SelectItem value="Session D">Session D</SelectItem>
                            <SelectItem value="Session E">Session E</SelectItem>
                            <SelectItem value="Session F">Session F</SelectItem>
                            <SelectItem value="Session G">Session G</SelectItem>
                            <SelectItem value="Session H">Session H</SelectItem>
                            <SelectItem value="Session I">Session I</SelectItem>
                            <SelectItem value="Session J">Session J</SelectItem>
                            <SelectItem value="Session K">Session K</SelectItem>
                            <SelectItem value="Session L">Session L</SelectItem>
                        </SelectContent>
                    </Select>
                </InputLabel>
                <InputLabel className="w-full text-[11px]">Center: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Select
                        value={formData.barangay_id.toString()}
                        onValueChange={(value) => handleSelectChange('barangay_id', value)}>
                        <SelectTrigger className={`w-full ${errors.barangay_id ? 'border-red-500 border' : ''}`} >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {barangays.map((items, index) => (
                                <SelectItem key={index} value={items.id.toString()}>{items.cdc_name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </InputLabel>


            </div>

            <div className='pl-5 pr-5 mt-5 flex gap-x-2 items-center'>
                <InputLabel className="w-full text-[11px]">Name of CDW/CDT: <small className='text-red-800 text-[14px] font-bold'>*</small>
                    <Select
                        value={formData.teacher_id.toString()}
                        onValueChange={(value) => handleSelectChange('teacher_id', value)}>
                        <SelectTrigger className={`w-full ${errors.teacher_id ? 'border-red-500 border' : ''}`}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {teachers.map((items, index) => (
                                <SelectItem key={index} value={items.id.toString()}>{items.full_name}</SelectItem>
                            ))}
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </InputLabel>
                {formData.teacher_id === "Others" && (
                    <InputLabel className="w-full text-[11px]">Name of CDW/CDT: <small className='text-red-800 text-[14px] font-bold'>*</small>
                        <Input
                            name="cdw_specify"
                            value={formData.cdw_specify}
                            onChange={handleChange}
                            placeholder="Specify"
                        />
                    </InputLabel>
                )}
            </div>


            <div className='p-2 w-full text-sky-800 mt-5 pl-5  font-bold text-[14px]'>II. CHILD'S PROFILE PICTURE</div>

            <div className='flex items-center gap-x-2 mt-4 pl-5 pr-5'>
                <div className="w-full mt-2">
                    <h1 className="font-bold">ATTACH YOUR LATEST PHOTO</h1>
                    <div className="flex items-center w-full">
                        <div className="w-3/6">
                            <div className="w-[15rem] h-[15rem] border-black mt-3 flex items-center justify-center overflow-hidden">
                                {/* Display the uploaded image */}
                                <img
                                    src={profileImage ?? '/logo/unknown.png'} // If no image, show default
                                    className="h-full border w-full text-gray-400 object-cover"
                                    alt="Profile Preview"
                                />
                            </div>
                            <Input
                                type="file"
                                className="w-[240px]"
                                onChange={handleFileChange} // Handle the file selection
                            />
                        </div>
                        <div className="w-full text-sm">
                            <p>
                                Take a selfie or an actual picture of your face
                                using a camera or your mobile phone. After the photo
                                has been taken, click on the "Upload" button and
                                locate the image from your local storage or device
                                to attach.
                                <b className="text-red-700">
                                    We need a close-up image of your face, so please
                                    take an approximately 2x2 size photo capture.
                                </b>
                            </p>
                            <div className="flex items-center gap-x-2 mt-14">
                                <OctagonAlert className="text-red-700 h-12 w-12" />
                                <p>
                                    Do not attach a whole-body picture or your
                                    younger-year photo. We only need the actual
                                    photo of the face.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 p-5 '>
                <div className='flex gap-x-3'>
                    {loading ?
                        <Button disabled={true} className='bg-sky-300 text-sky-500 hover:bg-green-700 w-[200px] rounded'>{toEdit ? "Update Information" : "Save"}</Button> :
                        <Button onClick={() => handleSubmit()} className='bg-sky-800 hover:bg-green-700 w-[200px] rounded'>{toEdit ? "Update Information" : "Save"}</Button>}
                    <Button onClick={() => setContent('main')} variant='outline' className='border-sky-800 w-[200px] text-sky-900 rounded'>Cancel</Button>
                </div>
                <p className={` mt-8 ${statusDetail == '' ? "text-red-700" : "text-green-700"}`}>{statusDetail ? statusDetail : errorDetail}</p>
            </div>

            <div className='h-32 mt-10 relative'>
                <div className="w-full bg-sky-800 h-[11rem] absolute bottom-0 z-10 wavy-wave-one">
                    {/* Content here */}
                </div>

                <div className="w-full bg-green-700 h-[10rem]  absolute bottom-0  z-10 wavy-wave-two">
                    {/* Content here */}
                </div>
            </div>


        </div>
    )
}

export default Form;