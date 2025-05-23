<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Teacher;
use App\Models\Barangay;
use App\Models\ChildProfile;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){

        return Inertia::render('Dashboard',[
            'students' => ChildProfile::count(),
            'male' => ChildProfile::where('gender', 'Male')->count(),
            'female' => ChildProfile::where('gender', 'Female')->count(),
            'teachers' => Teacher::count(),
            'barangay' => Barangay::count(),
        ]);
    }
}
