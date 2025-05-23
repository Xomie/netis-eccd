export type TeacherProps = {
    id: number;
    full_name: string;
    role: string;
};

export type BarangayProps = {
    id: number;
    name: string;
    address: string;
    barangay_captain: string;
    cdc_name: string;
    logo: string;
};


export type SettingsProps = {
    teachers: TeacherProps[];
    barangays: BarangayProps[];
};