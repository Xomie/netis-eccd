import { SiteHeader } from '@/Components/site-header';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { AlignVerticalJustifyCenterIcon, Mars, Scroll, TrendingUpIcon, UserPenIcon, Users2, Venus } from 'lucide-react';

type Counts = {
    students: number,
    male: number,
    female: number,
    teachers: number,
    barangay: number
}

export default function Dashboard({ students, male, female, teachers, barangay }: Counts) {
    const quicklinks = [
        { label: 'ECCD | STUDENTS', icon: Users2, count: students, description: 'Total Count of ECCD students..', color: 'text-green-600' },
        { label: 'ECCD | MALE', icon: Venus, count: male, description: 'Total Count of ECCD students..', color: 'text-blue-600' },
        { label: 'ECCD | FEMALE', icon: Mars, count: female, description: 'Total Count of ECCD students..', color: 'text-pink-500' },
        { label: 'CDC | TEACHER', icon: UserPenIcon, count: teachers, description: 'Total Count of ECCD students..', color: 'text-yellow-500' },
        { label: 'CHILD DEVELOPMENT CENTER', icon: AlignVerticalJustifyCenterIcon, count: barangay, description: 'Total Count of CDC..', color: 'text-red-500' },
    ];
    return (
        <Authenticated

        >
            <Head title="Dashboard" />
            <SiteHeader><b>Dashboard</b></SiteHeader>

            <div className='w-full grid grid-cols-3 p-5 gap-3'>
                {quicklinks.map((items, index) => (
                    // <Card className="@container/card hover:scale-95 hover:shadow-xl hover:border-green-300  transition-all" key={index}>
                    <Card key={index} className="@container/card transition-all hover:border-green-400 duration-200 ease-in-out rounded-none transform hover:-translate-x-1 hover:-translate-y-2 hover:shadow-[6px_6px_0_#0369a1] border border-gray-300">
                        <CardHeader className="relative">
                            <CardDescription>{items.label}</CardDescription>
                            <CardTitle className={`${items.color} @[250px]/card:text-3xl text-4xl font-semibold tabular-nums`}>
                                {items.count}
                            </CardTitle>
                            <div className="absolute right-4 top-4">
                                <items.icon className={`size-5 ${items.color}`} />
                            </div>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-sm">
                            <div className="text-muted-foreground flex items-center gap-x-1">
                                <Scroll className="size-4" />{items.description} 
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </Authenticated>
    );
}
